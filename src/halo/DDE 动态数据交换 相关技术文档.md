---
icon: edit
date: 2023-03-17
category:
  - 系统配置
  - DDE
headerDepth: 5
---


# DDE 动态数据交换 相关技术文档
DDE 相关技术文档

## 关于动态数据Exchange
Windows提供了几种在应用程序之间传输数据的方法。 一种方法是使用动态数据Exchange (DDE) 协议。 DDE 协议是一组消息和准则。 它在共享数据的应用程序之间发送消息，并使用共享内存在应用程序之间交换数据。 应用程序可以使用 DDE 协议进行一次性数据传输和连续交换，应用程序在新的数据可用时将更新发送到彼此。

Windows还支持动态数据Exchange管理库 (DDEML) 。 DDEML 是一个动态链接库， (DLL) 应用程序可用于共享数据。 DDEML 提供函数和消息，用于简化向应用程序添加 DDE 功能的任务。 应用程序使用 DDEML 函数来管理 DDE 对话，而不是直接发送、发布和处理 DDE 消息。 (DDE 对话是客户端和服务器应用程序之间的交互。)

DDEML 还提供用于管理 DDE 应用程序共享的字符串和数据的工具。 DDE 应用程序创建和交换字符串句柄（标识字符串）和数据句柄，而不是使用原子和指向共享内存对象的指针。 DDEML 还使服务器应用程序能够注册它支持的服务名称。 这些名称将广播到系统中的其他应用程序，这些应用程序可以使用名称连接到服务器。 此外，DDEML 通过强制 DDE 应用程序以一致的方式实现 DDE 协议，确保 DDE 应用程序之间的兼容性。

使用基于消息的 DDE 协议的现有应用程序与使用 DDEML 的应用程序完全兼容。 也就是说，使用基于消息的 DDE 的应用程序可以建立对话，并与使用 DDEML 的应用程序执行事务。 由于 DDEML 的许多优点，新应用程序应使用它而不是 DDE 消息。 若要使用 DDEML 的 API 元素，必须在源文件中包含 DDEML 头文件、链接到 DDEML 库，并确保 DDEML 动态链接库位于系统的搜索路径中。

微软官方介绍文档 [关于动态数据Exchange](https://learn.microsoft.com/zh-cn/windows/win32/dataxchg/about-dynamic-data-exchange)
微软官方api文档 [动态数据交换](https://learn.microsoft.com/zh-cn/windows/win32/api/_dataxchg/)