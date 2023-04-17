---
icon: edit
date: 2021-09-26
category:
  - 网站搭建
tag:
  - SSL
  - 域名
  - HTTPS
headerDepth: 5
---


# 域名添加SSL证书
 # 域名添加SSL证书
 > 我们的服务器购买域名并解析后，发现访问的时候搜索栏一直显示不安全，这样我们搭建的网站很难吸引到人过来访问，觉得咱们的网站是钓鱼网站
![image.png](/upload/2021/09/image-91fa2295488f4ebfb10b374d1835b6ae.png)
这时我们就需要给域名添加SSL证书了

## 操作指南
### 步骤1：添加一键 HTTPS 域名
登录 [证书管理控制台](https://console.cloud.tencent.com/ssl)，并单击左侧菜单栏一键 **HTTPS**，进入一键 **HTTPS**管理页面。
在一键 **HTTPS**管理页面中，单击一键添加。如下图所示：
>说明：
若你是首次使用，请在弹出的授权窗口中，授予对应权限。

![](https://main.qcloudimg.com/raw/e327528f08706299fef120e04c993099.png)

在弹出的 “一键添加” 窗口中，配置相关信息。如下图所示：
![](https://main.qcloudimg.com/raw/5e8f1474ff34ca297f5ccf9f7ae57e6a.png)

**填写域名**：请输入您需要进行一键 HTTPS 的域名。
>说明
填写的域名需要在工信部完成备案，否则将无法进行接入。详情请参见 备案概述。

**选择证书**：请选择已成功申请的证书。
>说明
选择的证书需与填写域名输入框填写的域名对应。例如，填写的域名为 ```cloud.tencent.com```，则选择绑定域名为 ```cloud.tencent.com``` 的证书。

**源站地址**：请根据您的实际需求选择**IP**与**域名**。
- **IP**：请输入需要防护网站的真实 IP 源站地址，即源站的公网 IP 地址。
- **域名**：请输入需要防护网站的真实源站域名。

**强制 HTTPS**：开启该功能，浏览器端的每个 HTTP 请求都会被跳转成 HTTPS 请求。例如，当浏览器使用 HTTP 协议访问 ```http://cloud.tencent.com ```时，将返回302状态码重定向到 HTTPS 协议访问 ```https://cloud.tencent.com```。

**回源协议**： 开启该功能，腾讯云将使用 HTTP 协议访问源站。例如，当浏览器使用 HTTP 或 HTTPS 协议访问 ```cloud.tencent.com``` 时，无论 HTTP 或 HTTPS 协议都将使用 HTTP 协议访问源站。

**回源端口**：请根据您的实际需求选择回源端口。默认情况下支持443与8443，若您开启回源协议，则为80与8080。
单击确定，即可生成配置实例。如下图所示：
![](https://main.qcloudimg.com/raw/2c548a3cf3bc61f73512a57150319cec.png)

### 步骤2：配置 CNAME 记录
>说明：
> - 添加一键 HTTPS 域名后，还需配置对应的 CNAME 记录后，接入才可正常生效。
> - 配置 CNAME 记录步骤以腾讯云配置 CNAME 记录为例，若您的一键 HTTPS 域名解析未在 DNSPod DNS 解析托管，具体操作请咨询您的域名解析商或将域名托管至 DNSPod DNS 解析后，再进行配置 CNAME 记录。详情请参见 域名托管至 DNSPod DNS 解析。

**一键添加 CNAME 记录**
 
手动添加 CNAME 记录
>说明
若您的域名解析已在 DNSPod DNS 解析进行托管，可直接一键添加 CNAME 记录。

在 "一键 HTTPS" 管理页面，查看您需要进行配置 CNAME 记录的实例，单击 + 。如下图所示：
![](https://main.qcloudimg.com/raw/29802e182d7b4ea87573c07df81ec119.png)
在弹出的 “温馨提示” 窗口中，单击确定。即可添加记录。如下图所示：
![](https://main.qcloudimg.com/raw/c0efc2dc88bb465e19f3b58e960f7c1e.png)

