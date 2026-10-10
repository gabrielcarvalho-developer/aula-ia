import { notFound, redirect } from "next/navigation";
import { LessonReader } from "@/components/learning/lesson-reader";
import { getPublicLesson } from "@/content/curriculum";
import { connectDb } from "@/lib/db/connect";
import { getCurrentStudent } from "@/lib/security/student-session";
import { ActivityAttempt, LessonProgress } from "@/models/Progress";

export const dynamic = "force-dynamic";

export default async function LessonPage({params}:{params:Promise<{lessonId:string}>}){
  const student=await getCurrentStudent();if(!student)redirect("/");const {lessonId}=await params;const lesson=getPublicLesson(lessonId);if(!lesson)notFound();await connectDb();const [progress,attempts]=await Promise.all([LessonProgress.findOne({studentId:student._id,lessonId}).lean(),ActivityAttempt.find({studentId:student._id,lessonId}).distinct("activityId")]);
  return <LessonReader lesson={lesson} initialStep={progress?.currentStep??0} attemptedIds={attempts as string[]} initialCompleted={progress?.completed??false}/>;
}
