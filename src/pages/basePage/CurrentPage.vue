<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { TD_TOKEN } from "@/const";

onMounted(() => {
  const map = new Map({
    target: "map", // 地图容器挂载 id
    layers: [
      // 加载瓦片图层数据
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${TD_TOKEN}`,
        }),
      }),
    ],
    view: new View({
      center: [0, 0], // 地图初始点
      zoom: 2, // 地图初始缩放级别
    }),
  });
});
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
