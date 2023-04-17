---
icon: edit
date: 2022-11-03
category:
  - 系统配置
  - Linux
tag:
  - 网络
  - EXSI 
  - SSL
  - 域名
headerDepth: 5
---


# vmware EXSI 修改系统默认SSL证书和密钥
### ssh链接到exsi
![image-1667434778798](https://local.wuanwanghao.top:9000/test/test/image-1667434778798.png)
### 跳转到 ```/etc/vmware/ssl``` 路径下
```shell
cd /etc/vmware/ssl
```
### 将路径下的两个文件备份 修改后辍为bak
![image-1667434900974](https://local.wuanwanghao.top:9000/test/test/image-1667434900974.png)

### 上传自己的ssl 证书 和密钥 名称都修改为 ```rui```
![image-1667435003688](https://local.wuanwanghao.top:9000/test/test/image-1667435003688.png)!
### 使证书生效
```shell
/etc/init.d/hostd restart
/etc/init.d/vpxa restart
```
![image-1667435106747](https://local.wuanwanghao.top:9000/test/test/image-1667435106747.png)





