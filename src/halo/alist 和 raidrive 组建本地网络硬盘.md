---
icon: edit
date: 2023-04-11
category:
  - Linux
tag:
  - alist
  - raidrive 
headerDepth: 5
---


# alist 和 raidrive 组建本地网络硬盘
[alist 官网](https://alist.nn.ci/)
[raidrive 官网](https://www.raidrive.com/)

### 下载安装
[AList Release](https://github.com/Xhofe/alist/releases) 下载自己需要的版本

```bash
# 解压下载的文件，得到可执行文件：
tar -zxvf alist-xxxx.tar.gz
# 授予程序执行权限：
chmod +x alist
# 运行程序
./alist server
# 获得管理员信息
./alist admin
```

### 守护进程

使用任意方式编辑 `/usr/lib/systemd/system/alist.service` 并添加如下内容，其中 path_alist 为 AList 所在的路径

```ini
[Unit]
Description=alist
After=network.target
 
[Service]
Type=simple
WorkingDirectory=path_alist
ExecStart=path_alist/alist server
Restart=on-failure
 
[Install]
WantedBy=multi-user.target
```

然后，执行 `systemctl daemon-reload` 重载配置，现在你可以使用这些命令来管理程序：

- 启动: `systemctl start alist`
- 关闭: `systemctl stop alist`
- 配置开机自启: `systemctl enable alist`
- 取消开机自启: `systemctl disable alist`
- 状态: `systemctl status alist`
- 重启: `systemctl restart alist`

### raidrive 下载安装
windows 下
[raidrive 官网](https://www.raidrive.com/) 下载radrive 安装包安装

安装完成后
点击```添加``` 选择```NAS``` 选择```WebDAV``` 
根据需要添加是否时https  选择 不是就把 地址框的对勾取消
输入alist 地址 和端口
输入alist 账号 密码
![image-1681204409171](https://local.wuanwanghao.top:9000/test/test/image-1681204409171.png)

