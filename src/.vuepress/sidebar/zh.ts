import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    "intro",
    "slides",
  ],
  "/demo/":[
    {
      text: "如何使用",
      icon: "creative",
      //prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
  ],
  "/posts/":[
    {
      text: "文章",
      icon: "note",
      //prefix: "posts/",
      children: "structure",
    },
  ]
});
