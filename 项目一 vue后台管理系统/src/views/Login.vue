<template>
  <el-form
    ref="form"
    label-width="70px"
    :inline="true"
    class="login-container"
    :model="form"
    :rules="rules"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <p v-if="showError" class="error-message">
      登录失败，请检查您的用户名和密码。
    </p>

    <el-form-item>
      <el-button @click="submit" type="primary">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 0,
            max: 20,
            message: "长度在 0 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 0,
            max: 20,
            message: "长度在 0 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      showError: false,
    };
  },
  methods: {
    submit() {
      //   //tocken信息（后端）
      //   const token = Mock.Random.guid();
      //   //将token存入cookie用于不同页面的通信
      //   Cookie.set("token", token);
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);

              //获取菜单数据存入store中
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);

              this.$router.push("/home");
            } else {
              this.showError = true;
            }
          });
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-button {
    margin-left: 105px;
    margin-top: 10px;
  }
}
.error-message {
  color: red; /* 你可以根据需要设置样式 */
  margin-top: 10px; /* 你可以根据需要设置样式 */
}
</style>