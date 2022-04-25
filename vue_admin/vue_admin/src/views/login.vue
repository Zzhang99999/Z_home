<template>
  <div class="box">
    <div class="box1">
      <h2>电商管理后台</h2>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-search"
            type="password"
          ></el-input> 
        </el-form-item> 
        <el-form-item class="aaa"> 
          <el-button type="primary" @click="dl">登录</el-button
          ><el-button type="info" @click="chongzhi">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {LoginApi} from '@/http/api'
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      //表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    dl() {
      // console.log("登录啦");
      this.$refs.form.validate(async valid => {
        if (!valid)  return false
          //成功调用后台接口
          const res = await LoginApi(this.form) 
          console.log("是否登录成功",res)  
        
           sessionStorage.setItem('token', res.token)
           console.log(res.token)
              this.$router.push("/index")
          // this.setLocalStorage('token',res.token)
          // this.$message.success(res) 
      })

    },
    // 重置的方法
    chongzhi(){
       this.$refs.form.resetFields() 
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: #2b4b6b;
}
.box1 {
  width: 35%;
  height: 350px;
  min-width: 450px;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* text-align: center; */
}
.el-input {
  width: 87%;
}
h2 {
  text-align: center;
}
.aaa {
  text-align: right;
  padding-right: 50px;
}
</style>
