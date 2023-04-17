import{_ as l,W as d,X as r,Z as n,$ as s,a0 as a,a2 as i,C as t}from"./framework-3a0c4e99.js";const c={},o=i(`<h1 id="linux-安装kubernetes" tabindex="-1"><a class="header-anchor" href="#linux-安装kubernetes" aria-hidden="true">#</a> Linux 安装Kubernetes</h1><h1 id="kubeadm创建集群" tabindex="-1"><a class="header-anchor" href="#kubeadm创建集群" aria-hidden="true">#</a> kubeadm创建集群</h1><blockquote><p>请参照以前Docker安装。先提前为所有机器安装Docker</p></blockquote><p>1、安装kubeadm</p><ul><li>一台兼容的 Linux 主机。Kubernetes 项目为基于 Debian 和 Red Hat 的 Linux 发行版以及一些不提供包管理器的发行版提供通用的指令</li><li>每台机器 2 GB 或更多的 RAM （如果少于这个数字将会影响你应用的运行内存)</li><li>2 CPU 核或更多</li><li>集群中的所有机器的网络彼此均能相互连接(公网和内网都可以) <ul><li>设置防火墙放行规则</li></ul></li><li>节点之中不可以有重复的主机名、MAC 地址或 product_uuid。请参见这里了解更多详细信息。 <ul><li>设置不同hostname</li></ul></li><li>开启机器上的某些端口。请参见这里 了解更多详细信息。 <ul><li>内网互信</li></ul></li><li>禁用交换分区。为了保证 kubelet 正常工作，你 必须 禁用交换分区。 <ul><li>永久关闭</li></ul></li></ul><h3 id="_1、基础环境" tabindex="-1"><a class="header-anchor" href="#_1、基础环境" aria-hidden="true">#</a> 1、基础环境</h3><blockquote><p>所有机器执行以下操作</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#各个机器设置自己的域名</span>
hostnamectl set-hostname xxxx


<span class="token comment"># 将 SELinux 设置为 permissive 模式（相当于将其禁用）</span>
<span class="token function">sudo</span> setenforce <span class="token number">0</span>
<span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=enforcing$/SELINUX=permissive/&#39;</span> /etc/selinux/config

<span class="token comment">#关闭swap</span>
swapoff <span class="token parameter variable">-a</span>  
<span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">&#39;s/.*swap.*/#&amp;/&#39;</span> /etc/fstab

<span class="token comment">#允许 iptables 检查桥接流量</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/modules-load.d/k8s.conf</span>
br_netfilter
EOF</span>

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/sysctl.d/k8s.conf</span>
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF</span>
<span class="token function">sudo</span> <span class="token function">sysctl</span> <span class="token parameter variable">--system</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、安装kubelet、kubeadm、kubectl" tabindex="-1"><a class="header-anchor" href="#_2、安装kubelet、kubeadm、kubectl" aria-hidden="true">#</a> 2、安装kubelet、kubeadm、kubectl</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
   http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF</span>


<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.20.9 kubeadm-1.20.9 kubectl-1.20.9 <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes

<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>kubelet 现在每隔几秒就会重启，因为它陷入了一个等待 kubeadm 指令的死循环</p></blockquote><h2 id="_2、使用kubeadm引导集群" tabindex="-1"><a class="header-anchor" href="#_2、使用kubeadm引导集群" aria-hidden="true">#</a> 2、使用kubeadm引导集群</h2><h3 id="_1、下载各个机器需要的镜像" tabindex="-1"><a class="header-anchor" href="#_1、下载各个机器需要的镜像" aria-hidden="true">#</a> 1、下载各个机器需要的镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">tee</span> ./images.sh <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
#!/bin/bash
images=(
kube-apiserver:v1.20.9
kube-proxy:v1.20.9
kube-controller-manager:v1.20.9
kube-scheduler:v1.20.9
coredns:1.7.0
etcd:3.4.13-0
pause:3.2
)
for imageName in \${images[@]} ; do
docker pull registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/$imageName
done
EOF</span>
   
<span class="token function">chmod</span> +x ./images.sh <span class="token operator">&amp;&amp;</span> ./images.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、初始化主节点" tabindex="-1"><a class="header-anchor" href="#_2、初始化主节点" aria-hidden="true">#</a> 2、初始化主节点</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#所有机器添加master域名映射，以下需要修改为自己的</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;172.31.0.4  cluster-endpoint&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/hosts



<span class="token comment">#主节点初始化</span>
kubeadm init <span class="token punctuation">\\</span>
--apiserver-advertise-address<span class="token operator">=</span><span class="token number">172.31</span>.0.4 <span class="token punctuation">\\</span>
--control-plane-endpoint<span class="token operator">=</span>cluster-endpoint <span class="token punctuation">\\</span>
--image-repository registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images <span class="token punctuation">\\</span>
--kubernetes-version v1.20.9 <span class="token punctuation">\\</span>
--service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/16 <span class="token punctuation">\\</span>
--pod-network-cidr<span class="token operator">=</span><span class="token number">192.168</span>.0.0/16

<span class="token comment">#所有网络范围不重叠</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Your Kubernetes control-plane has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:

  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
  <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
  <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

Alternatively, <span class="token keyword">if</span> you are the root user, you can run:

  <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run <span class="token string">&quot;kubectl apply -f [podnetwork].yaml&quot;</span> with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now <span class="token function">join</span> any number of control-plane nodes by copying certificate authorities
and <span class="token function">service</span> account keys on each <span class="token function">node</span> and <span class="token keyword">then</span> running the following as root:

  kubeadm <span class="token function">join</span> cluster-endpoint:6443 <span class="token parameter variable">--token</span> hums8f.vyx71prsg74ofce7 <span class="token punctuation">\\</span>
    --discovery-token-ca-cert-hash sha256:a394d059dd51d68bb007a532a037d0a477131480ae95f75840c461e85e2c6ae3 <span class="token punctuation">\\</span>
    --control-plane 

Then you can <span class="token function">join</span> any number of worker nodes by running the following on each as root:

kubeadm <span class="token function">join</span> cluster-endpoint:6443 <span class="token parameter variable">--token</span> hums8f.vyx71prsg74ofce7 <span class="token punctuation">\\</span>
    --discovery-token-ca-cert-hash sha256:a394d059dd51d68bb007a532a037d0a477131480ae95f75840c461e85e2c6ae3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看集群所有节点</span>
kubectl get nodes

<span class="token comment">#根据配置文件，给集群创建资源</span>
kubectl apply <span class="token parameter variable">-f</span> xxxx.yaml

<span class="token comment">#查看集群部署了哪些应用？</span>
<span class="token function">docker</span> <span class="token function">ps</span>   <span class="token operator">==</span><span class="token operator">=</span>   kubectl get pods <span class="token parameter variable">-A</span>
<span class="token comment"># 运行中的应用在docker里面叫容器，在k8s里面叫Pod</span>
kubectl get pods <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、根据提示继续" tabindex="-1"><a class="header-anchor" href="#_3、根据提示继续" aria-hidden="true">#</a> 3、根据提示继续</h3><blockquote><p>master成功后提示如下： <img src="https://local.wuanwanghao.top:30549/upload/2021/10/image-d246070956b74a95bef1c2b9fd9f19dd.png" alt="image.png" loading="lazy"></p></blockquote><h4 id="_1、设置-kube-config" tabindex="-1"><a class="header-anchor" href="#_1、设置-kube-config" aria-hidden="true">#</a> 1、设置.kube/config</h4><p>复制上面命令</p><h4 id="_2、安装网络组件" tabindex="-1"><a class="header-anchor" href="#_2、安装网络组件" aria-hidden="true">#</a> 2、安装网络组件</h4>`,23),u={href:"https://docs.projectcalico.org/getting-started/kubernetes/self-managed-onprem/onpremises#install-calico-with-kubernetes-api-datastore-more-than-50-nodes",target:"_blank",rel:"noopener noreferrer"},v=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> https://docs.projectcalico.org/manifests/calico.yaml <span class="token parameter variable">-O</span>

