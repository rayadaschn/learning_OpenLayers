<template>
  <div class="layout-sidebar-container" :class="{ 'is-collapse': collapse }">
    <el-scrollbar>
      <div
        class="fold-box"
        :style="{ paddingRight: collapse ? '20px' : '4px' }"
      >
        <el-icon class="fold-unfold" @click="handleCollapse">
          <component :is="collapse ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </div>
      <el-menu
        background-color="#001529"
        text-color="hsla(0,0%,100%,.65)"
        active-text-color="#fff"
        :defaultActive="activeMenu"
        :unique-opened="true"
        :collapse="collapse"
      >
        <sub-menu :menuList="menuList"></sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import SubMenu from "./components/SubMenu/index.vue";
import { staticRoutes } from "@/router/constantRoutes";

export default defineComponent({
  components: { SubMenu },
  props: {
    collapse: {
      type: Boolean,
      required: true, // 明确要求必须传值
    },
  },
  emits: ["update:collapse"],
  setup(props, { emit }) {
    const route = useRoute();

    const handleCollapse = () => {
      emit("update:collapse", !props.collapse);
    };

    const menuList = computed(() => staticRoutes);

    const activeMenu = computed(() =>
      route.meta.activeMenu ? (route.meta.activeMenu as string) : route.path
    );

    return { menuList, activeMenu, handleCollapse, props };
  },
});
</script>

<style scoped lang="scss">
.fold-box {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 4px;

  .fold-unfold {
    font-size: 24px;
    color: $base-color-white;
    cursor: pointer;
  }
}

@mixin active {
  &:hover {
    color: $base-color-white;
  }

  &.is-active {
    color: $base-color-white;
    background-color: var(--el-color-primary) !important;
  }
}

.layout-sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: $base-z-index;
  width: $base-left-menu-width;
  height: 100vh;
  background: $base-menu-background;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  transition: width $base-transition-time;

  &.is-collapse {
    width: $base-left-menu-width-min;
    border-right: 0;
  }

  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;

    .el-menu {
      border: 0;
    }

    .el-menu-item,
    .el-submenu__title {
      height: $base-menu-item-height;
      overflow: hidden;
      line-height: $base-menu-item-height;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }

    .el-menu-item {
      @include active;
    }
  }
}
</style>
