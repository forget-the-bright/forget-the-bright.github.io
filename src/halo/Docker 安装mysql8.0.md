---
icon: edit
date: 2021-09-15
category:
  - Docker
tag:
  - Docker
  - mysql
headerDepth: 5
---


# Docker 安装mysql8.0
### 一、写在前面
今天自己原本的mysql服务配置出了问题，刚好自己接触了容器技术，就想着自己使用docker重新部署一个mysql服务。

### 二、下载步骤
首先要获取mysql镜像（可以通过官网下载或者从公司的仓库获取），下面演示从官网下载步骤

#### 2.1 docker search mysql，可以看到搜索的结果，这个结果是按照一定的星级评价规则排序的。
![image.png](/upload/2021/09/image-6acf16e6457a48e49d80b7b1e6561073.png)
#### 2.2 docker pull mysql 拉取一个合适版本的mysql到本地服务器

### 三、启动镜像
```txt
-p 3307:3306：将容器的3307端口映射到主机的3306端口；

-v $PWD/mysql:/var/lib/mysql：将主机当前目录下的/mysql挂载到容器的/var/lib/mysql；

-e MYSQL_ROOT_PASSWORD=123456：初始化root用户的密码；

–name 给容器命名，test_mysql
-d 表示刚下载的镜像id
```
命令行如下：
```shell
docker run \
-p 3307:3306 \
--name mysql_3307 \
--privileged=true \
-v /wanghao/mysql_3307/conf.d:/etc/mysql/conf.d \
-v /wanghao/mysql_3307/logs:/logs \
-v /wanghao/mysql_3307/data:/var/lib/mysql \
-v /etc/localtime:/etc/localtime \
-v /wanghao/mysql_3307/mysql-files:/var/lib/mysql-files \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql
```

### 四、局域网无法访问数据库的方法
```sql
create user 'wanghao'@'%' identified with mysql_native_password by 'Wh*123456';
grant all privileges on *.* to 'wanghao'@'%';
```



注意：这里platform可以任意命名，表示赋予这个账户的权限，这里是赋予所有的权限
```sql
update user set host='%' where user='root';
alter user 'root'@'%' identified with mysql_native_password by 'root';
```
刷新权限：
```sql
mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
```

### 五、表名大小写问题
![image.png](/upload/2021/10/image-c13812355983466f952a08f36c406b63.png)

MySQL 上了 8 后，在 Linux 端，对于 lower_case_table_names 参数，只能在初始化的时候设置了，若初始化的时候没设置，那后面就傻愣愣了

示例：

当前本地已有环境设置为 lower_case_table_names = 1 了，将 lower_case_table_names 修改为 0 会发生什么。

测试版本
```shell
root [(none)]> select version();
+-----------+
| version() |
+-----------+
| 8.0.18    |
+-----------+
1 row in set (0.00 sec)
```
lower_case_table_names不是动态参数，将my.cnf 中 lower_case_table_names 改为 0

重启 mysql

查看错误日志
```log
2020-09-22T17:16:49.781973+08:00 1 [ERROR] [MY-011087] [Server] Different lower_case_table_names settings for server ('0') and data dictionary ('1').
2020-09-22T17:16:49.782401+08:00 0 [ERROR] [MY-010020] [Server] Data Dictionary initialization failed.
2020-09-22T17:16:49.782620+08:00 0 [ERROR] [MY-010119] [Server] Aborting
```
官方是这么说的

地址：https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html
![image.png](https://pic4.zhimg.com/v2-7f96160724c66388120bafc3ff3f6d1b_r.jpg)

所以，除非你是安装在 windows上或者可以确保开发人员实行规范建表等操作，不然就在初始化配置my.cnf时候就将 lower_case_table_names = 1 配置上去吧

#### docker 部署要大小写忽略只能 运行容器命令的时候加上了
```shell
docker run \
-p 3307:3306 \
--name mysql_3307 \
--privileged=true \
-v /wanghao/mysql_3307/conf.d:/etc/mysql/conf.d \
-v /wanghao/mysql_3307/logs:/logs \
-v /wanghao/mysql_3307/data:/var/lib/mysql \
-v /etc/localtime:/etc/localtime \
-v /wanghao/mysql_3307/mysql-files:/var/lib/mysql-files \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql --lower-case-table-names=1
```