---
icon: edit
date: 2023-04-09
category:
  - Docker
headerDepth: 5
---


# docker 安装 jenkins
```
docker run \
-u root \
-d \
--name jenkins \
--restart=always \
-p 8080:8080 \
-p 8888:8888 \
-p 50000:50000 \
-v /wanghao/jenkins_home:/var/jenkins_home \
-v /wanghao/env:/usr/local/env \
jenkins/jenkins:latest
```