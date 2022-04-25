<template>
  <div class="about">
    <el-container>
      <el-header
        >后台管理系统
        <el-button type="info" size="mini" @click="tc">退出</el-button>
      </el-header> 
      <el-container>
        <el-aside :width="zd ? '20px' : '200px'"> 
          <header @click="zd = !zd">|||</header>
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :route="true"
          > 
            <el-submenu v-for="item in menus" :index="item.id+''" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i> 
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group> 
                <el-menu-item  v-for="ite in item.children" :key="ite.id" :index="'/'+ite.path"> 
                  <span slot="title">{{ite.authName}}</span> 
                </el-menu-item>
              </el-menu-item-group> 
            </el-submenu>
           
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
      
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {getMenusApi} from '@/http/api'
export default {
  data() {
    return {
      zd: false,
      dialogVisible: false,
      menus:[]
    };
  },
  mutations: {
     
  },
  created() {
      this.getlist() 
  },
  methods: {
    tc() {
      // console.log("即将要退出啦");
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
    async getlist() {
      let res = await getMenusApi();
      this.menus=res
      console.log(this.menus)
    }
  }
};
</script>
<style>
.el-header {
  width: 100%;
  background: #666;
  color: white;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
header {
  background: #333;
  color: white;
  text-align: center;
}
.el-aside {
  min-height: 600px; 
  background: #545c64;
  overflow: hidden;
}
</style>
