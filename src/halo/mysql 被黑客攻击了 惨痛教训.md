---
icon: edit
date: 2022-06-20
category:
  - 系统配置
headerDepth: 5
---


# mysql 被黑客攻击了 惨痛教训
**今天鼓捣c++ 项目的时候 需要用下nacos 准备docker 安装个发现数据库被黑客攻击了太惨了，还好数据没丢只是 把我的root 权限给改了。
自己的mysql 密码太简单了，以后要把密码复杂化**
下面解决方法
先用本地用户登录mysql
赋予远程账号全部权限；
刷新配置；
修改远程账号密码
刷新配置；


```
mysql> grant  all on *.* to   root@'%'; 
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> ALTER USER 'root'@'%' IDENTIFIED BY 'xxxxxx';
Query OK, 0 rows affected (0.01 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
```