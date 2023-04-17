---
icon: edit
date: 2023-02-15
category:
  - 系统配置
headerDepth: 5
---


# windows 开始和关闭休眠模式，更换休眠文件保存位置
cmd 管理员模式执行命令
```cmd
powercfg -h off 关闭休眠模式 ，并删除休眠文件
powercfg -h on 开启休眠模式
```

使用“windows+R”组合键进入运行，输入“regedit”命令。
![1676471193767](https://local.wuanwanghao.top:9000/test/test/1676471193767.png)
进入 ```计算机\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\BackupRestore\FilesNotToBackup```

ControlSet001 可能有多个  ControlSet002  ControlSet003 。。。有的话就全部修改
将FilesNotToBackup下的Power Management 项值从```\hiberfil.sys```修改为```盘符:\hiberfil.sys```
![image-1676471336708](https://local.wuanwanghao.top:9000/test/test/image-1676471336708.png)