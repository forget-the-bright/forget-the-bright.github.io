---
icon: edit
date: 2023-02-19
category:
  - 系统配置
  - Java
headerDepth: 5
---


# java -jar 开启Debug 端口 ，idea 远程调试
命令
``` shell
java -jar -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005 [jar文件名]
```

idea 远程调试 
项目添加配置
![image-1676813267156](https://local.wuanwanghao.top:9000/test/test/image-1676813267156.png)
添加 Remote JVM Debug 配置
![image-1676813353259](https://local.wuanwanghao.top:9000/test/test/image-1676813353259.png)
指定项目地址 和端口 就可以愉快的远程调试了
![image-1676813399674](https://local.wuanwanghao.top:9000/test/test/image-1676813399674.png)
