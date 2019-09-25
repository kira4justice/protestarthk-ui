<script>
import MainNav from '@components/main-nav';
import design from '@design';

export default {
  components: { MainNav },
  props: {
    showBrand: Boolean,
    yellowBg: Boolean,
    whiteCard: Boolean,
    yellowCard: Boolean,
    blackCard: Boolean,
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    bgColor() {
      return this.yellowBg ? design.colorPrimary : '#ffffff';
    },
    bgFontColor() {
      return this.yellowBg ? '#ffffff' : design.colorText;
    },
    defaultStyle() {
      return { background: this.bgColor, color: this.bgFontColor };
    },
  },
};
</script>

<template>
  <el-container id="viewport" :style="defaultStyle">
    <el-header class="el-header--fixed" :style="defaultStyle">
      <div v-if="showBrand" :class="['hidden-xs-only', $style.brand]"
        >Protest Art</div
      >
      <MainNav :background="bgColor" :color="bgFontColor" />
    </el-header>
    <el-main class="container">
      <div
        id="main"
        :class="{
          '--white': whiteCard,
          '--yellow': yellowCard,
          '--black': blackCard,
        }"
      >
        <div v-if="title" class="title">{{ title }}</div>
        <slot />
      </div>
    </el-main>
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

<style lang="scss">
@import '@design';

#main {
  min-height: 350px;
  padding: 2em;
  margin-top: 3em;

  > .title {
    padding-bottom: 0.25em;
    margin-top: -1.1em;
    font-size: 4em;
    text-transform: uppercase;
  }

  // stylelint-disable-next-line selector-class-pattern
  &.--white {
    color: $color-text;
    background: $color-body-bg;

    .title {
      color: $color-text;
    }
  }

  // stylelint-disable-next-line selector-class-pattern
  &.--yellow {
    color: $color-body-bg;
    background: $color-primary;

    .title {
      color: $color-text;
    }
  }

  // stylelint-disable-next-line selector-class-pattern
  &.--black {
    color: $color-body-bg;
    background: $color-text;

    .title {
      color: $color-primary;
    }
  }
}
</style>
