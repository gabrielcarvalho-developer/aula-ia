import { NextResponse } from "next/server";
import { getEncoding } from "js-tiktoken";
import { z } from "zod";

const schema = z.object({ text: z.string().min(1).max(300) });

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Digite um texto de até 300 caracteres." }, { status: 400 });
    const encoding = getEncoding("o200k_base");
    const ids = encoding.encode(parsed.data.text);
    const tokens = ids.map((id) => ({ id, text: encoding.decode([id]) }));
    return NextResponse.json({ tokenizer: "o200k_base (tiktoken)", tokens, count: tokens.length });
  } catch {
    return NextResponse.json({ error: "Não foi possível tokenizar o texto." }, { status: 500 });
  }
}
