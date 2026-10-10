import { describe, expect, it } from "vitest";
import { cosineSimilarity, sigmoid, softmaxWithTemperature } from "@/lib/labs/math";

describe("laboratory math", () => {
  it("computes a sigmoid", () => { expect(sigmoid(0)).toBe(.5); expect(sigmoid(2)).toBeGreaterThan(.5); });
  it("returns a normalized softmax and concentrates at low temperature", () => {
    const cold=softmaxWithTemperature([3,2,1],.2);const hot=softmaxWithTemperature([3,2,1],2);
    expect(cold.reduce((a,b)=>a+b,0)).toBeCloseTo(1);expect(cold[0]).toBeGreaterThan(hot[0]);
  });
  it("computes cosine similarity", () => { expect(cosineSimilarity([1,0],[1,0])).toBeCloseTo(1);expect(cosineSimilarity([1,0],[0,1])).toBeCloseTo(0); });
});
