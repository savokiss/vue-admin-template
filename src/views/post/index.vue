<template>
  <div class="postView">
    <div class="optionRow">
      <div class="holder"></div>
      <div class="btnsWrapper">
        <el-button type="primary" @click="handleCreate">创建文章</el-button>
      </div>
    </div>

    <div class="postList">
      <el-table :data="postList" border style="width: 100%" size="mini" highlight-current-row>
        <el-table-column label="ID" width="70" prop="id"></el-table-column>
        <el-table-column label="标题" width="150" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="内容" prop="body" show-overflow-tooltip></el-table-column>
        <el-table-column label="userid" width="100" prop="userId"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import postApi from '@/services/post'
export default {
  data () {
    return {
      postList: []
    }
  },
  components: {
  },
  methods: {
    refresh () {
      postApi.query().then(res => {
        this.postList = res
      })
    },
    // 处理会场类型切换
    handleStateChange () {
      this.refresh()
    },
    // 新建会场
    handleCreate () {
      this.$dialog.open('postAdd', {
        callback: this.refresh
      })
    },
    // 编辑会场
    handleEdit (index, item) {
      this.$dialog.open('postEdit', {
        callback: this.refresh,
        form: item
      })
    },
    // 删除会场
    handleDelete (index, item) {
      this.$confirm(`确认删除文章：${item.title}？`).then(() => {
        postApi.destroyStable(item.venue_id).then(res => {
          if (res.rlt) {
            this.refresh()
          }
        })
      }).catch(() => { })
    }
  },
  created () {
    this.refresh()
  }
}
</script>

<style scoped>
.postView {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.optionRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 20px 40px;
}

.postList {
  padding: 20px 40px;
}

.pager {
  margin: 30px;
}
</style>
