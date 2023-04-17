---
icon: edit
date: 2023-02-14
category:
  - 系统配置
  - 内网穿透
headerDepth: 5
---


# PPTP/L2TP内外网VPN映射端口及协议
```
PPTP需开放端口：
UDP:1723
 
L2TP需开放端口：
UDP:500
UDP:4500
UDP:1701
 
注意：端口映射时应该将协议设置为UDP，否则无法生效
```