---
icon: edit
date: 2021-11-17
category:
  - Docker
tag:
  - rocket-mq
headerDepth: 5
---


# docker 部署 rocket-mq
# docker 安装rocketmq

## 拉取镜像
```shell
docker pull foxiswho/rocketmq:server-4.4.0 
docker pull foxiswho/rocketmq:broker-4.4.0
```

## 创建数据挂载目录
```shell
mkdir -p /wanghao/rocketmq/server/logs
mkdir -p /wanghao/rocketmq/server/store
mkdir -p /wanghao/rocketmq/broker/logs
mkdir -p /wanghao/rocketmq/broker/store
mkdir -p /wanghao/rocketmq/broker/conf
```
## 编辑配置文件
```shell
vi /wanghao/rocketmq/broker/conf/broker.conf
```
### broker.conf
```conf
namesrvAddr=服务器ip:9876
brokerClusterName = DefaultCluster
brokerName = broker-a
brokerId = 0
deleteWhen = 04
fileReservedTime = 48
brokerRole = ASYNC_MASTER
flushDiskType = ASYNC_FLUSH
brokerIP1 = 服务器ip
listenPort=10911
```

## 创建容器
### server
```shell
docker run -p 9876:9876 \
--name rocketmq-server \ 
-e "JAVA_OPT_EXT=-server -Xms128m -Xmx128m -Xmn128m" \ 
-e "JAVA_OPTS=-Duser.home=/opt" \ 
-v /software/rocketmq/server/logs:/opt/logs \ 
-v /software/rocketmq/server/store:/opt/store \ 
foxiswho/rocketmq:server-4.4.0
```
### broker
```shell
docker run -it -d \  
-p 10909:10909 \ 
-p 10911:10911 \ 
--name rocketmq-broker \ 
-e "JAVA_OPT_EXT=-server -Xms128m -Xmx128m -Xmn128m" \ 
-e "JAVA_OPTS=-Duser.home=/opt" \ 
-v /software/rocketmq/broker/conf/broker.conf:/etc/rocketmq/broker.conf \ 
-v /software/rocketmq/broker/logs:/opt/logs \ 
-v /software/rocketmq/broker/store:/opt/store \ 
--privileged=true \ 
foxiswho/rocketmq:broker-4.4.0
```
## 部署RocketMQ的管理工具
```RocketMQ提供了UI管理工具，名为rocketmq-console，我们选择docker安装```
### 拉取镜像 
```shell
docker pull styletang/rocketmq-console-ng:1.0.0
```
### 启动容器 
```shell
docker run -d \  
--name rocketmq-admin \ 
-e "JAVA_OPTS=-Drocketmq.namesrv.addr=10.10.5.124:9876; -Dcom.rocketmq.sendMessageWithVIPChannel=false" \ 
-p 18080:8080 \ 
-t styletang/rocketmq-console-ng:1.0.0
```

![image.png](/upload/2021/11/image-883f047266bc4531af1eb96e1b588a8e.png)