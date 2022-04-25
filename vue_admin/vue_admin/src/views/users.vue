<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>  
    <br />
    <el-card> 
      <el-input placeholder="请输入内容" v-model="user.query"></el-input>
      <el-button @click="search">搜索</el-button> <el-button type="primary">添加</el-button>
      <br /> 
      <br /> 
      <template> 
        <el-table :data="users" border style="width: 100%">
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="姓名" prop="username"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="电话" prop="mobile"></el-table-column>
          <el-table-column label="角色" prop="role_name"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px">
            <template>
              <el-button type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini">删除</el-button>
              <el-button type="warning" size="mini">设置</el-button>
            </template>
          </el-table-column> 
        </el-table>
      </template>
    </el-card>
    <br />

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="user.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> 
    </div> 
  </div>
</template> 
<script>
import { getUserListapi } from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
      users:[],
      value: true,
      total:0,
      user: {
        query: "",
        pagenum: 1,
        pagesize: 4,
      },
    };
  },

  mounted() {
    this.getlist();
  },
  methods: {
      search(){
          console.log('搜索',this.user) 
        this.getlist() 
          
      },
    handleSizeChange(val){
        console.log('当前每页显示条数',val) 
        this.user.pagesize=val
        this.getlist() 
    },
    handleCurrentChange(val){
        console.log('当前页码',val)
        this.user.pagenum=val
        this.getlist()
    }, 
    async getlist() {
      let res = await getUserListapi(this.user);
      let { total, users } = res;
      this.total = total;
      this.users = users;
    },
  },
};
</script>

<style scoped>  
.el-input {
  width: 350px;
}
</style>
