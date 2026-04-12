export const formatDateKey = (d: Date): string => {
  const year  = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const date  = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${date}`
}

export const isSameDate = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export const formatMonthDay = (dateKey: string): string => {
  const mm = dateKey.slice(5, 7)
  const dd = dateKey.slice(8, 10)
  return `${mm}/${dd}`
}
