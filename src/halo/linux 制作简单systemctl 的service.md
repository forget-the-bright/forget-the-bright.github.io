---
icon: edit
date: 2023-04-04
category:
  - 系统配置
  - Linux
headerDepth: 5
---


# linux 制作简单systemctl 的service
在系统路径```/usr/lib/systemd/system/``` 下创建 ```服务名```.service 文件

下面frp.service模板
```toml
[Unit]
#描述
Description=MainFrpService
#在网络启动后执行Frp服务
After=network.target


[Service]
Type=simple
#以root权限运行
User=root
#停止时重启
Restart=on-abort
#启动命令
ExecStart=/wanghao/frps/frp_0.44.0_linux_amd64/frps -c /wanghao/frps/frp_0.44.0_linux_amd64/frps.ini   

[Install]
WantedBy=multi-user.target
```

创建好后就可以使用systemctl 命令来操作服务
```shell
#启动服务
ststemctl start frp
#重启服务
systemctl restart frp
#查看服务状态
systemctl status frp
#开启开机自启动
systemctl enable frp
```
