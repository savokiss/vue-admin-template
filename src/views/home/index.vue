<template>
  <div class="homeView">
    <sidebar class="sidebarContainer" @menu-select="handleMenuSelect"></sidebar>

    <div class="mainContainer">
      <div class="titleHeader" v-if="showTitle">
        {{ currentMenu }}
      </div>
      <div class="linkHeader" v-if="showLink">
        <span class="linkHeader__title">{{ $route.query.title }}</span>
        <router-link class="linkHeader__link" :to="{ name: 'relation', params: $route.params, query: $route.query }">关联会场</router-link> |
        <router-link class="linkHeader__link" :to="{ name: 'interaction', params: $route.params, query: $route.query }">互动管理</router-link>
      </div>
      <router-view></router-view>
    </div>

    <dialogs></dialogs>
  </div>
</template>

<script>
import sidebar from '@/layouts/sidebar'
import dialogs from '@/dialogs'
export default {
  data () {
    return {
      currentMenu: '会议管理',
      titleRoutes: ['course', 'playback', 'venue', 'banner'],
      linkRoutes: ['relation', 'interaction']
    }
  },
  computed: {
    showTitle () {
      return this.titleRoutes.indexOf(this.$route.name) > -1
    },
    showLink () {
      return this.linkRoutes.indexOf(this.$route.name) > -1
    }
  },
  components: {
    sidebar,
    dialogs
  },
  methods: {
    handleMenuSelect (menu) {
      this.currentMenu = menu.title
    }
  },
  created () {
    // LOAD_CACHE
    // this.$loadCache('courseTags')
  }
}
</script>

<style scoped>
.sidebarContainer {
  width: 180px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow-y: auto;
  overflow-x: hidden;
}

.mainContainer {
  margin-left: 180px;
}

.titleHeader,
.linkHeader {
  height: 80px;
  line-height: 80px;
  padding-left: 40px;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  vertical-align: center;
  background-color: #fff;
}

.linkHeader__title {
  margin-right: 50px;
}

.linkHeader__link {
  margin: 0 10px;
}

.router-link-active {
  color: #49a0f8;
}
</style>
