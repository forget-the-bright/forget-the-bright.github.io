---
icon: edit
date: 2022-10-17
category:
  - Docker
headerDepth: 5
---


# Docker 安装 minio
```
docker  run -d --name minio \
-p 9000:9000  \
-p 9001:9001  \
--restart=always \
-e MINIO_ACCESS_KEY=minio \
-e MINIO_SECRET_KEY=minio123 \
-e "MINIO_BROWSER_REDIRECT_URL=https://local.wuanwanghao.top:9001" \
-e "MINIO_SERVER_URL=https://local.wuanwanghao.top:9000" \
-v /home/wanghao/minio/config:/root/.minio \
-v /home/wanghao/minio/data1:/data1 \
-v /home/wanghao/minio/data2:/data2 \
-v /home/wanghao/minio/data3:/data3 \
-v /home/wanghao/minio/data4:/data4 \
minio/minio server /data{1...4} --console-address ":9001" -address ":9000"
```