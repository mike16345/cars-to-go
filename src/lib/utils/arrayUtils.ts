export function chunkArray<T>(input: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < input.length; i += size) {
    chunks.push(input.slice(i, i + size));
  }

  return chunks;
}
