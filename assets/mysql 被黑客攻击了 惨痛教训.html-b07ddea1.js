import{_ as e,W as s,X as n,a2 as i}from"./framework-3a0c4e99.js";const l={},r=i(`<h1 id="mysql-被黑客攻击了-惨痛教训" tabindex="-1"><a class="header-anchor" href="#mysql-被黑客攻击了-惨痛教训" aria-hidden="true">#</a> mysql 被黑客攻击了 惨痛教训</h1><p><strong>今天鼓捣c++ 项目的时候 需要用下nacos 准备docker 安装个发现数据库被黑客攻击了太惨了，还好数据没丢只是 把我的root 权限给改了。 自己的mysql 密码太简单了，以后要把密码复杂化</strong> 下面解决方法 先用本地用户登录mysql 赋予远程账号全部权限； 刷新配置； 修改远程账号密码 刷新配置；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; grant  all on *.* to   root@&#39;%&#39;; 
Query OK, 0 rows affected (0.00 sec)

mysql&gt; flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql&gt; ALTER USER &#39;root&#39;@&#39;%&#39; IDENTIFIED BY &#39;xxxxxx&#39;;
Query OK, 0 rows affected (0.01 sec)

mysql&gt; flush privileges;
Query OK, 0 rows affected (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),a=[r];function d(t,c){return s(),n("div",null,a)}const m=e(l,[["render",d],["__file","mysql 被黑客攻击了 惨痛教训.html.vue"]]);export{m as default};
