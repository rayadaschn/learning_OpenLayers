<template>
  <div class="layout-admin-wrapper">
    <div class="layout-container-vertical fixed">
      <!-- SubMenu -->
      <LayoutSideBar v-model:collapse="collapse" />
      <div class="layout-main" :class="{ 'is-collapse': collapse }">
        <div class="app-main-container">
          <!-- Main -->
          <LayoutMain />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, computed, ref } from "vue";
import LayoutMain from "./Main/index.vue";
import LayoutSideBar from "./SideBar/index.vue";

export default defineComponent({
  components: {
    LayoutMain,
    LayoutSideBar,
  },
  setup() {
    const collapse = ref(false);
    return {
      collapse,
    };
  },
});
</script>

<style scoped lang="scss">
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $base-z-index - 2;
  width: calc(100% - $base-left-menu-width);
}

.layout-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  .layout-container-vertical {
    .layout-main {
      min-height: 100%;
      margin-left: $base-left-menu-width;

      &.is-collapse {
        margin-left: $base-left-menu-width-min;
        border-right: 0;
      }

      .layout-header {
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

        &.fixed-header {
          @include fix-header;
        }

        &.is-collapse {
          width: calc(100% - $base-left-menu-width-min);
        }
      }

      .app-main-container {
        padding: 0px;
      }
    }
  }
}
</style>
