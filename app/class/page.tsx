import { Metadata } from "next";
import { ClassPage } from "./ClassPage";

export const metadata: Metadata = {
  title: "강의 목록",
  description: "등록된 강의를 확인하고 신청할 수 있습니다.",
};

/**
 * /class - 강의 목록 페이지 (서버 컴포넌트)
 */
export default function Page() {
  return <ClassPage />;
}