<template>
  <upload-excel :onSuccess="handleSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'

const handleSuccess = (excelData) => {
  console.log(excelData)
}
</script>

<style lang="scss" scoped></style>
