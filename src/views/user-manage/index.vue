<template>
  <div class="user-manage">
    <el-card class="header">
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
          <div>
            <el-button
              size="small"
              plain
              v-permission="['importUser']"
              @click="handleImportExcelClick"
            >
              <el-icon><UploadFilled /></el-icon> 导入Excel
            </el-button>
            <el-button size="small" plain @click="handleExportExcelClick">
              <el-icon><Files /></el-icon> 导出Excel
            </el-button>
          </div>
        </div>
      </template>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        size="small"
        style="width: 100%"
        v-loading="tableLoading"
        element-loading-text="Loading..."
      >
        <!-- 索引 -->
        <el-table-column type="index" label="#"></el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <!-- 手机号 -->
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar"> </el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column prop="mobile" :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="200"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="handleShowClick(row)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="small"
              v-permission="['distributeRole']"
              @click="handleAssignRoles(row)"
            >
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              v-permission="['removeUser']"
              @click="handleRemoveClick(row)"
              >{{ $t('msg.excel.remove') }}</el-button
            >
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
    <!-- 导出Excel -->
    <export-excel v-model="exportExcelVisible"></export-excel>
    <!-- 分配角色 -->
    <assign-roles-dialog
      v-model="assignRolesVisible"
      :userId="selectUserId"
      @updateRoleSuccess="fetchListData"
    ></assign-roles-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { deleteUserById, getUserManageList } from '@/api/user-manage'
import ExportExcel from '@/components/Export2Excel'
import AssignRolesDialog from './components/AssignRoles'

const i18n = useI18n()

// 定义数据相关变量
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
const tableLoading = ref(false)

// 获取数据的方法
const fetchListData = async () => {
  try {
    tableLoading.value = true
    const result = await getUserManageList({
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

// 跳转到 Excel 导入页面
const router = useRouter()
const handleImportExcelClick = () => {
  router.push({ name: 'import' })
}

// 处理导入用户后不重新加载的问题
onActivated(fetchListData)

// 删除用户
const handleRemoveClick = (row) => {
  ElMessageBox.confirm(
    `${i18n.t('msg.excel.dialogTitle1')}${row.username}${i18n.t(
      'msg.excel.dialogTitle2'
    )}`,
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUserById(row._id)
      ElMessage.success(i18n.t('msg.excel.removeSuccess'))
      fetchListData()
    })
    .catch(() => {})
}

// 导出 Excel
const exportExcelVisible = ref(false)
const handleExportExcelClick = () => {
  exportExcelVisible.value = true
}

// 查看处理
const handleShowClick = (row) => {
  router.push({ name: 'userInfo', params: { id: row._id } })
}

// 分配角色
const assignRolesVisible = ref(false)
const selectUserId = ref('')
const handleAssignRoles = (row) => {
  assignRolesVisible.value = true
  selectUserId.value = row._id
}

// 关闭弹窗后清除选中的用户，保证每次打开dialog都能够重新获取数据
watch(assignRolesVisible, (val) => {
  if (!val) selectUserId.value = ''
})
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
