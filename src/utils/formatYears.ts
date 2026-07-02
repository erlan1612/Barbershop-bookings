export function formatYears(years: number): string {
  if (years % 10 === 1 && years % 100 !== 11) {
    return `${years} год`;
  }

  if (
    years % 10 >= 2 &&
    years % 10 <= 4 &&
    !(years % 100 >= 12 && years % 100 <= 14)
  ) {
    return `${years} года`;
  }

  return `${years} лет`;
}