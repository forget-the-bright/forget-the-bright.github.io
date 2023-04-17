---
icon: edit
date: 2023-04-17
category:
  - Java
headerDepth: 5
---


# java 使用 ldap 例子
```java
import java.util.Hashtable;
import javax.naming.AuthenticationException;
import javax.naming.CommunicationException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;

public class AdTest {
    public AdTest() {
    }

    public static int connect(String host, String post, String username, String password) {
        DirContext ctx = null;
        int rs = 0;
        String domain = "@example.com"; //ldap 服务器域控
        String name = username.indexOf(domain) > 0 ? username : username + domain;
        Hashtable<String, String> HashEnv = new Hashtable();
        HashEnv.put("java.naming.security.authentication", "simple");
        HashEnv.put("java.naming.security.principal", name);
        HashEnv.put("java.naming.security.credentials", password);
        HashEnv.put("java.naming.factory.initial", "com.sun.jndi.ldap.LdapCtxFactory");
        HashEnv.put("com.sun.jndi.ldap.connect.timeout", "3000");
        HashEnv.put("java.naming.provider.url", "ldap://" + host + ":" + post);

        try {
            ctx = new InitialDirContext(HashEnv);
            System.out.println("身份验证成功!");
        } catch (AuthenticationException var22) {
            System.out.println("身份验证失败!");
            rs = 1;
            var22.printStackTrace();
        } catch (CommunicationException var23) {
            System.out.println("AD域连接失败!");
            rs = 2;
            var23.printStackTrace();
        } catch (Exception var24) {
            System.out.println("身份验证未知异常!");
            rs = 3;
            var24.printStackTrace();
        } finally {
            if (null != ctx) {
                try {
                    ctx.close();
                    ctx = null;
                } catch (Exception var21) {
                    var21.printStackTrace();
                }
            }

        }

        return rs;
    }
}
```