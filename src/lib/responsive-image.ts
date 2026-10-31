// All images are downloaded as optimized WebP files.
// Since single-resolution optimized assets are used, return undefined so browsers use src directly.
export function srcSet(_src: string): string | undefined {
  return undefined;
}

