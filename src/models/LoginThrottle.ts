import { Schema, model, models } from "mongoose";

const throttleSchema = new Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  windowStart: { type: Date, required: true },
  blockedUntil: { type: Date, default: null },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export const LoginThrottle = models.LoginThrottle ?? model("LoginThrottle", throttleSchema);
