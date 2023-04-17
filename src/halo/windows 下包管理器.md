---
icon: edit
date: 2023-04-05
category:
  - 系统配置
  - windows
tag:
  - chocolatey
  - pkgManger
  - winget
headerDepth: 5
---


# windows 下包管理器
# windows 下包管理器
- chocolatey
- winget
- Scoop
## chocolatey
chocolatey 并非微软官方的包管理器，但却是最受欢迎的包管理器
[chocolatey官网](https://chocolatey.org/)
[官方安装文档](https://docs.chocolatey.org/en-us/choco/setup)
[官方配置文档](https://docs.chocolatey.org/en-us/configuration)
### CMD 安装
```shell
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```
### powershell安装
```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
### 升级
```
choco upgrade chocolatey
```
### 卸载
#### 文件夹
Chocolatey 的大部分内容包含在C:\ProgramData\chocolatey或任何$env:ChocolateyInstall计算结果中。您可以简单地删除该文件夹。

- 笔记
您可以先备份子文件夹lib，bin以防万一您在删除 Chocolatey 时发现不良结果。请记住，并非每个 Chocolatey 包都是安装程序包，这些子文件夹中可能包含一些未安装的应用程序，这些应用程序可能会丢失。拥有备份将使您能够测试该方面。

#### 环境变量
有一些环境变量需要调整或删除。
- ChocolateyInstall
- ChocolateyToolsLocation
- ChocolateyLastPathUpdate
- PATH (will need updated to remove)
### 使用
使用巧克力
现在你的机器上有 Chocolatey（需要安装？），你可以运行几个命令。

查看命令参考。我们将使用安装命令。

让我们安装Notepad++。

以管理员身份打开命令行。
键入choco install notepadplusplus并按 Enter。
```
choco install notepadplusplus
```
>就是这样。非常简单但功能强大的小概念！
覆盖默认安装目录或其他高级安装概念
是的，我们通过使用安装参数来支持它 - 请参阅安装参数
如果您想将本机参数传递给安装程序，例如安装目录，您需要知道传递给该特定安装程序的静默参数，然后您可以在命令行或 packages.config 中指定它。

>如果它是 MSI，那么通常您可以通过-ia "INSTALLDIR=""D:\Program Files"""（对于 cmd.exe，对于 PowerShell 则不同）。查看如何传递选项/开关以了解有关传递引用值的细节。

>例如，Notepad++ 使用NSIS（NullSoft Scriptable Install System）安装程序。如果我们查看静默选项，我们会发现/D是我们影响安装目录的方式。所以我们会通过choco install notepadplusplus.install -ia 

>"'/D=E:\SomeDirectory\somebody\npp'"- 请注意，我们正在查看虚拟的特定包（尽管您也可以使用 notepadplusplus 执行相同的操作）。
有没有更好的办法？绝对，看到无处不在的安装目录开关！

## winget
[微软官方文档](https://learn.microsoft.com/zh-cn/windows/package-manager/)
[winget-GitHub](https://github.com/microsoft/winget-cli/releases)
winget 是微软官方的包管理器。虽没有chocolatey受欢迎，但还是可以的

### 安装
#### 应用商店安装
![image-1680681449718](https://local.wuanwanghao.top:9000/test/test/image-1680681449718.png)
#### 安装包安装
前往[winget-GitHub](https://github.com/microsoft/winget-cli/releases) 下载你需要安装版本的安装包 ```assest``` 下,文件后戳为 ```msixbundle``` 的安装包
下载完成后双击安装

### 使用
重新打开一个cmd 窗口
> install    安装给定的程序包
  show       显示包的相关信息
  source     管理程序包的来源
  search     查找并显示程序包的基本信息
  list       显示已安装的程序包
  upgrade    显示并执行可用升级
  uninstall  卸载给定的程序包
  hash       哈希安装程序的帮助程序
  validate   验证清单文件
  settings   打开设置或设置管理员设置
  features   显示实验性功能的状态
  export     导出已安装程序包的列表
  import     安装文件中的所有程序包
```
C:\Users\Hasee>winget --help
Windows 程序包管理器(预览) v1.5.441-preview
版权所有 (C) Microsoft Corporation。保留所有权利。

WinGet 命令行实用工具可从命令行安装应用程序和其他程序包。

使用情况: winget [<命令>] [<选项>]

下列命令有效:
  install    安装给定的程序包
  show       显示包的相关信息
  source     管理程序包的来源
  search     查找并显示程序包的基本信息
  list       显示已安装的程序包
  upgrade    显示并执行可用升级
  uninstall  卸载给定的程序包
  hash       哈希安装程序的帮助程序
  validate   验证清单文件
  settings   打开设置或设置管理员设置
  features   显示实验性功能的状态
  export     导出已安装程序包的列表
  import     安装文件中的所有程序包

如需特定命令的更多详细信息，请向其传递帮助参数。 [-?]

下列选项可用：
  -v,--version              显示工具的版本
  --info                    显示工具的常规信息
  -?,--help                 显示选定命令的帮助信息
  --wait                    提示用户在退出前按任意键
  --logs,--open-logs        打开默认日志位置
  --verbose,--verbose-logs  启用 WinGet 的详细日志记录
  --disable-interactivity   禁用交互式提示

可在此找到更多帮助: "https://aka.ms/winget-command-help"
```
## Scoop
Scoop 是一款Windows下的命令行软件管理工具
简单来说,他比winget更强大(只是不够本土化,winget的软件本土化做的要更好一些,但对我来说在环境管理方面,scoop也有不可替代性)

### 安装：
打开 PowerShell 终端 (version 5.1 or later) 然后 运行:
[项目地址github](https://github.com/ScoopInstaller/Scoop)
[安装文档github](https://github.com/ScoopInstaller/Install)
#### 非管理员安装
```shell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser #可选:第一次需要执行远程脚本
 irm get.scoop.sh | iex
```
#### 管理员安装
```
 irm get.scoop.sh -outfile 'install.ps1'
 .\install.ps1 -RunAsAdmin -ScoopDir 'D:\env\Scoop' -ScoopGlobalDir 'D:\env\Scoop' -NoProxy
```

#### 指定环境变量  
两者的值可以设为一致
```SCOOP``` 软件用户安装目录- 命令里 ScoopDir
```SCOOP_GLOBAL``` 软件的全局安装目录- 命令里 ScoopGlobalDir

### 使用
```
C:\Users\Hasee>scoop
Usage: scoop <command> [<args>]

Available commands are listed below.

Type 'scoop help <command>' to get more help for a specific command.

Command    Summary
-------    -------
alias      Manage scoop aliases
bucket     Manage Scoop buckets
cache      Show or clear the download cache
cat        Show content of specified manifest.
checkup    Check for potential problems
cleanup    Cleanup apps by removing old versions
config     Get or set configuration values
create     Create a custom app manifest
depends    List dependencies for an app, in the order they'll be installed
download   Download apps in the cache folder and verify hashes
export     Exports installed apps, buckets (and optionally configs) in JSON format
help       Show help for a command
hold       Hold an app to disable updates
home       Opens the app homepage
import     Imports apps, buckets and configs from a Scoopfile in JSON format
info       Display information about an app
install    Install apps
list       List installed apps
prefix     Returns the path to the specified app
reset      Reset an app to resolve conflicts
search     Search available apps
shim       Manipulate Scoop shims
status     Show status and check for new app versions
unhold     Unhold an app to enable updates
uninstall  Uninstall an app
update     Update apps, or Scoop itself
virustotal Look for app's hash or url on virustotal.com
which      Locate a shim/executable (similar to 'which' on Linux)
```

```
scoop install nodejs                                                    
Installing 'nodejs' (18.4.0) [64bit]                                            
node-v18.4.0-win-x64.7z (17.3 MB) [===================================] 100%    
Checking hash of node-v18.4.0-win-x64.7z ... ok.                                
Extracting node-v18.4.0-win-x64.7z ... done.                                    
Linking ~\scoop\apps\nodejs\current => ~\scoop\apps\nodejs\18.4.0               
Persisting bin                                                                  
Persisting cache                                                                
Running post_install script...                                                  
'nodejs' (18.4.0) was installed successfully!       
```
#### 安装缓慢 
可以指定环境变量 ```HTTP_PROXY``` 设置代理地址来加速

### 卸载

直接删除  ```SCOOP```  ```SCOOP_GLOBAL```  环境变量所指的文件夹 可以完全删除
