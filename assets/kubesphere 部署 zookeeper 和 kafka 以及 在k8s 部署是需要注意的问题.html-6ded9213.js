import{_ as e,W as t,X as p,Z as a,$ as n,a0 as l,a2 as i,C as o}from"./framework-3a0c4e99.js";const c={},u=i(`<h1 id="kubesphere-部署-zookeeper-和-kafka-以及-在k8s-部署是需要注意的问题" tabindex="-1"><a class="header-anchor" href="#kubesphere-部署-zookeeper-和-kafka-以及-在k8s-部署是需要注意的问题" aria-hidden="true">#</a> kubesphere 部署 zookeeper 和 kafka 以及 在k8s 部署是需要注意的问题</h1><h2 id="搭建zookeeper" tabindex="-1"><a class="header-anchor" href="#搭建zookeeper" aria-hidden="true">#</a> 搭建zookeeper</h2><p>选用镜像是官方镜像 zookeeper 内存和cpu 限制不用给太多</p><figure><img src="https://local.wuanwanghao.top:9000/test/test/image-1678374469184.png" alt="image-1678374469184" tabindex="0" loading="lazy"><figcaption>image-1678374469184</figcaption></figure><p>创建配置字典 和存储卷 用于持久化数据 和挂载配置文件</p><p>存储卷 自行创建</p><p>配置字典 <img src="https://local.wuanwanghao.top:9000/test/test/image-1678374651276.png" alt="image-1678374651276" loading="lazy"></p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>dataDir=/data  # 保存zookeeper中的数据
clientPort=2181 # 客户端连接端口，通常不做修改
dataLogDir=/datalog
tickTime=2000  # 通信心跳时间
initLimit=5    # LF(leader - follower)初始通信时限
syncLimit=2    # LF 同步通信时限
autopurge.snapRetainCount=3
autopurge.purgeInterval=0
maxClientCnxns=60
standaloneEnabled=true
admin.enableServer=true
server.1=localhost:2888:3888;2181

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deployment.yml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> zookeeper
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> wanghao
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> zookeeper
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubesphere.io/creator</span><span class="token punctuation">:</span> admin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> zookeeper
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> zookeeper
      <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
        <span class="token key atrule">kubesphere.io/restartedAt</span><span class="token punctuation">:</span> <span class="token string">&#39;2023-03-08T01:47:35.415Z&#39;</span>
        <span class="token key atrule">logging.kubesphere.io/logsidecar-config</span><span class="token punctuation">:</span> <span class="token string">&#39;{}&#39;</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> host<span class="token punctuation">-</span>time
          <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /etc/localtime
            <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>nffzxk
          <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> zookeeper
            <span class="token key atrule">defaultMode</span><span class="token punctuation">:</span> <span class="token number">420</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>2lak5i
          <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
            <span class="token key atrule">claimName</span><span class="token punctuation">:</span> zookeeper
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> container<span class="token punctuation">-</span>oryqbp
          <span class="token key atrule">image</span><span class="token punctuation">:</span> zookeeper
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tcp<span class="token punctuation">-</span><span class="token number">2181</span>
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">2181</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tcp<span class="token punctuation">-</span><span class="token number">2888</span>
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">2888</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tcp<span class="token punctuation">-</span><span class="token number">3888</span>
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3888</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tcp<span class="token punctuation">-</span><span class="token number">8080</span>
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 500m
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> host<span class="token punctuation">-</span>time
              <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/localtime
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>nffzxk
              <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /conf/zoo.cfg
              <span class="token key atrule">subPath</span><span class="token punctuation">:</span> zoo.cfg
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>2lak5i
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
          <span class="token key atrule">terminationMessagePath</span><span class="token punctuation">:</span> /dev/termination<span class="token punctuation">-</span>log
          <span class="token key atrule">terminationMessagePolicy</span><span class="token punctuation">:</span> File
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">dnsPolicy</span><span class="token punctuation">:</span> ClusterFirst
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">kubernetes.io/hostname</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>node3
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> default
      <span class="token key atrule">serviceAccount</span><span class="token punctuation">:</span> default
      <span class="token key atrule">securityContext</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token key atrule">schedulerName</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>scheduler
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>f6d8
  <span class="token key atrule">podManagementPolicy</span><span class="token punctuation">:</span> OrderedReady
  <span class="token key atrule">updateStrategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">partition</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="搭建kafka" tabindex="-1"><a class="header-anchor" href="#搭建kafka" aria-hidden="true">#</a> 搭建kafka</h2><p>选用镜像 <code>wurstmeister/zookeeper</code><img src="https://local.wuanwanghao.top:9000/test/test/image-1678375058969.png" alt="image-1678375058969" loading="lazy"> 启动是添加环境变量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> KAFKA_BROKER_ID：0   #该ID是集群的唯一标识

 KAFKA_ADVERTISED_LISTENERS：PLAINTEXT://local.wuanwanghao.top:9092  #kafka发布到zookeeper供客户端使用的服务地址。

 KAFKA_ZOOKEEPER_CONNECT： zookeeper.wanghao:2181 #zk的连接地址

 KAFKA_LISTENERS：PLAINTEXT://0.0.0.0:9092 #允许使用PLAINTEXT侦听器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),r=a("code",null,"kafka",-1),k={href:"https://github.com/wurstmeister/kafka-docker/issues/122",target:"_blank",rel:"noopener noreferrer"};function d(v,m){const s=o("ExternalLinkIcon");return t(),p("div",null,[u,a("p",null,[n("主要一点创建kafka 相应服务的时候一定不要把服务名称定义为"),r,n(", 相关问题以踩坑 "),a("a",k,[n("Invalid value tcp://10.0.35.234:9092 for configuration port: Not a number of type INT"),l(s)])])])}const y=e(c,[["render",d],["__file","kubesphere 部署 zookeeper 和 kafka 以及 在k8s 部署是需要注意的问题.html.vue"]]);export{y as default};
