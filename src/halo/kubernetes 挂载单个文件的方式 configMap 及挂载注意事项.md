---
icon: edit
date: 2023-03-02
category:
  - Kubernetes 
headerDepth: 5
---


# kubernetes 挂载单个文件的方式 configMap 及挂载注意事项
**问题现象**

默认挂载 configMap 时，kubernetes 会覆盖掉挂载的整个目录，哪怕使用 items 也会导致整个目录被覆盖，那么如何实现挂在单个文件而不覆盖整个目录呢。下面说一下 kubernetes 中如何挂载单个文件而不是整个目录。

**解决方案**

使用 subPath
实际上 kubernets 本身提供了 volumeMounts.subPath 属性用于挂在单个文件而不是整个目录。

下面是一个示例：
```
apiVersion: v1
kind: Pod
metadata:
  name: my-lamp-site
spec:
    containers:
    - name: php
      image: php:7.0-apache
      volumeMounts:
      - mountPath: /var/www/html/index.php
        name: index
        subPath: index.php
    volumes:
    - name: index
      configMap:
        name: php-index
        items:
        - key: index.php
          path: index.php
```

kubesphere
![image-1677744922153](https://local.wuanwanghao.top:9000/test/test/image-1677744922153.png)
注意事项
需要注意的是：

如果使用ConfigMap的subPath挂载为Container的Volume，Kubernetes不会做自动热更新
ConfigMap 哪怕不使用subPath的挂载方式 C# 文件修改监听功能也没有触发，Golang 的正常，怀疑可能和自己的实现有关.
