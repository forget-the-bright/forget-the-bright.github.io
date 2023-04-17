import{_ as e,W as n,X as i,a2 as s}from"./framework-3a0c4e99.js";const a={},d=s(`<h1 id="kubernetes-挂载单个文件的方式-configmap-及挂载注意事项" tabindex="-1"><a class="header-anchor" href="#kubernetes-挂载单个文件的方式-configmap-及挂载注意事项" aria-hidden="true">#</a> kubernetes 挂载单个文件的方式 configMap 及挂载注意事项</h1><p><strong>问题现象</strong></p><p>默认挂载 configMap 时，kubernetes 会覆盖掉挂载的整个目录，哪怕使用 items 也会导致整个目录被覆盖，那么如何实现挂在单个文件而不覆盖整个目录呢。下面说一下 kubernetes 中如何挂载单个文件而不是整个目录。</p><p><strong>解决方案</strong></p><p>使用 subPath 实际上 kubernets 本身提供了 volumeMounts.subPath 属性用于挂在单个文件而不是整个目录。</p><p>下面是一个示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Pod
metadata:
  name: my-lamp-site
spec:
    containers:
    - name: php
      image: php:7.0-apache
      volumeMounts:
      - mountPath: /var/www/html/index.php
        name: index
        subPath: index.php
    volumes:
    - name: index
      configMap:
        name: php-index
        items:
        - key: index.php
          path: index.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kubesphere <img src="https://local.wuanwanghao.top:9000/test/test/image-1677744922153.png" alt="image-1677744922153" loading="lazy"> 注意事项 需要注意的是：</p><p>如果使用ConfigMap的subPath挂载为Container的Volume，Kubernetes不会做自动热更新 ConfigMap 哪怕不使用subPath的挂载方式 C# 文件修改监听功能也没有触发，Golang 的正常，怀疑可能和自己的实现有关.</p>`,9),t=[d];function l(r,c){return n(),i("div",null,t)}const p=e(a,[["render",l],["__file","kubernetes 挂载单个文件的方式 configMap 及挂载注意事项.html.vue"]]);export{p as default};
