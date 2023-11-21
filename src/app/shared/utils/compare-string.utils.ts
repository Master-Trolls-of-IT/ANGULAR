export function compareStringUtils(
  firstString: string,
  secondString: string,
): boolean {
  const firstStringNormalize = firstString.normalize('NFD').toLowerCase();
  const secondStringNormalize = secondString.normalize('NFD').toLowerCase();

  return firstStringNormalize === secondStringNormalize;
}
