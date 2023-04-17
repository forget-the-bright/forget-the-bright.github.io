---
icon: edit
date: 2022-12-15
category:
  - 系统配置
  - Linux
tag:
  - mysql
headerDepth: 5
---


# MySQL每天定时备份
备份是容灾的基础，是指为防止系统出现操作失误或系统故障导致数据丢失，而将全部或部分数据集合从应用主机的硬盘或阵列复制到其它的存储介质的过程。而对于一些网站、系统来说，数据库就是一切，所以做好数据库的备份是至关重要的！

这里主要以本地磁盘为存储介质讲一下计划任务的添加使用，基本的备份脚本，其它存储介质只是介质的访问方式可能不大一样。

#### 1、查看磁盘空间情况：

既然是定时备份，就要选择一个空间充足的磁盘空间，避免出现因空间不足导致备份失败，数据丢失的恶果！ 

存储到当前磁盘这是最简单，却是最不推荐的；服务器有多块硬盘，最好是把备份存放到另一块硬盘上；有条件就选择更好更安全的存储介质；
```shell
df -h
```
2、创建备份目录：

上面我们使用命令看出/home下空间比较充足，所以可以考虑在/home保存备份文件；
```shell
cd /home
mkdir backupcd backup
```
#### 3、创建备份Shell脚本:

注意把以下命令中的DatabaseName换为实际的数据库名称； 
当然，你也可以使用其实的命名规则！
```shell
vi bkDatabaseName.sh
```
输入/粘贴以下内容：
```shell
#!/bin/bash
mysqldump -uusername -ppassword DatabaseName > /home/backup/DatabaseName_$(date +%Y%m%d_%H%M%S).sql
```


对备份进行压缩：
```shell
#!/bin/bash
mysqldump -uusername -ppassword DatabaseName | gzip > /home/backup/DatabaseName_$(date +%Y%m%d_%H%M%S).sql.gz
```
注意： 
把 username 替换为实际的用户名； 
把 password 替换为实际的密码； 
把 DatabaseName 替换为实际的数据库名；

#### 4、添加可执行权限：
```shell
chmod u+x bkDatabaseName.sh
```
添加可执行权限之后先执行一下，看看脚本有没有错误，能不能正常使用；
```shell
./bkDatabaseName.sh
```
#### 5、添加计划任务
检测或安装 crontab
确认crontab是否安装： 
执行 crontab 命令如果报 command not found，就表明没有安装

如时没有安装 crontab，需要先安装它，具体步骤请参考： 
CentOS下使用yum命令安装计划任务程序crontab 
使用rpm命令从CentOS系统盘安装计划任务程序crontab

添加计划任务
执行命令：
```shell
crontab -e
```
这时就像使用vi编辑器一样，可以对计划任务进行编辑。 
输入以下内容并保存：
```shell
*/1 * * * * /home/backup/bkDatabaseName.sh
```
具体是什么意思呢？ 
意思是每一分钟执行一次shell脚本“/home/backup/bkDatabaseName.sh”。

#### 6、测试任务是否执行

很简单，我们就执行几次“ls”命令，看看一分钟过后文件有没有被创建就可以了！

如果任务执行失败了，可以通过以下命令查看任务日志：
```shell
tail -f /var/log/cron
```
输出类似如下：
``` shell
Dec 15 10:00:01 loaclhost CROND[51208]: (root) CMD (/usr/lib64/sa/sa1 1 1)
Dec 15 10:01:01 loaclhost CROND[51441]: (root) CMD (run-parts /etc/cron.hourly)
Dec 15 10:01:01 loaclhost run-parts(/etc/cron.hourly)[51441]: starting 0anacron
Dec 15 10:01:01 loaclhost run-parts(/etc/cron.hourly)[51453]: finished 0anacron
Dec 15 10:01:01 loaclhost run-parts(/etc/cron.hourly)[51441]: starting mcelog.cron
Dec 15 10:01:01 loaclhost run-parts(/etc/cron.hourly)[51460]: finished mcelog.cron
Dec 15 10:10:01 loaclhost CROND[53628]: (root) CMD (/usr/lib64/sa/sa1 1 1)
Dec 15 10:16:58 loaclhost crontab[55380]: (root) BEGIN EDIT (root)
Dec 15 10:18:30 loaclhost crontab[55380]: (root) REPLACE (root)
Dec 15 10:18:30 loaclhost crontab[55380]: (root) END EDIT (root)
Dec 15 10:19:01 loaclhost crond[5673]: (root) RELOAD (/var/spool/cron/root)
Dec 15 10:19:01 loaclhost CROND[55906]: (root) CMD (/bak/bak_sql.sh)
Dec 15 10:19:01 loaclhost CROND[55905]: (root) MAIL (mailed 54 bytes of output but got status 0x007f#012)
Dec 15 10:20:01 loaclhost CROND[56148]: (root) CMD (/bak/bak_sql.sh)
Dec 15 10:20:01 loaclhost CROND[56149]: (root) CMD (/usr/lib64/sa/sa1 1 1)
Dec 15 10:20:01 loaclhost CROND[56146]: (root) MAIL (mailed 54 bytes of output but got status 0x007f#012)
```
