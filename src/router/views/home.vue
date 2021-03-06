<script>
import appConfig from '@src/app.config';
import Layout from '@layouts/home';
import { homeComputed } from '@state/helpers';

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  computed: {
    ...homeComputed,
    featuredArtStyle() {
      const url = (this.featuredArt || {}).file;
      return {
        position: 'absolute',
        top: '100px',
        left: 0,
        right: 0,
        bottom: 0,
        'z-index': -1,
        'background-image': `url(${url})`,
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': 'contain',
      };
    },
  },
};
</script>

<template>
  <Layout>
    <el-main class="no-padding">
      <div :class="$style.title__1">Protest</div>
      <div :class="$style.title__2">Art</div>

      <RouterLink v-if="featuredArt" :to="`/arts/${featuredArt.id}`">
        <div :class="$style.caption">
          <div :class="$style.caption__title">Featured Art of the Week</div>
          <div :class="$style.caption__artist">{{ featuredArt.author }}</div>
        </div>
      </RouterLink>
      <div v-if="featuredArt" class="text-center" :style="featuredArtStyle">
      </div>
    </el-main>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

$caption-color: rgba(0, 0, 0, 0.8);

.title {
  @extend .bold;

  &__1,
  &__2 {
    @extend .bold;

    display: none;
    font-size: 1em;
    color: $caption-color;
    text-transform: uppercase;

    @include mq(sm-only) {
      margin: 0.5em;
    }

    @include mq(sm-and-up) {
      position: absolute;
      display: block;
      font-size: 2em;
    }

    @include mq(md-and-up) {
      font-size: 5em;
    }

    @include mq(lg-and-up) {
      font-size: 8em;
    }

    @include mq(xl-only) {
      font-size: 16em;
    }
  }

  &__1 {
    top: 0;
    left: 0;
  }
  &__2 {
    right: 0;
    bottom: 2px;
  }
}

.caption {
  position: absolute;
  bottom: 25%;
  display: block;
  padding: 0.75em 1.5em;
  color: $color-body-bg;
  text-transform: uppercase;
  background: $caption-color;

  &__title {
    @extend .bold;

    padding-bottom: 0.25em;
    font-size: $--font-size-medium;
    text-decoration: underline;
  }
  &__artist {
    // font-style: italic;
  }
}
</style>
