<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 class="title">{{ isCollapse ? "后台" : "通用管理系统" }}</h3>
    <!-- 一级菜单 -->
    <el-menu-item
      v-for="item of noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 一级菜单及多级菜单 -->
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.label">
        <el-menu-item :index="subItem.label" v-on:click="clickMenu(subItem)">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import router from "@/router";
import Cookies from "js-cookie";
export default {
  name: "CommonAside",
  data() {
    return {};
  },
  methods: {
    clickMenu(i) {
      // console.log(i);
      if (
        this.$route.path !== i.path &&
        !(this.$route.path === "/home" && i.path === "/")
      ) {
        router.push(i.path);
      }

      this.$store.commit("tab/checkMenu", i);
    },
  },

  computed: {
    menuData() {
      return (
        JSON.parse(Cookies.get("menuData")) || this.$store.state.tab.menuData
      );
    },
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

 
<style lang="less"   >
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.title {
  text-align: center;
  color: #ffff;
  font-weight: 400;
}
</style>