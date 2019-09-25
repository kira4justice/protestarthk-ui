<script>
import Layout from '@layouts/main';

export default {
  page: {
    title: 'About',
    meta: [{ name: 'description', content: 'About' }],
  },
  components: { Layout },
};
</script>

<template>
  <Layout yellow-card title="About">
    <el-row>
      <el-col :md="12">
        <h2>Background</h2>
        <p
          >We are a group of Hong Kong protester who meetup through
          telegram...</p
        >
      </el-col>
      <el-col :md="12">
        <h2>背景</h2>
        <p>我們是一班在tg 認識的香港示威者...</p>
      </el-col>
    </el-row>
  </Layout>
</template>
