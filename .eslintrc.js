module.exports = {
  // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
  root: true,
  // 表示启用 ESLint 的检测的环境
  env: {
    // 在 node 环境下启动 ESLint 检测
    node: true
  },
  // ESLint 中基础配置需要继承的配置
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  // 解析器
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  /**
   * 需要修改的启用规则及各自的错误级别，分为三种：关闭、警告、错误
   * 详细：https://eslint.nodejs.cn/docs/latest/use/configure/rules#%E8%A7%84%E5%88%99%E4%B8%A5%E9%87%8D%E6%80%A7
   */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
