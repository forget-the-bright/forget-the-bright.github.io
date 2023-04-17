import{_ as e,W as a,X as n,a2 as s}from"./framework-3a0c4e99.js";const t={},i=s(`<h1 id="go-get-遇到缓存问题解决" tabindex="-1"><a class="header-anchor" href="#go-get-遇到缓存问题解决" aria-hidden="true">#</a> go get 遇到缓存问题解决</h1><h4 id="go-get-遇到缓存问题解决-1" tabindex="-1"><a class="header-anchor" href="#go-get-遇到缓存问题解决-1" aria-hidden="true">#</a> go get 遇到缓存问题解决</h4><p>接手公司边缘计算项目的时候遇到的问题。公司项目包路径需要修改 当修改完重新go get 的时候，项目引入的依赖包还是旧的没有修改的 ，进入GOPATH 删除了那个包，再去</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go mod tidy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>发现下的包还是旧的。重复几次依旧不行，这时候想到了go 使用git 命令去下的包，那我是不是可以清理下git 缓存呢，尝试后已经不行。最后发现自己漏了一点，就在眼皮底下 <img src="https://local.wuanwanghao.top:9000/test/test/image-1673255828821.png" alt="image-1673255828821" loading="lazy"> GOPATH 下是有个cache 目录的 ，进入删除vcs 文件夹 和 download 里面相应的包，再去go get 问题就解决了 <img src="https://local.wuanwanghao.top:9000/test/test/image-1673255908474.png" alt="image-1673255908474" loading="lazy"><strong>当然也有命令可以删除</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载包</span>
go get <span class="token parameter variable">-u</span> go clean <span class="token parameter variable">-i</span> github.com/werbenhu/go-tools
 
<span class="token comment"># 清理包</span>
go clean <span class="token parameter variable">-i</span> github.com/werbenhu/go-tools<span class="token punctuation">..</span>.
 
<span class="token comment"># 清理全部包</span>
go clean <span class="token parameter variable">--modcache</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),l=[i];function o(c,d){return a(),n("div",null,l)}const g=e(t,[["render",o],["__file","go get 遇到缓存问题解决.html.vue"]]);export{g as default};
