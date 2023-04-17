---
icon: edit
date: 2022-12-15
category:
  - 系统配置
  - Linux
  - 网站搭建
tag:
  - nip.io
  - 域名
headerDepth: 5
---


# DNS泛域名解析应用（nip.io/sslip.io）直接通过nip.io域名拼接ip地址的方式直接解析到指定ip
使用 nip.io 作为k8s的入口 域名解析。 nip.io 是一个免费的域名解析服务，可以将符合下列格式的域名解析对应的ip，可用来作为应用路由的解析服务，省去配置本地 hosts 文件的步骤。
格式
```
10.0.0.1.nip.io maps to 10.0.0.1  
app.10.0.0.1.nip.io maps to 10.0.0.1
customer1.app.10.0.0.1.nip.io maps to 10.0.0.1
customer2.app.10.0.0.1.nip.io maps to 10.0.0.1
otherapp.10.0.0.1.nip.io maps to 10.0.0.1
```
例如，Ingress IP 地址为 139.198.121.154，在创建应用路由时，Hostname 一栏填写为 demo.139.198.121.154.nip.io，其它保持原来的设置。

sslip.io 也是一种类似域名解析服务，使SSL证书生成更加容易。