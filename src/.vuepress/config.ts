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

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
