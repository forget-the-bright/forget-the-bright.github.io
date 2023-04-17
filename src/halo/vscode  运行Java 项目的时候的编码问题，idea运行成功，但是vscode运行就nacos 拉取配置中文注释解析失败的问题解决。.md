---
icon: edit
date: 2023-03-15
category:
  - 系统配置
  - Java
headerDepth: 5
---


# vscode  运行Java 项目的时候的编码问题，idea运行成功，但是vscode运行就nacos 拉取配置中文注释解析失败的问题解决。
最近尝试再用vscode 在跑项目，意外的觉得很好用，简洁。尝试命令行跑项目有种很棒的感觉。但是今天有个新项目在跑的时候却出现了个很头疼的问题。
 就是项目运行的的时候要去nacos 拉取配置，但是就是解析报错，很纳闷，就是idea 运行就没有问题。我对比两者运行时候的命令发现，idea 在运行期间
 jvm 参数多了 -Dfile.encoding=UTF-8 文件编码指定了 UTF-8 🤣,无语了。
 以下是在vscode 中启动项目追加 jvm 参数的方式
 
 ```json
 {
     "spring-boot.ls.java.vmargs": [
        "-Dfile.encoding=utf-8"
     ],
    "java.debug.settings.vmArgs": "-Dfile.encoding=UTF-8",
}
 ```