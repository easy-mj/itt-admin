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
          <div class="tools-wrapper">
            <el-dropdown
              size="small"
              trigger="click"
              class="dropdown"
              :hide-on-click="false"
              placement="bottom-start"
            >
              <span class="dropdown-setting">
                <el-icon class="el-icon--right"><setting /></el-icon>列
              </span>
              <template #dropdown>
                <el-checkbox-group
                  class="dynamic-content"
                  v-model="selectDynamicValue"
                >
                  <div v-for="item in dynamicData" :key="item.prop">
                    <el-checkbox :label="item.label" :value="item.prop" />
                  </div>
                </el-checkbox-group>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>
      <!-- 表格 -->
      <el-table
        ref="tableRef"
        :data="tableData"
        border
        style="width: 100%"
        v-loading="tableLoading"
        element-loading-text="Loading..."
      >
        <el-table-column
          v-for="item in tableColumns"
          :label="item.label"
          :prop="item.prop"
          :key="item.prop"
        >
          <!-- 时间列 -->
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <!-- 操作列 -->
          <template v-else-if="item.prop === 'action'" #default="{ row }">
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
import { ref, onActivated, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { watchSwitchLanguage } from '@/utils/i18n'
import { deleteArticle, getArticleList } from '@/api/article'
import { dynamicData, selectDynamicValue, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'

const i18n = useI18n()

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
    tableData.value = []

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

// 初始化 sortable
onMounted(() => {
  initSortable(tableData, fetchListData)
})

// 点击查看
const handleShowClick = () => {}

// 点击删除
const handleDeleteClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteArticle(row._id)
      ElMessage.success(i18n.t('msg.article.removeSuccess'))
      // 重新获取数据
      fetchListData()
    })
    .catch(() => {})
}
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

.tools-wrapper {
  display: flex;
  align-items: center;
}

.dropdown {
  padding: 6px 9px 6px 3px;
  background-color: #e2e2e2;

  .dropdown-setting {
    display: flex;
    font-size: 14px;
    cursor: pointer;
  }
}

.dynamic-content {
  padding: 10px 16px;
}

// 拖拽目标位置的样式
:deep(.sortable-ghost) {
  opacity: 0.6;
  color: #fff;
  background-color: #85aade;
  cursor: pointer;
}
</style>
