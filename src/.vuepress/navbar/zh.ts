import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "演示", icon: "discover", link: "/demo/" },
  { text: "文章", icon: "article", link: "/article/" },
  { text: "分类", icon: "categoryselected", link: "/category/" },
  { text: "标签", icon: "tag", link: "/tag/" },
  { text: "时间线", icon: "time", link: "/timeline/" },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
