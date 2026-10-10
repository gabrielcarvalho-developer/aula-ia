export type GradableAnswer = string | string[];

export function normalize(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}

export function gradeAnswer(answer: GradableAnswer, correct: GradableAnswer) {
  if (Array.isArray(correct)) {
    return Array.isArray(answer) && answer.length === correct.length && answer.every((item, i) => normalize(item) === normalize(correct[i]));
  }
  return typeof answer === "string" && normalize(answer) === normalize(correct);
}

export function calculateLessonScore(bestScores: number[]) {
  return Math.max(0, Math.min(100, bestScores.reduce((sum, score) => sum + score, 0)));
}

export function calculateOverallAverage(scores: number[]) {
  if (scores.length === 0) return null;
  return Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10;
}