kubectl apply <span class="token parameter variable">-f</span> calico.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、加入node节点" tabindex="-1"><a class="header-anchor" href="#_4、加入node节点" aria-hidden="true">#</a> 4、加入node节点</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm <span class="token function">join</span> cluster-endpoint:6443 <span class="token parameter variable">--token</span> x5g4uy.wpjjdbgra92s25pp <span class="token punctuation">\\</span>
	--discovery-token-ca-cert-hash sha256:6255797916eaee52bf9dda9429db616fcd828436708345a308f4b917d3457a22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>新令牌 kubeadm token create --print-join-command</p></blockquote><blockquote><p>高可用部署方式，也是在这一步的时候，使用添加主节点的命令即可</p></blockquote><h3 id="_5、验证集群" tabindex="-1"><a class="header-anchor" href="#_5、验证集群" aria-hidden="true">#</a> 5、验证集群</h3><ul><li>验证集群节点状态 <ul><li>kubectl get nodes</li></ul></li></ul><h3 id="_6、部署dashboard" tabindex="-1"><a class="header-anchor" href="#_6、部署dashboard" aria-hidden="true">#</a> 6、部署dashboard</h3><h4 id="_1、部署" tabindex="-1"><a class="header-anchor" href="#_1、部署" aria-hidden="true">#</a> 1、部署</h4>`,9),p={href:"https://github.com/kubernetes/dashboard",target:"_blank",rel:"noopener noreferrer"},b=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Copyright 2017 The Kubernetes Authors.</span>
