---
icon: edit
date: 2023-04-06
category:
  - Docker
tag:
  - zfile
headerDepth: 5
---


# docker 安装 zfile
[官方安装文档](https://docs.zfile.vip/install/os-docker/)
### 下载配置文件
```shell
  curl -k -o /home/wanghao/zfile/config/application.properties https://c.jun6.net/ZFILE/application.properties
```
### 启动
```  shell
  docker run -d --name=zfile --restart=always \
    -p 8080:8080 \
    -v /home/wanghao/zfile/db:/root/.zfile-v4/db \
    -v /home/wanghao/zfile/logs:/root/.zfile-v4/logs \
    -v /home/wanghao/zfile/file:/data/file \
    -v /home/wanghao/zfile/config/application.properties:/root/application.properties \
    zhaojun1998/zfile
```