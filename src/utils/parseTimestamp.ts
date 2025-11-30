export function parseUnixTimestamp(unixMillis: number) {
  const seconds = Math.floor(unixMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  let result = [];

  if (days > 0) {
    result.push(`${days}日`);
  }
  if (remainingHours > 0) {
    result.push(`${remainingHours}時間`);
  }
  if (remainingMinutes > 0) {
    result.push(`${remainingMinutes}分`);
  }
  if (remainingSeconds > 0 || result.length === 0) {
    result.push(`${remainingSeconds}秒`);
  }

  return result.join(' ');
}
