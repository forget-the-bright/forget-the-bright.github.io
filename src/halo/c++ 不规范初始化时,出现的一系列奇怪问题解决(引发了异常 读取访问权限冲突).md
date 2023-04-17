---
icon: edit
date: 2023-01-06
category:
  - cpp
tag:
  - 初始化问题
headerDepth: 5
---


# c++ 不规范初始化时,出现的一系列奇怪问题解决(引发了异常 读取访问权限冲突)
**今天公司的c++ 项目，需要加一下小功能，读取配置，控制业务功能开启**
#### 问题原因
这是有一段main 方法内的代码块 nacos 初始化并注册的代码
```cpp
    nacos::Nacos nacos(GetIpAddress().value(), PORT, NACOS_APPNAME);
    nacos.namespaceId = NACOS_NAMESPACEID;
    nacos::NacosClient cli(&nacos);
    cli.registerNacos();
```
但是如果加上if 之后 或者代码提出来到外部方法内 就会出现问题了
```cpp
if(flag){
    nacos::Nacos nacos(GetIpAddress().value(), PORT, NACOS_APPNAME);
    nacos.namespaceId = NACOS_NAMESPACEID;
    nacos::NacosClient cli(&nacos);
    cli.registerNacos();
}
或
void  run(){
    nacos::Nacos nacos(GetIpAddress().value(), PORT, NACOS_APPNAME);
    nacos.namespaceId = NACOS_NAMESPACEID;
    nacos::NacosClient cli(&nacos);
    cli.registerNacos();
}
```
就会出现 引发了异常: **读取访问权限冲突 问题**
图片就不粘贴了
这里开了个线程跑了个方法监听发送心跳检测
```cpp
 void nacos::NacosClient::beatNacos()
	{
		pthread_create(&beatNacosThread, NULL, action::BeatNacosThread, this);
	}

void* BeatNacosThread(void* args) {
			NacosClient& cli = *(NacosClient*)args;
			Nacos *nacos = cli.getNacos();
```
就在这一段出现的问题 BeatNacosThread 方法的 参数 传递的是NacosClient 指针，但是指针指向的堆空间损坏了。方法内读取参数就会出现（读取访问权限冲突问题）

#### 问题解决
其实也很简单: 使用new 实例化 
```cpp
 nacos::Nacos *nacos = new Nacos(LOCAL_IP, PORT, NACOS_APPNAME);
		 nacos->namespaceId = NACOS_NAMESPACEID;
		 nacos::NacosClient *cli = new NacosClient(nacos);
		 cli->registerNacos();
		 cli->getNacosConfig();
		 cli->listenNacosConfig();
```

#### 问题总结
默认的实例化方式是其实调用的**c 的 malloc 函数** malloc 函数实例化的对象堆的内存空间是动态的，如果方法执行完成 或者 在if 语句块也是同样的原理，方法内的对象 或 if 语句块中的对象 内存就会损坏， 但是如果用 new 的话 创建的对象堆内存不是动态的。方法执行完毕也不会损坏。清理空间方法是使用 delete 关键字。

参考资料
[读取字符串的字符时出错 无法读取内存](https://blog.csdn.net/fb_941219/article/details/106968262?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-106968262-blog-104897719.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-106968262-blog-104897719.pc_relevant_default&utm_relevant_index=1)
[vs debug模式下显示“变量已被优化掉，因而不可用”的解决办法](https://blog.csdn.net/weixin_44120025/article/details/115279323)
[C中的malloc和free释放原理](https://blog.csdn.net/qq_34272143/article/details/122594250)
[c++调试出现“读取字符串的字符时出错”，无法读取内存? 以及malloc函数和new 的区别](https://www.cnblogs.com/MYJ55/p/6765587.html)
