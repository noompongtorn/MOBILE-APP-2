export function randomNumber() {
  return Math.random() * 100 < 50 ? '1' : '2';
}
export function getString(params: string) {
  if (params === '1') {
    return 'O';
  }

  return 'E';
}
