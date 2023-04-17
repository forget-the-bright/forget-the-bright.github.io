---
icon: edit
date: 2023-01-09
category:
  - GoLang
  - 系统配置
tag:
  - GoLang
headerDepth: 5
---


# go get 遇到缓存问题解决
#### go get 遇到缓存问题解决
接手公司边缘计算项目的时候遇到的问题。公司项目包路径需要修改
当修改完重新go get 的时候，项目引入的依赖包还是旧的没有修改的
，进入GOPATH 删除了那个包，再去
```shell
go mod tidy
```
发现下的包还是旧的。重复几次依旧不行，这时候想到了go 使用git 命令去下的包，那我是不是可以清理下git 缓存呢，尝试后已经不行。最后发现自己漏了一点，就在眼皮底下 
![image-1673255828821](https://local.wuanwanghao.top:9000/test/test/image-1673255828821.png)
GOPATH 下是有个cache 目录的 ，进入删除vcs 文件夹 和 download 里面相应的包，再去go get 问题就解决了
![image-1673255908474](https://local.wuanwanghao.top:9000/test/test/image-1673255908474.png)
**当然也有命令可以删除**
```shell
# 下载包
go get -u go clean -i github.com/werbenhu/go-tools
 
# 清理包
go clean -i github.com/werbenhu/go-tools...
 
# 清理全部包
go clean --modcache
 
```
