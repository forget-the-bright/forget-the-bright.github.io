---
icon: edit
date: 2023-03-12
category:
  - 系统配置
headerDepth: 5
---


# linux 发布重启项目简单脚本命令
``` shell
cd $project_path
ps -ef | grep $bin_file | grep -v grep| awk '{print $2}' | xargs kill -9
nohup java -jar $project_path/$bin_file >catalina.out 2>&1 & 
```

**$project_path 替换为可执行文件的路径**

**$bin_file  替换为可执行文件的名称**

```cd $project_path``` 进入可执行文件目录
```ps -ef | grep $bin_file | grep -v grep| awk '{print $2}' | xargs kill -9``` 获取可执行文件的pid 进程id 然后结束该进程id
```nohup java -jar $project_path/$bin_file >catalina.out 2>&1 & ```  执行可执行文件并输出日志到指定文件