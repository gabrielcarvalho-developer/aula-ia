import { Schema, model, models } from "mongoose";

const moduleSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
});

const lessonSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  order: { type: Number, required: true },
  version: { type: Number, required: true, default: 1 },
});

const activitySchema = new Schema({
  key: { type: String, required: true, unique: true },
  lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true, index: true },
  type: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: Schema.Types.Mixed },
  gradingConfig: { type: Schema.Types.Mixed, required: true, select: false },
  order: { type: Number, required: true },
});

export const LearningModule = models.Module ?? model("Module", moduleSchema);
export const Lesson = models.Lesson ?? model("Lesson", lessonSchema);
export const Activity = models.Activity ?? model("Activity", activitySchema);
