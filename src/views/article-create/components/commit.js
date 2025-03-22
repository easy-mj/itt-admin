import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { createArticle, editorArticle } from '@/api/article'

const t = i18n.global.t

export const commitArticle = async (data) => {
  try {
    const result = await createArticle(data)
    ElMessage.success(t('msg.article.createSuccess'))
    return result
  } catch (error) {
    return error
  }
}

export const editArticle = async (data) => {
  try {
    const result = await editorArticle(data)
    ElMessage.success(t('msg.article.editorSuccess'))
    return result
  } catch (error) {
    return error
  }
}
