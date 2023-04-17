---
icon: edit
date: 2023-03-06
category:
  - 系统配置
headerDepth: 5
---


# mongodb及使用
## 一、mongoDB是什么？
MongoDB是一个NoSQL的非关系型数据库 ，支持海量数据存储，高性能的读写。

### 1. mongo的体系结构
![image-1678084882505](https://local.wuanwanghao.top:9000/test/test/image-1678084882505.png)
mongo中的集合相当于mysql中表的概念；
mongo中的文档相当于mysql中行的概念；
mongo中的域相当于mysql中字段/列的概念；
### 2. mongoDB的特点(或使用场景)
支持存储海量数据；(例如：直播中的打赏数据)；
支持频繁的数据读写；（例如：游戏道具）；
数据安全性不高，存在数据误差(丢失数据)；
mongoDB不支持多表操作，不支持事务；
mongoDB使用Bson存储格式，支持动态字段管理；
### 3. mongoDB与mysql、redis对比
与redis对比
1. redis纯内存数据库，内存不足时触发淘汰策略，mongoDB使用内存加磁盘的存储策略具有高扩展性；
2. mongoDB使用Bson存储格式，支持动态字段管理方便扩展；
与mysql对比
1. mongoDB不支持多表操作，不支持事务；
2. mongoDB使用Bson存储格式，支持动态字段管理；
查询效率对比
Redis > MongoDB > MySQL

### 4. mongoDB存储原理
![image-1678084900902](https://local.wuanwanghao.top:9000/test/test/image-1678084900902.png)
mongoDb采用内存加磁盘的方式存储数据；
mongoDb支持数据分片，当单一的服务器中磁盘不够用的时候，还可以串联其他服务器；
客户端的请求到达内存时，先在日志中记录下操作记录，然后再去操作内存；
内存中的日志每10ms向磁盘中的日志进行同步一次，数据则每分钟同步一次；
客户端先去内存中查询数据，内存中没有再去查询磁盘；
当客户端写入的时候，会先写入到内存中，内存中写入后请求直接返回，内存中的数据会根据同步策略同步到磁盘；
如果机器宕机，在重启服务的时候会解析磁盘中的日志和磁盘中的数据进行对比，将未入到磁盘中的数据写入磁盘，但可能会丢失10ms的数据；


## 二、使用docker安装mongo

### 1.安装
1.拉取mongo镜像
``` shell
docker pull mongo:4.4
```

2.创建mongo数据持久化目录
``` shell
mkdir -p /docker_volume/mongodb/data
```
3.运行容器
``` shell
docker run -d --name mongo -v /docker_volume/mongodb/data:/data/db -p 27017:27017 mongo:4.4 --auth --bind_ip 0.0.0.0
```
–auth：需要密码才能访问容器服务
--bind_ip 0.0.0.0 监听从所有ip请求来的流量
相关命令行参数 请参照官方文档  [mongod](https://www.mongodb.com/docs/manual/reference/program/mongod/#cmdoption-mongod-auth)


### 2.创建用户
登录mongo容器，并进入到【admin】数据库
```
docker exec -it mongo mongo admin
```
创建一个用户，mongo 默认没有用户
db.createUser({ user:'root',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},'readWriteAnyDatabase']});

```【user:‘root’ 】：设置用户名为root```
```【pwd:‘123456’】：设置密码为123456```
```【role:‘userAdminAnyDatabase’】：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限```
```【db: ‘admin’】：可操作的数据库```
```【‘readWriteAnyDatabase’】：赋予用户读写权限 ```

dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
### 3. 连接、测试
连接mongo数据库
 ```shell
db.auth('root', '123456')
 ```
 测试数据库 创建集合
 ```shell
 db.createCollection("user")
 ```
测试数据库，插入一条语句
 ```shell
 db.user.insert({"name":"zhangsan","age":18})
 ```
测试数据库，查询刚才插入的语句
 ```shell
 db.user.find()
  ```
###  4.修改密码
#### 1、首先通过以下命令登录mongodb数据库。

show dbs          查看数据库

use dbname      进入数据库

show users        查看当前数据库用户权限据。

#### 2、使用以下方法修改密码即可。

方法1：
 ```shell
db.changeUserPassword("usertest","changepass");
  ```
方法2：
 ```shell
db.updateUser("usertest",{pwd:"changepass1"})；
  ```
  

