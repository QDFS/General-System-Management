<template>
  <div class="login">
    <el-form ref="form" :rules="rules" :model="form" :inline="true">
      <el-form-item>
        <h2>后台管理系统登录</h2>
      </el-form-item>
      <el-form-item label="账号:" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          @keyup.enter.native="handleRefer"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRefer">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getMenu } from "../api";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    handleRefer() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            // console.log(data);
            if (data.code === 20000) {
              //将menuData存储到store中
              this.$store.commit("tab/setMenu", data.data.menu);
              this.$store.commit("tab/addRoute", this.$router);
              const token = data.data.token;
              Cookies.set("token", token);
              this.$router.push("/");
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 300px;
  margin: 150px auto 0;
  border: 1px solid #ccc;
  padding: 50px 50px 50px 75px;
  border-radius: 10%;
  box-shadow: 0px 8px 30px 1px rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  h2 {
    color: #666666;
  }
}
</style>