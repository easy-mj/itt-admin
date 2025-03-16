<template>
  <div class="user-info">
    <el-card>
      <!-- 打印 -->
      <div class="print-container">
        <el-button type="primary" size="small">
          {{ $t('msg.userInfo.print') }}
        </el-button>
      </div>
      <div class="user-info-container">
        <!-- 标题 -->
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <!-- 头部 -->
        <div class="header">
          <!-- 表格 -->
          <el-descriptions :columns="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{ detailData.username }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ detailData.gender }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">
              {{ detailData.nationality }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">
              {{ detailData.mobile }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">
              {{ detailData.userprovince }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{ $filters.dateFilter(detailData.openTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">
              {{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 头像 -->
          <el-image class="avatar" :src="detailData.avatar"></el-image>
        </div>
        <!-- 内容 -->
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ $filters.dateFilter(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部 -->
        <div class="footer">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserDetail } from '@/api/user-manage'
import { watchSwitchLanguage } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 获取详情数据
const detailData = ref([])
const fetchUserDetail = async () => {
  detailData.value = await getUserDetail(props.id)
}
fetchUserDetail()
// 切换语言
watchSwitchLanguage(() => {
  fetchUserDetail()
})
</script>

<style lang="scss" scoped>
.print-container {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-container {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 100px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .footer {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
