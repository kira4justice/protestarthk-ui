<script>
import Layout from '@layouts/main';

export default {
  page: {
    title: 'ArtsSubmit',
    meta: [{ name: 'description', content: 'ArtsSubmit' }],
  },
  components: { Layout },
  data() {
    return {
      form: {
        title: '',
        author: '',
        caption: '',
        tags: [],
      },
    };
  },
  methods: {
    uploadSuccess() {},
    submitForm() {
      this.$refs.uploader.submit();
    },
  },
};
</script>

<template>
  <Layout title="Upload" yellow-bg white-card>
    <el-form :model="form" label-width="100px" label-position="left">
      <el-row>
        <el-col :md="12">
          <el-form-item label="Title">
            <el-input v-model="form.title" name="title"></el-input>
          </el-form-item>
          <el-form-item label="Author">
            <el-input v-model="form.author" name="author"></el-input>
          </el-form-item>
          <el-form-item label="Caption">
            <el-input
              v-model="form.caption"
              type="textarea"
              :rows="4"
              name="caption"
            ></el-input>
          </el-form-item>
          <el-form-item label="Tags">
            <el-select
              v-model="form.tags"
              name="tags"
              multiple
              filterable
              allow-create
              default-first-option
              no-data-text="Type your tags"
            >
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="{ span: 10, offset: 2 }">
          <el-upload
            ref="uploader"
            action="/api/upload"
            name="art-file"
            :data="form"
            :auto-upload="false"
            accept="image/jpg, image/png"
            :limit="1"
            :on-exceed="onExceed"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"
              >Drop file here or <em>click to upload</em></div
            >

            <div slot="tip" class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <el-button type="primary" @click="submitForm">Submit</el-button>
    </el-form>
  </Layout>
</template>
