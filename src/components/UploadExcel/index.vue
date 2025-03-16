<template>
  <div class="upload-excel">
    <!-- 点击上传 -->
    <div class="upload-btn">
      <el-button
        type="primary"
        :loading="uploadLoading"
        @click="handleUploadClick"
      >
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
      <input
        ref="excelUploadInput"
        type="file"
        class="excel-upload-input"
        accept=".xlsx, .xls"
        @change="handleChange"
      />
    </div>
    <!-- 拖拽上传: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon><UploadFilled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow } from './helper'

const props = defineProps({
  // 上传文件之前的回调
  beforeUpload: {
    type: Function
  },
  // 上传成功的回调
  onSuccess: {
    type: Function
  }
})

// 点击上传触发
const uploadLoading = ref(false)
const excelUploadInput = ref(null)
const handleUploadClick = () => {
  excelUploadInput.value.click()
}

const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  uploadFile(rawFile)
}

/**
 * 触发上传事件
 */
const uploadFile = (file) => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调
  if (!props.beforeUpload) {
    readerData(file)
    return
  }
  // 如果用户指定了上传前的回调，只有返回 true 才执行后续操作
  const before = props.beforeUpload()
  if (before) {
    readerData(file)
  }
}

/**
 * 根据导入内容，生成数据
 */
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

/**
 * 读取数据（异步）
 */
const readerData = (file) => {
  uploadLoading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const reader = new FileReader()
    // 该事件在读取操作完成时触发 https://developer.mozilla.org/en-US/docs/Web/API/FileReader/load_event
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 使用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格（工作簿）名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 读取 firstSheet（第一张表格）的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(workSheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7. 传入解析后数据
      generateData({ header, results })
      // 8. 处理 loading
      uploadLoading.value = false
      // 9. 成功回调
      resolve()
    }
    // 读取文件
    reader.readAsArrayBuffer(file)
  })
}

const handleDrop = () => {}
const handleDragover = () => {}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .upload-btn,
  .drop {
    border: 1px dashed #bbb;
    width: 360px;
    height: 180px;
    text-align: center;
    line-height: 180px;
  }

  .drop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 60px;
    color: #bbb;

    i {
      display: block;
      margin: 0 auto;
      font-size: 60px;
    }
  }
}
</style>
