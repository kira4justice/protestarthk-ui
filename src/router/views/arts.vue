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
      selectedTag: this.$route.query.tag,
      loading: false,
      tags: [
        { name: 'Protest', value: 'protest' },
        { name: 'Eye for HK', value: 'eye' },
        { name: '831 Terrorist Attack', value: '831' },
      ],
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
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...artsMethods,
    querySuggestion(queryString, cb) {
      const ret = [
        { value: 'Option 1' },
        { value: 'Option 2' },
        { value: 'Option 3' },
      ];
      cb(ret);
    },
    doSearch() {
      const req = { query: this.query, tag: this.selectedTag };
      this.$router.push({ name: 'arts', query: req });
    },
    selectTag(tag) {
      this.selectedTag = tag;
      this.doSearch();
    },
    async fetchNextPage() {
      if (!this.loading) {
        NProgress.start();
        const req = {
          query: this.query,
          tag: this.selectedTag,
          page: this.currentPage + 1,
        };

        this.loading = true;
        await this.searchArts(req);
        this.loading = false;
        NProgress.done();
      }
    },
    onScroll(event) {
      const d = document.documentElement;
      const offset = d.scrollTop + window.innerHeight;
      const height = d.offsetHeight;

      if (height - offset < 400) {
        this.fetchNextPage();
      }
    },
  },
};
</script>

<template>
  <Layout>
    <el-container>
      <el-aside class="hidden-xs-only" :width="sizeMenuWidth">
        <el-menu
          :class="['no-border', $style.filter]"
          :background-color="bgColor"
        >
          <div :class="$style['filter__group']">
            <div :class="$style['filter__group__label']">Search</div>
            <el-autocomplete
              v-model="query"
              name="query"
              :class="$style['filter__group__item']"
              prefix-icon="el-icon-search"
              placeholder="Search by keywords or tags"
              size="small"
              autofocus
              clearable
              :fetch-suggestions="querySuggestion"
              :trigger-on-focus="false"
              :select-when-unmatched="true"
              @select="doSearch"
            ></el-autocomplete>
          </div>
          <div :class="$style['filter__group']">
            <div :class="$style['filter__group__label']">Tags</div>
            <div :class="$style['filter__group__item']">
              <div :class="$style['filter__group']">
                <div
                  v-for="tag in tags"
                  :key="tag.value"
                  :class="$style['filter__group__item']"
                >
                  <a href="#" @click.stop.prevent="selectTag(tag.value)">
                    {{ tag.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </el-menu>
      </el-aside>

      <el-main>
        <masonry :cols="masonryCols" :gutter="masonryGutter">
          <RouterLink v-for="art in arts" :key="art.id" :to="`/arts/${art.id}`">
            <el-card :class="$style['art-item']" :body-style="{ padding: 0 }">
              <img :src="art.fileUrl" />
            </el-card>
          </RouterLink>
        </masonry>
      </el-main>
    </el-container>
  </Layout>
</template>

<style lang="scss" module>
.filter {
  $padding-v: 2.5em;
  $padding-h: 1.5em;
  $padding-between: 0.5em;

  &__group {
    padding: $padding-v $padding-h 0;

    &__label {
      padding-bottom: $padding-between;
      color: white;
      text-transform: uppercase;
    }

    &__item {
      width: 100%;
      padding-bottom: $padding-between;

      &:last-child {
        padding-bottom: 0;
      }
    }

    .filter {
      &__group {
        padding: 0 0 $padding-v $padding-h;

        &__item {
          > a {
            color: white;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
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
</style>
