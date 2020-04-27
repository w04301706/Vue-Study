<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img style="width:40px;heigth:40px" src="../assets/logo.png" alt="logo" />
        <span>电商管理后台系统</span>
      </div>
      <el-button type="info" @click="logout">logout</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isSollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse()">|||</div>
        <el-menu 
            background-color="#333744" 
            text-color="#fff" 
            active-text-color="#409eFF"
            :unique-opened="true"
            :collapse="isSollapse"
            :collapse-transition="false"
            :router="true"
            :default-active="activePath">
          <el-submenu :index="item.id+''" v-for=" item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path+''" v-for="subItem in item.children" :key="subItem.id"
            @click="saveNavState('/'+subItem.path+'')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
          </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data(){
        return{
            menuList:[],
            isSollapse:false,
            activePath:[]
        }
    },
  created(){
      this.getMenuList();
      this.activePath=window.sessionStorage.getItem('activePath');
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList(){
       const {data:res}= await this.$http.get('menus');
       if(res.meta.status!==200){
           return this.$message.error(this.meta.msg);
       }
       this.menuList=res.data;
    },
    toggleCollapse(){
        this.isSollapse= !this.isSollapse;
    },
    saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath);
        this.activePath=activePath;
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
      border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2em;
    cursor:pointer;
}
</style>