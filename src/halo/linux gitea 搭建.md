---
icon: edit
date: 2023-04-10
category:
  - Linux
tag:
  - git
  - gitea
headerDepth: 5
---


# linux gitea 搭建
[官方文档](https://docs.gitea.io/zh-cn/)
### 下载可执行文件

```shell
mkdir -p /wanghao/gitea
cd  /wanghao/gitea
wget -O gitea https://dl.gitea.com/gitea/1.19.0/gitea-1.19.0-linux-amd64
chmod +x gitea
```
### 验证文件（选作）
Gitea 对打包的二进制文件使用 GPG密钥 签名以防止篡改。 请根据对应文件名 .asc 中包含的校验码检验文件的一致性。
```shell
gpg --keyserver keys.openpgp.org --recv 7C9E68152594688862D62AF62D9AE806EC1592E2
gpg --verify gitea-1.19.0-linux-amd64.asc gitea-1.19.0-linux-amd64
```
校验正确时的信息为 Good signature from "Teabot <teabot@gitea.io>"。 校验错误时的信息为 This key is not certified with a trusted signature!。

### 添加环境变量
>```GITEA_WORK_DIR```：工作目录的绝对路径
```GITEA_CUSTOM```：默认情况下 Gitea 使用默认目录 ```GITEA_WORK_DIR/custom```，您可以使用这个参数来配置 custom 目录

修改环境配置文件
```shell
vim etc/profile
```
追加
```shell
export GITEA_HOME=/wanghao/gitea
export GITEA_WORK_DIR=$GITEA_HOME/workdir
export GITEA_CUSTOM=$GITEA_WORK_DIR/custom
export PATH=$GITEA_HOME:$PATH
```
### 添加systemd 服务
```
sudo vim /etc/systemd/system/gitea.service
```
追加
```ini
[Unit]
Description=Gitea (Git with a cup of tea)
After=syslog.target
After=network.target

[Service]
RestartSec=2s
Type=simple
User=wanghao
Group=wanghao
WorkingDirectory=/wanghao/gitea/workdir
ExecStart=/wanghao/gitea/gitea web --config /wanghao/gitea/app.ini
Restart=always
Environment=USER=wanghao HOME=/home/wanghao GITEA_WORK_DIR=/wanghao/gitea/workdir

[Install]
WantedBy=multi-user.target
```

启动

```
systemctl enable gitea
systemctl start gitea
```
### 开放端口
```shell
firewall-cmd --zone=public --add-port=3000/tcp --permanent
```

### 问题解决
ssh clone 时遇到[No supported authentication methods available (server sent: publickey) ](https://blog.csdn.net/qq_37726813/article/details/127475348)