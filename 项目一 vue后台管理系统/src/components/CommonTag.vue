<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    changeMenu(item) {
      if (item.name == "home") {
        this.$router.push("/home").catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            // 如果错误不是 NavigationDuplicated，重新抛出
            throw err;
          }
        });
      } else {
        this.$router.push({ name: item.name }).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            // 如果错误不是 NavigationDuplicated，重新抛出
            throw err;
          }
        });
      }
    },
    handleClose(item, index) {
      //调用store中的mutation
      this.closeTag(item);
      const length = this.tags.length;
      //删除之后的跳转逻辑
      if (item.name !== this.$route.name) {
        return;
      }
      //表示的是删除的最后一项
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>