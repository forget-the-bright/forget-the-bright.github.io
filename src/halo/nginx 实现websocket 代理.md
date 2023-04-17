---
icon: edit
date: 2022-11-04
category:
  - 系统配置
  - Linux
tag:
  - nginx 
  - websocket
headerDepth: 5
---


# nginx 实现websocket 代理
WebSocket是HTML5下一种新的协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的。它与HTTP一样通过已建立的TCP连接来传输数据，但是它和HTTP最大不同是：

``` 1） WebSocket是一种双向通信协议。在建立连接后，WebSocket服务器端  和客户端都能主动向对方发送或接收数据，就像Socket一样；```
```2）WebSocket需要像TCP一样，先建立连接，连接成功后才能相互通信。```

WebSocket协议相比较于HTTP协议成功握手后可以多次进行通讯，直到连接被关闭。但是WebSocket中的握手和HTTP中的握手兼容， 它使用HTTP中的Upgrade协议头将连接从HTTP升级到WebSocket。这使得WebSocket程序可以更容易的使用现已存在的基础设施。大部分现在的浏览器都支持WebSocket。

在实际的生产环境中，要求多个WebSocket服务器必须具有高性能和高可用，那么WebSocket协议就需要一个负载均衡层，Nginx从​「1.3」​版本开始支持WebSocket，其可以作为一个反向代理和为WebSocket程序做负载均衡。

WebSocket协议与HTTP协议不同，但WebSocket握手与HTTP兼容，使用HTTP升级工具将连接从HTTP升级到WebSocket。这允许WebSocket应用程序更容易地适应现有的基础架构。例如，WebSocket应用程序可以使用标准HTTP端口80和443，从而允许使用现有的防火墙规则。

​「WebSocket应用程序可以在客户端和服务器之间保持长时间运行的连接」​，从而有助于开发实时应用程序。用于将连接从HTTP升级到WebSocket的HTTP升级机制使用Upgrade和Connection头。反向代理服务器在支持WebSocket时面临一些挑战。一个是WebSocket是一个逐跳协议，因此当代理服务器拦截客户端的升级请求时，需要向后端服务器发送自己的升级请求，包括相应的头文件。此外，由于WebSocket连接长期存在，与HTTP使用的典型短期连接相反，反向代理需要允许这些连接保持打开状态，而不是关闭它们，因为它们似乎处于空闲状态。
允许在客户机和后端服务器之间建立隧道，Nginx支持WebSocket。对于NGINX将升级请求从客户端发送到后台服务器，必须明确设置Upgrade和Connection标题。

-----------------------------------
### Nginx开启WebSocket代理的配置方法如下

#### 编辑nginx.conf，在http区域内一定要添加下面配置：
```conf
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
```
「解释一下map指令的作用：」​该作用主要是根据客户端请求中的值，来构造改变connection_upgrade的值，即根据变量的值创建新的变量connection_upgrade， 创建的规则就是{}里面的东西。其中的规则没有做匹配，因此使用默认的，即 http_upgrade为空字符串的话，那么值就是 close。
#### 在location匹配配置中添加如下内容
```conf
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "$connection_upgrade";
```
#### 一次完整的实例
```
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
server {
    listen 30880 ssl;
    #填写绑定证书的域名
    server_name local.wuanwanghao.top; 
    #证书文件名称
    ssl_certificate  /etc/nginx/ssl/local.wuanwanghao.top_bundle.crt; 
    #私钥文件名称
    ssl_certificate_key /etc/nginx/ssl/local.wuanwanghao.top.key; 
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    error_page 497 307 =301 @back; 
    location @back {
        rewrite ^(.*)$ https://$host:$server_port$1 permanent;
    }
    location / {
          proxy_set_header Host $host;
          proxy_set_header X-Real-Ip $remote_addr;
          proxy_set_header X-Forwarded-For $remote_addr;
          #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。  
          proxy_pass   http://192.168.3.140:30880;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "$connection_upgrade";
    }
}

```