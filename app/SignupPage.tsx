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

import { isAvailablePassword, formatPhoneNumber } from "@/lib/utils";

/**
 * 회원 가입 페이지 컴포넌트
 */
export function SignupPage() {
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [phoneValue, setPhoneValue] = useState("");

  const router = useRouter();

  /**
   * 전화번호 입력 핸들러
   * - 입력 시 포맷 유지 (e.g. 000-0000-0000)
   */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
  };

  /**
   * 회원가입 submit 핸들러
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
    <main>
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
                type="email"
                placeholder="hong@weolbu.com"
                required
              ></Input>
            </Field>
            <Field>
              <FieldLabel htmlFor={INPUT_PHONE_ID}>휴대폰 번호</FieldLabel>
              <Input
                id={INPUT_PHONE_ID}
                name="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={phoneValue}
                onChange={handlePhoneChange}
                maxLength={13}
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
    </main>
  );
}

/**
 * Alert 컴포넌트
 * - 비밀번호 조건 미충족 시 노출
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
