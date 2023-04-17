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


# Docker给nginx添加端口映射
## 场景：
>运行了nginx，一开始只映射了80端口，后面载部署项目的时候，需要用到其他端口，不想重新部署容器，所以通过修改配置文件的方式给容器添加其他端口
>当然。添加端口的方法是通用的，除此以外的方法比如将容器打包成镜像，再运行一个容器，或者干脆放弃当前容器，重新运行一个容器是完全不在我考虑范围内的

## 1、查看容器ID
执行命令
```shell
docker inspect nginx # 容器名
```
输出

```json
[
    {
        "Id": "135254e3429d1e75aa68569137c753b789416256f2ced52b4c5a85ec3849db87", # hash_of_the_container
        "Created": "2020-08-21T09:41:36.597993005Z",
        "Path": "/docker-entrypoint.sh",
        "Args": [
            "nginx",
            "-g",
            "daemon off;"
        ],
        "State": {
...
```
## 2、修改之前一定要先停掉容器，否则自动还原
```shell
docker stop nginx
```
## 3、修改配置文件
修改hostconfig.json

```shell
cd /var/lib/docker/containers/135254e3429d1e75aa68569137c753b789416256f2ced52b4c5a85ec3849db87 # container id

vim hostconfig.json
```

找到端口绑定，原本内容：

![image.png](https://local.wuanwanghao.top:30549/upload/2021/09/image-b18afbfb43414f6da5550bae5f7566c0.png)

照猫画虎，添加端口

```json
"PortBindings": {
    "80/tcp": [
        {
            "HostIp": "",
            "HostPort": "80"
        }
    ],
    "8080/tcp": [
        {
            "HostIp": "",
            "HostPort": "8080"
        }
    ],
    "8189/tcp": [
        {
            "HostIp": "",
            "HostPort": "8189"
        }
    ]
},
```
修改config.v2.json

同路径下打开config.v2.json，修改:ExposedPorts

```json
"ExposedPorts": {
    "80/tcp": {},
    "8080/tcp": {},
    "8189/tcp": {}
},
... # 略
```

### 注意
很多文章中提到还要修改Ports，实际上是不需要的，只有在你没有stop容器时，Ports才会有值，如果关闭了容器，就是null。当然如果你修改了也无所谓，因为重启容器后，就会被刷新。

## 4、保存、退出、重启容器
```shell
sudo systemctl restart docker.service # 重启docker服务
docker start nginx # 容器名 # 启动容器
```