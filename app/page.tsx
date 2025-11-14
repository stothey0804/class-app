import type { Metadata } from "next";
import { SignupPage } from "./SignupPage";

export const metadata: Metadata = {
  title: "회원가입",
  description: "회원가입 페이지입니다.",
};

/**
 * root - 회원가입 (서버 컴포넌트)
 */
export default function Home() {
  return <SignupPage />;
}
