---
icon: edit
date: 2022-11-12
category:
  - 系统配置
  - Linux
tag:
  - linux
  - Arch
  - ArchLinux
headerDepth: 5
---


# ArchLinux 安装指南
### 准备工作
在开始安装 Arch Linux 之前，需要先下载安装映像文件并创建好虚拟机环境。
#### 下载安装镜像
下面是 Arch Linux 官方的安装文件下载地址：

[Arch Linux - Downloads](https://archlinux.org/download/) Arch Linux 安装映像下载地址。

点击并打开这个页面后，可以看到目前 Arch Linux 最新的版本和下载包的文件信息。往下翻页，在页面下方有各个国家可用的下载加速镜像。

选择距离自己所在位置最近的加速镜像可以有效提升安装包的下载速度，我们找到 "China"，然后选择其中一个任意可用的加速镜像地址，比如 163.com。
![image-1668233139961](https://local.wuanwanghao.top:9000/test/test/image-1668233139961.png)
点击镜像链接后，就会打开一个类似文件列表的页面，我们选择 iso 后缀的那个文件，直接点击文件名称进行下载操作。
![image-1668233216068](https://local.wuanwanghao.top:9000/test/test/image-1668233216068.png)
 创建虚拟机

VMWARE是一个开源免费的虚拟机软件。下载后安装，创建一个新的虚拟机，并把上面下载的 ISO 文件加载到启动光盘。

### 安装 Arch Linux
启动虚拟机，一切操作正常的话，开机后会看到如下画面
![image-1668233316725](https://local.wuanwanghao.top:9000/test/test/image-1668233316725.png)
通过上下方向键可以自由选择相关的菜单。选择第一项“Arch Linux Install medium (x86_64, BIOS)“，按回车键确认，进入 Arch Linux 的安装环境。
![image-1668233418977](https://local.wuanwanghao.top:9000/test/test/image-1668233418977.png)
#### 磁盘分区
开始正式安装系统前，需要先对硬盘做分区操作。这需要指定可操作的硬盘，可以通过以下命令来确定当前系统有哪些可用的硬盘设备：
```shell
fdisk -l
```
命令会返回类似如下的输出结果：
![image-1668233499398](https://local.wuanwanghao.top:9000/test/test/image-1668233499398.png)
其中 /dev/sda 就是一个可用的硬盘设备。记下这个名称，等下分区时会用的上。在正式开始分区前，需要先确定好分区规划。

对于正式使用的场景，我会建议你多参考一些 Linux 分区方案，可以使日后在磁盘的利用方面更加妥当。不过对于本文仅做体验的场景，我自己的方案如下：

1. 一个交换分区，大小为 1 GiB。
2. 最后所有的空间都留给根分区。
有了分区方案，输入以下命令开始分区操作：
```shell
fdisk /dev/sda
```
命令执行后，会进入如下界面:
![image-1668233910191](https://local.wuanwanghao.top:9000/test/test/image-1668233910191.png)
这就是 fdisk 提供的分区操作界面了，通过如下操作来创建一个 1 GiB 的交换分区：

1. 输入 n 新建分区。
2. 输入 p 新建主分区。
3. 分区编号输入 1。
4. 开始扇区不用输入，直接回车键进入下一项。
5. 结束扇区输入 +1G。
然后用同样的流程完成主分区的创建。这一步的分区号为 2，后面的扇区输入都保持空，然后直接回车键就可以了，程序会自动分配剩余的所有空间。

以上操作完成后，输入 w 写入分区信息。然后再次输入 fdisk -l 命令，会发现输出信息中多了如下内容:
![image-1668233994293](https://local.wuanwanghao.top:9000/test/test/image-1668233994293.png)


 这说明分区操作成功了。

#### 格式化分区
硬盘分区后，还需要做格式化操作。Linux 针对不同的分区类型，提供了有不同的格式化命令。首先来格式化交换分区：
```shell
mkswap /dev/sda1
```
主分区使用 ext4 格式的分区：
```shell
mkfs.ext4 /dev/sda2
```

#### 挂载分区
完成分区格式化后，接下来需要挂载分区。首先挂载根分区：
```shell
mount /dev/sda2 /mnt
```
然后启用交换分区：
```shell
swapon /dev/sda1
```

#### 安装系统
完成了以上磁盘操作步骤，就可以正式开始安装 Arch Linux 系统了。不过开始之前，为了提升安装包的下载速度，可以通过以下命令自动更新并保存 5 个速度最快的软件包镜像加速地址：
```shell
reflector \
    --save /etc/pacman.d/mirrorlist \
    --country China \
    --protocol https \
    --latest 5
```
然后安装基础软件包，Linux 内核，常见硬件的固件和常用软件工具：
```shell
pacstrap /mnt base linux linux-firmware dhcpcd  openssh xfsprogs man net-tools vim sudo networkmanager
```
等待安装完成。

结束后，生成新的自动挂载文件，并写入到新安装的系统：
``` shell
genfstab -U /mnt >> /mnt/etc/fstab
```
然后进入到新安装的系统：
```shell
arch-chroot /mnt
```
接下来，将开始对新系统做配置操作。

### 配置 Arch Linux
#### 配置网络
启用相关服务：
```shell
systemctl enable dhcpcd
systemctl enable NetworkManager
```
#### 配置时区
Arch Linux 默认为 UTC 时区，调整为国内时区使用下面的命令:
```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
配置本地字符编码
- 编辑 /etc/locale.gen 文件，取消 en_US.UTF-8 UTF-8 这一行前的注释信息。
- 执行 locale-gen 命令生成本地字符集信息。
- 创建 /etc/locale.conf 文件，内容为：LANG=en_US.UTF-8。

```使用 en_US.UTF-8 而不使用中文字符编码的原因是为了避免系统输出无法显示的中文信息，以方便排查问题。```

#### 配置用户
设置 root 账号密码：
```shell
passwd
```
添加新的普通用户，并加入到 wheel 用户组，以方便使用 sudo 命令来执行一些需要超级用户权限的操作：
```shell
useradd -m -G wheel -s /bin/bash zzxworld
```
```最后面的 zzxworld 是新用户名称，需要自己定义。```

#### 配置系统引导程序
安装 GRUB 启动加载器：
```shell
pacman -S grub
```
安装 GRUB 引导信息至指定的硬盘：
```shell
grub-install --recheck /dev/sda
```
生成并写入 GRUB 配置信息：
```shell
grub-mkconfig -o /boot/grub/grub.cfg
```


#### 登录新系统
完成以上步骤后，Arch Linux 的基础安装工作就完成了，可以尝试退出安装环境并进入新系统。

首先输入以下命令退出 chroot 环境：
```shell
exit
```
然后卸载之前挂载的分区：
```shell
umount -R /mnt
```
重新启动系统。
```shell
reboot
```
正常的话，应该会看到新的启动选项选择界面：

![image-1668234594711](https://local.wuanwanghao.top:9000/test/test/image-1668234594711.png)
 直接按回车键，就可以进入新安装的 Arch Linux 系统了。


