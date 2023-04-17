---
icon: edit
date: 2023-02-22
category:
  - .Net
headerDepth: 5
---


# dotnet core 配置文件 相关配置 复制到编译目录
```
    <ItemGroup>
      <None Update="config.json"> // 需要配置的配置文件名称
        // 配置复制到编译目录，文件较新就复制
        <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      </None>
    </ItemGroup>
```