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

const uploadLoading = ref(false)
const excelUploadInput = ref(null)

const handleUploadClick = () => {}
const handleChange = () => {}

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
