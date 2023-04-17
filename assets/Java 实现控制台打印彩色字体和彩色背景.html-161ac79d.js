import{_ as n,W as i,X as e,a2 as l}from"./framework-3a0c4e99.js";const d={},s=l(`<h1 id="java-实现控制台打印彩色字体和彩色背景" tabindex="-1"><a class="header-anchor" href="#java-实现控制台打印彩色字体和彩色背景" aria-hidden="true">#</a> Java 实现控制台打印彩色字体和彩色背景</h1><p>请记住，在Java Programming 中，输出屏幕的背景颜色和文本颜色默认为黑色或白色。如果我们想在输出屏幕上突出显示某些文本，那么我们可以使用 ANSI 颜色代码并突出显示特定文本。可以参考 ANSI 转义码以了解更多信息。</p><p>句法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>System.out.println(ANSI_COLORNAME + &quot;This text is colored&quot; + ANSI_RESET);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从上面的语法可以看出包含此语法包含 3 个部分： 我们必须写出我们给出特定 ANSI 代码的名称。例如 public static final String ANSI_BLACK = “\\u001B[30m”; <code>The above is pseudo-code is to print text in black color. So here we can use ANSI_BLACK in place of ANSI_COLORNAME to print the text in Black color.</code><code>编程需要懂一点英语</code></p><ul><li>第二部分是编写我们要以该颜色打印的文本。</li><li>代码关闭到目前为止设置的所有 ANSI 属性，这应该将控制台返回到其默认值。</li></ul><p>以下是ANSI颜色代码表： <img src="https://local.wuanwanghao.top:30549/upload/2022/10/image-759ba5d2bd104e51b674c1f9c36ba66a.png" alt="image.png" loading="lazy"><code>\\u00lB unincode码 可以用 转义字符 \\33 表示</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.gongyi.common.core.utils;


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
        val = ObjectUtils.isEmpty(val) ? &quot;null&quot; : val;
        printSingleColor(getColor(), 2, val.toString());
    }

    public void Println(Object val, PrintUtil background) {
        val = ObjectUtils.isEmpty(val) ? &quot;null&quot; : val;
        printSingleColor(getColor(), background.getColor()+10,2, val.toString());
    }

    /**
     * @param code    颜色代号：背景颜色代号(41-46)；前景色代号(31-36)
     * @param n       数字+m：1加粗；3斜体；4下划线
     * @param content 要打印的内容
     *                格式：System.out.println(&quot;\\33[前景色代号;背景色代号;数字m&quot;)
     *                %s是字符串占位符，%d 是数字占位符
     */
    private void printSingleColor(int code, int n, String content) {
        System.out.format(&quot;\\33[%d;%dm%s\\n&quot;, code, n, content + &quot;\\33[0;39m&quot;);
    }

    private void printSingleColor(int code, int backCode, int n, String content) {
        System.out.format(&quot;\\33[%d;%d;%dm%s\\n&quot;, code, backCode, n, content + &quot;\\33[0;39m&quot;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r=[s];function v(a,t){return i(),e("div",null,r)}const u=n(d,[["render",v],["__file","Java 实现控制台打印彩色字体和彩色背景.html.vue"]]);export{u as default};
