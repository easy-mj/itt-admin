import { ref } from 'vue'
import Sortable from 'sortablejs'
import { ElMessage } from 'element-plus'
import { articleSort } from '@/api/article'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  // 1. 要拖拽的对象
  const el = tableRef.value.$el.querySelector(
    '.el-table__body-wrapper table tbody'
  )
  // 2. 配置对象
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束之后的回调方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      try {
        await articleSort({
          initRanking: tableData.value[oldIndex].ranking,
          finalRanking: tableData.value[newIndex].ranking
        })
        ElMessage.success(i18n.global.t('msg.article.sortSuccess'))

        // 重新获取数据
        cb && cb()
      } catch (error) {}
    }
  })
}
