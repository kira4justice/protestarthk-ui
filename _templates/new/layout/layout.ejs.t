---
to: "src/router/layouts/<%= h.inflection.dasherize(name) %>.vue"
---
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
    <slot />
  </el-container>
</template>

<style lang="scss" module>
@import '@design';
</style>
