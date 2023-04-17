import{_ as s,W as i,X as t,Z as e,$ as a,a0 as r,a2 as l,C as d}from"./framework-3a0c4e99.js";const c={},o=l(`<h1 id="解决nginx-ssl-the-plain-http-request-was-sent-to-https-port" tabindex="-1"><a class="header-anchor" href="#解决nginx-ssl-the-plain-http-request-was-sent-to-https-port" aria-hidden="true">#</a> 解决nginx SSL The plain HTTP request was sent to HTTPS port</h1><h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h3><p>现在越来越多的网站要求http访问转为更为安全的https访问，很多使用nginx部署的前端应用可以很方便的使用反向代理来实现，切换后，用http访问就会出现 &quot;The plain HTTP request was sent to HTTPS port&quot;的错误页面。</p><h3 id="解决思路" tabindex="-1"><a class="header-anchor" href="#解决思路" aria-hidden="true">#</a> 解决思路</h3><p>将此错误页面重定向到指定的https地址即可</p><h3 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h3><p>假设端口号是8443:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen 8443 ssl;
    ssl_certificate ssl_cert.pem;
    ssl_certificate_key ssl_server.key;
    server_name your_domain.com;
    error_page 497 301 =307 https://$host:$server_port$request_uri; 
    location / {
        ....
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，如果是自有域名，http和https端口都使用默认端口的话，只要将http的请求重定向到https即可</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen 80;
    listen 443 ssl;
    ssl_certificate ssl_cert.pem;
    ssl_certificate_key ssl_server.key;
    server_name your_domain.com;
    if ($scheme = http) {
        return 301 https://$host$uri?$args;
    }
    location / {
        ....
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h3>`,11),v={href:"https://blog.csdn.net/qq_30665009/article/details/124464699",target:"_blank",rel:"noopener noreferrer"};function h(u,p){const n=d("ExternalLinkIcon");return i(),t("div",null,[o,e("p",null,[e("a",v,[a("nginx_非标准端口_同端口_http_自动跳转_https"),r(n)])])])}const m=s(c,[["render",h],["__file","解决nginx SSL The plain HTTP request was sent to HTTPS port.html.vue"]]);export{m as default};
