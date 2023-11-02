<template>
  <div class="el-header-common">
    <div class="header-l">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="changeMenu"
        style="margin-right: 20px"
      ></el-button>

      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item of tabsList"
          :key="item.label"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="header-r">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/user.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Cookies from "js-cookie";

export default {
  name: "CommonHeader",

  methods: {
    changeMenu() {
      this.$store.commit("changeMenu");
    },
    logout() {
      Cookies.remove("token");
      Cookies.remove("menuData");
      this.$router.push({ name: "login" });
    },
  },

  computed: {
    ...mapState("tab", ["tabsList"]),
  },
};
</script>

<style lang='less'>
.el-header-common {
  height: 60px;
  background-color: #333;
  // margin-left: -20px;
  // padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-l {
    display: flex;
    align-items: center;
    padding-left: 20px;
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link {
          color: #666;
          font-size: 16px;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          &.is-link {
            color: #fff;
          }
        }
      }
    }
  }

  .header-r {
    margin-right: 20px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>