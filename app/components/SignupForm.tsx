"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Card } from "@/components/ui/card";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DATA_KEY_USER_NAME,
  DATA_KEY_USER_TYPE,
  INPUT_EMAIL_ID,
  INPUT_NAME_ID,
  INPUT_PASSWORD_ID,
  INPUT_PHONE_ID,
  INPUT_USER_TYPE_INSTRUCTOR_ID,
  INPUT_USER_TYPE_LEARNER_ID,
  USER_INSTRUCTOR,
  USER_LEARNER,
} from "@/lib/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { isAvailablePassword } from "@/lib/validation";

/**
 * 회원 가입을 위한 Form 클라이언트 컴포넌트
 */
export function SignupForm() {
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const router = useRouter();

  /**
   * 회원가입 핸들러
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    // 비밀번호 유효성 검사
    if (!isAvailablePassword(password)) {
      setIsInvalidPassword(true);
      return;
    } else {
      setIsInvalidPassword(false);
    }

    const data = {
      name: formData.get("name"),
      userType: formData.get("userType"),
    };

    Cookies.set(DATA_KEY_USER_NAME, data.name as string);
    Cookies.set(DATA_KEY_USER_TYPE, data.userType as string);

    router.push("/class");
  };

  return (
    <Card className="p-4">
      {isInvalidPassword && <PasswordAlert />}
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <Field>
            <FieldLabel htmlFor={INPUT_NAME_ID}>이름</FieldLabel>
            <Input
              id={INPUT_NAME_ID}
              name="name"
              placeholder="홍길동"
              required
            ></Input>
          </Field>
          <Field>
            <FieldLabel htmlFor={INPUT_EMAIL_ID}>이메일</FieldLabel>
            <Input
              id={INPUT_EMAIL_ID}
              name="email"
              placeholder="hong@weolbu.com"
              required
            ></Input>
          </Field>
          <Field>
            <FieldLabel htmlFor={INPUT_PHONE_ID}>휴대폰 번호</FieldLabel>
            <Input
              id={INPUT_PHONE_ID}
              name="phone"
              type="phone"
              placeholder="010-1234-5678"
              required
            ></Input>
          </Field>
          <Field>
            <FieldLabel htmlFor={INPUT_PASSWORD_ID}>비밀번호</FieldLabel>
            <Input
              id={INPUT_PASSWORD_ID}
              name="password"
              type="password"
              placeholder="••••••••"
              required
            ></Input>
          </Field>
          <Field>
            <FieldLabel>회원유형</FieldLabel>
            <RadioGroup
              name="userType"
              defaultValue={USER_LEARNER}
              className="flex"
            >
              <Field orientation="horizontal">
                <RadioGroupItem
                  value={USER_LEARNER}
                  id={INPUT_USER_TYPE_LEARNER_ID}
                ></RadioGroupItem>
                <FieldLabel htmlFor={INPUT_USER_TYPE_LEARNER_ID}>
                  수강생
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem
                  value={USER_INSTRUCTOR}
                  id={INPUT_USER_TYPE_INSTRUCTOR_ID}
                ></RadioGroupItem>
                <FieldLabel htmlFor={INPUT_USER_TYPE_INSTRUCTOR_ID}>
                  강사
                </FieldLabel>
              </Field>
            </RadioGroup>
          </Field>
          <Field>
            <Button type="submit">회원가입</Button>
          </Field>
        </FieldSet>
      </form>
    </Card>
  );
}

/**
 * 비밀번호 조건 미충족 시 Alert
 */
const PasswordAlert = () => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertDescription>
        <p>
          비밀번호는 6자 이상 10자 이하이며,
          <br />
          영문 소문자, 대문자, 숫자 중 최소 두 가지 이상 조합이어야 합니다.
        </p>
      </AlertDescription>
    </Alert>
  );
};
