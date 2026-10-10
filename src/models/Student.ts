import { Schema, model, models } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    className: { type: String, required: true, trim: true, maxlength: 50, index: true },
    browserTokenHash: { type: String, required: true, unique: true, select: false },
    isDemo: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

studentSchema.index({ name: 1, className: 1 });
export const Student = models.Student ?? model("Student", studentSchema);
