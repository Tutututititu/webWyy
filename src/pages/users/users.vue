<template>
  <div>
    <!-- //头部 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/users' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8"
          ><el-input
            placeholder="请输入内容"
            v-model="userInfo.query"
            @keyup.enter.native="getUserList"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="8"
          ><el-button type="primary" @click="addNewUserFun"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 表单数据 -->
      <el-table :data="userList" border stripe style="margin-top: 20px">
        <el-table-column type="index" label="#" width="30px"></el-table-column>
        <el-table-column label="id" prop="id" width="50px"> </el-table-column>
        <el-table-column label="姓名" prop="username" width="80px">
        </el-table-column>
        <el-table-column label="电话" prop="mobile"> </el-table-column>
        <el-table-column label="类型" prop="role_name" width="120px">
        </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column
          label="状态"
          prop="mg_state"
          width="62px"
          style="min-width=61px"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="modifyState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改数据"
              placement="top"
              :enterable="false"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="modify(scope.row)"
              ></el-button
            ></el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="修改权限"
              placement="top"
              :enterable="false"
              ><el-button
                type="warning"
                icon="el-icon-thumb"
                size="mini"
              ></el-button
            ></el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除角色"
              placement="top"
              :enterable="false"
              ><el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="100px">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userInfo.pagenum"
        :page-sizes="[1, 5, 8, 12]"
        :page-size="userInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 20px"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="添加用户"
      :visible.sync="addNewUser"
      width="50%"
      @close="clearFrom"
    >
      <el-form
        :model="addNewUserList"
        :rules="addNewUserRules"
        label-width="80px"
        ref="formRef"
      >
        <!-- 添加用户 -->
        <el-form-item label="用户名" prop="userId">
          <el-input
            v-model="addNewUserList.userId"
            placeholder="请添加用户名"
          ></el-input>
        </el-form-item>
        <!-- 添加密码 -->
        <el-form-item label="密码" prop="userPswd">
          <el-input
            v-model="addNewUserList.userPswd"
            placeholder="请添加密码"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="userPswdTwo">
          <el-input
            v-model="addNewUserList.userPswdTwo"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="userPhone">
          <el-input
            v-model="addNewUserList.userPhone"
            placeholder="请添加用户名"
          ></el-input>
        </el-form-item>
        <!-- 类型 -->
        <el-row>
          <el-form-item label="类型">
            <el-select
              v-model="typeSelect"
              placeholder="请选择类型"
              style="width=100%"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态">
            <el-select
              v-model="stateSelect"
              placeholder="请选择类型"
              style="width=100%"
            >
              <el-option
                v-for="item in steteOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="addNewUserList.userEmail"
            placeholder="请添加邮箱"
          ></el-input>
        </el-form-item>
        <!-- 状态 -->
        <!-- <el-form-item label="状态" prop="userId">
          <el-input
            v-model="addNewUserList.userId"
            placeholder="请添加状态"
          ></el-input>
        </el-form-item> -->
        <!-- 创建时间 -->
        <el-form-item label="创建时间">
          <el-input
            v-model="addNewUserList.userTime"
            :disabled="inputDisabled"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewUserF">取 消</el-button>
        <el-button type="primary" @click="addNewUserT">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改数据 -->
    <el-dialog
      title="修改用户数据"
      :visible.sync="modifyButton"
      width="50%"
      @close="clearFrom"
    >
      <el-form
        :model="modifyList"
        :rules="addNewUserRules"
        label-width="80px"
        ref="formRef"
      >
        <!-- 用户 -->
        <el-form-item label="用户名" prop="modifyUser">
          <el-input
            v-model="modifyList.modifyUser"
            :disabled="inputDisabled"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="修改邮箱" prop="modifyEamil">
          <el-input
            v-model="modifyList.modifyEamil"
            placeholder="请添加邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="修改电话" prop="modifyPhone">
          <el-input
            v-model="modifyList.modifyPhone"
            placeholder="请添加用户名"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyF">取 消</el-button>
        <el-button type="primary" @click="modifyT">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (addNewUserRules, userPswd, callback) => {
      if (userPswd === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.addNewUser.checkPass !== "") {
          this.$refs.formRef.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (addNewUserRules, userPswdTwo, callback) => {
      if (userPswdTwo === "") {
        callback(new Error("请再次输入密码"));
      } else if (userPswdTwo !== this.addNewUserList.userPswd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (addNewUserRules, userPhone, callback) => {
      const regMob =
        /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/;
      if (userPhone === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (regMob.test(userPhone)) {
          return callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var vaildataEmail = (addNewUserEmail, userEmail, callback) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (userEmail === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (regEmail.test(userEmail)) {
          return callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      }
    };
    return {
      //表单禁用
      inputDisabled: true,
      //用户列表数据
      userInfo: {
        query: "",
        pagenum: 1,
        pagesize: 6,
      },
      //用户数据列表
      userList: [],
      total: 0,
      changeModifyState: "",
      // 添加用户
      addNewUser: false,
      //修改数据dialog
      modifyButton:false,
      //添加用户数据
      addNewUserList: {
        userId: "",
        userPswd: "",
        userPswdTwo: "",
        userPhone: "",
        userEmail: "",
        userTime: "",
      },
      uploadAddUser: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //修改数据
      modifyList:{
        modifyUser:'',
        modifyEamil:'',
        modifyPhone:''
      },

      //添加用户数据验证
      addNewUserRules: {
        userId: [
          { required: true, message: "请输入用户", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        userPswd: [{ validator: validatePass, trigger: "blur" }],
        userPswdTwo: [{ validator: validatePass2, trigger: "blur" }],
        userPhone: [{ validator: validatePhone, trigger: "blur" }],
        userEmail: [{ validator: vaildataEmail, trigger: "blur" }],
      },
      // 当前日期
      currentDate: "",
      typeOptions: [
        {
          value: "1",
          label: "超级管理员",
        },
        {
          value: "2",
          label: "客户1",
        },
        {
          value: "3",
          label: "客户2",
        },
      ],
      typeSelect: "",
      steteOptions: [
        {
          value: "0",
          label: "开",
        },
        {
          value: "1",
          label: "关",
        },
      ],
      stateSelect: "",
    }
  },
  methods: {
    //用户列表数据
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.userInfo,
      });
      console.log(res);
      if (res.meta.status != 200)
        return this.$message.console.error(res.meta.msg);
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    // 每页条数
    handleSizeChange(pages) {
      this.userInfo.pagesize = pages;
      this.getUserList();
    },
    // 分页效果
    handleCurrentChange(newPages) {
      this.userInfo.pagenum = newPages;
      this.getUserList();
    },
    async modifyState(row) {
      this.changeModifyState = row.mg_state;
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      );
      if (res.meta.status != 200) return this.$message.error("更新失败");
      this.$message.success("更新成功");
    },
    //显示添加用户窗口
    addNewUserFun() {
      this.addNewUser = true;
      this.loginTime();
      console.log(this.addNewUserList.userTime);
    },
    //添加用户
    addNewUserT() {
        (this.uploadAddUser.username = this.addNewUserList.userId),
        (this.uploadAddUser.password = this.addNewUserList.userPswdTwo),
        (this.uploadAddUser.email = this.addNewUserList.userEmail),
        (this.uploadAddUser.mobile = this.addNewUserList.userPhone);
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error("要先把表单填完哦~");
          return;
        } else {
          const { data: res } = await this.$http.post(
            "users",
            this.uploadAddUser
          );
          if (res.meta.status != 201) {
            this.$message.error(res.meta.msg);
            this.addNewUser = true;
            return;
          } else {
            this.addNewUser = false;
            this.getUserList();
          }
        }
      });
    },
    //添加用户取消键
    addNewUserF() {
      this.addNewUser = false;
    },
    //修改数据取消按钮
    modifyF() {
      this.modifyButton = false
    },
    // 修改数据确定按钮
    modifyT() {
      this.modifyButton = false
      
    },
    clearFrom() {
      this.$refs.formRef.resetFields();
    },
    //修改数据
    modify(row){
      this.modifyButton = true
      this.modifyList.modifyUser = row.username;
      this.modifyList.modifyEamil = row.email;
      this.modifyList.modifyPhone = row.mobile;
      
    },
    // 获取时间
    loginTime() {
      let date = new Date();
      let year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
      let month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
      let day = date.getDate(); //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
      let hours = date.getHours(); //小时 ,返回 Date 对象的小时 (0 ~ 23)
      // let minutes = date.getMinutes(); //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
      // let seconds = date.getSeconds(); //秒 ,返回 Date 对象的秒数 (0 ~ 59)
      let currentDate = "0" + year + "" + month + "" + day + "" + hours;
      this.addNewUserList.userTime = currentDate;
    },
  },
  created() {
    //用户列表数据
    this.getUserList();
  },
};
</script>

<style scoped></style>
