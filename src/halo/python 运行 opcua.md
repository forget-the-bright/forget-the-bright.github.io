---
icon: edit
date: 2022-12-26
category:
  - python
tag:
  - opcua
headerDepth: 5
---


# python 运行 opcua
pip 安装 opcua
``` shell
pip install opcua
```
opcua 客户端
```python
from opcua import Client
if __name__ == "__main__":
 client = Client("opc.tcp://localhost:4840/freeopcua/server/")
 # client = Client("opc.tcp://admin@localhost:4840/freeopcua/server/") #connect using a user
 try:
     client.connect()
     # Client has a few methods to get proxy to UA nodes that should always be in address space such as Root or Objects
     root = client.get_root_node()
     print("Objects node is: ", root)
     # Node objects have methods to read and write node attributes as well as browse or populate address space
     print("Children of root are: ", root.get_children())
     # get a specific node knowing its node id
     #var = client.get_node(ua.NodeId(1002, 2))
     #var = client.get_node("ns=3;i=2002")
     #print(var)
     #var.get_data_value() # get value of node as a DataValue object
     #var.get_value() # get value of node as a python builtin
     #var.set_value(ua.Variant([23], ua.VariantType.Int64)) #set node value using explicit data type
     #var.set_value(3.9) # set node value using implicit data type
     # Now getting a variable node using its browse path
     myvar = root.get_child(["0:Objects", "2:MyObject", "2:MyVariable"])
     obj = root.get_child(["0:Objects", "2:MyObject"])
     print("myvar is: ", myvar)
     print("myobj is: ", obj)
     # Stacked myvar access
     # print("myvar is: ", root.get_children()[0].get_children()[1].get_variables()[0].get_value())
 finally:
    client.disconnect()
```
opcua 服务端
```python
import sys
sys.path.insert(0, "..")
import time
from opcua import ua, Server
if __name__ == "__main__":
 # setup our server
 server = Server()
 server.set_endpoint("opc.tcp://0.0.0.0:4840/freeopcua/server/")
 # setup our own namespace, not really necessary but should as spec
 uri = "http://examples.freeopcua.github.io"
 idx = server.register_namespace(uri)
 # get Objects node, this is where we should put our nodes
 objects = server.get_objects_node()
 print(objects)
 # populating our address space
 myobj = objects.add_object(idx, "MyObject")
 myvar = myobj.add_variable(idx, "MyVariable", 6.7)
 myvar.set_writable() # Set MyVariable to be writable by clients
 # starting!
 server.start()
 try:
     count = 0
     while True:
         time.sleep(1)
         count += 0.1
         myvar.set_value(count)
 finally:
 #close connection, remove subcsriptions, etc
    server.stop()
```