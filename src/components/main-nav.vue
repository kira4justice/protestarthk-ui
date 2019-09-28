<script>
import design from '@design';

export default {
  props: {
    background: {
      type: String,
      default: () => design.colorBodyBg,
    },
    color: {
      type: String,
      default: () => design.colorText,
    },
    routes: {
      type: Array,
      default: () => [
        { name: 'home', title: 'Home' },
        { name: 'about', title: 'About' },
        { name: 'arts', title: 'Gallery' },
        { name: 'arts-submit', title: 'Submit' },
        // { name: 'contacts', title: 'Contact' },
      ],
    },
  },
  computed: {
    activeIndex() {
      return this.$route.name;
    },
  },
};
</script>

<template>
  <el-menu
    mode="horizontal"
    :class="$style['menu']"
    :default-active="activeIndex"
    :background-color="background"
    :text-color="color"
    :active-text-color="color"
    router
  >
    <el-menu-item
      v-for="route in routes"
      :key="route.name"
      :index="route.name"
      :route="route"
      >{{ route.title }}</el-menu-item
    >
  </el-menu>
</template>

<style lang="scss" module>
@import '@design';

.menu {
  @extend .no-border;

  float: right;
  text-transform: uppercase;
}
</style>
