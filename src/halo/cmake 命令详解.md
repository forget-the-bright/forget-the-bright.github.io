---
icon: edit
date: 2023-01-16
category:
  - 系统配置
  - cpp
tag:
  - CMake
headerDepth: 5
---


# cmake 命令详解
#### Cmake命令行使用:
```shell
-G 指明生成的Makefile 的生成器
-D 添加参数
-S 指明源码位置
-B 指明输出路径
-A 指定系统架构
-U 标志可用于取消设置变量
```
例如:
```
cmake -G "MinGW Makefiles" -S "源码路径" -B "输出路径"
```
或者
```
cmake -G "MinGW Makefiles" -DCMAKE_TOOLCHAIN_FILE="编译工具链路径" -S "源码路径" -B "输出路径"
```
**注意:Cmake是不支持中文的,无论是GUI还是命令行,都严禁出现中文字符.**


#### -G 命令详解
##### 一、介绍
CMake默认根据平台选择一个生成器。通常，默认生成器足以让用户继续构建软件。用户可以使用-G选项覆盖默认生成器:
```shell
$ cmake .. -G Ninja
```
1. cmake --help的输出包括一个可供用户选择的生成器列表。注意，生成器名称是区分大小写的
![image-1673858124577](https://local.wuanwanghao.top:9000/test/test/image-1673858124577.png)
2. 项目构建工具
类似make的工具有 ```Ninja``` 、```nmake``` 、```devenv（vs）```。
makefile 可以理解为是make工具使用的代码，make读取makefile中的配置信息来实现编译、链接和部署。
![image-1673858287897](https://local.wuanwanghao.top:9000/test/test/image-1673858287897.png)
##### -G 细节
在类Unix系统(包括Mac OS X)上，默认情况下使用Unix Makefiles生成器。该生成器的一个变体也可以在Windows的各种环境中使用，比如NMake Makefiles和MinGW Makefiles生成器。这些生成器生成一个Makefile变量，可以用make、gmake、nmake或类似的工具执行

而Visual Studio生成器可以针对不同的体系结构。可以使用-A选项指定目标架构:
```shell
cmake .. -G "Visual Studio 2019" -A x64
cmake .. -G "Visual Studio 16" -A ARM
cmake .. -G "Visual Studio 16 2019" -A ARM64
```
请注意，在第一次调用CMake之后，不可能使用-G来更改生成器。要更改生成器，必须删除构建目录，并且必须从头开始构建。
#### -D 命令详解
```
CMAKE_INSTALL_PREFIX  #设置构建完成的安装路径
CMAKE_TOOLCHAIN_FILE #编译工具链路径
CMAKE_PREFIX_PATH #搜索路径 dependent packages
CMAKE_MODULE_PATH #搜索其他 CMake 模块的路径
CMAKE_BUILD_TYPE #构建配置，例如 Debug或Release，确定调试/优化标志。这仅与单配置构建系统相关，例如Makefile和Ninja。用于 Visual Studio 和 Xcode 的多配置构建系统会忽略此设置。
BUILD_SHARED_LIBS #是否构建共享库而不是静态库add_library() 没有类型的命令
CMAKE_EXPORT_COMPILE_COMMANDS #生成compile_commands.json 用于基于 clang 的工具的文件
CMAKE_MAKE_PROGRAM #可以启动本机构建系统的工具。该值可能是可执行文件的完整路径，或者只是工具名称 如果它应该位于PATH. 
CMAKE_C_COMPILER #设置C的编译器
CMAKE_CXX_COMPILER #设置C++的编译器
```
CMAKE_MAKE_PROGRAM 属性值 和 -G 一般搭配使用 

如果 -G 指定了 ```Ninja```生成器  那么CMAKE_MAKE_PROGRAM 就要指定Ninja 所在位置 D:/Program Files/JetBrains/CLion 2022.1.3/bin/ninja/win/ninja.exe 但 如果 ninja.exe 在环境变量中可以不指定 或者只用写ninja的名字即可
