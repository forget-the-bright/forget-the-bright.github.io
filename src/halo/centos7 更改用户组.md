---
icon: edit
date: 2022-12-02
category:
  - 系统配置
  - Linux
headerDepth: 5
---


# centos7 更改用户组

```这里都是root权限下执行，你也可以加上sudo```
```shell
cat /etc/group
```
或者使用管道直接选出是否docker
```shell
cat /etc/group ｜ grep docker
```
如果出现docker就不用添加，有时会出现dockerroot，没做研究，我也添加docker用户组。
第二步添加docker用户组
```shell
groupadd docker
```
也可以指定用户组id（修改id就可以，不要和第一个查出来的id重复）
```shell
groupadd -g id docker
```
第三步把普通用户添加docker用户组
```shell
gpasswd -a 普通用户名 docker
```
第四 更新用户组
```shell
newgrp docker
```