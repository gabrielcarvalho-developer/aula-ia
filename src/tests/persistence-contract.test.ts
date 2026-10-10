import { describe, expect, it } from "vitest";
import { POST as switchStudent } from "@/app/api/student/switch/route";
import { createBrowserToken, hashBrowserToken, studentCookieOptions } from "@/lib/security/student-session";
import { progressSchema } from "@/lib/validation";
import { ActivityAttempt, LessonProgress } from "@/models/Progress";

describe("participant persistence contract", () => {
  it("creates independent high-entropy browser identifiers and stores only a hash", () => {
    const first = createBrowserToken();
    const second = createBrowserToken();
    expect(first).not.toBe(second);
    expect(first.length).toBeGreaterThanOrEqual(40);
    expect(hashBrowserToken(first)).not.toContain(first);
    expect(hashBrowserToken(first)).toHaveLength(64);
  });

  it("uses a persistent HttpOnly cookie and validates resumable lesson steps", () => {
    expect(studentCookieOptions.httpOnly).toBe(true);
    expect(studentCookieOptions.sameSite).toBe("lax");
    expect(studentCookieOptions.maxAge).toBeGreaterThan(60 * 60 * 24);
    expect(progressSchema.safeParse({ lessonId: "aula-3", currentStep: 6 }).success).toBe(true);
    expect(progressSchema.safeParse({ lessonId: "aula-9", currentStep: 99 }).success).toBe(false);
  });

  it("declares unique indexes for idempotent submissions and one progress row per lesson", () => {
    const attemptIndexes = ActivityAttempt.schema.indexes();
    const progressIndexes = LessonProgress.schema.indexes();
    expect(attemptIndexes.some(([fields, options]) => fields.studentId === 1 && fields.submissionId === 1 && options.unique)).toBe(true);
    expect(progressIndexes.some(([fields, options]) => fields.studentId === 1 && fields.lessonId === 1 && options.unique)).toBe(true);
  });

  it("switching students expires only the browser cookie", async () => {
    const response = await switchStudent();
    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain("ialab_participant=");
    expect(response.headers.get("set-cookie")).toContain("Max-Age=0");
  });
});
