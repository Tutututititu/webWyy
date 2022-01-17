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
          ><el-input placeholder="请输入内容" v-model="userInfo.query" @keyup.enter.native="getUserList">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="8"><el-button type="primary">添加用户</el-button></el-col>
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
          <template slot-scope>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户列表数据
      userInfo: {
        query: "",
        pagenum: 1,
        pagesize: 6,
      },
      //用户数据列表
      userList: [],
      total: 0,
      changeModifyState:''
    };
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
    async modifyState(row){
      this.changeModifyState = row.mg_state;
      const {data:res} = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
      if(res.meta.status != 200) return this.$message.error('更新失败');
      this.$message.success('更新成功')
    }
  },
  created() {
    //用户列表数据
    this.getUserList();
  },
};
</script>

<style scoped></style>
