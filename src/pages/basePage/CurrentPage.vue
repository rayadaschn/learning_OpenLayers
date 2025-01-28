<template>
  <div class="map-container">
    <div class="control-bar">
      <button
        :class="['marker-btn', { active: isMarking }]"
        @click="toggleMarkingMode"
      >
        {{ isMarking ? "停止标记" : "开始标记" }}
      </button>
      <button class="clear-btn" @click="clearAll">清空所有</button>
      <button
        class="clear-btn"
        v-show="currentMarker.length"
        @click="handleUndo"
      >
        撤销
      </button>
      <button class="clear-btn" v-show="aRedo > 0" @click="handleRedo">
        恢复
      </button>
    </div>
    <div id="dynamic-map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useOlMarker from "@/hooks/useOlMarker";
import { TD_TOKEN } from "@/const";

const {
  initMap,
  clearMarker,
  toggleMarking,
  undo,
  redo,
  isMarking,
  currentMarker,
} = useOlMarker({
  target: "dynamic-map",
  tdToken: TD_TOKEN,
  center: [120.153576, 30.287459], // 杭州坐标
  zoom: 12,
});

// 初始化地图（默认不启用标记）
onMounted(initMap);

// 切换标记模式
const toggleMarkingMode = () => {
  toggleMarking();
};

// 清空所有标记
const clearAll = () => {
  clearMarker();
  aRedo.value = 0;
};

const aRedo = ref(0);
const handleUndo = () => {
  aRedo.value += 1;
  undo();
};

const handleRedo = () => {
  aRedo.value -= 1;
  redo();
};
</script>

<style scoped>
.map-container {
  position: relative;
  height: 100vh;
}

#dynamic-map {
  width: 100%;
  height: 100%;
}

.control-bar {
  position: absolute;
  top: 20px;
  left: 40px;
  z-index: 1;
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.marker-btn {
  background: #4caf50;
  color: white;
}

.marker-btn.active {
  background: #f44336;
}

.clear-btn {
  background: #2196f3;
  color: white;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
