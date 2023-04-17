import{_ as e,W as n,X as d,a2 as i}from"./framework-3a0c4e99.js";const c={},s=i(`<h1 id="cmd-获取当前脚本各种路径" tabindex="-1"><a class="header-anchor" href="#cmd-获取当前脚本各种路径" aria-hidden="true">#</a> CMD 获取当前脚本各种路径</h1><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>@echo off
echo 当前盘符：%~d0
echo 当前盘符和路径：%~dp0
echo 当前批处理全路径：%~f0
echo 当前盘符和路径的短文件名格式：%~sdp0
echo 当前CMD默认目录：%cd%
echo 目录中有空格也可以加入&quot;&quot;避免找不到路径
echo 当前盘符：&quot;%~d0&quot;
echo 当前盘符和路径：&quot;%~dp0&quot;
echo 当前批处理全路径：&quot;%~f0&quot;
echo 当前盘符和路径的短文件名格式：&quot;%~sdp0&quot;
echo 当前CMD默认目录：&quot;%cd%&quot;
pause
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),a=[s];function o(l,t){return n(),d("div",null,a)}const r=e(c,[["render",o],["__file","CMD 获取当前脚本各种路径.html.vue"]]);export{r as default};
