---
icon: edit
date: 2022-10-01
category:
  - Kubernetes 
headerDepth: 5
---


# k8s 命令行命令
# 删除
  强制删除pod
  ``` 
kubectl delete pod <podName> -n <namespace> --force --grace-period=0
  ```