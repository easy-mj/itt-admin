import XLSX from 'xlsx'

/**
 * 获取表头（通用方式）
 */
export const getHeaderRow = (sheet) => {
  const headers = [] // 定义数组，用于存放解析好的数据
  const range = XLSX.utils.decode_range(sheet['!ref']) // 读取sheet的单元格数据
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers // 经过上方一波操作遍历，得到最终的第一行头数据
}

/**
 * 校验是否为 Excel 文件
 */
export const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
