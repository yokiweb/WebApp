<template>
  <div style="background: darksalmon">
    <app-head></app-head>
    <div style="height: 10px"></div>
    <app-body>
      <div style="min-height: 90vh;">
        <!--        <el-tabs v-model="labelName" type="border-card" @tab-click="handleSelect">
                  <el-tab-pane label="猜你喜欢" name="0"></el-tab-pane>
                  <el-tab-pane label="今日数码" name="1"></el-tab-pane>
                  <el-tab-pane label="家电生活馆" name="2"></el-tab-pane>
                  <el-tab-pane label="户外用品" name="3"></el-tab-pane>
                  <el-tab-pane label="我爱读书" name="4"></el-tab-pane>
                  <el-tab-pane label="其他好物" name="5"></el-tab-pane>
                </el-tabs>-->


        <el-menu
            :default-active="activeIndex2"

            mode="horizontal"
            @select="handleSelect"
            background-color="#a64942"
            text-color="#fff"
            active-text-color="#ffd04b"
            v-model="labelName">
          <el-menu-item index="0" label="猜你喜欢" v-model="labelName" labelName="0"><i class="el-icon-edit"></i>猜你喜欢
          </el-menu-item>

          <el-menu-item index="1" label="今日数码" v-model="labelName" labelName="1"><i class="el-icon-mobile-phone"></i>今日数码
          </el-menu-item>
          <el-menu-item index="2" label="户外用品" v-model="labelName" labelName="2"><i class="el-icon-delete-location"></i>户外用品
          </el-menu-item>
          <el-menu-item index="3" label="我爱读书" v-model="labelName" labelName="3"><i class="el-icon-notebook-1"></i>我爱读书
          </el-menu-item>
          <el-menu-item index="4" label="家电生活馆" v-model="labelName" labelName="4"><i class="el-icon-service"></i>家电生活馆
          </el-menu-item>
          <el-menu-item index="5" label="其他好物" v-model="labelName" labelName="5"><i class="el-icon-apple"></i>其他好物
          </el-menu-item>
          <el-submenu index="6">
            <template slot="title" label="非卖品">非卖品</template>
            <el-menu-item index="6-1">惊喜</el-menu-item>
            <el-menu-item index="6-2">游戏</el-menu-item>
            <el-menu-item index="6-3">泰山学院</el-menu-item>

            <!--            <el-submenu index="2-4">-->
            <!--              <template slot="title">家电生活馆</template>-->
            <!--              <el-menu-item index="2-4-1">选项1</el-menu-item>-->
            <!--              <el-menu-item index="2-4-2">选项2</el-menu-item>-->
            <!--              <el-menu-item index="2-4-3">选项3</el-menu-item>-->
            <!--            </el-submenu>-->
          </el-submenu>
        </el-menu>


        <div style="margin: 0 20px;">
          <el-row :gutter="30">
            <el-col :span="6" v-for="(idle,index) in idleList">
              <div class="idle-card" @click="toDetails(idle)">
                <el-image
                    style="width: 100%; height: 160px"
                    :src="idle.imgUrl"
                    fit="contain">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline">Nothing....-_-</i>
                  </div>
                </el-image>
                <div class="idle-title">
                  {{ idle.idleName }}
                </div>
                <el-row style="margin: 5px 10px;">
                  <el-col :span="12">
                    <div class="idle-prive">￥{{ idle.idlePrice }}</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="idle-place">{{ idle.idlePlace }}</div>
                  </el-col>
                </el-row>
                <div class="idle-time">{{ idle.timeStr }}</div>
                <div class="user-info">
                  <el-image
                      style="width: 30px; height: 30px"
                      :src="idle.user.avatar"
                      fit="contain">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline">无图</i>
                    </div>
                  </el-image>
                  <div class="user-nickname">{{ idle.user.nickname }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="fenye">
          <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="8"
              layout="prev, pager, next, jumper"
              :total="totalItem">
          </el-pagination>
        </div>
      </div>
      <app-foot></app-foot>
    </app-body>
  </div>
</template>

<script>
import AppHead from '../common/AppHeader.vue';
import AppBody from '../common/AppPageBody.vue'
import AppFoot from '../common/AppFoot.vue'

export default {
  name: "index",
  components: {
    AppHead,
    AppBody,
    AppFoot
  },
  data() {
    return {
      activeIndex2: '0',
      labelName: '0',
      idleList: [],
      currentPage: 1,
      totalItem: 1
    };
  },
  created() {
    this.findIdleTiem(1)
  },
  watch: {
    $route(to, from) {
      this.labelName = to.query.labelName;
      let val = parseInt(to.query.page) ? parseInt(to.query.page) : 1;
      // let totalPage=parseInt(this.totalItem/8)+1;
      // val=parseInt(val%totalPage);
      // val=val===0?totalPage:val;
      this.currentPage = parseInt(to.query.page) ? parseInt(to.query.page) : 1;
      this.findIdleTiem(val);
    }
  },
  methods: {
    findIdleTiem(page) {
      const loading = this.$loading({
        lock: true,
        text: '小主，请等待.......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
      });
      if (this.labelName > 0) {
        this.$api.findIdleTiemByLable({
          idleLabel: this.labelName,
          page: page,
          nums: 8
        }).then(res => {
          console.log(res);
          let list = res.data.list;
          for (let i = 0; i < list.length; i++) {
            list[i].timeStr = list[i].releaseTime.substring(0, 10) + " " + list[i].releaseTime.substring(11, 19);
            let pictureList = JSON.parse(list[i].pictureList);
            list[i].imgUrl = pictureList.length > 0 ? pictureList[0] : '';
          }
          this.idleList = list;
          this.totalItem = res.data.count;
          console.log(this.totalItem);
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          loading.close();
        })
      } else {
        this.$api.findIdleTiem({
          page: page,
          nums: 8
        }).then(res => {
          console.log(res);
          let list = res.data.list;
          for (let i = 0; i < list.length; i++) {
            list[i].timeStr = list[i].releaseTime.substring(0, 10) + " " + list[i].releaseTime.substring(11, 19);
            let pictureList = JSON.parse(list[i].pictureList);
            list[i].imgUrl = pictureList.length > 0 ? pictureList[0] : '';
          }
          this.idleList = list;
          this.totalItem = res.data.count;
          console.log(this.totalItem);
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          loading.close();
        })
      }
    },
    handleSelect(key, keyPath) {
      this.labelName = key;
      console.log(key, keyPath);
      // console.log(tab,event);
      console.log(this.labelName);
      this.$router.replace({query: {page: 1, labelName: this.labelName}});
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$router.replace({query: {page: val, labelName: this.labelName}});
    },
    toDetails(idle) {
      this.$router.push({path: '/details', query: {id: idle.id}});
    }
  }
}
</script>

<style scoped>
.idle-card {
  height: 300px;
  border: #eeeeee solid 1px;

  cursor: pointer;
}

.fenye {
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
}

.idle-title {
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 10px;
}

.idle-prive {
  font-size: 16px;
  color: red;
}

.idle-place {
  font-size: 13px;
  color: #666666;
  float: right;
  padding-right: 20px;

}

.idle-time {
  color: #666666;
  font-size: 12px;
  margin: 0 10px;
}

.user-nickname {
  color: #999999;
  font-size: 12px;
  display: flex;
  align-items: center;
  height: 30px;
  padding-left: 10px;
}

.user-info {
  padding: 5px 10px;
  height: 30px;
  display: flex;
}
</style>
