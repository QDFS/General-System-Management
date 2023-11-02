<template>
  <div class="user_message">
    <div class="top">
      <el-button type="primary" size="small" @click="handleAdd"
        >+ 新增</el-button
      >
      <div class="search">
        <el-input
          v-model="searchName"
          placeholder="请输入搜索内容"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <el-button type="primary" size="small" @click="handleSearch"
          >搜索</el-button
        >
        <el-button
          type="primary"
          v-show="pageData.name"
          size="small"
          @click="handleCancel"
          >取消搜索</el-button
        >
      </div>
    </div>
    <el-dialog
      title="新增用户信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :rules="rules"
        inline
        :model="form"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择出生日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remove">取 消</el-button>
        <el-button type="primary" @click="handleRefer">确 定</el-button>
      </span>
    </el-dialog>

    <div class="page">
      <el-table :data="tableData" height="60vh" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.sex === 1 ? "男" : "女"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" width="180">
        </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleUpdate(scope.row)"
              >编辑</el-button
            >
            <el-button
              @click="handleDelete(scope.row)"
              type="danger"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        class="pageCheck"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCheck"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getUserData,
  addUserData,
  updateUserData,
  deleteUserData,
} from "../api";

export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      status: 0,
      total: 0,
      searchName: "",
      pageData: {
        name: "",
        page: 1,
        limit: 10,
      },
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
      tableData: [],
    };
  },
  methods: {
    remove() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.remove();
        })
        .catch((_) => {});
    },
    handleRefer() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.status === 0) {
            addUserData(this.form).then(() => {
              this.getList();
            });
          } else {
            updateUserData(this.form).then(() => {
              this.getList();
            });
          }
          this.remove();
        }
      });

      //  dialogVisible: false
    },
    handleAdd() {
      this.dialogVisible = true;
      this.status = 0;
    },
    handleUpdate(row) {
      this.dialogVisible = true;
      this.status = 1;
      this.form = row;
    },

    handleDelete(row) {
      console.log(row);

      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUserData({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });

            // 重新获取页面
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleCheck(val) {
      this.pageData.page = val;
      this.getList();
    },

    handleSearch() {
      this.pageData.name = this.searchName;
      this.searchName = "";
      this.getList();
    },

    handleCancel() {
      this.pageData.name = "";
      this.getList();
    },

    getList() {
      getUserData({ params: this.pageData }).then(({ data }) => {
        // console.log(data);
        // console.log(data.list);
        // this.handleAdd();
        this.tableData = data.list;
        this.total = data.count ? data.count : 0;
      });
    },
  },

  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.pagination {
  position: relative;
  padding: 20px;
  .pageCheck {
    position: absolute;
    right: 0px;
  }
}
.top {
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  .search {
    display: flex;
  }
}
</style>