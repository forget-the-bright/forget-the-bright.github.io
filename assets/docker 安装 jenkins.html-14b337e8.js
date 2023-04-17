import{_ as e,W as n,X as i,a2 as s}from"./framework-3a0c4e99.js";const a={},d=s(`<h1 id="docker-安装-jenkins" tabindex="-1"><a class="header-anchor" href="#docker-安装-jenkins" aria-hidden="true">#</a> docker 安装 jenkins</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run \\
-u root \\
-d \\
--name jenkins \\
--restart=always \\
-p 8080:8080 \\
-p 8888:8888 \\
-p 50000:50000 \\
-v /wanghao/jenkins_home:/var/jenkins_home \\
-v /wanghao/env:/usr/local/env \\
jenkins/jenkins:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),r=[d];function l(c,t){return n(),i("div",null,r)}const o=e(a,[["render",l],["__file","docker 安装 jenkins.html.vue"]]);export{o as default};
