const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=80",
];

export function getDummyCarImages(make: string, model: string, count = 3): string[] {
  const base = `${make}-${model}`.toLowerCase().replace(/\s+/g, "-");

  return Array.from({ length: count }, (_, index) => {
    const seed = `${base}-${index}`;
    return `https://picsum.photos/seed/${seed}/1200/800`;
  });
}

export function getFallbackCarImage(): string {
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
}
