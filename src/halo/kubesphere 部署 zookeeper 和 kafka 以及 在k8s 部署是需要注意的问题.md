---
icon: edit
date: 2023-03-09
category:
  - 系统配置
headerDepth: 5
---


# kubesphere 部署 zookeeper 和 kafka 以及 在k8s 部署是需要注意的问题
## 搭建zookeeper
选用镜像是官方镜像 zookeeper 内存和cpu 限制不用给太多

![image-1678374469184](https://local.wuanwanghao.top:9000/test/test/image-1678374469184.png)

创建配置字典 和存储卷 用于持久化数据 和挂载配置文件
 
 存储卷 自行创建
 
 配置字典
 ![image-1678374651276](https://local.wuanwanghao.top:9000/test/test/image-1678374651276.png)
 ```conf
 dataDir=/data  # 保存zookeeper中的数据
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

 ```
 
 
deployment.yml
```yml
kind: StatefulSet
apiVersion: apps/v1
metadata:
  name: zookeeper
  namespace: wanghao
  labels:
    app: zookeeper
  annotations:
    kubesphere.io/creator: admin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: zookeeper
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: zookeeper
      annotations:
        kubesphere.io/restartedAt: '2023-03-08T01:47:35.415Z'
        logging.kubesphere.io/logsidecar-config: '{}'
    spec:
      volumes:
        - name: host-time
          hostPath:
            path: /etc/localtime
            type: ''
        - name: volume-nffzxk
          configMap:
            name: zookeeper
            defaultMode: 420
        - name: volume-2lak5i
          persistentVolumeClaim:
            claimName: zookeeper
      containers:
        - name: container-oryqbp
          image: zookeeper
          ports:
            - name: tcp-2181
              containerPort: 2181
              protocol: TCP
            - name: tcp-2888
              containerPort: 2888
              protocol: TCP
            - name: tcp-3888
              containerPort: 3888
              protocol: TCP
            - name: tcp-8080
              containerPort: 8080
              protocol: TCP
          resources:
            limits:
              cpu: 500m
              memory: 200Mi
          volumeMounts:
            - name: host-time
              readOnly: true
              mountPath: /etc/localtime
            - name: volume-nffzxk
              readOnly: true
              mountPath: /conf/zoo.cfg
              subPath: zoo.cfg
            - name: volume-2lak5i
              mountPath: /data
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          imagePullPolicy: IfNotPresent
      restartPolicy: Always
      terminationGracePeriodSeconds: 30
      dnsPolicy: ClusterFirst
      nodeSelector:
        kubernetes.io/hostname: k8s-node3
      serviceAccountName: default
      serviceAccount: default
      securityContext: {}
      schedulerName: default-scheduler
  serviceName: zookeeper-f6d8
  podManagementPolicy: OrderedReady
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      partition: 0
  revisionHistoryLimit: 10
```


## 搭建kafka
选用镜像 ```wurstmeister/zookeeper```
![image-1678375058969](https://local.wuanwanghao.top:9000/test/test/image-1678375058969.png)
启动是添加环境变量
```  
 KAFKA_BROKER_ID：0   #该ID是集群的唯一标识

 KAFKA_ADVERTISED_LISTENERS：PLAINTEXT://local.wuanwanghao.top:9092  #kafka发布到zookeeper供客户端使用的服务地址。

 KAFKA_ZOOKEEPER_CONNECT： zookeeper.wanghao:2181 #zk的连接地址

 KAFKA_LISTENERS：PLAINTEXT://0.0.0.0:9092 #允许使用PLAINTEXT侦听器
```


主要一点创建kafka 相应服务的时候一定不要把服务名称定义为```kafka```,
相关问题以踩坑 [Invalid value tcp://10.0.35.234:9092 for configuration port: Not a number of type INT](https://github.com/wurstmeister/kafka-docker/issues/122)