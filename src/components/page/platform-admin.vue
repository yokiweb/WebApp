<template>
  <div style="background-color: #f6f6f6;min-height:100vh;">
    <el-container>
      <el-header>
        <div class="header" style="background-color: #05445c;">
          <div class="app-name">
            <router-link to="/platform-admin">YAOYAO二手商城</router-link>
          </div>
          <span class="app-title" color=" red">您是管理员：{{ admin.nickname }}</span>
          <div class=" app-logOut">
            <el-button type="primary" style="" icon="el-icon-full-screen" @click='clickFullscreen'>全屏</el-button>
            <el-button style="margin-right: 100px" type="primary" @click="logout">退出登录</el-button>
          </div>

        </div>
      </el-header>
      <el-container>
        <div class="mainBody">
          <el-aside>
            <el-col :span="24">
              <el-menu
                  default-active="4"
                  class="el-menu-vertical-demo"
                  @select="handleSelect"
                  background-color="#ffffff"
                  text-color="#303133"
                  active-text-color="#409EFF">
                <el-menu-item index="4">
                  <i class="el-icon-s-platform"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="1">
                  <i class="el-icon-goods"></i>
                  <span>闲置管理</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-s-goods"></i>
                  <span slot="title">订单管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside>
          <el-main>

            <ecahtesaa v-if="mode == 4"></ecahtesaa>
            <IdleGoods v-if="mode == 1"></IdleGoods>
            <orderList v-if="mode == 2"></orderList>
            <userList v-if="mode == 3"></userList>
          </el-main>
        </div>
      </el-container>
    </el-container>
    <div class="foot">
    </div>
  </div>
</template>

<script>
import IdleGoods from '../common/IdleGoods.vue'
import orderList from '../common/orderList.vue'
import userList from '../common/userList.vue'
import ecahtesaa from '../common/ecahtesaa.vue'
import screenfull from 'screenfull'

export default {
  name: "platform-admin",
  components: {
    ecahtesaa,
    IdleGoods,
    orderList,
    userList,
  },
  data() {
    return {

      mode: 4,
      admin: {
        nickname: '管理员',
      },
      isFullscreen: false
    }
  },
  created() {
    this.admin.nickname = this.$sta.adminName;
  },
  methods: {
    clickFullscreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    logout() {
      this.$api.loginOut({}).then(res => {
        if (res.status_code === 1) {
          this.$sta.isLogin = false;
          this.$sta.adminName = '';
          this.$router.push({path: '/login-admin'});
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleSelect(val) {
      if (this.mode !== val) {
        this.mode = val
      }
    },
  }
}
</script>

<style scoped>


.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-width: 100vw;
  height: 58px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: #eeeeee solid 2px;
  z-index: 1000;
}

.app-name {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10vw;
  flex: 1;
  height: 100%;
  border-right: 1px solid #e5e5e5;
}

.app-name a {
  color: #409EFF;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
  padding: 0 20px;
}

.app-title {
  display: flex;
  justify-content: center;
  flex: 8;
  color: red;
}

.app-logOut {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}

.mainBody {
  display: flex;
  width: 100%;

}

aside {
  flex: 1;
  box-sizing: content-box;
  min-width: 10vw;
  min-height: calc(100vh - 120px);
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
}

main {
  flex: 9;
}
</style>