<span class="token comment">#</span>
<span class="token comment"># Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);</span>
<span class="token comment"># you may not use this file except in compliance with the License.</span>
<span class="token comment"># You may obtain a copy of the License at</span>
<span class="token comment">#</span>
<span class="token comment">#     http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">#</span>
<span class="token comment"># Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment"># distributed under the License is distributed on an &quot;AS IS&quot; BASIS,</span>
<span class="token comment"># WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
<span class="token comment"># See the License for the specific language governing permissions and</span>
<span class="token comment"># limitations under the License.</span>

apiVersion: v1
kind: Namespace
metadata:
  name: kubernetes-dashboard

---

apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard

---

kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  ports:
    - port: <span class="token number">443</span>
      targetPort: <span class="token number">8443</span>
  selector:
    k8s-app: kubernetes-dashboard

---

apiVersion: v1
kind: Secret
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-certs
  namespace: kubernetes-dashboard
type: Opaque

---

apiVersion: v1
kind: Secret
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-csrf
  namespace: kubernetes-dashboard
type: Opaque
data:
  csrf: <span class="token string">&quot;&quot;</span>

---

apiVersion: v1
kind: Secret
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-key-holder
  namespace: kubernetes-dashboard
type: Opaque

---

kind: ConfigMap
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-settings
  namespace: kubernetes-dashboard

---

kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
rules:
  <span class="token comment"># Allow Dashboard to get, update and delete Dashboard exclusive secrets.</span>
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;secrets&quot;</span><span class="token punctuation">]</span>
    resourceNames: <span class="token punctuation">[</span><span class="token string">&quot;kubernetes-dashboard-key-holder&quot;</span>, <span class="token string">&quot;kubernetes-dashboard-certs&quot;</span>, <span class="token string">&quot;kubernetes-dashboard-csrf&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span>, <span class="token string">&quot;update&quot;</span>, <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
    <span class="token comment"># Allow Dashboard to get and update &#39;kubernetes-dashboard-settings&#39; config map.</span>
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;configmaps&quot;</span><span class="token punctuation">]</span>
    resourceNames: <span class="token punctuation">[</span><span class="token string">&quot;kubernetes-dashboard-settings&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span>, <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
    <span class="token comment"># Allow Dashboard to get metrics.</span>
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;services&quot;</span><span class="token punctuation">]</span>
    resourceNames: <span class="token punctuation">[</span><span class="token string">&quot;heapster&quot;</span>, <span class="token string">&quot;dashboard-metrics-scraper&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;proxy&quot;</span><span class="token punctuation">]</span>
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;services/proxy&quot;</span><span class="token punctuation">]</span>
    resourceNames: <span class="token punctuation">[</span><span class="token string">&quot;heapster&quot;</span>, <span class="token string">&quot;http:heapster:&quot;</span>, <span class="token string">&quot;https:heapster:&quot;</span>, <span class="token string">&quot;dashboard-metrics-scraper&quot;</span>, <span class="token string">&quot;http:dashboard-metrics-scraper&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">]</span>

---

kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
rules:
  <span class="token comment"># Allow Metrics Scraper to get metrics from the Metrics server</span>
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;metrics.k8s.io&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span>, <span class="token string">&quot;nodes&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span>, <span class="token string">&quot;list&quot;</span>, <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>

---

apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kubernetes-dashboard
subjects:
  - kind: ServiceAccount
    name: kubernetes-dashboard
    namespace: kubernetes-dashboard

---

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kubernetes-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubernetes-dashboard
subjects:
  - kind: ServiceAccount
    name: kubernetes-dashboard
    namespace: kubernetes-dashboard

---

kind: Deployment
apiVersion: apps/v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  replicas: <span class="token number">1</span>
  revisionHistoryLimit: <span class="token number">10</span>
  selector:
    matchLabels:
      k8s-app: kubernetes-dashboard
  template:
    metadata:
      labels:
        k8s-app: kubernetes-dashboard
    spec:
      containers:
        - name: kubernetes-dashboard
          image: kubernetesui/dashboard:v2.3.1
          imagePullPolicy: Always
          ports:
            - containerPort: <span class="token number">8443</span>
              protocol: TCP
          args:
            - --auto-generate-certificates
            - <span class="token parameter variable">--namespace</span><span class="token operator">=</span>kubernetes-dashboard
            <span class="token comment"># Uncomment the following line to manually specify Kubernetes API server Host</span>
            <span class="token comment"># If not specified, Dashboard will attempt to auto discover the API server and connect</span>
            <span class="token comment"># to it. Uncomment only if the default does not work.</span>
            <span class="token comment"># - --apiserver-host=http://my-address:port</span>
          volumeMounts:
            - name: kubernetes-dashboard-certs
              mountPath: /certs
              <span class="token comment"># Create on-disk volume to store exec logs</span>
            - mountPath: /tmp
              name: tmp-volume
          livenessProbe:
            httpGet:
              scheme: HTTPS
              path: /
              port: <span class="token number">8443</span>
            initialDelaySeconds: <span class="token number">30</span>
            timeoutSeconds: <span class="token number">30</span>
          securityContext:
            allowPrivilegeEscalation: <span class="token boolean">false</span>
            readOnlyRootFilesystem: <span class="token boolean">true</span>
            runAsUser: <span class="token number">1001</span>
            runAsGroup: <span class="token number">2001</span>
      volumes:
        - name: kubernetes-dashboard-certs
          secret:
            secretName: kubernetes-dashboard-certs
        - name: tmp-volume
          emptyDir: <span class="token punctuation">{</span><span class="token punctuation">}</span>
      serviceAccountName: kubernetes-dashboard
      nodeSelector:
        <span class="token string">&quot;kubernetes.io/os&quot;</span><span class="token builtin class-name">:</span> linux
      <span class="token comment"># Comment the following tolerations if Dashboard must not be deployed on master</span>
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule

---

kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: dashboard-metrics-scraper
  name: dashboard-metrics-scraper
  namespace: kubernetes-dashboard
spec:
  ports:
    - port: <span class="token number">8000</span>
      targetPort: <span class="token number">8000</span>
  selector:
    k8s-app: dashboard-metrics-scraper

---

kind: Deployment
apiVersion: apps/v1
metadata:
  labels:
    k8s-app: dashboard-metrics-scraper
  name: dashboard-metrics-scraper
  namespace: kubernetes-dashboard
spec:
  replicas: <span class="token number">1</span>
  revisionHistoryLimit: <span class="token number">10</span>
  selector:
    matchLabels:
      k8s-app: dashboard-metrics-scraper
  template:
    metadata:
      labels:
        k8s-app: dashboard-metrics-scraper
      annotations:
        seccomp.security.alpha.kubernetes.io/pod: <span class="token string">&#39;runtime/default&#39;</span>
    spec:
      containers:
        - name: dashboard-metrics-scraper
          image: kubernetesui/metrics-scraper:v1.0.6
          ports:
            - containerPort: <span class="token number">8000</span>
              protocol: TCP
          livenessProbe:
            httpGet:
              scheme: HTTP
              path: /
              port: <span class="token number">8000</span>
            initialDelaySeconds: <span class="token number">30</span>
            timeoutSeconds: <span class="token number">30</span>
          volumeMounts:
          - mountPath: /tmp
            name: tmp-volume
          securityContext:
            allowPrivilegeEscalation: <span class="token boolean">false</span>
            readOnlyRootFilesystem: <span class="token boolean">true</span>
            runAsUser: <span class="token number">1001</span>
            runAsGroup: <span class="token number">2001</span>
      serviceAccountName: kubernetes-dashboard
      nodeSelector:
        <span class="token string">&quot;kubernetes.io/os&quot;</span><span class="token builtin class-name">:</span> linux
      <span class="token comment"># Comment the following tolerations if Dashboard must not be deployed on master</span>
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
      volumes:
        - name: tmp-volume
          emptyDir: <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、设置访问端口" tabindex="-1"><a class="header-anchor" href="#_2、设置访问端口" aria-hidden="true">#</a> 2、设置访问端口</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl edit svc kubernetes-dashboard <span class="token parameter variable">-n</span> kubernetes-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>type: ClusterIP 改为 type: NodePort</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get svc <span class="token parameter variable">-A</span> <span class="token operator">|</span><span class="token function">grep</span> kubernetes-dashboard
<span class="token comment">## 找到端口，在安全组放行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),m={href:"https://xn--IP-dh3cr99dn48ag92a",target:"_blank",rel:"noopener noreferrer"},k={href:"https://139.198.165.238:32759",target:"_blank",rel:"noopener noreferrer"},h=i(`<h4 id="_3、创建访问账号" tabindex="-1"><a class="header-anchor" href="#_3、创建访问账号" aria-hidden="true">#</a> 3、创建访问账号</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建访问账号，准备一个yaml文件； vi dash.yaml</span>
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> dash.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4、令牌访问" tabindex="-1"><a class="header-anchor" href="#_4、令牌访问" aria-hidden="true">#</a> 4、令牌访问</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#获取访问令牌</span>
kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get secret <span class="token variable"><span class="token variable">$(</span>kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get sa/admin-user <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&quot;{.secrets[0].name}&quot;</span><span class="token variable">)</span></span> <span class="token parameter variable">-o</span> go-template<span class="token operator">=</span><span class="token string">&quot;{{.data.token | base64decode}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>eyJhbGciOiJSUzI1NiIsImtpZCI6InpXSkU0TjhCUmVKQzBJaC03Nk9ES2NMZ1daRTRmQ1FMZU9rRUJ3VXRnM3MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLXgyczhmIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIzOTZmYjdlNS0wMjA2LTQxMjctOGQzYS0xMzRlODVmYjU0MDAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.Hf5mhl35_R0iBfBW7fF198h_klEnN6pRKfk_roAzOtAN-Aq21E4804PUhe9Rr9e_uFzLfoFDXacjJrHCuhiML8lpHIfJLK_vSD2pZNaYc2NWZq2Mso-BMGpObxGA23hW0nLQ5gCxlnxIAcyE76aYTAB6U8PxpvtVdgUknBVrwXG8UC_D8kHm9PTwa9jgbZfSYAfhOHWmZxNYo7CF2sHH-AT_WmIE8xLmB7J11vDzaunv92xoUoI0ju7OBA2WRr61bOmSd8WJgLCDcyBblxz4Wa-3zghfKlp0Rgb8l56AAI7ML_snF59X6JqaCuAcCJjIu0FUTS5DuyIObEeXY-z-Rw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5、界面 <img src="https://local.wuanwanghao.top:30549/upload/2021/10/image-0f8e1e2e40a24a7baf1b6535b9f70374.png" alt="image.png" loading="lazy"></p>`,7);function g(f,y){const e=t("ExternalLinkIcon");return d(),r("div",null,[o,n("p",null,[n("a",u,[s("calico官网"),a(e)])]),v,n("blockquote",null,[n("p",null,[s("kubernetes官方提供的可视化界面 "),n("a",p,[s("https://github.com/kubernetes/dashboard"),a(e)])])]),b,n("p",null,[s("访问： "),n("a",m,[s("https://集群任意IP"),a(e)]),s(":端口 "),n("a",k,[s("https://139.198.165.238:32759"),a(e)])]),h])}const x=l(c,[["render",g],["__file","Linux 安装Kubernetes .html.vue"]]);export{x as default};
