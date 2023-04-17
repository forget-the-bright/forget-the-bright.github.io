---
icon: edit
date: 2022-12-26
category:
  - 系统配置
tag:
  - grpc
  - proto
headerDepth: 5
---


# grpc proto 使用 cpp 插件生成协议文件
```shell
cd D:\vcpkg\grpc_example\proto
#cmd
protoc --proto_path=. --cpp_out=. ModelGongYi.proto
protoc --proto_path=. --grpc_out=. --plugin=protoc-gen-grpc="D:\env\vcpkg\packages\grpc_x64-windows\tools\grpc\grpc_cpp_plugin.exe" ModelGongYi.proto
#poweshell
./protoc --proto_path=. --cpp_out=. calculate.proto
./protoc --proto_path=. --grpc_out=. --plugin=protoc-gen-grpc="D:\env\vcpkg\packages\grpc_x64-windows\tools\grpc\grpc_cpp_plugin.exe" calculate.proto
```