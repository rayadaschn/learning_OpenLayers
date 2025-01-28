<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { TD_TOKEN } from "@/const";

// 杭州中心坐标（西湖）
const HANGZHOU_CENTER = fromLonLat([120.153576, 30.287459]); // 转换为EPSG:3857

onMounted(() => {
  const map = new Map({
    target: "map",
    layers: [
      // 矢量底图
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TD_TOKEN}`,
          crossOrigin: "anonymous",
        }),
      }),
      // 中文注记层
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TD_TOKEN}`,
          crossOrigin: "anonymous",
        }),
      }),
    ],
    view: new View({
      projection: "EPSG:3857", // 明确指定坐标系
      center: HANGZHOU_CENTER, // 转换后的坐标
      zoom: 12, // 推荐初始缩放级别
      maxZoom: 18,
      minZoom: 3,
    }),
  });
});
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; /* 确保全屏显示 */
  background: #f0f0f0; /* 加载时的背景色 */
}

/* 天地图加载提示 */
#map::before {
  content: "天地图加载中...";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  color: #666;
  font-size: 14px;
}
</style>
