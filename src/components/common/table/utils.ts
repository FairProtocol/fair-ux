export const getColumns = (columns: number | string = 1): string => {
  if (typeof columns === 'string') {
    return columns
  }

  let totalColumns = ''

  for (let c = 0; c < columns; c++) {
    totalColumns += '1fr '
  }

  return totalColumns
}
