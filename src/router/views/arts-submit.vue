<script>
import { pathOr } from 'ramda';
import Layout from '@layouts/main';
import { artSubmitComputed, artSubmitMethods } from '@state/helpers';

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
      file: null,
    };
  },
  computed: {
    ...artSubmitComputed,
  },
  methods: {
    ...artSubmitMethods,
    uploaderOnChange(file, fileList) {
      this.file = file;
    },
    uploaderOnRemove(file, fileList) {
      this.file = null;
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.$refs.uploader.clearFiles();
      this.file = null;
    },
    async submitForm() {
      const file = pathOr(null, ['file', 'raw'])(this);
      if (file) {
        const res = await this.uploadArt({
          ...this.form,
          file,
        });
        this.$router.push({ name: 'art-details', params: res });
      }
    },
  },
};
</script>

<template>
  <Layout title="Upload" yellow-bg white-card>
    <el-form ref="form" :model="form" label-width="100px" label-position="left">
      <el-row>
        <el-col :md="12">
          <el-form-item label="Title" prop="title">
            <el-input v-model="form.title" name="title"></el-input>
          </el-form-item>
          <el-form-item label="Author" prop="author">
            <el-input v-model="form.author" name="author"></el-input>
          </el-form-item>
          <el-form-item label="Caption" prop="caption">
            <el-input
              v-model="form.caption"
              type="textarea"
              :rows="4"
              name="caption"
            ></el-input>
          </el-form-item>
          <el-form-item label="Tags" prop="tags">
            <el-select
              v-model="form.tags"
              name="tags"
              multiple
              filterable
              allow-create
              default-first-option
              no-data-text="Type your tags"
              :style="{ width: '100%' }"
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
            action="/api/arts"
            name="art-file"
            :data="form"
            :auto-upload="false"
            accept="image/jpg, image/png"
            :limit="1"
            :on-change="uploaderOnChange"
            :on-remove="uploaderOnRemove"
            drag
            :style="{ width: '100%' }"
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
      <div class="right">
        <el-button @click="resetForm">Reset</el-button>
        <el-button type="primary" :loading="uploading" @click="submitForm"
          >Submit</el-button
        >
      </div>
    </el-form>
  </Layout>
</template>
