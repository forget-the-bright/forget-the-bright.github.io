---
icon: edit
date: 2021-09-15
category:
  - 系统配置
tag:
  - hosts
headerDepth: 5
---


# Github Hosts
# 时间：2021-09-17
Github Hosts 修改,速度可能会好点

访问缓慢原因
方法小结:
ping 下找到本机电脑访问速度比较快IP,
http://ping.chinaz.com/github.com

综合其他的网友的IP
Windows hosts 路径 :

C:\\Windows\\System32\\drivers\\etc

``` hosts
# Host Start
185.199.108.154              github.githubassets.com
140.82.113.22                central.github.com
185.199.108.133              desktop.githubusercontent.com
185.199.108.153              assets-cdn.github.com
185.199.108.133              camo.githubusercontent.com
185.199.108.133              github.map.fastly.net
199.232.69.194               github.global.ssl.fastly.net
140.82.113.4                 gist.github.com
185.199.108.153              github.io
140.82.112.3                 github.com
140.82.113.6                 api.github.com
185.199.108.133              raw.githubusercontent.com
185.199.108.133              user-images.githubusercontent.com
185.199.108.133              favicons.githubusercontent.com
185.199.108.133              avatars5.githubusercontent.com
185.199.108.133              avatars4.githubusercontent.com
185.199.108.133              avatars3.githubusercontent.com
185.199.108.133              avatars2.githubusercontent.com
185.199.108.133              avatars1.githubusercontent.com
185.199.108.133              avatars0.githubusercontent.com
185.199.108.133              avatars.githubusercontent.com
140.82.113.10                codeload.github.com
52.216.20.99                 github-cloud.s3.amazonaws.com
52.217.140.249               github-com.s3.amazonaws.com
52.217.1.132                 github-production-release-asset-2e65be.s3.amazonaws.com
52.217.68.28                 github-production-user-asset-6210df.s3.amazonaws.com
52.217.173.153               github-production-repository-file-5c1aeb.s3.amazonaws.com
185.199.108.153              githubstatus.com
64.71.144.202                github.community
185.199.108.133              media.githubusercontent.com
# Host End
```
