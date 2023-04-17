---
icon: edit
date: 2023-01-16
category:
  - 系统配置
  - cpp
tag:
  - CMake
  - vcpkg
  - CLion
headerDepth: 5
---


# vcpkg+CLion+cmake+MinGW使用
#### vcpkg介绍
```vcpkg 是用于 C++ 的一种命令行包管理器。 它极大地简化了 Windows、Linux 和 macOS 上第三方库的购置与安装。 如果项目要使用第三方库，建议通过 vcpkg 来安装它们。 vcpkg 同时支持开源和专有库。 已测试 vcpkg Windows 目录中所有库与 Visual Studio 2015、Visual Studio 2017 及 Visual Studio 2019 的兼容性。 在 Windows 和 Linux/macOS 目录之间，vcpkg 现已支持超过 1900 个库。 C++ 社区正在不断向两个目录添加更多的库。```

#### 安装
从 GitHub 克隆 vcpkg 存储库：https://github.com/Microsoft/vcpkg。 可凭喜好下载到任意文件夹位置。 此位置的根是 vcpkg。 下载完成后，在命令行界面切换到该目录。
``` shell
git clone https://github.com/Microsoft/vcpkg.git
```
在 vcpkg 根目录中，运行 vcpkg 引导程序：
```shell
bootstrap-vcpkg.bat (Windows)
./bootstrap-vcpkg.sh（Linux、macOS）
```
最后根据系统不同，添加到各自得环境变量里面
在 Linux 或 macOS 上，你可能需要在以下示例中使用 ./ 作为 vcpkg 命令的前缀。 请记得从 vcpkg 根目录运行这些命令。

#### 用法
[https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md](https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md)
安装 Jsoncpp
这里我们使用 vcpkg 安装 jsoncpp 并指定 vcpkg 的 triplet 为 mingw，用户可以通过执行 vcpkg help triplet 来查看 vcpkg 支持的所有 triplet
```shell
vcpkg install jsoncpp:x64-mingw-static
```
![image-1673855329302](https://local.wuanwanghao.top:9000/test/test/image-1673855329302.png)
CMake 使用 jsoncpp
```shell
find_package(jsoncpp CONFIG REQUIRED)
target_link_libraries(main PRIVATE jsoncpp_object jsoncpp_static)
```
就是我们要在我们项目中 CMakeLists.txt 中填入的内容如下所示
```txt
cmake_minimum_required(VERSION 3.22)
set(VCPKG_TARGET_TRIPLET "x64-mingw-static" CACHE STRING "" FORCE)

project(main)

set(CMAKE_CXX_STANDARD 11)
find_package(jsoncpp CONFIG REQUIRED)

add_executable(main main.cpp)
target_link_libraries(main PRIVATE jsoncpp_object jsoncpp_static JsonCpp::JsonCpp)
```
其中的第二行 set(VCPKG_TARGET_TRIPLET "x64-mingw-static" CACHE STRING "" FORCE) 是设置 vcpkg 的 triplet
#### Clion 配置
在 CMake options 中填入
```shell
-DCMAKE_TOOLCHAIN_FILE=<你安装vcpkg的位置>/scripts/buildsystems/vcpkg.cmake

```
![image-1673855528935](https://local.wuanwanghao.top:9000/test/test/image-1673855528935.png)

#### 测试
main.cpp
```cpp
#include <iostream>
#include <json/json.h>
int main() {
    Json::Value root;
    root["one"] = "one";
    std::cout << root.toStyledString() << std::endl;
    std::cout << "Hello, World!" << std::endl;
    return 10;
}
```
![image-1673855622590](https://local.wuanwanghao.top:9000/test/test/image-1673855622590.png)
