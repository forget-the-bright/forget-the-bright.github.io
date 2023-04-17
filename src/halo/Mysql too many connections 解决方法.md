---
icon: edit
date: 2022-10-13
category:
  - mysql
tag:
  - mysql
headerDepth: 5
---


# Mysql too many connections 解决方法
最近写javaee项目的时候，mysql报了too many connections的错误，百度的内容有一些有问题，所以我重新写一下我的解决方法。

1. mysql -u root -p 回车输入密码进入mysql                                                                                                  
![image.png](/upload/2022/10/image-6007218e54be45fd990f719385c892fd.png)

2. show processlist; 
查看连接数，可以发现有很多连接处于sleep状态，这些其实是暂时没有用的，所以可以kill掉

3. show variables like "max_connections"; 
查看最大连接数，应该是与上面查询到的连接数相同，才会出现too many connections的情况

4. set GLOBAL max_connections=1000; 
修改最大连接数，但是这不是一劳永逸的方法，应该要让它自动杀死那些sleep的进程。
show global variables like 'wait_timeout'; 

5. 这个数值指的是mysql在关闭一个非交互的连接之前要等待的秒数，默认是28800s
set global wait_timeout=300; 

6. 修改这个数值，这里可以随意，最好控制在几分钟内
![image.png](/upload/2022/10/image-08ad270052c547b09de075eb23063f2f.png)                                                                                                     

7. set global interactive_timeout=500; 
修改这个数值，表示mysql在关闭一个连接之前要等待的秒数，至此可以让mysql自动关闭那些没用的连接，但要注意的是，正在使用的连接到了时间也会被关闭，因此这个时间值要合适

8. 批量kill之前没用的sleep连接，在网上搜索的方法对我都不奏效，因此只好使用最笨的办法，一个一个kill
select concat('KILL ',id,';') from information_schema.processlist where user='root'; 先把要kill的连接id都查询出来
复制中间的kill id;内容到word文档
替换掉符号“|”和回车符（在word中查询^p即可查询到回车符）
把修改过的内容复制回终端，最后按回车执行！