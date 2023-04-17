---
icon: edit
date: 2023-03-31
category:
  - .Net
tag:
  - EF Core
  - dotnet-cli
headerDepth: 5
---


# EF Core 工具 命令行工具-非包管理器的控制台工具（Entity Framework Core tools reference - .NET Core CLI）
### 安装工具

```shell
dotnet tool install --global dotnet-ef
```
若要将它用作本地工具，请使用工具清单文件恢复声明为工具依赖项的项目的依赖项。

使用下列命令更新工具：
```shell
dotnet tool update --global dotnet-ef
```

在将工具用于特定项目之前，需要将 Microsoft.EntityFrameworkCore.Design 添加到该项目中。
```shell
dotnet add package Microsoft.EntityFrameworkCore.Design
```


### 验证安装
运行以下命令，验证是否已正确安装 EF Core CLI 工具：

```shell
dotnet ef
```

命令的输出标识使用的工具版本：

```shell

                     _/\__       
               ---==/    \\      
         ___  ___   |.    \|\    
        | __|| __|  |  )   \\\   
        | _| | _|   \_/ |  //|\\ 
        |___||_|       /   \\\/\\

Entity Framework Core .NET Command-line Tools 7.0.3

Usage: dotnet ef [options] [command]

Options:
  --version        Show version information
  -h|--help        Show help information
  -v|--verbose     Show verbose output.
  --no-color       Don't colorize output.
  --prefix-output  Prefix output with level.

Commands:
  database    Commands to manage the database.
  dbcontext   Commands to manage DbContext types.
  migrations  Commands to manage migrations.
```

更新工具
使用 ```dotnet tool update --global dotnet-ef``` 将全局工具更新到最新的可用版本。 如果在项目中本地安装了这些工具，请使用 ```dotnet tool update dotnet-ef。``` 通过将 --version <VERSION> 追加到命令来安装特定版本。 有关更多详细信息，请参阅 dotnet 工具文档的更新部分。
  
更多用法参考官方文档 [Entity Framework Core 工具参考 - .NET Core CLI](https://learn.microsoft.com/zh-cn/ef/core/cli/dotnet)