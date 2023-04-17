---
icon: edit
date: 2021-10-16
category:
  - Docker
  - Linux
tag:
  - Docker
  - linux
headerDepth: 5
---


# Linux 安装 Docker

# centos下安装docker
> 其他系统参照如下文档

https://docs.docker.com/engine/install/centos/
## 1、移除以前docker相关包
```  shell
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

## 2、配置yum源
``` shell
sudo yum install -y yum-utils
sudo yum-config-manager \
--add-repo \
http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

## 3、安装docker
``` shell
sudo yum install -y docker-ce docker-ce-cli containerd.io


#以下是在安装k8s的时候使用
yum install -y docker-ce-20.10.7 docker-ce-cli-20.10.7  containerd.io-1.4.6
```

## 4、启动
```
systemctl enable docker --now #--now 立即执行
```

## 5、配置加速
这里额外添加了docker的生产环境核心配置cgroup
``` json
sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://82m9ar63.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

sudo systemctl daemon-reload

sudo systemctl restart docker
```
