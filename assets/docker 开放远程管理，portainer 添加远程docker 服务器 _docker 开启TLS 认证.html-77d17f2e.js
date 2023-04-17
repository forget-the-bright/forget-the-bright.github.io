import{_ as d,W as i,X as t,Z as a,$ as e,a0 as s,a2 as r,C as c}from"./framework-3a0c4e99.js";const l={},o=r(`<h1 id="docker-开放远程管理-portainer-添加远程docker-服务器-docker-开启tls-认证" tabindex="-1"><a class="header-anchor" href="#docker-开放远程管理-portainer-添加远程docker-服务器-docker-开启tls-认证" aria-hidden="true">#</a> docker 开放远程管理，portainer 添加远程docker 服务器 ,docker 开启TLS 认证</h1><h2 id="docker-开放远程管理" tabindex="-1"><a class="header-anchor" href="#docker-开放远程管理" aria-hidden="true">#</a> docker 开放远程管理</h2><h3 id="修改docker-服务文件" tabindex="-1"><a class="header-anchor" href="#修改docker-服务文件" aria-hidden="true">#</a> 修改docker 服务文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /usr/lib/systemd/system/docker.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启动命令后追加-h-tcp-0-0-0-0-2375-h-unix-var-run-docker-sock" tabindex="-1"><a class="header-anchor" href="#启动命令后追加-h-tcp-0-0-0-0-2375-h-unix-var-run-docker-sock" aria-hidden="true">#</a> 启动命令后追加 <code>-H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock</code></h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#找到ExecStart这行 在后面加上-H tcp://0.0.0.0:2375  其它方式一会docker就挂了 而且重启无效 
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重启docker" tabindex="-1"><a class="header-anchor" href="#重启docker" aria-hidden="true">#</a> 重启docker</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl daemon-reload
systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="防火墙开放端口" tabindex="-1"><a class="header-anchor" href="#防火墙开放端口" aria-hidden="true">#</a> 防火墙开放端口</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>firewall-cmd --zone=public --add-port=2375/tcp --permanent
systemctl reload firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="portainer-添加远程docker-服务器" tabindex="-1"><a class="header-anchor" href="#portainer-添加远程docker-服务器" aria-hidden="true">#</a> portainer 添加远程docker 服务器</h2><p><img src="https://local.wuanwanghao.top:9000/test/test/image-1680765916390.png" alt="image-1680765916390" loading="lazy"><img src="https://local.wuanwanghao.top:9000/test/test/image-1680766178357.png" alt="image-1680766178357" loading="lazy"></p><h2 id="配置docker开启tls认证" tabindex="-1"><a class="header-anchor" href="#配置docker开启tls认证" aria-hidden="true">#</a> 配置Docker开启TLS认证</h2><p>直接开放 Docker 2375 端口容易造成生成事故，被人入侵挖矿之类的， 所以这里开启TLS 认证来安全防护</p><h3 id="生成tls证书" tabindex="-1"><a class="header-anchor" href="#生成tls证书" aria-hidden="true">#</a> 生成TLS证书</h3>`,15),u={href:"http://createcert.sh",target:"_blank",rel:"noopener noreferrer"},v=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p /opt/sh /opt/cert/docker
touch /opt/sh/createcert.sh
vim /opt/sh/createcert.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在createcret.sh添加内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
set -e
if [ -z $1 ];then
        echo &quot;请输入Docker服务器的域名&quot;
        exit 0
fi
HOST=$1
mkdir -p /opt/cert/docker
cd /opt/cert/docker
openssl genrsa -aes256 -out ca-key.pem 4096
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem
openssl genrsa -out server-key.pem 4096
openssl req -subj &quot;/CN=$HOST&quot; -sha256 -new -key server-key.pem -out server.csr
# 配置白名单，推荐配置0.0.0.0，允许所有IP连接但只有证书才可以连接成功
echo subjectAltName = DNS:$HOST,IP:0.0.0.0 &gt; extfile.cnf
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile extfile.cnf
openssl genrsa -out key.pem 4096
openssl req -subj &#39;/CN=client&#39; -new -key key.pem -out client.csr
echo extendedKeyUsage = clientAuth &gt; extfile.cnf
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile.cnf
rm -v client.csr server.csr
chmod -v 0400 ca-key.pem key.pem server-key.pem
chmod -v 0444 ca.pem server-cert.pem cert.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),p={href:"http://createcert.sh",target:"_blank",rel:"noopener noreferrer"},m=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># wuanwanghao.top 是服务器的域名
sh /opt/sh/createcert.sh wuanwanghao.top
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>按照提示输入相关信息，密码一致，其他信息可留空，等脚本指定完成之后，可在 /opt/cert/docker 目录查看到生成的证书。 <img src="https://local.wuanwanghao.top:9000/test/test/image-1680790203577.png" alt="image-1680790203577" loading="lazy"></p><h3 id="配置docker开启tls认证-1" tabindex="-1"><a class="header-anchor" href="#配置docker开启tls认证-1" aria-hidden="true">#</a> 配置Docker开启TLS认证</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /usr/lib/systemd/system/docker.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在ExecStart属性后追加</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--tlsverify --tlscacert=/opt/cert/docker/ca.pem  \\
--tlscert=/opt/cert/docker/server-cert.pem \\
--tlskey=/opt/cert/docker/server-key.pem \\
-H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重新加载docker配置后重启" tabindex="-1"><a class="header-anchor" href="#重新加载docker配置后重启" aria-hidden="true">#</a> 重新加载docker配置后重启</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看2376端口是否启动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>netstat -nltp | grep 2375
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>本地连接测试Docker API是否可用</p><p>没有指定证书访问测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl https://wuanwanghao.top:2375/info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定证书访问测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl https://wuanwanghao.top:2375/info --cert /opt/cert/docker/cert.pem --key /opt/cert/docker/key.pem --cacert /opt/cert/docker/ca.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="portainer-重新添加docker机器" tabindex="-1"><a class="header-anchor" href="#portainer-重新添加docker机器" aria-hidden="true">#</a> portainer 重新添加docker机器</h3><p>删除原先docker 机器 ，重新添加 勾选TLS 选项 <img src="https://local.wuanwanghao.top:9000/test/test/image-1680790455212.png" alt="image-1680790455212" loading="lazy"></p><p>上传生成的TLS 文件 <img src="https://local.wuanwanghao.top:9000/test/test/image-1680790603638.png" alt="image-1680790603638" loading="lazy"></p><p>重新链接即可</p>`,19);function h(k,b){const n=c("ExternalLinkIcon");return i(),t("div",null,[o,a("p",null,[e("创建证书生成脚本 "),a("a",u,[e("createcert.sh"),s(n)]),e("，放置/opt/sh目录")]),v,a("p",null,[e("执行 "),a("a",p,[e("createcert.sh"),s(n)]),e(" 脚本，生成证书放置 /opt/cert/docker 目录中")]),m])}const x=d(l,[["render",h],["__file","docker 开放远程管理，portainer 添加远程docker 服务器 _docker 开启TLS 认证.html.vue"]]);export{x as default};
