import{_ as s,W as n,X as a,a2 as e}from"./framework-3a0c4e99.js";const t={},c=e(`<h1 id="linux-制作简单systemctl-的service" tabindex="-1"><a class="header-anchor" href="#linux-制作简单systemctl-的service" aria-hidden="true">#</a> linux 制作简单systemctl 的service</h1><p>在系统路径<code>/usr/lib/systemd/system/</code> 下创建 <code>服务名</code>.service 文件</p><p>下面frp.service模板</p><div class="language-toml line-numbers-mode" data-ext="toml"><pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">Unit</span><span class="token punctuation">]</span>
<span class="token comment">#描述</span>
<span class="token key property">Description</span><span class="token punctuation">=</span>MainFrpService
<span class="token comment">#在网络启动后执行Frp服务</span>
<span class="token key property">After</span><span class="token punctuation">=</span>network<span class="token punctuation">.</span>target


<span class="token punctuation">[</span><span class="token table class-name">Service</span><span class="token punctuation">]</span>
<span class="token key property">Type</span><span class="token punctuation">=</span>simple
<span class="token comment">#以root权限运行</span>
<span class="token key property">User</span><span class="token punctuation">=</span>root
<span class="token comment">#停止时重启</span>
<span class="token key property">Restart</span><span class="token punctuation">=</span>on-abort
<span class="token comment">#启动命令</span>
<span class="token key property">ExecStart</span><span class="token punctuation">=</span>/wanghao/frps/frp_0<span class="token punctuation">.</span><span class="token number">44</span><span class="token punctuation">.</span>0_linux_amd64/frps -c /wanghao/frps/frp_0<span class="token punctuation">.</span><span class="token number">44</span><span class="token punctuation">.</span>0_linux_amd64/frps<span class="token punctuation">.</span>ini   

<span class="token punctuation">[</span><span class="token table class-name">Install</span><span class="token punctuation">]</span>
<span class="token key property">WantedBy</span><span class="token punctuation">=</span>multi-user<span class="token punctuation">.</span>target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建好后就可以使用systemctl 命令来操作服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动服务</span>
ststemctl start frp
<span class="token comment">#重启服务</span>
systemctl restart frp
<span class="token comment">#查看服务状态</span>
systemctl status frp
<span class="token comment">#开启开机自启动</span>
systemctl <span class="token builtin class-name">enable</span> frp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),i=[c];function l(p,o){return n(),a("div",null,i)}const u=s(t,[["render",l],["__file","linux 制作简单systemctl 的service.html.vue"]]);export{u as default};
