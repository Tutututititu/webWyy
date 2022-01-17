<template>
  <div class="loginDiv">
    <el-form
      ref="form"
      :model="loginForm"
      :rules="loginFormRules"
      class="loginCounter"
    >
      <img src="./../assets/logo.png" alt="" class="login-img" />
      <h3>登录</h3>
      <el-form-item class="login-form-item" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          placeholder="用户名"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="输入密码"
          prefix-icon="iconfont icon-password"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-button">
        <el-button type="danger" style="width: 100%" @click="userLogin"
          >登录</el-button
        >
      </el-form-item>
      <el-checkbox v-model="checked" class="login-check">记住我</el-checkbox>
      <div class="login-add">
        <router-link to="/loginAdd">注册</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      loginGo: false,
      loginTimea: "",
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "用户名长度在2-8个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 25, message: "密码长度在6-25个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //登录验证
    userLogin() {
      this.$refs.form.validate(async (res) => {
        if (!res) return;
        const { data: ress } = await this.$http.post("login", this.loginForm);
        if (ress.meta.status != 200) {
          return this.$message.error("用户名或密码错误啦！");
        } else {
          this.loginTime();
          this.$message({
            message: "登录成功！当前时间：" + this.loginTimea,
            type: "success",
          });
          window.sessionStorage.setItem('token',ress.data.token)
          this.$router.push("/home");
          console.log(ress);
        }
      });
    },
    loginTime() {
      "登录成功" + "当前时间" + this.loginTimea;
      let date = new Date();
      let year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
      let month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
      let day = date.getDate(); //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
      let hours = date.getHours(); //小时 ,返回 Date 对象的小时 (0 ~ 23)
      let minutes = date.getMinutes(); //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
      let seconds = date.getSeconds(); //秒 ,返回 Date 对象的秒数 (0 ~ 59)
      let currentDate =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      this.loginTimea = currentDate;
    },

    // userLogin(loginForm) {

    //   this.$store.commit("userLogin", loginForm);
    //   this.loginGo = this.$store.getters.loginGo;
    //   if(loginForm.userName === '') {
    //     this.$message({
    //       message: "用户名不能为空",
    //       type: "warning",
    //     });
    //   }else if(loginForm.password === '') {
    //     this.$message({
    //       message: "密码不能为空",
    //       type: "warning",
    //     });
    //   }else if (this.loginGo) {
    //     this.$router.push("/loginAdd");
    //   } else {
    //     this.$message({
    //       message: "检查用户名，密码和校验码",
    //       type: "warning",
    //     });
    //   }

    // },
  }

};
</script>

<style scoped>
.loginDiv {
  width: 450px;
  text-align: center;
  box-shadow: 0px 1px 8px 1px rgb(202, 202, 202);
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-check {
  margin-bottom: 20px;
  float: left;
}
.login-input {
  width: 50%;
  float: left;
}
.login-add {
  text-decoration: none;
  text-align: right;
}
.login-add a {
  color: black;
  text-decoration: none;
}
.login-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 1px 8px 1px rgb(255, 214, 214);
  box-sizing: border-box;
  padding: 2px;
}
</style>
