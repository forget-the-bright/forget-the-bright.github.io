import{_ as n,W as s,X as a,a2 as t}from"./framework-3a0c4e99.js";const e={},p=t(`<h1 id="python-运行-opcua" tabindex="-1"><a class="header-anchor" href="#python-运行-opcua" aria-hidden="true">#</a> python 运行 opcua</h1><p>pip 安装 opcua</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> opcua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>opcua 客户端</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> opcua <span class="token keyword">import</span> Client
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
 client <span class="token operator">=</span> Client<span class="token punctuation">(</span><span class="token string">&quot;opc.tcp://localhost:4840/freeopcua/server/&quot;</span><span class="token punctuation">)</span>
 <span class="token comment"># client = Client(&quot;opc.tcp://admin@localhost:4840/freeopcua/server/&quot;) #connect using a user</span>
 <span class="token keyword">try</span><span class="token punctuation">:</span>
     client<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token comment"># Client has a few methods to get proxy to UA nodes that should always be in address space such as Root or Objects</span>
     root <span class="token operator">=</span> client<span class="token punctuation">.</span>get_root_node<span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Objects node is: &quot;</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span>
     <span class="token comment"># Node objects have methods to read and write node attributes as well as browse or populate address space</span>
     <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Children of root are: &quot;</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>get_children<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
     <span class="token comment"># get a specific node knowing its node id</span>
     <span class="token comment">#var = client.get_node(ua.NodeId(1002, 2))</span>
     <span class="token comment">#var = client.get_node(&quot;ns=3;i=2002&quot;)</span>
     <span class="token comment">#print(var)</span>
     <span class="token comment">#var.get_data_value() # get value of node as a DataValue object</span>
     <span class="token comment">#var.get_value() # get value of node as a python builtin</span>
     <span class="token comment">#var.set_value(ua.Variant([23], ua.VariantType.Int64)) #set node value using explicit data type</span>
     <span class="token comment">#var.set_value(3.9) # set node value using implicit data type</span>
     <span class="token comment"># Now getting a variable node using its browse path</span>
     myvar <span class="token operator">=</span> root<span class="token punctuation">.</span>get_child<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;0:Objects&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2:MyObject&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2:MyVariable&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
     obj <span class="token operator">=</span> root<span class="token punctuation">.</span>get_child<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;0:Objects&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2:MyObject&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
     <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;myvar is: &quot;</span><span class="token punctuation">,</span> myvar<span class="token punctuation">)</span>
     <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;myobj is: &quot;</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
     <span class="token comment"># Stacked myvar access</span>
     <span class="token comment"># print(&quot;myvar is: &quot;, root.get_children()[0].get_children()[1].get_variables()[0].get_value())</span>
 <span class="token keyword">finally</span><span class="token punctuation">:</span>
    client<span class="token punctuation">.</span>disconnect<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>opcua 服务端</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> sys
sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;..&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">import</span> time
<span class="token keyword">from</span> opcua <span class="token keyword">import</span> ua<span class="token punctuation">,</span> Server
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
 <span class="token comment"># setup our server</span>
 server <span class="token operator">=</span> Server<span class="token punctuation">(</span><span class="token punctuation">)</span>
 server<span class="token punctuation">.</span>set_endpoint<span class="token punctuation">(</span><span class="token string">&quot;opc.tcp://0.0.0.0:4840/freeopcua/server/&quot;</span><span class="token punctuation">)</span>
 <span class="token comment"># setup our own namespace, not really necessary but should as spec</span>
 uri <span class="token operator">=</span> <span class="token string">&quot;http://examples.freeopcua.github.io&quot;</span>
 idx <span class="token operator">=</span> server<span class="token punctuation">.</span>register_namespace<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>
 <span class="token comment"># get Objects node, this is where we should put our nodes</span>
 objects <span class="token operator">=</span> server<span class="token punctuation">.</span>get_objects_node<span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token keyword">print</span><span class="token punctuation">(</span>objects<span class="token punctuation">)</span>
 <span class="token comment"># populating our address space</span>
 myobj <span class="token operator">=</span> objects<span class="token punctuation">.</span>add_object<span class="token punctuation">(</span>idx<span class="token punctuation">,</span> <span class="token string">&quot;MyObject&quot;</span><span class="token punctuation">)</span>
 myvar <span class="token operator">=</span> myobj<span class="token punctuation">.</span>add_variable<span class="token punctuation">(</span>idx<span class="token punctuation">,</span> <span class="token string">&quot;MyVariable&quot;</span><span class="token punctuation">,</span> <span class="token number">6.7</span><span class="token punctuation">)</span>
 myvar<span class="token punctuation">.</span>set_writable<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># Set MyVariable to be writable by clients</span>
 <span class="token comment"># starting!</span>
 server<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token keyword">try</span><span class="token punctuation">:</span>
     count <span class="token operator">=</span> <span class="token number">0</span>
     <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
         time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
         count <span class="token operator">+=</span> <span class="token number">0.1</span>
         myvar<span class="token punctuation">.</span>set_value<span class="token punctuation">(</span>count<span class="token punctuation">)</span>
 <span class="token keyword">finally</span><span class="token punctuation">:</span>
 <span class="token comment">#close connection, remove subcsriptions, etc</span>
    server<span class="token punctuation">.</span>stop<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","python 运行 opcua.html.vue"]]);export{r as default};
