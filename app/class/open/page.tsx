import type { Metadata } from "next";
import { AddClassPage } from "./AddClassPage";

export const metadata: Metadata = {
  title: "강의 등록",
  description: "새로운 강의를 등록할 수 있습니다.",
};

/**
 * /class/open - 강의등록 페이지 (서버 컴포넌트)
 */
export default function Page() {
  return <AddClassPage />;
}
