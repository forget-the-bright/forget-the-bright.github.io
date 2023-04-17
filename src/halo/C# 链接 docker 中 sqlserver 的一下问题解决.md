---
icon: edit
date: 2023-03-02
category:
  - .Net
headerDepth: 5
---


# C# 链接 docker 中 sqlserver 的一下问题解决

System.ComponentModel.Win32Exception (0x80090325): 证书链是由不受信任的颁发机构颁发的 这是远程链接的数据库中有不信任的证书。
windows 下出行此问题 在链接字符串中添加
```
Encrypt=True;TrustServerCertificate=True;
```

The login is from an untrusted domain and cannot be used with Int
egrated authentication.
出现此问题就是 使用的windows 身份认证登录和  sqlserver 认证登录同时使用了，确定一个把windows 身份认证登录 删掉
```
Trusted_Connection=True;
```