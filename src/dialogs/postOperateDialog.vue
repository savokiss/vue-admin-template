<template>
  <div class="venueOperateDialog">
    <el-form class="operateForm" :model="form" >
      <el-form-item prop="title" label="文章标题" required>
        <el-input class="fullwidth" placeholder="请输入会场名称" v-model="form.title"></el-input>
        </el-input>
      </el-form-item>
      <el-form-item prop="body" label="文章内容" required>
        <el-input class="fullwidth" type="textarea" :rows="10" v-model="form.body"></el-input>
      </el-form-item>
      <div class="submitButtons">
        <el-button v-if="type === 'add'" class="btn-lg" type="primary" @click="handleSave">保存</el-button>
        <el-button v-else class="btn-lg" type="primary" @click="handleUpdate">修改</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import mixin from './mixin'
import postApi from '@/services/post'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        id: '',
        title: '',
        body: ''
      }
    }
  },
  methods: {
    // 提交
    handleSave () {
      postApi.create(this.form).then(res => {
        if (res.rlt) {
          this.close()
        }
      })
    },
    // 提交
    handleUpdate () {
      postApi.update(this.form).then(res => {
        if (res.rlt) {
          this.close()
        }
      })
    }
  },
  created () {
    if (this.type === 'edit') {
      this.form = Object.assign(this.form, this.params.form)
    }
  }
}
</script>

<style scoped>
.operateForm {
}
</style>

