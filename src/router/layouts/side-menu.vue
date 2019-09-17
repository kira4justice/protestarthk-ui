<script>
import MainNav from '@components/main-nav';

export default {
  components: { MainNav },
};
</script>

<template>
  <el-container>
    <el-header>
      <MainNav />
    </el-header>
    <el-container>
      <el-aside>hi</el-aside>
      <slot />
    </el-container>
  </el-container>
</template>

<style lang="scss" module>
@import '@design';
</style>
