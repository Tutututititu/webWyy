<template>
  <div class="homeMain">
    <el-container class="homeMain">
      <!-- 顶部 -->
      <el-header>
        <div>
          <span>一个后台管理系统</span>
        </div>
        <div>
          <img src="./../assets/logo.png" alt="" class="homeLogo" />
          <span style="margin: 0 20px">suername</span>
          <el-button type="info" plain @click="loginOut">退出</el-button>
        </div>
      </el-header>
      <el-container class="home-el-container">
        <el-aside :width="asideWidth">

          <div class="home-xg" @click="navMin()">/\</div>
          <el-menu
            background-color="#3d3d3d"
            text-color="#999"
            active-text-color="#fff"
            unique-opened
            style="border: none"
            :collapse="isNavM"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in letNav.data"
              :key="item.id"
            >
              <template slot="title">
                <i :class="elIcon[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                v-for="sonItem in item.children"
                :key="sonItem.id"
                :index="sonItem.path + ''"
                @click="saveNavState(sonItem.path + '')"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ sonItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 侧边 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 主体 -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letNav: [],
      elIcon: {
        125: "el-icon-user-solid",
        103: "el-icon-bangzhu",
        101: "el-icon-s-goods",
        102: "el-icon-shopping-cart-full",
        145: "el-icon-edit-outline",
      },
      isNavM:false,
      asideWidth:'200px',
      asideWidtha:'',
      //被激活的链接
      activePath:''
    };
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    navMin(){
        this.isNavM = !this.isNavM
        if(this.asideWidth == '200px'){
            return this.asideWidth = '70px'
        }else{
            return this.asideWidth = '200px'
        }
    },
            //保存连接激活状态
        saveNavState(path){
          window.sessionStorage.setItem('active',path)
          this.activePath = path
        },
    //请求左侧菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status != 200) return this.$message.error(res.meta.msg);
      this.letNav = res;
      console.log(res);
    },

  },
  created() {
    //请求左侧菜单
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('active')
  },
  computed:{

  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: rgb(61, 61, 61);
  color: rgb(206, 206, 206);
  line-height: 60px;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  background-color: rgb(61, 61, 61);
  color: rgb(255, 255, 255);
  /* text-align: center; */
  /* line-height: 200px; */
}

.el-main {
  background-color: #ffffff;
  color: #333;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.homeMain {
  height: 100%;
  width: 100%;
}
.homeLogo {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border: 1px solid rgb(212, 212, 212);
  border-radius: 50%;
  padding: 3px;
  box-sizing: border-box;
}
.home-xg {
  height: 30px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 3px;
  font-size: 20px;
  color: #d1d1d1;
  cursor: pointer;
  background-color: rgb(121, 121, 121);
}
</style>
