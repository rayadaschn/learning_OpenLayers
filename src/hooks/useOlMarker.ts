import { ref, onUnmounted, computed } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { fromLonLat } from "ol/proj";
import { Style, Circle, Fill, Stroke } from "ol/style";

type UseOlMarkerOptions = {
  target: string;
  tdToken: string;
  center?: [number, number];
  zoom?: number;
};

export default function useOlMarker(options: UseOlMarkerOptions) {
  const mapInstance = ref<Map | null>(null);
  const vectorSource = new VectorSource();
  const isMarking = ref(false); // 标记状态
  let clickHandler: ((event: any) => void) | null = null;

  // 样式配置
  const markerStyle = new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({ color: "#FF5722" }),
      stroke: new Stroke({
        color: "#FFFFFF",
        width: 2,
      }),
    }),
  });

  // 初始化地图
  const initMap = () => {
    const center = options.center
      ? fromLonLat(options.center)
      : fromLonLat([120.153576, 30.287459]);

    mapInstance.value = new Map({
      target: options.target,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${options.tdToken}`,
            crossOrigin: "anonymous",
          }),
        }),
        new TileLayer({
          source: new XYZ({
            url: `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${options.tdToken}`,
            crossOrigin: "anonymous",
          }),
        }),
        new VectorLayer({
          source: vectorSource,
          style: markerStyle,
        }),
      ],
      view: new View({
        projection: "EPSG:3857",
        center: center,
        zoom: options.zoom || 12,
      }),
    });
  };

  const currentMarker = ref<Feature[]>([]);

  // 开始标记模式
  const startMarking = () => {
    if (!mapInstance.value || isMarking.value) return;

    clickHandler = (event: any) => {
      const coordinate = event.coordinate;
      const marker = new Feature({
        geometry: new Point(coordinate),
      });
      vectorSource.addFeature(marker);
      currentMarker.value.push(marker);
    };

    mapInstance.value.on("click", clickHandler);
    isMarking.value = true;
  };

  // 结束标记模式
  const stopMarking = () => {
    if (!mapInstance.value || !clickHandler) return;

    mapInstance.value.un("click", clickHandler);
    clickHandler = null;
    isMarking.value = false;
  };

  // 切换标记状态
  const toggleMarking = () => {
    isMarking.value ? stopMarking() : startMarking();
  };

  // 清理
  const clearMarker = () => {
    stopMarking();
    vectorSource.clear();
    currentMarker.value.length = 0;
  };

  // 撤销处理
  const undoStack = ref<Feature[]>([]);

  const undo = () => {
    const lastFeature = vectorSource.getFeatures().pop();
    if (lastFeature) {
      vectorSource.removeFeature(lastFeature);
      currentMarker.value.pop();
      undoStack.value.push(lastFeature);
    }
  };

  const redo = () => {
    const feature = undoStack.value.pop() as Feature;
    if (feature) {
      vectorSource.addFeature(feature);
      currentMarker.value.push(feature);
    }
  };

  // 清理
  onUnmounted(() => {
    stopMarking();
    mapInstance.value?.dispose();
    undoStack.value.length = 0;
  });

  return {
    mapInstance,
    isMarking,
    currentMarker,
    initMap,
    startMarking,
    stopMarking,
    toggleMarking,
    clearMarker,
    undo,
    redo,
  };
}
