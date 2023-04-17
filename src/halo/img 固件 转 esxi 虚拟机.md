---
icon: edit
date: 2022-11-14
category:
  - exsi
  - 系统配置
tag:
  - VMDK
  - 虚拟机
  - 软路由
  - ESXI
  - img
  - 固件
headerDepth: 5
---


# img 固件 转 esxi 虚拟机
#### 一、环境介绍

- ESXi版本：6.5.0 (Build 4887370)
- iStoreOS版本：istoreos-21.02.3-2022102715-x86-64-squashfs-combined.img.gz（[koolcenter下载](https://fw.koolcenter.com/iStoreOS/)）
- StarWind V2V Image Converter 链接: https://pan.baidu.com/s/1Fe6yI42Zz9d_Q7aUhGe1FQ 提取码: 5vmv
#### 二、创建虚拟机
- 1、点击“创建/注册虚拟机”，选择”创建新虚拟机“，点击“下一页”
![image-1668393862646](https://local.wuanwanghao.top:9000/test/test/image-1668393862646.png)
- 2、名称输入”istoreos“，兼容性默认”ESXi 6.5 虚拟机“即可，客户机操作系统系列选择”Linux“，客户机操作系统版本选择”其他 3.x 或更高版本的 Linux（64位）或 Linux（64位） “，点击“下一页”
![image-1668393923004](https://local.wuanwanghao.top:9000/test/test/image-1668393923004.png)
- 3、选择存储，一般默认即可，点击“下一页”
 ![image-1668393995698](https://local.wuanwanghao.top:9000/test/test/image-1668393995698.png)
- 4、CPU和内存按实际情况设置即可，删除硬盘，删除SATA控制器，点击“下一页”
![image-1668394055610](https://local.wuanwanghao.top:9000/test/test/image-1668394055610.png)
- 5、配置列表，点击“完成”即可
![image-1668394170762](https://local.wuanwanghao.top:9000/test/test/image-1668394170762.png) 
#### 三、IMG转换VMDK磁盘
- 1、打开StarWindConverter，默认Local file Next
![image-1668394528151](https://local.wuanwanghao.top:9000/test/test/image-1668394528151.png)
- 2、选择iStore_OS 的 img固件  点击Next
 ![image-1668394591914](https://local.wuanwanghao.top:9000/test/test/image-1668394591914.png)
- 3、选择 VMware ESX server image 点击Next
 ![image-1668394666511](https://local.wuanwanghao.top:9000/test/test/image-1668394666511.png)
- 4、生成 VMDK 名字要和虚拟机名称一致 点击Next
![image-1668394754586](https://local.wuanwanghao.top:9000/test/test/image-1668394754586.png)
#### 四 、上传vmdk ,并启动iStore OS
- 1、sftp上传或者数据文件浏览器上传 istoreos.vmdk ，再上传 istoreos -flat.vmdk
 ![image-1668394919596](https://local.wuanwanghao.top:9000/test/test/image-1668394919596.png)
 #### 五、启动虚拟机，修改ip 访问
- 1、启动虚拟机 修改ip查看官方文档 修改成exsi绑定网卡同段以便访问,参照pve虚拟机配置ip即可 [地址](http://doc.linkease.com/zh/guide/istoreos/install_pve.html#pve-%E5%AE%89%E8%A3%85)
![image-1668395096359](https://local.wuanwanghao.top:9000/test/test/image-1668395096359.png) 
- 2、访问 默认密码password
![image-1668395483119](https://local.wuanwanghao.top:9000/test/test/image-1668395483119.png)
