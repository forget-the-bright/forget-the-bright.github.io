---
icon: edit
date: 2022-07-15
category:
  - Docker
headerDepth: 5
---


# docker 安装  Portainer
[汉化版Portainer仓库地址](https://hub.docker.com/r/6053537/portainer-ce)

命令：
```
	docker run -d --restart=always \
	--name="portainer" \
	-p 9100:9000 \
	-v /var/run/docker.sock:/var/run/docker.sock \
	-v /home/wanghao/portainer-ce/data:/data \
	6053537/portainer-ce
```
- ```-d``` 后台进程启动。
- ```-p 9000:9000``` 管理控制UI界面访问接口。
- ```-name portainer``` 容器名称。
- ```--restart=always``` 进程挂了自动重启，比如重启docker以后自动重启portainer。
- ```-v``` 数据卷。
- ```6053537/portainer-ce``` portainer社区版汉化版镜像。
