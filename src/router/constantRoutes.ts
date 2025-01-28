/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * */

import { RouteRecordRaw } from "vue-router";

const LAYOUT = () => import("@/layouts/index.vue");

/**
 * @description 静态路由
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "LAYOUT",
    component: LAYOUT,
    redirect: "/index",
    meta: {
      title: "工作台",
      icon: "DataBoard",
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/pages/basePage/basePage02_hangzhou.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
          affix: true,
        },
      },
    ],
  },
  {
    name: "Content",
    path: "/content",
    component: LAYOUT,
    meta: {
      title: "绘制",
      icon: "Menu",
    },
    children: [
      {
        name: "marker",
        path: "/content/marker",
        component: () => import("@/pages/basePage/CurrentPage.vue"),
        meta: {
          title: "绘制点",
          icon: "Pointer",
        },
      },
    ],
  },
];
