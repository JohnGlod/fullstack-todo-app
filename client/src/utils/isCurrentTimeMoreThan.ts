export function isCurrentTimeMoreThan(timestamp: number): boolean {
  const currentTime = new Date().getTime();
  return currentTime > timestamp;
}
