<script>
import Layout from '@layouts/main';
import design from '@design';
import { artsComputed, artsMethods } from '@state/helpers';
import NProgress from 'nprogress/nprogress';

export default {
  page: {
    title: 'Protest Art',
    meta: [{ name: 'description', content: 'Protest Art' }],
  },
  components: { Layout },
  data: function() {
    return {
      query: this.$route.query.query,
      selectedTags: this.$route.query.tag,
      sortBy: this.$route.query.sortBy || 'create_date',
      sortOrder: this.$route.query.sortOrder || 'desc',
      loading: false,
      tags: [],
    };
  },
  computed: {
    ...artsComputed,
    bgColor: () => design.colorPrimary,
    sizeMenuWidth: () => design.sizeMenuWidth,
    masonryCols: () => ({
      default: 5,
      [design.breakpointXL]: 4,
      [design.breakpointLG]: 3,
      [design.breakpointMD]: 2,
      [design.breakpointSM]: 2,
    }),
    masonryGutter: () => ({
      default: 20,
      [design.breakpointLG]: 15,
      [design.breakpointMD]: 10,
      [design.breakpointSM]: 5,
    }),
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    this.$refs.tagFilter.focus();
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...artsMethods,
    querySuggestion(queryString, cb) {
      // TODO: query suggestion tag
      // const ret = [
      //   { value: 'Option 1' },
      //   { value: 'Option 2' },
      //   { value: 'Option 3' },
      // ];
      // this.tags = ret;
    },
    doSearch() {
      const req = { query: this.query, tag: this.selectedTags };
      this.$router.push({ name: 'arts', query: req });
    },
    async fetchNextPage() {
      if (!this.loading) {
        NProgress.start();
        this.loading = true;

        const req = {
          query: this.query,
          tag: this.selectedTag,
          page: this.currentPage + 1,
        };

        await this.searchArts(req);
        this.loading = false;
        NProgress.done();
      }
    },
    onScroll(event) {
      const d = document.documentElement;
      const offset = d.scrollTop + window.innerHeight;
      const v = document.getElementById('viewport') || d;
      const height = v.offsetHeight;

      if (height - offset < 400) {
        this.fetchNextPage();
      }
    },
  },
};
</script>

<template>
  <Layout yellow-bg white-card title="Search">
    <div :class="$style.filterbar">
      <el-row>
        <el-col :sm="{ span: 14 }">
          <el-select
            ref="tagFilter"
            v-model="selectedTags"
            :class="$style['filterbar__item']"
            size="small"
            name="tags"
            placeholder="type to search"
            multiple
            filterable
            allow-create
            default-first-option
            :style="{ width: '100%' }"
            remote
            :remote-method="querySuggestion"
            @change="doSearch"
          >
            <el-option
              v-for="tag in tags"
              :key="tag"
              :label="tag"
              :value="tag"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :sm="{ span: 9, offset: 1 }">
          <!--
          <el-select
            :class="$style['filterbar__item']"
            size="small"
          ></el-select>
          -->
        </el-col>
      </el-row>
    </div>

    <masonry :cols="masonryCols" :gutter="masonryGutter">
      <RouterLink v-for="art in arts" :key="art.id" :to="`/arts/${art.id}`">
        <el-card :class="$style['art-item']" :body-style="{ padding: 0 }">
          <img :src="art.fileUrl" />
        </el-card>
      </RouterLink>
    </masonry>

    <div :class="['text-center', $style.loadingBar]">
      <el-button type="primary" :loading="loading" @click="fetchNextPage"
        >Load More</el-button
      >
    </div>
  </Layout>
</template>

<style lang="scss" module>
.filterbar {
  &__item {
    width: 100%;
    margin-bottom: 0.5em;
  }
}

.art {
  &-item {
    padding: 0;

    img {
      display: block;
      width: 100%;
    }
  }
}

.loadingBar {
  margin-top: 1em;
}
</style>
