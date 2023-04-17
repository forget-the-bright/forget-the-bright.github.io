import{_ as e,W as a,X as n,a2 as d}from"./framework-3a0c4e99.js";const i={},s=d(`<h1 id="linux-磁盘使用分区工具-fdisk-从新磁盘分区到挂载的全过程" tabindex="-1"><a class="header-anchor" href="#linux-磁盘使用分区工具-fdisk-从新磁盘分区到挂载的全过程" aria-hidden="true">#</a> linux 磁盘使用分区工具 fdisk, 从新磁盘分区到挂载的全过程</h1><h3 id="fdisk" tabindex="-1"><a class="header-anchor" href="#fdisk" aria-hidden="true">#</a> fdisk</h3><p>fdisk命令的英文全称是“Partition table manipulator for Linux”，即作为磁盘的分区工具。进行硬盘分区从实质上说就是对硬盘的一种格式化， 用一个形象的比喻，分区就好比在一张白纸上画一个大方框，而格式化好比在方框里打上格子。</p><table><thead><tr><th>参数</th><th>详情</th></tr></thead><tbody><tr><td>-b</td><td>指定每个分区的大小</td></tr><tr><td>-l</td><td>列出指定的外围设备的分区表状况</td></tr><tr><td>-s</td><td>将指定的分区大小输出到标准输出上，单位为区块</td></tr><tr><td>-u</td><td>搭配”-l”参数列表，会用分区数目取代柱面数目，来表示每个分区的起始地址</td></tr><tr><td>-v</td><td>显示版本信息</td></tr><tr><td>...</td><td>...</td></tr></tbody></table><h3 id="查看磁盘信息" tabindex="-1"><a class="header-anchor" href="#查看磁盘信息" aria-hidden="true">#</a> 查看磁盘信息</h3><p>首先使用 fdisk -l 查看系统挂载磁盘设备信息 一般sata 磁盘设备 名称 是<code>/dev/sda</code> 或者<code> /dev/sdb</code> 找到你新添加磁盘设备</p><h3 id="开始分区" tabindex="-1"><a class="header-anchor" href="#开始分区" aria-hidden="true">#</a> 开始分区</h3><p>假设你新添加磁盘设备 设备名称为/dev/sdb</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">fdisk</span> /dev/sdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后输入m 打开详细详细</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>欢迎使用 fdisk (util-linux 2.23.2)。

更改将停留在内存中，直到您决定将更改写入磁盘。
使用写入命令前请三思。


命令(输入 m 获取帮助)：m
命令操作
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   g   create a new empty GPT partition table
   G   create an IRIX (SGI) partition table
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition&#39;s system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建分区-指定分区大小" tabindex="-1"><a class="header-anchor" href="#创建分区-指定分区大小" aria-hidden="true">#</a> 创建分区，指定分区大小</h3><p>1.然后输入 n 创建新的分区 ，磁盘默认可以创建的分区为4个 2.根据提示输入要创建的分区号 1....4 3.默认为1 直接回车 或者 输入1 即可 4.输入分区大小，默认为磁盘容量最多值 ，可以输入+1G .... 指定容量为1G 也可以自定义指定大小 <code>+?G</code> ?号代表 容量大小 。 确定好直接回车 5.输入w 保存分区设置并退出</p><h3 id="格式化分区文件系统" tabindex="-1"><a class="header-anchor" href="#格式化分区文件系统" aria-hidden="true">#</a> 格式化分区文件系统</h3><blockquote><p>上一步保存好分区设置后可以使用 fdisk -l 查看分区信息 ，如果没有可以使用 <code>partprobe 磁盘设备名称</code> 命令 来通知内核系统，请求操作系统重新加载分区表。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>partprobe /dev/sdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一般来说centos 系统的文件系统类型为 xfs 和 ext4 这里使用xfs 进行格式化</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mkfs.xfs /dev/sdb1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="挂载分区" tabindex="-1"><a class="header-anchor" href="#挂载分区" aria-hidden="true">#</a> 挂载分区</h3><p>1.这里默认创建的分区为 <code>/dev/sdb1</code> 使用mount 命令挂载分区到指定目录</p><blockquote><p>这里有一点要注意，如果要挂载的目录里面有数据，需要备份到其他目录里面，等挂载完成后重新移动过来 这里假设挂载的目录为 /wanghao, 我们重命名文件夹 然后再次创建文件夹 来挂载</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mv</span> /wanghao /wanghao/bak
<span class="token function">mkdir</span> /wanghao
<span class="token function">mount</span> /dev/sdb1 /wanghao
<span class="token function">cp</span> <span class="token parameter variable">-r</span> /wanghao_bak/* /wanghao/
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /wanghao_bak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然如果挂载的空目录上可以直接挂载 假设/wanghao 是空目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mount</span> /dev/sdb1 /wanghao
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="取消挂载命令为-umount-如果有问题可以取消挂载" tabindex="-1"><a class="header-anchor" href="#取消挂载命令为-umount-如果有问题可以取消挂载" aria-hidden="true">#</a> 取消挂载命令为 umount 如果有问题可以取消挂载</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">umount</span> /wanghao
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="mount-是临时挂载命令-这里进行持久化挂载" tabindex="-1"><a class="header-anchor" href="#mount-是临时挂载命令-这里进行持久化挂载" aria-hidden="true">#</a> mount 是临时挂载命令 这里进行持久化挂载，</h3><p>vim /etc/fstab 命令，编辑 fstab 文件，在最后一行添加一条记录，如 /dev/sdb1 /wanghao xfs defaults 0 0 ，保存并退出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim  /etc/fstab
#输入i 进入编辑模式 ，找到空行进行输入
/dev/sdb1 /wanghao xfs defaults 0 0
#输入完毕后 按ESC键 ，然后输入 :wq 即可保存并退出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lsblk" tabindex="-1"><a class="header-anchor" href="#lsblk" aria-hidden="true">#</a> lsblk</h3><p>查看当前系统挂载的硬盘信息 并列出所有的硬盘设备</p><h3 id="partprobe-命令" tabindex="-1"><a class="header-anchor" href="#partprobe-命令" aria-hidden="true">#</a> partprobe 命令</h3><p>partprobe命令用于重读分区表，将磁盘分区表变化信息通知内核，请求操作系统重新加载分区表。如果删除文件后，仍然提示占用空间，可以用partprobe在不重启的情况下重读分区 。</p><table><thead><tr><th>参数</th><th>详情</th></tr></thead><tbody><tr><td>-d</td><td>不更新内核</td></tr><tr><td>-s</td><td>显示摘要和分区</td></tr><tr><td>-h</td><td>显示帮助信息</td></tr><tr><td>-v</td><td>显示版本信息</td></tr></tbody></table><h3 id="文件系统" tabindex="-1"><a class="header-anchor" href="#文件系统" aria-hidden="true">#</a> 文件系统</h3><blockquote><p>Linux 的文件系统取决于它的发行版。一般来说，基于 Red Hat 的发行版（如 CentOS、Fedora、RHEL 等）使用 xfs 或 ext4 文件系统，基于 Debian 的发行版（如 Ubuntu、Mint、Debian 等）使用 ext4 文件系统，基于 Arch Linux 的发行版（如 Manjaro、Arch Linux 等）使用 ext4 或 btrfs 文件系统.</p></blockquote>`,36),t=[s];function r(l,c){return a(),n("div",null,t)}const u=e(i,[["render",r],["__file","linux 磁盘使用分区工具 fdisk_ 从新磁盘分区到挂载的全过程.html.vue"]]);export{u as default};
