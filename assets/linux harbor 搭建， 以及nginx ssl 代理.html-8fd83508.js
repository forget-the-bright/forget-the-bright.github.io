import{_ as i,W as r,X as l,Z as e,$ as n,a0 as s,a2 as d,C as o}from"./framework-3a0c4e99.js";const t={},c=e("h1",{id:"linux-harbor-搭建-以及nginx-ssl-代理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#linux-harbor-搭建-以及nginx-ssl-代理","aria-hidden":"true"},"#"),n(" linux harbor 搭建， 以及nginx ssl 代理")],-1),h=e("h3",{id:"前置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前置","aria-hidden":"true"},"#"),n(" 前置")],-1),u=e("p",null,"首先确保机器以及安装好 docker 以及 docker-compose",-1),v={href:"https://local.wuanwanghao.top:30549/archives/linux%E5%AE%89%E8%A3%85docker",target:"_blank",rel:"noopener noreferrer"},b={href:"https://local.wuanwanghao.top:30549/archives/linux%E5%AE%89%E8%A3%85docker-compose",target:"_blank",rel:"noopener noreferrer"},_=e("h3",{id:"下载离线安装包",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#下载离线安装包","aria-hidden":"true"},"#"),n(" 下载离线安装包")],-1),m={href:"https://github.com/goharbor/harbor/releases",target:"_blank",rel:"noopener noreferrer"},p=d(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /wanghao/docker
<span class="token builtin class-name">cd</span> /wanghao/docker
<span class="token function">wget</span> https://ghproxy.com/https://github.com/goharbor/harbor/releases/download/v2.5.6/harbor-offline-installer-v2.5.6.tgz
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> harbor-offline-installer-v2.5.6.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h3><p>进入解压目录 /wanghao/docker/harbor ,拷贝模版创建配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /wanghao/docker/harbor
<span class="token function">cp</span> harbor.yml.tmpl harbor.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改harbor.yml 以下的配置项</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hostname: 访问的域名
http:
 port: 5500
external_url: https://域名:端口
harbor_admin_password: 管理员密码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动harbor" tabindex="-1"><a class="header-anchor" href="#启动harbor" aria-hidden="true">#</a> 启动harbor</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置nginx-代理-ssl" tabindex="-1"><a class="header-anchor" href="#配置nginx-代理-ssl" aria-hidden="true">#</a> 配置nginx 代理 ssl</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen 443 ssl;
    server_name 域名 ;#修改为自己的域名
    ssl_certificate   ;  #域名证书
    ssl_certificate_key  ;  #域名证书
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        proxy_pass http://localhost:5500;
        client_max_body_size 0;
        proxy_connect_timeout 90;
        proxy_read_timeout 90;
        proxy_buffer_size 4k;
        proxy_buffers 6 32k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 64k;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function x(g,f){const a=o("ExternalLinkIcon");return r(),l("div",null,[c,h,u,e("blockquote",null,[e("p",null,[e("a",v,[n("Linux 安装 Docker"),s(a)])])]),e("blockquote",null,[e("p",null,[e("a",b,[n("Linux 安装 docker-compose"),s(a)])])]),_,e("p",null,[e("a",m,[n("github_harbor_releases"),s(a)]),n(" 创建工作目录 下载安装包并解压")]),p])}const E=i(t,[["render",x],["__file","linux harbor 搭建， 以及nginx ssl 代理.html.vue"]]);export{E as default};
