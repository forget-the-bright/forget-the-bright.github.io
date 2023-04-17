---
icon: edit
date: 2023-04-12
category:
  - 开发工具
  - Linux
tag:
  - onlyoffice
  - zfile
headerDepth: 5
---


# alist 对接onlyoffice ， docker onlyoffice搭建和在线编辑实现
### docker 搭建onlyoffice 目前不能在arch linux 环境中使用,各种情况可以参考onlyoffcie github issue
选用版本7.1.1 因为此版本不会强制jwt 校验
```
docker run --restart=always --name onlyoffice \
    -p 8081:80 \
    -e JWT_ENABLED=false \
    -v /app/onlyoffice/DocumentServer/logs:/var/log/onlyoffice \
    -v /app/onlyoffice/DocumentServer/data:/var/www/onlyoffice/Data \
    -v /app/onlyoffice/DocumentServer/lib:/var/lib/onlyoffice \
    -v /app/onlyoffice/DocumentServer/db:/var/lib/postgresql \
    onlyoffice/documentserver:7.1.1
```
nginx 需要给onlyoffice 代理 SSL 配置的话请添加
```
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_set_header X-Forwarded-Proto https;
proxy_set_header Host $host:$server_port;
```
部署完成后需要自己nginx 在静态代理一个页面view.html
其中的```https:/onlyoffice/web-apps/apps/api/documents/api.js``` 地址的domain 替换为自己onlyoffice 的地址
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>OnlyOffice Viewer</title>
</head>
 
<body>
    <div id="placeholder"></div>
    <script type="text/javascript" src="https:/onlyoffice/web-apps/apps/api/documents/api.js"></script>
    <script>
        function getQueryParamValue(name) {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get(name);
        }
        
        const url = decodeURIComponent(getQueryParamValue("src"));
        const fileName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?') != -1 ? url.lastIndexOf('?') : url.length);
        const fileExtension = fileName.split('.').pop();
        const docEditor = new DocsAPI.DocEditor("placeholder", {
            "document": {
                "fileType": fileExtension,
                "permissions": {
                    "edit": false,
                    "comment": true,
                    "download": true,
                    "print": true,
                    "fillForms": true,
                },
                "title": fileName,
                "url": url,
            },
            "editorConfig": {
                "lang": "zh-CN",
                "mode": "view",
            },
            "height": "1080px",
            "type": "desktop",
        });
    </script>
</body>
</html>
```
### nginx 代理完静态页面后 ，将地址配置到alist 里面就可以使用了 
![image-1681290100978](https://local.wuanwanghao.top:9000/test/test/image-1681290100978.png)
### onlyoffice使用文件编辑的话选用 ，参照此[issue](https://github.com/alist-org/alist/discussions/3899)

