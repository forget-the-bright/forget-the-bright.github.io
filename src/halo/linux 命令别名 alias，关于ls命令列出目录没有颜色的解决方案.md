---
icon: edit
date: 2023-04-10
category:
  - Linux
tag:
  - alias
headerDepth: 5
---


# linux 命令别名 alias，关于ls命令列出目录没有颜色的解决方案
一版来说安装ArchLinux  系统 使用 ls 命令列出目录是没有颜色的。
这是因为没有使用命令别名的原因。

实际上当我们使用 ```ls --color=auto``` 命令时是有颜色的
```shell 
ls --color=auto
```
这是因为 ArchLinux 发行版高度自由，所以很多的配置都没有给我做，所以像其他的发行版linux 系统都是有做命令别名的

所以在这里我们打开 环境配置文件 ```~/.bashrc``` 追加配置
```shell
alias ls='ls --color=auto'
```
>这里注意有一点 ```alias ls=``` 后面 不要带空格，直接紧挨着'ls --color=auto' ，不然也会把空格也当作成命令的一部分，无法识别