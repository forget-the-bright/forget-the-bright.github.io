---
icon: edit
date: 2021-10-17
category:
  - Docker
tag:
  - sentinel
  - Docker
headerDepth: 5
---


# docker部署sentinel
## docker 拉取 镜像
``` shell
docker pull bladex/sentinel-dashboard 
```
## docker 运行 镜像
``` shell
docker run -d --name sentinel-dashboard -p 8858:8858  --restart=always bladex/sentinel-dashboard
```
## 访问sentinel
```http://ip:8858 #ip:服务器地址```
![image.png](https://local.wuanwanghao.top:30549/upload/2021/10/image-35a36703c3de4608bb87dc383d088d69.png)