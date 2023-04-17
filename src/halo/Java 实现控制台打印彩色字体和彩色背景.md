---
icon: edit
date: 2022-10-13
category:
  - Java
headerDepth: 5
---


# Java 实现控制台打印彩色字体和彩色背景
请记住，在Java Programming 中，输出屏幕的背景颜色和文本颜色默认为黑色或白色。如果我们想在输出屏幕上突出显示某些文本，那么我们可以使用 ANSI 颜色代码并突出显示特定文本。可以参考 ANSI 转义码以了解更多信息。

句法：
```
System.out.println(ANSI_COLORNAME + "This text is colored" + ANSI_RESET);
```
从上面的语法可以看出包含此语法包含 3 个部分：
我们必须写出我们给出特定 ANSI 代码的名称。例如 public static final String ANSI_BLACK = “\u001B[30m”;
```The above is pseudo-code is to print text in black color. So here we can use ANSI_BLACK in place of ANSI_COLORNAME to print the text in Black color.```
```编程需要懂一点英语```
- 第二部分是编写我们要以该颜色打印的文本。
- 代码关闭到目前为止设置的所有 ANSI 属性，这应该将控制台返回到其默认值。

以下是ANSI颜色代码表：
![image.png](https://local.wuanwanghao.top:30549/upload/2022/10/image-759ba5d2bd104e51b674c1f9c36ba66a.png)
```\u00lB unincode码 可以用 转义字符 \33 表示```
```
package com.gongyi.common.core.utils;


import org.springframework.util.ObjectUtils;

public enum PrintUtil {
    RED {
        public Integer getColor() {
            return 31;
        }
    },
    GREEN {
        public Integer getColor() {
            return 32;
        }
    },
    YELLOW {
        public Integer getColor() {
            return 33;
        }
    },
    BLUE {
        public Integer getColor() {
            return 34;
        }
    },
    PURPULE {
        public Integer getColor() {
            return 35;
        }
    },
    CYAN {
        public Integer getColor() {
            return 36;
        }
    },
    WHITE {
        public Integer getColor() {
            return 37;
        }
    },
    BLACK {
        public Integer getColor() {
            return 30;
        }
    };

    public Integer getColor() {
        throw new AbstractMethodError();
    }

    public void Println(Object val) {
        val = ObjectUtils.isEmpty(val) ? "null" : val;
        printSingleColor(getColor(), 2, val.toString());
    }

    public void Println(Object val, PrintUtil background) {
        val = ObjectUtils.isEmpty(val) ? "null" : val;
        printSingleColor(getColor(), background.getColor()+10,2, val.toString());
    }

    /**
     * @param code    颜色代号：背景颜色代号(41-46)；前景色代号(31-36)
     * @param n       数字+m：1加粗；3斜体；4下划线
     * @param content 要打印的内容
     *                格式：System.out.println("\33[前景色代号;背景色代号;数字m")
     *                %s是字符串占位符，%d 是数字占位符
     */
    private void printSingleColor(int code, int n, String content) {
        System.out.format("\33[%d;%dm%s\n", code, n, content + "\33[0;39m");
    }

    private void printSingleColor(int code, int backCode, int n, String content) {
        System.out.format("\33[%d;%d;%dm%s\n", code, backCode, n, content + "\33[0;39m");
    }
}

```