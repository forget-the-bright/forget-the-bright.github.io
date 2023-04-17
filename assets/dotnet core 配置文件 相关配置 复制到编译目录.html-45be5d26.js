import{_ as e,W as t,X as n,a2 as o}from"./framework-3a0c4e99.js";const r={},i=o(`<h1 id="dotnet-core-配置文件-相关配置-复制到编译目录" tabindex="-1"><a class="header-anchor" href="#dotnet-core-配置文件-相关配置-复制到编译目录" aria-hidden="true">#</a> dotnet core 配置文件 相关配置 复制到编译目录</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;ItemGroup&gt;
      &lt;None Update=&quot;config.json&quot;&gt; // 需要配置的配置文件名称
        // 配置复制到编译目录，文件较新就复制
        &lt;CopyToOutputDirectory&gt;PreserveNewest&lt;/CopyToOutputDirectory&gt;
      &lt;/None&gt;
    &lt;/ItemGroup&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),d=[i];function s(a,c){return t(),n("div",null,d)}const _=e(r,[["render",s],["__file","dotnet core 配置文件 相关配置 复制到编译目录.html.vue"]]);export{_ as default};
