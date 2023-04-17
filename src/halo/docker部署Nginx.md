---
icon: edit
date: 2021-09-16
category:
  - Docker
tag:
  - Docker
  - nginx 
headerDepth: 5
---


# docker部署Nginx
# Nginx的安装

## 1.下载nginx镜像

```shell
docker pull nginx
```

复制代码2.创建实例并启动

```shell
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx \
-d nginx:1.10
```

复制代码3.拷贝nginx的配置
>1.  将容器内的配置文件拷贝到当前目录：docker container cp nginx:/etc/nginx .
>2.  修改文件名称：mv nginx conf  把这个conf移动到/wanghao/nginx下
>3.  终止容器：docker stop nginx
>4.  执行命令删除原容器：docker rm $ContainerId

再次创建nginx容器
```shell
docker run -p 80:80 --name nginx \
--restart=always \
-v /wanghao/nginx/html:/usr/share/nginx/html \
-v /wanghao/nginx/logs:/var/log/nginx \
-v /wanghao/nginx/conf:/etc/nginx/conf.d \
-d nginx
```

