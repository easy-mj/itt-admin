<template>
  <div class="article-ranking">
    <el-card>
      <template #header>
        <div class="header-wrapper">
          <div>
            <el-button
              :icon="Refresh"
              size="small"
              :loading-icon="Refresh"
              :loading="tableLoading"
              @click="handleRefreshClick"
            />
          </div>
        </div>
      </template>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="tableLoading"
        element-loading-text="Loading..."
      >
        <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
          width="100"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
          width="100"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.publicDate')"
          prop="publicDate"
          width="160"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('msg.role.action')" width="160">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="handleShowClick(row)"
            >
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteClick(row)"
            >
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          class="pagination"
          size="small"
          :current-page="page"
          :page-size="size"
          :page-sizes="[2, 5, 10, 20]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { watchSwitchLanguage } from '@/utils/i18n'
import { getArticleList } from '@/api/article'

// 定义数据相关变量
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(5)
const tableLoading = ref(false)

// 获取数据的方法
const fetchListData = async () => {
  try {
    tableLoading.value = true
    const result = await getArticleList({
      page: page.value,
      size: size.value
    })
    tableData.value = result.list
    total.value = result.total
  } catch (error) {
  } finally {
    tableLoading.value = false
  }
}
fetchListData()
watchSwitchLanguage(fetchListData) // 国际化
onActivated(fetchListData)

// 刷新
const handleRefreshClick = () => {
  fetchListData()
}

// 分页处理
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  fetchListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  fetchListData()
}

// 点击查看
const handleShowClick = () => {}

// 点击删除
const handleDeleteClick = () => {}
</script>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 30px;
  height: 30px;
}

.pagination-wrapper {
  display: flex;
  justify-content: end;
  margin-top: 12px;
}
</style>
