---
icon: edit
date: 2023-04-02
category:
  - 系统配置
  - Linux
tag:
  - crontab 
headerDepth: 5
---


# crontab linux 定时任务工具使用
### 使用
```
crontab: usage error: unrecognized option
usage:  crontab [-u user] file
        crontab [ -u user ] [ -i ] { -e | -l | -r }
                (default operation is replace, per 1003.2)
        -e      (edit user's crontab)
        -l      (list user's crontab)
        -r      (delete user's crontab)
        -i      (prompt before deleting user's crontab)
```
- -e 编辑和添加crontab
- -l 列出所有的定时任务
- -r 删除定时任务
- -i 删除用户crontab前提示

### crontab运行日志查看
有时候发现定时任务没有按预期执行，可以能过查看日志发现执行相关的问题。
一般来说 ，```crontab```的运行日志可以在```/var/log/cron.log```文件中。
如果没有```/var/log/cron.log```文件，试一下```/var/log/cron```
### crontab为什么有时候找不到日志？
需要通过配置打开crontab的日志记录功能。
通过以下方式开启crontab的日志记录功能。
```
sudo vim /etc/rsyslog.d/50-default.conf
cron.*  /var/log/cron.log #将cron前面的注释符去掉
#重启rsyslog
#sudo /etc/init.d/rsyslog restart
sudo service rsyslog restart   #重启rsyslog
sudo service cron restart     #重启cron程度
sudo service crond restart   #重启crond。 在有的系统中，定时任务程序名称是crond
```
### 选择-e 时的编辑器 修改系统默认编辑器
```
select-editor
```
nano 编辑器 虽然提示说好用 ，其实大家学习的时候大多用习惯vim  的编辑器了，我还是喜欢用vim
```
Select an editor.  To change later, run 'select-editor'.
  1. /bin/nano        <---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed
```