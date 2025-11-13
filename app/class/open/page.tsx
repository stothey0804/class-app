import type { Metadata } from "next";
import { AddClassPage } from "./AddClassPage";

export const metadata: Metadata = {
  title: "강의 등록",
  description: "새로운 강의를 등록할 수 있습니다.",
};

/**
 * /class/open 페이지 - 강의등록
 */
export default function Page() {
  return <AddClassPage />;
}
