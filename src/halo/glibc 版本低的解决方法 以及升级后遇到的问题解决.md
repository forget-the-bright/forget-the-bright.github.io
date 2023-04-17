---
icon: edit
date: 2023-04-11
category:
  - Linux
headerDepth: 5
---


# glibc 版本低的解决方法 以及升级后遇到的问题解决
centos 升级gcc 环境
```shell
yum -y install centos-release-scl
yum -y install devtoolset-8-gcc devtoolset-8-gcc-c++ devtoolset-8-binutils
scl enable devtoolset-8 bash
echo "source /opt/rh/devtoolset-8/enable" >>/etc/profile
yum install -y bison
```
升级make
```shell
wget http://ftp.gnu.org/gnu/make/make-4.2.tar.gz
tar -xzvf make-4.2.tar.gz
cd make-4.2
sudo ./configure
sudo make
sudo make install
sudo rm -rf /usr/bin/make
sudo cp ./make /usr/bin/
make -v
```
升级glibc
```shell
cd /wanghao/glibc
wget https://mirror.bjtu.edu.cn/gnu/libc/glibc-2.28.tar.xz --no-check-certificate
tar -xf glibc-2.28.tar.xz
cd glibc-2.28/
mkdir build
cd build
sudo ../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make  -j 8   #make 运行时间较长 开启多线程任务编译 开启数量 8
make install
```
查看环境中所有GLIBC
```shell
ls -la /lib64/libc.so.6
strings /lib64/libc.so.6 |grep GLIBC
```

## 问题解决
### 升级libc后导致中文乱码
如果编译目录没有删除 ，则进入glibc的编译目录，也就是build目录
```
make localedata/install-locales
```
再次执行 locale 这时应该已经正常了
但是如果你已经删除了编译glibc的build目录或者不知道build的目录在哪里
查看 locale-archive 归档文件目录
```
strings /lib64/libc-2.28.so | grep locale-archive
```
查看```目标``` 结果中有没有 locale-archive

没有就将/usr/lib/locale/locale-archive 软连接到目标位置
```
ln -s /usr/lib/locale/locale-archive  目标
```