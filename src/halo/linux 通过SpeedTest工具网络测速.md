---
icon: edit
date: 2022-11-02
category:
  - Linux
tag:
  - 网络
headerDepth: 5
---


# linux 通过SpeedTest工具网络测速
### 下载工具
```shell
wget -O speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py
```
### 赋予执行权限
```shell
chmod +x speedtest-cli
```
### 执行
```shell
./speedtest-cli --share
```
![image](https://local.wuanwanghao.top:9000/test/test/image.png)

### 查看所有国内测试节点
```shell
./speedtest-cli --list | grep China
```
![image-1667377461538](https://local.wuanwanghao.top:9000/test/test/image-1667377461538.png)
### 指定测试节点测试
```shell
./speedtest-cli --server=41910 --share
```
![image-1667377603338](https://local.wuanwanghao.top:9000/test/test/image-1667377603338.png)

