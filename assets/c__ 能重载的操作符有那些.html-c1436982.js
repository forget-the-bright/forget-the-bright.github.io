import{_ as e,W as n,X as i,a2 as d}from"./framework-3a0c4e99.js";const l={},s=d(`<h1 id="c-能重载的操作符有那些" tabindex="-1"><a class="header-anchor" href="#c-能重载的操作符有那些" aria-hidden="true">#</a> c++ 能重载的操作符有那些</h1><p>重载操作符是指重新定义C++中已有运算符的含义。常见的重载操作符有:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>算术运算符: +, -, *, /, %
关系运算符: ==, !=, &gt;, &lt;, &gt;=, &lt;=
逻辑运算符: &amp;&amp;, ||, !
赋值运算符: =
位运算符: &amp;, |, ^, ~, &lt;&lt;, &gt;&gt;
自增/自减运算符: ++, --
成员访问运算符: -&gt;, .
下标运算符: [ ]
函数调用运算符: ( )
转型运算符: (type)
new 和 delete 运算符: new, delete, new[], delete[]
另外还有三个特殊的运算符是可以被重载的：
复合赋值运算符: +=, -=, *=, /=, %=, &amp;=, |=, ^=, &lt;&lt;=, &gt;&gt;=
串联运算符: &lt;&lt;, &gt;&gt;
逗号运算符: ,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是所有运算符重载都需要在类内部进行，且实现的时候可能需要使用特殊的关键字来实现，如 <code>friend</code> 和 <code>operator</code>.</p>`,4),t=[s];function a(c,r){return n(),i("div",null,t)}const _=e(l,[["render",a],["__file","c__ 能重载的操作符有那些.html.vue"]]);export{_ as default};
