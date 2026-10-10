import { describe, expect, it } from "vitest";
import { getPublicLesson, lessons, modules } from "@/content/curriculum";

describe("curriculum", () => {
  it("contains two modules, six lessons and nine steps per lesson", () => {
    expect(modules).toHaveLength(2);expect(lessons).toHaveLength(6);expect(lessons.every(item=>item.steps.length===9)).toBe(true);
  });
  it("assigns exactly 100 points to each lesson", () => expect(lessons.every(item=>item.activities.reduce((sum,a)=>sum+a.points,0)===100)).toBe(true));
  it("does not expose answer keys in public lesson data", () => {
    const publicLesson=getPublicLesson("aula-1");expect(publicLesson).toBeDefined();expect(publicLesson?.activities.every(activity=>!("correctAnswer" in activity))).toBe(true);
  });
});
