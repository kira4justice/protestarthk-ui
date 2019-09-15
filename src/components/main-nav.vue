<script>
export default {
  props: {
    routes: {
      type: Array,
      default() {
        return [
          { name: 'home', title: 'Front Page' },
          { name: 'background', title: 'Background' },
          { name: 'arts', title: 'Protest Art' },
          { name: 'contacts', title: 'Contact' },
        ];
      },
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
