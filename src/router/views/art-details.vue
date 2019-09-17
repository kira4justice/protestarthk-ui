<script>
import Layout from '@layouts/main';
import { artsComputed } from '@state/helpers';

export default {
  page: {
    title: 'ArtDetails',
    meta: [{ name: 'description', content: 'ArtDetails' }],
  },
  components: { Layout },
  computed: {
    ...artsComputed,
  },
};
</script>

<template>
  <Layout show-brand>
    <el-main>
      <el-row :class="$style.art">
        <el-col
          class="hidden-xs-only"
          :sm="{ span: 11 }"
          :lg="{ span: 11, offset: 0 }"
        >
          <img :class="$style.image" :src="currentArt.fileUrl" />
        </el-col>
        <el-col :sm="{ span: 12, offset: 1 }" :lg="{ span: 11, offset: 2 }">
          <div :class="$style.details">
            <div :class="$style.title">{{ currentArt.name }}</div>
            <div :class="$style.artist">By {{ currentArt.author }}</div>
            <div :class="$style.label">Description</div>
            <p :class="$style.desc">{{ currentArt.caption }}</p>
            <div :class="$style.label">Tag</div>
            <RouterLink
              v-for="tag in currentArt.tags"
              :key="tag.id"
              :class="$style.tag"
              :to="`/arts?tag=${tag.name}`"
              >#{{ tag.name }}</RouterLink
            >
          </div>
        </el-col>
        <el-col class="hidden-sm-and-up">
          <img :class="$style.image" :src="currentArt.fileUrl" />
        </el-col>
      </el-row>
    </el-main>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.art {
  @include mq(lg-and-up) {
    padding-left: $side-menu-width;
  }
}

.image {
  width: 100%;
}

.details {
  padding: $padding-base;
  margin-top: $padding-base;
  margin-right: -$padding-base;
  color: white;
  background-color: black;

  @include mq(xs-only) {
    margin-right: 0;
    margin-bottom: $padding-base;
  }

  > div {
    margin-bottom: 0.5em;
  }
}

.title {
  font-size: $--font-size-extra-large;
  font-style: italic;
  text-transform: uppercase;
}

.artist {
  @extend .light;

  text-transform: uppercase;
}

.label {
  color: $--color-primary;
  text-transform: uppercase;
}

.desc {
  @extend .light;
}

.tag {
  display: inline-block;
  padding: 4px;
  margin-right: 4px;
  // font-size: $--font-size-small;
  // line-height: $--font-size-small;
  text-decoration: none;
  border: 1px solid white;

  &,
  &:link {
    color: white;
  }

  &:last-child {
    margin: 0;
  }
}
</style>
