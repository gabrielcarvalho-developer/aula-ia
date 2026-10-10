export type ActivityType = "multiple-choice" | "true-false" | "matching" | "ordering";
export type LabType = "neuron" | "network" | "classifier" | "tokenizer" | "attention" | "temperature";

export type ActivityDefinition = {
  id: string;
  type: ActivityType;
  question: string;
  options?: string[];
  pairs?: { left: string; right: string }[];
  items?: string[];
  correctAnswer: string | string[];
  points: 30 | 40;
  feedbackCorrect: string;
  feedbackIncorrect: string;
};

export type LessonStep =
  | { kind: "situation" | "explanation" | "visual"; eyebrow: string; title: string; body: string; highlight?: string; bullets?: string[] }
  | { kind: "activity"; eyebrow: string; title: string; activityId: string }
  | { kind: "lab"; eyebrow: string; title: string; lab: LabType; body: string }
  | { kind: "summary"; eyebrow: string; title: string; body: string; concepts: string[] };

export type LessonDefinition = {
  id: string;
  moduleId: string;
  order: number;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  color: string;
  steps: LessonStep[];
  activities: ActivityDefinition[];
};

export type ModuleDefinition = {
  id: string;
  order: number;
  title: string;
  description: string;
  accent: string;
};

export type PublicActivity = Omit<ActivityDefinition, "correctAnswer">;
export type PublicLesson = Omit<LessonDefinition, "activities"> & { activities: PublicActivity[] };
