---
icon: edit
date: 2023-02-17
category:
  - Java
headerDepth: 5
---


# java 动态执行代码，可以从数据库·拉代码执行的方式例子
```DynamicJavaCompilerUtil.java```
```java
import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;
import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Arrays;
import java.util.stream.Collectors;

public class DynamicJavaCompilerUtil {

    static String tmpPath = "./tmp";


    public static void Test() throws IOException {
        String code = new String("public class T4{  " +
                "static void print(String a){ " +
                "System.out.println(\"Hello world! \"+ a);" +
                "}" +
                "static void print(){ " +
                "System.out.println(\"Hello world! \");" +
                "}" +
                "static void print(Integer a,String b){ " +
                "System.out.println(\"Hello world! \"+a+b);" +
                "}" +
                "}");
        CompilerToRun(code, "T4", "print", 1, "  2");
    }

    /*
     * @param Code 代码字符串
     * @param ClassName 类名
     * @param MethodName  需要执行的方法名
     * @param MethodParam  需要执行的方法的参数
     */
    public static void CompilerToRun(String Code, String ClassName, String MethodName, Object... MethodParam) throws IOException {
        isDirExists(new File(tmpPath));
        File file = new File(tmpPath + "/" + ClassName + ".java");
        RandomAccessFile accessFile = null;
        try {
            accessFile = new RandomAccessFile(file, "rw");
            accessFile.write(Code.getBytes());
            JavaCompiler compiler = ToolProvider.getSystemJavaCompiler(); //调用动态编译的工具
            int result = compiler.run(null, null, null, tmpPath + "/" + ClassName + ".java"); //进行动态编译，并返回结果
            if (result != 0) {
                throw new RuntimeException("编译失败");
            }
            //通过反射方法动态执行
            //1、首先构建文件的目录url地址，
            URL[] urls = new URL[]{new URL("file:" + tmpPath + "/")};
            //2、使用URLClassLoader对象的loadClass方法加载对应类
            URLClassLoader loder = new URLClassLoader(urls);
            //3、获取所加载类的方法
            Class clazz = loder.loadClass(ClassName);

            Class[] MethodParamClass = Arrays.asList(MethodParam).stream().map(Object::getClass).collect(Collectors.toList()).toArray(new Class[]{});
            // 4、传入方法所需的参数通过invoke运行方法
            Method method = clazz.getDeclaredMethod(MethodName, MethodParamClass);
            method.setAccessible(true);
            method.invoke(null, MethodParam); //当类型为String[]时，需要(Object)new String[] {}初始化
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (InvocationTargetException e) {
            throw new RuntimeException(e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        } finally {
            accessFile.close();
            deleteFile(new File(tmpPath));
        }

    }

    private static void isDirExists(File file) {
        if (!file.exists()) {
            file.mkdir();
        }
    }

    private static Boolean deleteFile(File file) {
        //判断文件不为null或文件目录存在
        if (file == null || !file.exists()) {
            System.out.println("文件删除失败,请检查文件是否存在以及文件路径是否正确");
            return false;
        }
        //获取目录下子文件
        File[] files = file.listFiles();
        //遍历该目录下的文件对象
        for (File f : files) {
            //判断子目录是否存在子目录,如果是文件则删除
            if (f.isDirectory()) {
                //递归删除目录下的文件
                deleteFile(f);
            } else {
                //文件删除
                f.delete();
                //打印文件名
                System.out.println("文件名：" + f.getName());
            }
        }
        //文件夹删除
        file.delete();
        System.out.println("目录名：" + file.getName());
        return true;
    }
}

```