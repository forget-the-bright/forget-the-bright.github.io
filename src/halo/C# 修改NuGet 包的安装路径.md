---
icon: edit
date: 2023-02-09
category:
  - .Net
headerDepth: 5
---


# C# 修改NuGet 包的安装路径
NuGet 是 .NET 平台下的一个免费、开源的包管理开发工具。

修改全局包管理目录
通过 NuGet 安装包时，NuGet 先将包下载至一个统一的目录，默认路径是：C:\Users\用户名\.nuget\packages

下载的包多了以后，会导致 C 盘空间被大量占用。我们可以通过修改配置将其指定到自定义的目录下。

搜索 NuGet.Config 文件，默认位置是：C:\Users\用户名\AppData\Roaming\NuGet，在根节点下添加如下配置：
``` xml
 <config>
	<add key="globalPackagesFolder" value="D:\env\nuget\packages" />
  </config>
```
其中添加 value  修改为要保存的位置 如果不生效可以修改下在电脑的 C:\Program Files (x86)\NuGet\Config 下有一个 ```Microsoft.VisualStudio.Offline.config``` 文件 添加同样的配置

