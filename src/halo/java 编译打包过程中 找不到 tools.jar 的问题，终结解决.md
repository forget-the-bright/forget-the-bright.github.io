---
icon: edit
date: 2023-02-19
category:
  - 系统配置
  - Java
headerDepth: 5
---


# java 编译打包过程中 找不到 tools.jar 的问题，终结解决
>    jdk 1.8 中有个tools.jar，里面提供了很多便于开发的工具，但是由于其是在sun 工作接管Java是开发的，不受到甲骨文公司的欢迎，在后续的版本中已经移除了tools.jar  所以之后的Java配置环境变量的时候已经不再配置CLASSPATH 了
>    但是有时候在开发中用到tools.jar 的时候，发现在编译过程中 javac 命令是不会去读取CLASSPATH 的jar 去编译的， 网上有好多解决方法，放到jre 的lib 里面但是问题无法解决的
>     因为是sun 公司开发的，oracle 在引用的这些jar的时候是当作扩展去加载的
 只要把tools.jar 放入 jre目录lib 下的ext 扩展类目录就可以在Javac 编译是加载读取
