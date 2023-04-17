import{_ as e,W as n,X as i,a2 as a}from"./framework-3a0c4e99.js";const r={},d=a(`<h1 id="crontab-linux-定时任务工具使用" tabindex="-1"><a class="header-anchor" href="#crontab-linux-定时任务工具使用" aria-hidden="true">#</a> crontab linux 定时任务工具使用</h1><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>crontab: usage error: unrecognized option
usage:  crontab [-u user] file
        crontab [ -u user ] [ -i ] { -e | -l | -r }
                (default operation is replace, per 1003.2)
        -e      (edit user&#39;s crontab)
        -l      (list user&#39;s crontab)
        -r      (delete user&#39;s crontab)
        -i      (prompt before deleting user&#39;s crontab)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>-e 编辑和添加crontab</li><li>-l 列出所有的定时任务</li><li>-r 删除定时任务</li><li>-i 删除用户crontab前提示</li></ul><h3 id="crontab运行日志查看" tabindex="-1"><a class="header-anchor" href="#crontab运行日志查看" aria-hidden="true">#</a> crontab运行日志查看</h3><p>有时候发现定时任务没有按预期执行，可以能过查看日志发现执行相关的问题。 一般来说 ，<code>crontab</code>的运行日志可以在<code>/var/log/cron.log</code>文件中。 如果没有<code>/var/log/cron.log</code>文件，试一下<code>/var/log/cron</code></p><h3 id="crontab为什么有时候找不到日志" tabindex="-1"><a class="header-anchor" href="#crontab为什么有时候找不到日志" aria-hidden="true">#</a> crontab为什么有时候找不到日志？</h3><p>需要通过配置打开crontab的日志记录功能。 通过以下方式开启crontab的日志记录功能。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo vim /etc/rsyslog.d/50-default.conf
cron.*  /var/log/cron.log #将cron前面的注释符去掉
#重启rsyslog
#sudo /etc/init.d/rsyslog restart
sudo service rsyslog restart   #重启rsyslog
sudo service cron restart     #重启cron程度
sudo service crond restart   #重启crond。 在有的系统中，定时任务程序名称是crond
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="选择-e-时的编辑器-修改系统默认编辑器" tabindex="-1"><a class="header-anchor" href="#选择-e-时的编辑器-修改系统默认编辑器" aria-hidden="true">#</a> 选择-e 时的编辑器 修改系统默认编辑器</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select-editor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>nano 编辑器 虽然提示说好用 ，其实大家学习的时候大多用习惯vim 的编辑器了，我还是喜欢用vim</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Select an editor.  To change later, run &#39;select-editor&#39;.
  1. /bin/nano        &lt;---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),s=[d];function l(c,t){return n(),i("div",null,s)}const u=e(r,[["render",l],["__file","crontab linux 定时任务工具使用.html.vue"]]);export{u as default};
