<template>
  <div class="talUploader">
    <el-upload class="avatar-uploader" ref="upload" :headers="headers" :action="action" :accept="accept" :name="fieldName" :show-file-list="false" :auto-upload="false" :on-preview="handlePreview" :on-change="handleChange" :on-success="handleSuccess" :before-upload="beforeUpload">
      <div v-if="file.url" class="previewArea">
        <img v-if="isImg" :src="file.url" class="avatar">
        <div v-else class="filePreview">
          {{ file.name }}
        </div>
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
  </div>
</template>

<script>
import { getTokens } from '@/services/auth/utils'
export default {
  props: {
    action: {
      type: String,
      required: true
    },
    previewUrl: {
      type: String
    },
    tip: {
      type: String,
      default: '图片须小于300*600，支持png/jpg等图片格式'
    },
    accept: {
      type: String,
      default: 'image/*'
    }
  },
  data () {
    return {
      file: {
        url: '',
        name: ''
      },
      headers: {
        token: getTokens().token,
        serverKey: getTokens().serverKey
      }
    }
  },
  computed: {
    isImg () {
      return this.accept.indexOf('image') > -1
    },
    fieldName () {
      return this.isImg ? 'img' : 'file'
    }
  },
  methods: {
    beforeUpload (file) {
      console.log('before', file)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file) {
      this.file.url = URL.createObjectURL(file.raw)
      this.file.name = file.name
    },
    handleSuccess (res) {
      if (res.rlt) {
        this.$message.success('上传成功')
      } else {
        this.$message.error(res.msg)
      }
      this.$emit('callback', res)
    },
    // 提交上传
    submit () {
      this.$refs.upload.submit()
    }
  },
  created () {
    if (this.previewUrl) {
      this.file.url = this.previewUrl
    }
  }
}
</script>

<style>
.talUploader {
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 400px;
  height: 200px;
  display: block;
}

.filePreview {
  font-size: 18px;
  color: #8c939d;
  width: 400px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
</style>
