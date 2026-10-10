import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/labs/tokenize/route";

describe("real tokenizer laboratory", () => {
  it("returns o200k_base token ids that can be compared", async () => {
    const request = new Request("http://localhost/api/labs/tokenize", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: "Inteligência artificial!" }) });
    const response = await POST(request);
    const data = await response.json() as { tokenizer: string; count: number; tokens: { id: number; text: string }[] };
    expect(response.status).toBe(200);
    expect(data.tokenizer).toContain("o200k_base");
    expect(data.count).toBeGreaterThan(0);
    expect(data.tokens.every((token) => Number.isInteger(token.id))).toBe(true);
  });
});
