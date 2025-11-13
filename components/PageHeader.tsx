"use client";

import { usePathname } from "next/navigation";
import { Title } from "./Title";

/**
 * 경로별 페이지 제목 매핑
 */
const PAGE_TITLES: Record<string, string> = {
  "/": "회원 가입",
  "/class": "강의 목록",
  "/class/open": "강의 등록",
};

/**
 * 페이지 헤더 - 경로에 따라 제목 표시
 */
export function PageHeader() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "";

  return <Title>{title}</Title>;
}
