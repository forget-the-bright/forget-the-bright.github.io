---
icon: edit
date: 2023-03-15
category:
  - 系统配置
  - Linux
headerDepth: 5
---


# linux 查看磁盘使用情况，查看文件夹及文件大小命令
##### ```df -h``` 查看磁盘使用情况
```shell
df -h
```
![image-1678871170294](https://local.wuanwanghao.top:9000/test/test/image-1678871170294.png)

##### ```du -h --max-depth=1```  列出当前文件夹下 深度为 1 的文件夹大小 
```shell
du -h --max-depth=1
```
![image-1678871267580](https://local.wuanwanghao.top:9000/test/test/image-1678871267580.png)
max-depth=1，表示几级子目录，如果不需要子目录，=0 ，即可 

##### ```du -h “文件名”``` 列出当前文件的大小
```shell
du -h “文件名”
```
![image-1678871356607](https://local.wuanwanghao.top:9000/test/test/image-1678871356607.png)