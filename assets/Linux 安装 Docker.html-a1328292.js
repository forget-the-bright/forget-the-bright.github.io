import{_ as a,W as o,X as t,Z as n,$ as s,a0 as i,a2 as c,C as r}from"./framework-3a0c4e99.js";const d={},l=n("h1",{id:"linux-安装-docker",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#linux-安装-docker","aria-hidden":"true"},"#"),s(" Linux 安装 Docker")],-1),u=n("h1",{id:"centos下安装docker",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#centos下安装docker","aria-hidden":"true"},"#"),s(" centos下安装docker")],-1),p=n("blockquote",null,[n("p",null,"其他系统参照如下文档")],-1),v={href:"https://docs.docker.com/engine/install/centos/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="_1、移除以前docker相关包" tabindex="-1"><a class="header-anchor" href="#_1、移除以前docker相关包" aria-hidden="true">#</a> 1、移除以前docker相关包</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum remove <span class="token function">docker</span> <span class="token punctuation">\\</span>
                  docker-client <span class="token punctuation">\\</span>
                  docker-client-latest <span class="token punctuation">\\</span>
                  docker-common <span class="token punctuation">\\</span>
                  docker-latest <span class="token punctuation">\\</span>
                  docker-latest-logrotate <span class="token punctuation">\\</span>
                  docker-logrotate <span class="token punctuation">\\</span>
                  docker-engine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、配置yum源" tabindex="-1"><a class="header-anchor" href="#_2、配置yum源" aria-hidden="true">#</a> 2、配置yum源</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
<span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\\</span>
--add-repo <span class="token punctuation">\\</span>
http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、安装docker" tabindex="-1"><a class="header-anchor" href="#_3、安装docker" aria-hidden="true">#</a> 3、安装docker</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce docker-ce-cli containerd.io


<span class="token comment">#以下是在安装k8s的时候使用</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-20.10.7 docker-ce-cli-20.10.7  containerd.io-1.4.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、启动" tabindex="-1"><a class="header-anchor" href="#_4、启动" aria-hidden="true">#</a> 4、启动</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable docker --now #--now 立即执行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5、配置加速" tabindex="-1"><a class="header-anchor" href="#_5、配置加速" aria-hidden="true">#</a> 5、配置加速</h2><p>这里额外添加了docker的生产环境核心配置cgroup</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;
<span class="token punctuation">{</span>
  <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://82m9ar63.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;exec-opts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;native.cgroupdriver=systemd&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;log-driver&quot;</span><span class="token operator">:</span> <span class="token string">&quot;json-file&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;log-opts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;max-size&quot;</span><span class="token operator">:</span> <span class="token string">&quot;100m&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;storage-driver&quot;</span><span class="token operator">:</span> <span class="token string">&quot;overlay2&quot;</span>
<span class="token punctuation">}</span>
EOF

sudo systemctl daemon-reload

sudo systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function m(h,b){const e=r("ExternalLinkIcon");return o(),t("div",null,[l,u,p,n("p",null,[n("a",v,[s("https://docs.docker.com/engine/install/centos/"),i(e)])]),k])}const _=a(d,[["render",m],["__file","Linux 安装 Docker.html.vue"]]);export{_ as default};
