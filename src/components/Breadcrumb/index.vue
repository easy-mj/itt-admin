<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <!-- 可点击项 -->
        <span v-else class="redirect" @click="handleLinkClick(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
// 生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => {
    return item.meta && item.meta.title
  })
}
// 监听路由变化时触发
watch(
  route,
  () => {
    // 当前路由的标准化路由记录
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
// hover 的颜色设置为主色，方便主题替换
const store = useStore()
const linkHoverColor = computed(() => {
  return store.getters.cssVar.menuBg
})
// 点击跳转处理
const router = useRouter()
const handleLinkClick = (item) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: v-bind(linkHoverColor);
    }
  }

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
