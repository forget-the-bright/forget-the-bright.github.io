---
icon: edit
date: 2023-04-06
category:
  - Docker
headerDepth: 5
---


# docker 开放远程管理，portainer 添加远程docker 服务器 ,docker 开启TLS 认证
## docker 开放远程管理
### 修改docker 服务文件
```shell
vim /usr/lib/systemd/system/docker.service
```
### 启动命令后追加 ```-H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock```
```
#找到ExecStart这行 在后面加上-H tcp://0.0.0.0:2375  其它方式一会docker就挂了 而且重启无效 
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock
```
### 重启docker
```shell
systemctl daemon-reload
systemctl restart docker
```
### 防火墙开放端口 
```
firewall-cmd --zone=public --add-port=2375/tcp --permanent
systemctl reload firewalld
```

## portainer 添加远程docker 服务器
![image-1680765916390](https://local.wuanwanghao.top:9000/test/test/image-1680765916390.png)
![image-1680766178357](https://local.wuanwanghao.top:9000/test/test/image-1680766178357.png)


## 配置Docker开启TLS认证
直接开放 Docker 2375 端口容易造成生成事故，被人入侵挖矿之类的， 所以这里开启TLS 认证来安全防护

### 生成TLS证书
创建证书生成脚本 createcert.sh，放置/opt/sh目录
```
mkdir -p /opt/sh /opt/cert/docker
touch /opt/sh/createcert.sh
vim /opt/sh/createcert.sh
```
在createcret.sh添加内容
```
#!/bin/bash
set -e
if [ -z $1 ];then
        echo "请输入Docker服务器的域名"
        exit 0
fi
HOST=$1
mkdir -p /opt/cert/docker
cd /opt/cert/docker
openssl genrsa -aes256 -out ca-key.pem 4096
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem
openssl genrsa -out server-key.pem 4096
openssl req -subj "/CN=$HOST" -sha256 -new -key server-key.pem -out server.csr
# 配置白名单，推荐配置0.0.0.0，允许所有IP连接但只有证书才可以连接成功
echo subjectAltName = DNS:$HOST,IP:0.0.0.0 > extfile.cnf
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile extfile.cnf
openssl genrsa -out key.pem 4096
openssl req -subj '/CN=client' -new -key key.pem -out client.csr
echo extendedKeyUsage = clientAuth > extfile.cnf
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile.cnf
rm -v client.csr server.csr
chmod -v 0400 ca-key.pem key.pem server-key.pem
chmod -v 0444 ca.pem server-cert.pem cert.pem
```
执行 createcert.sh 脚本，生成证书放置 /opt/cert/docker 目录中
```
# wuanwanghao.top 是服务器的域名
sh /opt/sh/createcert.sh wuanwanghao.top
```
按照提示输入相关信息，密码一致，其他信息可留空，等脚本指定完成之后，可在 /opt/cert/docker 目录查看到生成的证书。
![image-1680790203577](https://local.wuanwanghao.top:9000/test/test/image-1680790203577.png)

### 配置Docker开启TLS认证
```
vim /usr/lib/systemd/system/docker.service
```
在ExecStart属性后追加
```
--tlsverify --tlscacert=/opt/cert/docker/ca.pem  \
--tlscert=/opt/cert/docker/server-cert.pem \
--tlskey=/opt/cert/docker/server-key.pem \
-H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock 
```
### 重新加载docker配置后重启
```
systemctl daemon-reload
systemctl restart docker
```
查看2376端口是否启动
```
netstat -nltp | grep 2375
```

本地连接测试Docker API是否可用

没有指定证书访问测试
```
curl https://wuanwanghao.top:2375/info
```
指定证书访问测试
```
curl https://wuanwanghao.top:2375/info --cert /opt/cert/docker/cert.pem --key /opt/cert/docker/key.pem --cacert /opt/cert/docker/ca.pem
```
### portainer 重新添加docker机器

删除原先docker 机器 ，重新添加 勾选TLS 选项
![image-1680790455212](https://local.wuanwanghao.top:9000/test/test/image-1680790455212.png)

上传生成的TLS 文件
![image-1680790603638](https://local.wuanwanghao.top:9000/test/test/image-1680790603638.png)

重新链接即可