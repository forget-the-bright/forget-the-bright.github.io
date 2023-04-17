import{_ as l,W as t,X as o,Z as a,$ as e,a0 as s,a2 as i,C as r}from"./framework-3a0c4e99.js";const d={},c=i('<h1 id="windows-下包管理器" tabindex="-1"><a class="header-anchor" href="#windows-下包管理器" aria-hidden="true">#</a> windows 下包管理器</h1><h1 id="windows-下包管理器-1" tabindex="-1"><a class="header-anchor" href="#windows-下包管理器-1" aria-hidden="true">#</a> windows 下包管理器</h1><ul><li>chocolatey</li><li>winget</li><li>Scoop</li></ul><h2 id="chocolatey" tabindex="-1"><a class="header-anchor" href="#chocolatey" aria-hidden="true">#</a> chocolatey</h2>',4),p={href:"https://chocolatey.org/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://docs.chocolatey.org/en-us/choco/setup",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.chocolatey.org/en-us/configuration",target:"_blank",rel:"noopener noreferrer"},v=i(`<h3 id="cmd-安装" tabindex="-1"><a class="header-anchor" href="#cmd-安装" aria-hidden="true">#</a> CMD 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@<span class="token string">&quot;%SystemRoot%\\System32\\WindowsPowerShell<span class="token entity" title="\\v">\\v</span>1.0\\powershell.exe&quot;</span> <span class="token parameter variable">-NoProfile</span> <span class="token parameter variable">-InputFormat</span> None <span class="token parameter variable">-ExecutionPolicy</span> Bypass <span class="token parameter variable">-Command</span> <span class="token string">&quot;[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex <span class="token variable"><span class="token punctuation">((</span>New<span class="token operator">-</span>Object System.Net.WebClient<span class="token punctuation">)</span>.DownloadString<span class="token punctuation">(</span>&#39;https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>community.chocolatey.org<span class="token operator">/</span>install.ps1&#39;<span class="token punctuation">))</span></span>&quot;</span> <span class="token operator">&amp;&amp;</span> SET <span class="token string">&quot;PATH=%PATH%;%ALLUSERSPROFILE%<span class="token entity" title="\\c">\\c</span>hocolatey<span class="token entity" title="\\b">\\b</span>in&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="powershell安装" tabindex="-1"><a class="header-anchor" href="#powershell安装" aria-hidden="true">#</a> powershell安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Set-ExecutionPolicy Bypass <span class="token parameter variable">-Scope</span> Process -Force<span class="token punctuation">;</span> <span class="token punctuation">[</span>System.Net.ServicePointManager<span class="token punctuation">]</span>::SecurityProtocol <span class="token operator">=</span> <span class="token punctuation">[</span>System.Net.ServicePointManager<span class="token punctuation">]</span>::SecurityProtocol <span class="token parameter variable">-bor</span> <span class="token number">3072</span><span class="token punctuation">;</span> iex <span class="token variable"><span class="token punctuation">((</span>New<span class="token operator">-</span>Object System.Net.WebClient<span class="token punctuation">)</span>.DownloadString<span class="token punctuation">(</span>&#39;https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>community.chocolatey.org<span class="token operator">/</span>install.ps1&#39;<span class="token punctuation">))</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="升级" tabindex="-1"><a class="header-anchor" href="#升级" aria-hidden="true">#</a> 升级</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>choco upgrade chocolatey
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载" aria-hidden="true">#</a> 卸载</h3><h4 id="文件夹" tabindex="-1"><a class="header-anchor" href="#文件夹" aria-hidden="true">#</a> 文件夹</h4><p>Chocolatey 的大部分内容包含在C:\\ProgramData\\chocolatey或任何$env:ChocolateyInstall计算结果中。您可以简单地删除该文件夹。</p><ul><li>笔记 您可以先备份子文件夹lib，bin以防万一您在删除 Chocolatey 时发现不良结果。请记住，并非每个 Chocolatey 包都是安装程序包，这些子文件夹中可能包含一些未安装的应用程序，这些应用程序可能会丢失。拥有备份将使您能够测试该方面。</li></ul><h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h4><p>有一些环境变量需要调整或删除。</p><ul><li>ChocolateyInstall</li><li>ChocolateyToolsLocation</li><li>ChocolateyLastPathUpdate</li><li>PATH (will need updated to remove)</li></ul><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><p>使用巧克力 现在你的机器上有 Chocolatey（需要安装？），你可以运行几个命令。</p><p>查看命令参考。我们将使用安装命令。</p><p>让我们安装Notepad++。</p><p>以管理员身份打开命令行。 键入choco install notepadplusplus并按 Enter。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>choco install notepadplusplus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>就是这样。非常简单但功能强大的小概念！ 覆盖默认安装目录或其他高级安装概念 是的，我们通过使用安装参数来支持它 - 请参阅安装参数 如果您想将本机参数传递给安装程序，例如安装目录，您需要知道传递给该特定安装程序的静默参数，然后您可以在命令行或 packages.config 中指定它。</p></blockquote><blockquote><p>如果它是 MSI，那么通常您可以通过-ia &quot;INSTALLDIR=&quot;&quot;D:\\Program Files&quot;&quot;&quot;（对于 cmd.exe，对于 PowerShell 则不同）。查看如何传递选项/开关以了解有关传递引用值的细节。</p></blockquote><blockquote><p>例如，Notepad++ 使用NSIS（NullSoft Scriptable Install System）安装程序。如果我们查看静默选项，我们会发现/D是我们影响安装目录的方式。所以我们会通过choco install notepadplusplus.install -ia</p></blockquote><blockquote><p>&quot;&#39;/D=E:\\SomeDirectory\\somebody\\npp&#39;&quot;- 请注意，我们正在查看虚拟的特定包（尽管您也可以使用 notepadplusplus 执行相同的操作）。 有没有更好的办法？绝对，看到无处不在的安装目录开关！</p></blockquote><h2 id="winget" tabindex="-1"><a class="header-anchor" href="#winget" aria-hidden="true">#</a> winget</h2>`,24),m={href:"https://learn.microsoft.com/zh-cn/windows/package-manager/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/microsoft/winget-cli/releases",target:"_blank",rel:"noopener noreferrer"},g=i('<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><h4 id="应用商店安装" tabindex="-1"><a class="header-anchor" href="#应用商店安装" aria-hidden="true">#</a> 应用商店安装</h4><figure><img src="https://local.wuanwanghao.top:9000/test/test/image-1680681449718.png" alt="image-1680681449718" tabindex="0" loading="lazy"><figcaption>image-1680681449718</figcaption></figure><h4 id="安装包安装" tabindex="-1"><a class="header-anchor" href="#安装包安装" aria-hidden="true">#</a> 安装包安装</h4>',4),f={href:"https://github.com/microsoft/winget-cli/releases",target:"_blank",rel:"noopener noreferrer"},k=a("code",null,"assest",-1),x=a("code",null,"msixbundle",-1),w=i(`<h3 id="使用-1" tabindex="-1"><a class="header-anchor" href="#使用-1" aria-hidden="true">#</a> 使用</h3><p>重新打开一个cmd 窗口</p><blockquote><p>install 安装给定的程序包 show 显示包的相关信息 source 管理程序包的来源 search 查找并显示程序包的基本信息 list 显示已安装的程序包 upgrade 显示并执行可用升级 uninstall 卸载给定的程序包 hash 哈希安装程序的帮助程序 validate 验证清单文件 settings 打开设置或设置管理员设置 features 显示实验性功能的状态 export 导出已安装程序包的列表 import 安装文件中的所有程序包</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>C:\\Users\\Hasee&gt;winget --help
Windows 程序包管理器(预览) v1.5.441-preview
版权所有 (C) Microsoft Corporation。保留所有权利。

WinGet 命令行实用工具可从命令行安装应用程序和其他程序包。

使用情况: winget [&lt;命令&gt;] [&lt;选项&gt;]

下列命令有效:
  install    安装给定的程序包
  show       显示包的相关信息
  source     管理程序包的来源
  search     查找并显示程序包的基本信息
  list       显示已安装的程序包
  upgrade    显示并执行可用升级
  uninstall  卸载给定的程序包
  hash       哈希安装程序的帮助程序
  validate   验证清单文件
  settings   打开设置或设置管理员设置
  features   显示实验性功能的状态
  export     导出已安装程序包的列表
  import     安装文件中的所有程序包

如需特定命令的更多详细信息，请向其传递帮助参数。 [-?]

下列选项可用：
  -v,--version              显示工具的版本
  --info                    显示工具的常规信息
  -?,--help                 显示选定命令的帮助信息
  --wait                    提示用户在退出前按任意键
  --logs,--open-logs        打开默认日志位置
  --verbose,--verbose-logs  启用 WinGet 的详细日志记录
  --disable-interactivity   禁用交互式提示

可在此找到更多帮助: &quot;https://aka.ms/winget-command-help&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="scoop" tabindex="-1"><a class="header-anchor" href="#scoop" aria-hidden="true">#</a> Scoop</h2><p>Scoop 是一款Windows下的命令行软件管理工具 简单来说,他比winget更强大(只是不够本土化,winget的软件本土化做的要更好一些,但对我来说在环境管理方面,scoop也有不可替代性)</p><h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1" aria-hidden="true">#</a> 安装：</h3>`,7),S={href:"https://github.com/ScoopInstaller/Scoop",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/ScoopInstaller/Install",target:"_blank",rel:"noopener noreferrer"},y=i(`<h4 id="非管理员安装" tabindex="-1"><a class="header-anchor" href="#非管理员安装" aria-hidden="true">#</a> 非管理员安装</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Set-ExecutionPolicy RemoteSigned <span class="token parameter variable">-Scope</span> CurrentUser <span class="token comment">#可选:第一次需要执行远程脚本</span>
 irm get.scoop.sh <span class="token operator">|</span> iex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="管理员安装" tabindex="-1"><a class="header-anchor" href="#管理员安装" aria-hidden="true">#</a> 管理员安装</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> irm get.scoop.sh -outfile &#39;install.ps1&#39;
 .\\install.ps1 -RunAsAdmin -ScoopDir &#39;D:\\env\\Scoop&#39; -ScoopGlobalDir &#39;D:\\env\\Scoop&#39; -NoProxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="指定环境变量" tabindex="-1"><a class="header-anchor" href="#指定环境变量" aria-hidden="true">#</a> 指定环境变量</h4><p>两者的值可以设为一致 <code>SCOOP</code> 软件用户安装目录- 命令里 ScoopDir <code>SCOOP_GLOBAL</code> 软件的全局安装目录- 命令里 ScoopGlobalDir</p><h3 id="使用-2" tabindex="-1"><a class="header-anchor" href="#使用-2" aria-hidden="true">#</a> 使用</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>C:\\Users\\Hasee&gt;scoop
Usage: scoop &lt;command&gt; [&lt;args&gt;]

Available commands are listed below.

Type &#39;scoop help &lt;command&gt;&#39; to get more help for a specific command.

Command    Summary
-------    -------
alias      Manage scoop aliases
bucket     Manage Scoop buckets
cache      Show or clear the download cache
cat        Show content of specified manifest.
checkup    Check for potential problems
cleanup    Cleanup apps by removing old versions
config     Get or set configuration values
create     Create a custom app manifest
depends    List dependencies for an app, in the order they&#39;ll be installed
download   Download apps in the cache folder and verify hashes
export     Exports installed apps, buckets (and optionally configs) in JSON format
help       Show help for a command
hold       Hold an app to disable updates
home       Opens the app homepage
import     Imports apps, buckets and configs from a Scoopfile in JSON format
info       Display information about an app
install    Install apps
list       List installed apps
prefix     Returns the path to the specified app
reset      Reset an app to resolve conflicts
search     Search available apps
shim       Manipulate Scoop shims
status     Show status and check for new app versions
unhold     Unhold an app to enable updates
uninstall  Uninstall an app
update     Update apps, or Scoop itself
virustotal Look for app&#39;s hash or url on virustotal.com
which      Locate a shim/executable (similar to &#39;which&#39; on Linux)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>scoop install nodejs                                                    
Installing &#39;nodejs&#39; (18.4.0) [64bit]                                            
node-v18.4.0-win-x64.7z (17.3 MB) [===================================] 100%    
Checking hash of node-v18.4.0-win-x64.7z ... ok.                                
Extracting node-v18.4.0-win-x64.7z ... done.                                    
Linking ~\\scoop\\apps\\nodejs\\current =&gt; ~\\scoop\\apps\\nodejs\\18.4.0               
Persisting bin                                                                  
Persisting cache                                                                
Running post_install script...                                                  
&#39;nodejs&#39; (18.4.0) was installed successfully!       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="安装缓慢" tabindex="-1"><a class="header-anchor" href="#安装缓慢" aria-hidden="true">#</a> 安装缓慢</h4><p>可以指定环境变量 <code>HTTP_PROXY</code> 设置代理地址来加速</p><h3 id="卸载-1" tabindex="-1"><a class="header-anchor" href="#卸载-1" aria-hidden="true">#</a> 卸载</h3><p>直接删除 <code>SCOOP</code> <code>SCOOP_GLOBAL</code> 环境变量所指的文件夹 可以完全删除</p>`,13);function P(C,q){const n=r("ExternalLinkIcon");return t(),o("div",null,[c,a("p",null,[e("chocolatey 并非微软官方的包管理器，但却是最受欢迎的包管理器 "),a("a",p,[e("chocolatey官网"),s(n)]),a("a",u,[e("官方安装文档"),s(n)]),a("a",h,[e("官方配置文档"),s(n)])]),v,a("p",null,[a("a",m,[e("微软官方文档"),s(n)]),a("a",b,[e("winget-GitHub"),s(n)]),e(" winget 是微软官方的包管理器。虽没有chocolatey受欢迎，但还是可以的")]),g,a("p",null,[e("前往"),a("a",f,[e("winget-GitHub"),s(n)]),e(" 下载你需要安装版本的安装包 "),k,e(" 下,文件后戳为 "),x,e(" 的安装包 下载完成后双击安装")]),w,a("p",null,[e("打开 PowerShell 终端 (version 5.1 or later) 然后 运行: "),a("a",S,[e("项目地址github"),s(n)]),a("a",_,[e("安装文档github"),s(n)])]),y])}const L=l(d,[["render",P],["__file","windows 下包管理器.html.vue"]]);export{L as default};
