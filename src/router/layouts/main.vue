<script>
import MainNav from '@components/main-nav';

export default {
  components: { MainNav },
  props: {
    showBrand: Boolean,
  },
};
</script>

<template>
  <el-container>
    <el-header>
      <div v-if="showBrand" :class="['hidden-xs-only', $style.brand]"
        >Protest Art</div
      >
      <MainNav />
    </el-header>
    <slot />
  </el-container>
</template>

<style lang="scss" module>
@import '@design';

.brand {
  @extend .bold;

  float: left;
  height: 60px;
  line-height: 60px;
  text-transform: uppercase;

  @include mq(lg-and-up) {
    padding-left: $side-menu-width;
  }
}
</style>
