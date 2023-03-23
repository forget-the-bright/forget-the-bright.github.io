import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "忘皓 博客",
      description: "分享知识",
    },
    "/en/": {
      lang: "en-US",
      title: "WH Blog",
      description: "show my learn",
    },
  },
  markdown:{
    //markdown 侧边栏标题导航提取 h1 ~ h4
    headers:{
      level: [1,2,3,4],
    }
  },
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
