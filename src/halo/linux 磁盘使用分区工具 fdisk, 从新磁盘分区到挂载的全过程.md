---
icon: edit
date: 2023-04-09
category:
  - Linux
headerDepth: 5
---


# linux 磁盘使用分区工具 fdisk, 从新磁盘分区到挂载的全过程
### fdisk
fdisk命令的英文全称是“Partition table manipulator for Linux”，即作为磁盘的分区工具。进行硬盘分区从实质上说就是对硬盘的一种格式化， 用一个形象的比喻，分区就好比在一张白纸上画一个大方框，而格式化好比在方框里打上格子。
| 参数 | 详情                                                                 |
| ---- | -------------------------------------------------------------------- |
| -b   | 指定每个分区的大小                                                   |
| -l   | 列出指定的外围设备的分区表状况                                       |
| -s   | 将指定的分区大小输出到标准输出上，单位为区块                         |
| -u   | 搭配”-l”参数列表，会用分区数目取代柱面数目，来表示每个分区的起始地址 |
| -v   | 显示版本信息                                                         |
|  ...    |               ...                                                       |
### 查看磁盘信息
首先使用 fdisk -l 查看系统挂载磁盘设备信息
一般sata 磁盘设备 名称 是```/dev/sda``` 或者``` /dev/sdb```
找到你新添加磁盘设备

### 开始分区
假设你新添加磁盘设备 设备名称为/dev/sdb
```shell
fdisk /dev/sdb
```
然后输入m 打开详细详细
```
欢迎使用 fdisk (util-linux 2.23.2)。

更改将停留在内存中，直到您决定将更改写入磁盘。
使用写入命令前请三思。


命令(输入 m 获取帮助)：m
命令操作
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   g   create a new empty GPT partition table
   G   create an IRIX (SGI) partition table
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)
```
### 创建分区，指定分区大小
1.然后输入 n 创建新的分区 ，磁盘默认可以创建的分区为4个
2.根据提示输入要创建的分区号 1....4 
3.默认为1  直接回车 或者 输入1 即可
4.输入分区大小，默认为磁盘容量最多值 ，可以输入+1G .... 指定容量为1G 也可以自定义指定大小 ```+?G``` ?号代表 容量大小 。 确定好直接回车
5.输入w 保存分区设置并退出

### 格式化分区文件系统
>上一步保存好分区设置后可以使用 fdisk -l 查看分区信息 ，如果没有可以使用 ```partprobe 磁盘设备名称``` 命令 来通知内核系统，请求操作系统重新加载分区表。
```shell
partprobe /dev/sdb
```
一般来说centos 系统的文件系统类型为 xfs 和 ext4 这里使用xfs 进行格式化
```shell
mkfs.xfs /dev/sdb1
```

### 挂载分区
1.这里默认创建的分区为 ```/dev/sdb1```  使用mount 命令挂载分区到指定目录
>这里有一点要注意，如果要挂载的目录里面有数据，需要备份到其他目录里面，等挂载完成后重新移动过来 这里假设挂载的目录为 /wanghao, 我们重命名文件夹 然后再次创建文件夹 来挂载
```shell
mv /wanghao /wanghao/bak
mkdir /wanghao
mount /dev/sdb1 /wanghao
cp -r /wanghao_bak/* /wanghao/
rm -rf /wanghao_bak
```
当然如果挂载的空目录上可以直接挂载 假设/wanghao 是空目录
```shell
mount /dev/sdb1 /wanghao
```
### 取消挂载命令为 umount 如果有问题可以取消挂载
```shell 
umount /wanghao
```
### mount 是临时挂载命令 这里进行持久化挂载，
vim  /etc/fstab 命令，编辑 fstab 文件，在最后一行添加一条记录，如 /dev/sdb1 /wanghao xfs defaults 0 0 ，保存并退出
```
vim  /etc/fstab
#输入i 进入编辑模式 ，找到空行进行输入
/dev/sdb1 /wanghao xfs defaults 0 0
#输入完毕后 按ESC键 ，然后输入 :wq 即可保存并退出
```


### lsblk
查看当前系统挂载的硬盘信息 并列出所有的硬盘设备

### partprobe 命令

partprobe命令用于重读分区表，将磁盘分区表变化信息通知内核，请求操作系统重新加载分区表。如果删除文件后，仍然提示占用空间，可以用partprobe在不重启的情况下重读分区 。
	
|参数 |详情|
|-------|-------|
|-d |不更新内核|     
|-s |显示摘要和分区|
|-h |显示帮助信息|
|-v |显示版本信息|
### 文件系统
> Linux 的文件系统取决于它的发行版。一般来说，基于 Red Hat 的发行版（如 CentOS、Fedora、RHEL 等）使用 xfs 或 ext4 文件系统，基于 Debian 的发行版（如 Ubuntu、Mint、Debian 等）使用 ext4 文件系统，基于 Arch Linux 的发行版（如 Manjaro、Arch Linux 等）使用 ext4 或 btrfs 文件系统.