import { z } from "zod";

const cleanText = (max: number) => z.string().trim().min(2).max(max).regex(/^[\p{L}\p{M}\d .,'-]+$/u, "Use apenas letras, números e pontuação simples");

export const studentSchema = z.object({
  name: cleanText(80),
  className: cleanText(50),
});

export const progressSchema = z.object({
  lessonId: z.string().regex(/^aula-[1-6]$/),
  currentStep: z.number().int().min(0).max(8),
});

export const attemptSchema = z.object({
  lessonId: z.string().regex(/^aula-[1-6]$/),
  activityId: z.string().min(3).max(80),
  answer: z.union([z.string().max(500), z.array(z.string().max(100)).max(20)]),
  submissionId: z.string().uuid(),
});
