export const flatpickrOptions = {
  disableMobile: true,
  formatDate: (date: Date): string => {
    const d = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    return d.toISOString().split('T')[0]
  },
  parseDate: (string: string): Date => {
    const date = new Date(string)
    return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  },
}