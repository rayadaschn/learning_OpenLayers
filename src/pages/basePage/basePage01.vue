<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

onMounted(() => {
  const map = new Map({
    target: "map", // 地图容器挂载 id
    layers: [
      new TileLayer({
        source: new OSM(), // 地图瓦片数据源
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
