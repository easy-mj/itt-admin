<template>
  <div class="profile">
    <el-row>
      <el-col :span="6">
        <project-card
          class="project-card"
          :features="featureData"
        ></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFeature } from '@/api/user'
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'

// 当前激活的 tab
const activeTab = ref('feature')

// 获取用户特性
const featureData = ref(null)
const fetchFeature = async () => {
  const res = await getFeature()
  featureData.value = res
}
fetchFeature()
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
