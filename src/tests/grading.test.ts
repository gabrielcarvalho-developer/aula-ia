import { describe, expect, it } from "vitest";
import { calculateLessonScore, calculateOverallAverage, gradeAnswer } from "@/lib/grading";

describe("grading", () => {
  it("grades text without trusting casing or surrounding spaces", () => expect(gradeAnswer(" verdadeiro ", "Verdadeiro")).toBe(true));
  it("grades ordering exactly", () => {
    expect(gradeAnswer(["entrada", "peso", "saída"], ["entrada", "peso", "saída"])).toBe(true);
    expect(gradeAnswer(["peso", "entrada", "saída"], ["entrada", "peso", "saída"])).toBe(false);
  });
  it("caps lesson score and uses completed lessons only", () => {
    expect(calculateLessonScore([30, 40, 30])).toBe(100);
    expect(calculateOverallAverage([80, 90, 70])).toBe(80);
    expect(calculateOverallAverage([])).toBeNull();
  });
});
