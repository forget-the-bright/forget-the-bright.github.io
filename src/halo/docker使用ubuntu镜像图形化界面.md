---
icon: edit
date: 2023-03-06
category:
  - 系统配置
  - Docker
headerDepth: 5
---


# docker使用ubuntu镜像图形化界面
不想用vnc安装图形化界面，直接找了一个有图形化界面的ubuntu镜像

镜像地址：

https://hub.docker.com/r/kasmweb/desktop/tags

pull完镜像后生成容器即可，此界面为web版，地址为:

https://IP_OF_SERVER:6901
```
docker run -it -p 6901:6901 -e VNC_PW=password --name ubuntu-test kasmweb/desktop:1.10.0-rolling
```
![image-1678090052556](https://local.wuanwanghao.top:9000/test/test/image-1678090052556.png)