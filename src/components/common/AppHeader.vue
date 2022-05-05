<template>
  <div class="header">
    <div class="header-container">
      <Row class="header-img">
        <img class="logo" src="../../stice/YAOYAO1.png" style="width: 60px" height="60px">
        <div class="app-name">
          <router-link to="/">YAOYAO二手商城</router-link>
        </div>
      </Row>
      <div class="search-container">
        <el-input placeholder="搜闲置..." v-model="searchValue" @keyup.enter.native="searchIdle"
                  style="border-style: none">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="searchIdle"></el-button>
        </el-input>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toRelease">发布闲置
        </el-button>
        <el-button type="info" icon="el-icon-chat-dot-round" @click="toMessage">我的消息</el-button>
      </div>
      <router-link v-if="!isLogin" class="user-name-text" to="/login">登录</router-link>
      <el-dropdown trigger="click" v-else>
        <div style="cursor:pointer;display: flex;align-items: center;">
          <div style="font-size: 16px;color: #409EFF;padding-right: 5px;">
            {{ nicknameValue ? nicknameValue : nickname }}
          </div>
          <el-avatar :src="avatarValue?avatarValue:avatar"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="toMe">个人中心</div>
          </el-dropdown-item>
          <el-dropdown-item divided style="color: red;">
            <div @click="loginOut">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Header',
  props: ['searchInput', 'nicknameValue', 'avatarValue'],
  data() {
    return {
      searchValue: this.searchInput,
      nickname: '登录',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      isLogin: false
    };
  },
  created() {
    // console.log("header");
    if (!this.$globalData.userInfo.nickname) {
      this.$api.getUserInfo().then(res => {
        console.log('Header getUserInfo:', res);
        if (res.status_code === 1) {
          this.nickname = res.data.nickname;
          this.avatar = res.data.avatar;
          res.data.signInTime = res.data.signInTime.substring(0, 10);
          this.$globalData.userInfo = res.data;
          this.isLogin = true;
        }
      })
    } else {
      this.nickname = this.$globalData.userInfo.nickname;
      this.avatar = this.$globalData.userInfo.avatar;
      this.isLogin = true;
    }
  },
  methods: {
    searchIdle() {
      if ('/search' !== this.$route.path) {
        this.$router.push({path: '/search', query: {searchValue: this.searchValue}});
      } else {
        this.$router.replace({path: '/search', query: {searchValue: this.searchValue}});
        this.$router.go(0);
      }

    },
    toMe() {
      if ('/me' !== this.$route.path) {
        this.$router.push({path: '/me'});
      }
    },
    toMessage() {
      if ('/message' !== this.$route.path) {
        this.$router.push({path: '/message'});
      }
    },
    toRelease() {
      if ('/release' !== this.$route.path) {
        this.$router.push({path: '/release'});
      }
    },
    loginOut() {
      this.$api.logout().then(res => {
        if (res.status_code === 1) {
          this.$globalData.userInfo = {};
          console.log("login out");
          if ('/index' === this.$route.path) {
            this.$router.go(0);
          } else {
            this.$router.push({path: '/index'});
          }
        } else {
          this.$message.error('网络或系统异常，退出登录失败！');
        }
      });

    }
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  border-bottom: #eeeeee solid 2px;
  z-index: 1000;
}

.header-img {
  align-items: center;

//width: 60px; //height: 60px; display: flex; justify-content: center !important;
}

.header-container {
  width: 1100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-name {
  z-index: ;
}

.app-name a {
  color: #000000;
  font-size: 24px;
  text-decoration: none;
  font-weight: bold;

}

.search-container {
  width: 300px;
}

.user-name-text {
  font-size: 16px;
  font-weight: 600;
  color: #409EFF;
  cursor: pointer;
  text-decoration: none;
}
</style>
