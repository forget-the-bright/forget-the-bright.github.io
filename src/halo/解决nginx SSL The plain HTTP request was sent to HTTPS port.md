---
icon: edit
date: 2022-10-30
category:
  - 系统配置
  - Linux
headerDepth: 5
---


# 解决nginx SSL The plain HTTP request was sent to HTTPS port
### 问题
现在越来越多的网站要求http访问转为更为安全的https访问，很多使用nginx部署的前端应用可以很方便的使用反向代理来实现，切换后，用http访问就会出现 "The plain HTTP request was sent to HTTPS port"的错误页面。

### 解决思路
将此错误页面重定向到指定的https地址即可

### 解决方法
假设端口号是8443:
```
server {
    listen 8443 ssl;
    ssl_certificate ssl_cert.pem;
    ssl_certificate_key ssl_server.key;
    server_name your_domain.com;
    error_page 497 301 =307 https://$host:$server_port$request_uri; 
    location / {
        ....
    }
}
```
另外，如果是自有域名，http和https端口都使用默认端口的话，只要将http的请求重定向到https即可
```
server {
    listen 80;
    listen 443 ssl;
    ssl_certificate ssl_cert.pem;
    ssl_certificate_key ssl_server.key;
    server_name your_domain.com;
    if ($scheme = http) {
        return 301 https://$host$uri?$args;
    }
    location / {
        ....
    }
}

```
### 参考链接
[nginx_非标准端口_同端口_http_自动跳转_https](https://blog.csdn.net/qq_30665009/article/details/124464699)
