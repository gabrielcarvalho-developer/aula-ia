export function sigmoid(value: number) {
  return 1 / (1 + Math.exp(-value));
}

export function softmaxWithTemperature(logits: number[], temperature: number) {
  const safe = Math.max(0.1, temperature);
  const scaled = logits.map((value) => value / safe);
  const max = Math.max(...scaled);
  const exps = scaled.map((value) => Math.exp(value - max));
  const total = exps.reduce((sum, value) => sum + value, 0);
  return exps.map((value) => value / total);
}

export function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, value, i) => sum + value * (b[i] ?? 0), 0);
  const magA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const magB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}
