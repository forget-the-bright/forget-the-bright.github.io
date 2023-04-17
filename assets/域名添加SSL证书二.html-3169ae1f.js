import{_ as l,W as a,X as c,Z as n,$ as e,a0 as d,a2 as s,C as t}from"./framework-3a0c4e99.js";const o={},r=s('<h1 id="域名添加ssl证书二" tabindex="-1"><a class="header-anchor" href="#域名添加ssl证书二" aria-hidden="true">#</a> 域名添加SSL证书二</h1><h1 id="域名添加ssl证书" tabindex="-1"><a class="header-anchor" href="#域名添加ssl证书" aria-hidden="true">#</a> 域名添加SSL证书</h1><h2 id="证书申请" tabindex="-1"><a class="header-anchor" href="#证书申请" aria-hidden="true">#</a> 证书申请</h2>',3),m={href:"https://console.cloud.tencent.com/ssl",target:"_blank",rel:"noopener noreferrer"},v=s(`<p>点击申请免费证书 <img src="https://local.wuanwanghao.top:30549/upload/2021/09/image-44a5ae01703240c5bb8a71cae2803855.png" alt="image.png" loading="lazy"> 点击确定 <img src="https://local.wuanwanghao.top:30549/upload/2021/09/image-1fc6d3a51b9e44dfb728b002a41da8b5.png" alt="image.png" loading="lazy"><strong>粗体</strong> 填写信息 <img src="https://local.wuanwanghao.top:30549/upload/2021/09/image-e81640982af647d8825d6623781efb59.png" alt="image.png" loading="lazy"></p><p>接下来步骤走完就行了，没什么难的地方，最后到这个页面下载下来生成的证书 <img src="https://local.wuanwanghao.top:30549/upload/2021/09/image-403a0e5f29ee49bda821144b0be40b9f.png" alt="image.png" loading="lazy"></p><h2 id="证书安装" tabindex="-1"><a class="header-anchor" href="#证书安装" aria-hidden="true">#</a> 证书安装</h2><p>已在 SSL 证书管理控制台 中下载并解压缩 <code>cloud.tencent.com</code> 证书文件包到本地目录。</p><p>解压缩后，可获得相关类型的证书文件。其中包含 Nginx 文件夹和 CSR 文件：</p><p><strong>文件夹名称</strong>：<code>Nginx</code></p><p><strong>文件夹内容</strong>： <code>1_cloud.tencent.com_bundle.crt</code> 证书文件 <code>2_cloud.tencent.com.key</code> 私钥文件</p><p><strong>CSR 文件内容</strong>：<code>cloud.tencent.com.csr</code>文件</p><blockquote><p>说明： CSR 文件是申请证书时由您上传或系统在线生成的，提供给 CA 机构。安装时可忽略该文件。</p></blockquote><p>使用 “WinSCP”（即本地与远程计算机间的复制文件工具）登录 Nginx 服务器。 将已获取到的 1_cloud.tencent.com_bundle.crt 证书文件和 2_cloud.tencent.com.key 私钥文件从本地目录拷贝到 Nginx 服务器的 /usr/local/nginx/conf 目录（此处为 Nginx 默认安装目录，请根据实际情况操作）下。</p><p>远程登录 Nginx 服务器。例如，使用 “PuTTY” 工具 登录。</p><p>编辑 Nginx 根目录下的 conf/nginx.conf 文件。修改内容如下：</p><blockquote><p>说明： 此操作可通过执行 <code>vim /usr/local/nginx/conf/nginx.conf</code> 命令行编辑该文件。</p></blockquote><p>由于版本问题，配置文件可能存在不同的写法。例如：Nginx 版本为 nginx/1.15.0 以上请使用 listen 443 ssl 代替 listen 443 和 ssl on。</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>server {
        #SSL 访问端口号为 443
        listen 443 ssl; 
        #填写绑定证书的域名
        server_name cloud.tencent.com; 
        #证书文件名称
        ssl_certificate 1_cloud.tencent.com_bundle.crt; 
        #私钥文件名称
        ssl_certificate_key 2_cloud.tencent.com.key; 
        ssl_session_timeout 5m;
        #请按照以下协议配置
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
        #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
        ssl_prefer_server_ciphers on;
        location / {
           #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
            root html; 
            index  index.html index.htm;
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Nginx 根目录下，通过执行以下命令验证配置文件问题。</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>./sbin/nginx -t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>若存在，请您重新配置或者根据提示修改存在问题。 若不存在，请执行 步骤7。 重启 Nginx，即可使用 <code>https://cloud.tencent.com</code> 进行访问。 HTTP 自动跳转 HTTPS 的安全配置（可选） 如果您需要将 HTTP 请求自动重定向到 HTTPS。您可以通过以下操作设置：</p><p>根据实际需求，选择以下配置方式：</p><p>在页面中添加 JS 脚本。</p><p>在后端程序中添加重定向。</p><p>通过 Web 服务器实现跳转。</p>`,22),u=n("p",null,[e("Nginx 支持 rewrite 功能。若您在编译时没有去掉 pcre，您可在 HTTP 的 server 中增加 return 301 https://"),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"h"),n("mi",null,"o"),n("mi",null,"s"),n("mi",null,"t")]),n("annotation",{encoding:"application/x-tex"},"host")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.6944em"}}),n("span",{class:"mord mathnormal"},"h"),n("span",{class:"mord mathnormal"},"os"),n("span",{class:"mord mathnormal"},"t")])])]),e("request_uri;，即可将默认80端口的请求重定向为 HTTPS。修改如下内容：")],-1),p=s(`<p>说明： 未添加注释的配置语句，您按照下述配置即可。 由于版本问题，配置文件可能存在不同的写法。例如：Nginx 版本为 nginx/1.15.0 以上请使用 listen 443 ssl 代替 listen 443 和 ssl on。</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>server {
   listen 443 ssl;
    #填写绑定证书的域名
    server_name cloud.tencent.com; 
    #证书文件名称
    ssl_certificate  1_cloud.tencent.com_bundle.crt; 
    #私钥文件名称
    ssl_certificate_key 2_cloud.tencent.com.key; 
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
            #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。  
            root html;
        index index.html index.htm;
    }
}
server {
    listen 80;
    #填写绑定证书的域名
    server_name cloud.tencent.com; 
    #把http的域名请求转成https
    return 301 https://$host$request_uri; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若修改完成，重启 Nginx。即可使用 <code>http://cloud.tencent.com</code>进行访问。</p>`,3);function b(h,g){const i=t("ExternalLinkIcon");return a(),c("div",null,[r,n("p",null,[e("登录 "),n("a",m,[e("证书管理控制台"),d(i)])]),v,u,p])}const x=l(o,[["render",b],["__file","域名添加SSL证书二.html.vue"]]);export{x as default};
