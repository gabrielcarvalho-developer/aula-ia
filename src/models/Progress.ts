import { Schema, model, models } from "mongoose";

const attemptSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
    lessonId: { type: String, required: true, index: true },
    activityId: { type: String, required: true, index: true },
    answer: { type: Schema.Types.Mixed, required: true },
    isCorrect: { type: Boolean, required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    attemptNumber: { type: Number, required: true, min: 1 },
    submissionId: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
attemptSchema.index({ studentId: 1, submissionId: 1 }, { unique: true });
attemptSchema.index({ studentId: 1, lessonId: 1, activityId: 1, attemptNumber: 1 }, { unique: true });

const progressSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    lessonId: { type: String, required: true },
    currentStep: { type: Number, default: 0, min: 0 },
    completed: { type: Boolean, default: false },
    firstScore: { type: Number, default: null },
    bestScore: { type: Number, default: null },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
progressSchema.index({ studentId: 1, lessonId: 1 }, { unique: true });

export const ActivityAttempt = models.ActivityAttempt ?? model("ActivityAttempt", attemptSchema);
export const LessonProgress = models.LessonProgress ?? model("LessonProgress", progressSchema);
