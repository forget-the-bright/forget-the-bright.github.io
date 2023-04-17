---
icon: edit
date: 2023-04-11
category:
  - Linux
tag:
  - harbor
headerDepth: 5
---


# linux harbor 搭建， 以及nginx ssl 代理
### 前置
首先确保机器以及安装好 docker 以及 docker-compose
>[Linux 安装 Docker](https://local.wuanwanghao.top:30549/archives/linux%E5%AE%89%E8%A3%85docker)

>[Linux 安装 docker-compose](https://local.wuanwanghao.top:30549/archives/linux%E5%AE%89%E8%A3%85docker-compose)

### 下载离线安装包
[github_harbor_releases](https://github.com/goharbor/harbor/releases)
创建工作目录 下载安装包并解压
```shell
mkdir -p /wanghao/docker
cd /wanghao/docker
wget https://ghproxy.com/https://github.com/goharbor/harbor/releases/download/v2.5.6/harbor-offline-installer-v2.5.6.tgz
tar -xvf harbor-offline-installer-v2.5.6.tgz
```
### 修改配置文件
进入解压目录 /wanghao/docker/harbor ,拷贝模版创建配置文件
```shell
cd /wanghao/docker/harbor
cp harbor.yml.tmpl harbor.yml
```
修改harbor.yml 以下的配置项
```
hostname: 访问的域名
http:
 port: 5500
external_url: https://域名:端口
harbor_admin_password: 管理员密码
```
### 启动harbor
```
./install.sh
```

### 配置nginx 代理 ssl
```
server {
    listen 443 ssl;
    server_name 域名 ;#修改为自己的域名
    ssl_certificate   ;  #域名证书
    ssl_certificate_key  ;  #域名证书
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        proxy_pass http://localhost:5500;
        client_max_body_size 0;
        proxy_connect_timeout 90;
        proxy_read_timeout 90;
        proxy_buffer_size 4k;
        proxy_buffers 6 32k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 64k;
    }
```