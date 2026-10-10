import type { Metadata } from "next";
import { TeacherPanel } from "@/components/teacher/teacher-panel";
import { isTeacherAuthenticated } from "@/lib/security/teacher-session";

export const metadata:Metadata={title:"Área do Professor"};
export const dynamic="force-dynamic";
export default async function ProfessorPage(){let authenticated=false;try{authenticated=await isTeacherAuthenticated()}catch{/* Invalid or missing configuration remains signed out. */}return <TeacherPanel authenticated={authenticated}/>}
