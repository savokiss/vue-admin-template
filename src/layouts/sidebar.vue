<template>
  <div class="appSidebar">
    <img class="logo" src="../assets/logo.svg" alt="logo">
    <el-menu mode="vertical" text-color="#fff" background-color="#222227" active-background-color="#000" unique-opened :default-active="$route.path" :router="true" @select="handleSelect">
      <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
        <i :class="item.icon"></i> {{item.title}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      menuList: [
        { path: '/', title: '文章管理', icon: 'el-icon-setting' }
      ]
    }
  },
  methods: {
    handleSelect (path) {
      let menu = _.find(this.menuList, ['path', path])
      this.$emit('menu-select', menu || {})
    }
  },
  created () {
    this.handleSelect(this.$route.path)
  }
}
</script>

<style>
.appSidebar {
  background: url(../assets/nav_bg.png) no-repeat left center;
  background-size: 100% 100%;
}

.appSidebar .el-menu {
  border-right: 1px solid #222227;
}

.logo {
  width: 160px;
  margin-top: 10px;
}
</style>
