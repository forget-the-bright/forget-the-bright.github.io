---
icon: edit
date: 2023-04-06
category:
  - Linux
tag:
  - tar
  - zip
  - uzip
  - linux
headerDepth: 5
---


# zip unzip tar 命令使用
## tar 
tar命令参数前面加”-"与不加“-”的区别：

tar命令参数前面加不加“-”执行命令的结果是没有区别的，区别只要是在于linux风格方面，加“-”属于System V风格，不加“-”属于BSD风格，所以在使用tar命令的时候它的参数加不加“-”结果是一样的，看个人的使用方式；

### 常用参数：
tar命令的常用参数
>-z		是否同时具有gz属性
-j		是否同时具有bz2属性
-J		是否同时具有xz属性
-x		解压缩、提取打包的内容
-t		查看压缩包内容
-c		建立一个压缩，打包文档
-C		切换到指定目录，表示指定解压缩包的内容和打包的内容存放的目录
-v		显示压缩或者打包的内容
-f		使用文件名，在f后面要接压缩后的文件的名字，只要用到tar命令，-f选项是必须要用的，-f参数在使用的时候一定排在其他参数的后面，在最右边
-p		保留备份数据的原本权限与属性，常用于备份（-c）重要的配置文件
-P		保留绝对路径
### 打包
#### 普通打包
```
tar -cvf 压缩后的文件名.tar  要压缩的目录或文件
```
#### 压缩打包
##### -z  用于gzip压缩方式   文件名.tar.gz
```shell
tar -zcvf 压缩后的文件名.tar.gz  要压缩的目录或文件
```
##### -j 用于bzip2压缩方式  文件名.tar.bz2
```shell
tar -jcvf 压缩后的文件名.tar.bz2  要压缩的目录或文件
```
##### -J 用于xz压缩方式  文件名.tar.xz
```shell
tar -Jcvf 压缩后的文件名.tar.xz  要压缩的目录或文件
```
##### 压缩格式比较:
压缩速度：gz > bz2 > xz
压缩率：xz > bz2 > gz

#### 解压
```shell
#不知道压缩格式解压自动识别
tar -xvf  文件名.压缩格式自动识别
# 指定gz
tar-zxvf 文件名.tar.gz
# 指定bz2
tar-jxvf 文件名.tar.bz2
# 指定xz
tar-Jxvf 文件名.tar.xz
```

>在解压gz压缩方式压缩文件的时候并不需要加上``` -z ```，直接用参数-xf即可，另外两种压缩方式 ```-j``` 和 ```-J``` 在解压的时候一样，因为tar命令会自动选择，解压之后压缩文件还在，如果不指定解压出来的文件保存在哪里，那么会直接解压在当前目录

## zip

### 基本用法：

zip [参数] [压缩包名] [压缩的目录或者文件的路径]

### 常用参数：

zip命令的常用参数

>-m		将文件压缩后，删除原文件
-o		将压缩文件内的所有文件的最新变动时间设为压缩的时间
-q		安静模式，在压缩的时候不显示指令执行的过程
-r		递归压缩，将自定目录下的所有子文件以及文件一起处理
-x		”文件列表“，压缩时排除文件列表中的文件

### 使用
**1.正常压缩，不加-q选项，显示压缩的过程：**
```shell
zip -r 压缩后的文件名  目录
```
**2.加上-q选项，安静模式输出，不显示压缩的过程：**
```
zip -q -r 压缩后的文件名  目录
```
**3.压缩多个文件 因为压缩的全是文件，所以可以不用加上-r选项**
```
zip test.zip test1.txt  test2.txt  test3.txt 
```
**结果会将test1.txt  test2.txt  test3.txt 三个文件压缩进入 test.zip**

**4.压缩文件跟目录 因为压缩目标中包含目录 所以要加 -r**
```
zip -r test.zip test1.txt  test2.txt  test
```
**结果会将test1.txt  test2.txt 两个文件 和test目录 压缩进入 test.zip**

## unzip

### 基本用法：
unzip [参数] [压缩文件]  （-d [目录]）  //如果不是用括号里面的内容，则解压文件在当前工作目录

### 常用参数：
unzip命令的常用参数

>-c		将解压缩的结果显示到屏幕上（显示每一个目录下的每一个文件的内容），同时对字符做适当的转换，但是并没有解压压缩包
-l		显示压缩文件内所包含的文件
-t		检查压缩文件是否正确
-v		执行时显示压缩文件的详细信息
-q		安静模式，执行时不显示任何信息
-d		指定文件解压后存储的目录
-x		指定不要处理压缩文件中的那些文件

### 使用
**1.解压 并列出解压结果**
```shell
unzip -c test.zip
```
**2.列出zip 包里面的文件**
```shell
unzip -l test.zip
```
**3.检查压缩文件是否正确**
```shell
unzip -t test.zip
```
**4.不解压压缩文件查看压缩包里面的内容（查看显示的文件列表还包含压缩比率）**
```shell
unzip -v test.zip
```
**4.解压缩到指定文件**
```shell
unzip  test.zip -d /opt
```