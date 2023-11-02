<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tabsList"
      :key="item.name"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handlerMenu(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",

  methods: {
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    handlerMenu(item, index) {
      this.$store.commit("tab/closeMenu", item);
      const length = this.tabsList.length;
      if (item.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({ name: this.tabsList[index - 1].name });
      } else {
        this.$router.push({ name: this.tabsList[index].name });
      }
    },
  },

  computed: {
    ...mapState("tab", ["tabsList"]),
  },
};
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  margin-bottom: -20px;
  .el-tag {
    margin-right: 10px;
  }
}
</style>