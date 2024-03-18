<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3 @click="goToHome" class="clickable-header">{{ naMe }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.path"
      @click="ClickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.path"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item @click="ClickMenu(subItem)" :index="subItem.path">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang='less' scope>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: 0;
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
.clickable-header:hover {
  cursor: pointer; /* 或者使用 default */
}
</style>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    ClickMenu(item) {
      this.$router.push(item.path).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          // 如果错误不是 NavigationDuplicated，则重新抛出
          throw err;
        }
      });
      this.$store.commit("selectMenu", item);
    },
    goToHome() {
      const currentRoute = this.$router.currentRoute.path;
      if (currentRoute !== "/home") {
        this.$router.push({ name: "Home" });
      }
    },
  },
  computed: {
    menuData() {
      //判断当前数据，如果缓存中没有，当前store中获取
      return JSON.parse(Cookie.get("menu")) || this.$store.state.tab.menu;
    },
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    naMe() {
      if (this.$store.state.tab.isCollapse == true) {
        return "后台";
      } else {
        return "通用后台管理系统";
      }
    },
  },
};
</script>