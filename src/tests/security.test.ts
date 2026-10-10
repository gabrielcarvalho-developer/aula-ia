import { describe, expect, it } from "vitest";
import { createTeacherSession, safeKeyEquals, verifyTeacherSession } from "@/lib/security/teacher-session";

describe("teacher session", () => {
  it("validates keys and rejects tampered sessions", () => {
    process.env.PROFESSOR_ACCESS_KEY="chave-correta";process.env.PROFESSOR_SESSION_SECRET="um-segredo-de-sessao-com-mais-de-32-caracteres";
    expect(safeKeyEquals("chave-correta")).toBe(true);expect(safeKeyEquals("errada")).toBe(false);
    const token=createTeacherSession();expect(verifyTeacherSession(token)).toBe(true);expect(verifyTeacherSession(`${token}x`)).toBe(false);
  });
});
