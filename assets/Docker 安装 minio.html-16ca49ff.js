import{_ as i,W as e,X as n,a2 as a}from"./framework-3a0c4e99.js";const o={},d=a(`<h1 id="docker-安装-minio" tabindex="-1"><a class="header-anchor" href="#docker-安装-minio" aria-hidden="true">#</a> Docker 安装 minio</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker  run -d --name minio \\
-p 9000:9000  \\
-p 9001:9001  \\
--restart=always \\
-e MINIO_ACCESS_KEY=minio \\
-e MINIO_SECRET_KEY=minio123 \\
-e &quot;MINIO_BROWSER_REDIRECT_URL=https://local.wuanwanghao.top:9001&quot; \\
-e &quot;MINIO_SERVER_URL=https://local.wuanwanghao.top:9000&quot; \\
-v /home/wanghao/minio/config:/root/.minio \\
-v /home/wanghao/minio/data1:/data1 \\
-v /home/wanghao/minio/data2:/data2 \\
-v /home/wanghao/minio/data3:/data3 \\
-v /home/wanghao/minio/data4:/data4 \\
minio/minio server /data{1...4} --console-address &quot;:9001&quot; -address &quot;:9000&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),s=[d];function t(l,r){return e(),n("div",null,s)}const m=i(o,[["render",t],["__file","Docker 安装 minio.html.vue"]]);export{m as default};
