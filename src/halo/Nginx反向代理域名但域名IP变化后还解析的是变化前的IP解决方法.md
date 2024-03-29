---
icon: edit
date: 2023-03-26
category:
  - 系统配置
tag:
  - nginx 
headerDepth: 5
---


# Nginx反向代理域名但域名IP变化后还解析的是变化前的IP解决方法
之前博客的代理 proxy_pass 时直接指定域名是可以用的，比如
```
location / {
     proxy_pass   http://local.wuanwanghao.top:30550;
}
```
#### 遇到一个问题是：
如果路由器因为断电或者掉线之类的原因重新拨号后ip发生变化，此处nginx就无法反向代理了，必须重启一次nginx才行。

#### 解决方法：
```
server {
    listen 8080;
    server_name localhost;
    ssl_prefer_server_ciphers on;
    #配置域名解析 valid：DNS缓存时间，也可以不指定，缓存时间会默认根据域名的TTL时间 ipv6：on或off，指定该域名解析为ipv6地址。
    resolver 202.102.134.68 114.114.114.114 valid=30 ipv6=off;
    #指定解析域名时，DNS服务器的超时时间，也可以不指定
    resolver_timeout 30s;
    #设置变量，在使用resolver之后，必须使用set设置变量来代替域名，否则会报错
    set $true_url "local.wuanwanghao.top"; 
    location / {
    	proxy_pass http://$true_url:30550;
    }
}
```

resolver：后接指定的DNS服务器，多个用空格隔开。resolver可以在http里面全局设定，也可以在server里面设定。
valid：DNS缓存时间，也可以不指定，缓存时间会默认根据域名的TTL时间。
ipv6：on或off，指定该域名解析为ipv6地址。
resolver_timeout：指定解析域名时，DNS服务器的超时时间，也可以不指定。
set ：设置变量，在使用resolver之后，必须使用set设置变量来代替域名，否则会报错。另外，set不能写到 location里面否则不会生效。注意：set变量在server中可以设置成功，http中语法不允许。


这样才解决动态dns解析访问问题。