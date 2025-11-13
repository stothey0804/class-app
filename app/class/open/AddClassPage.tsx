"use client";

import Cookies from "js-cookie";

import { Card } from "@/components/ui/card";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  INPUT_CLASS_CAPACITY_ID,
  INPUT_CLASS_Title_ID,
  INPUT_CLASS_PRICE_ID,
  DATA_KEY_USER_NAME,
} from "@/lib/constants";

import { useAddClassData } from "@/lib/queries";

/**
 * 강의 등록 페이지 클라이언트 컴포넌트
 */
export function AddClassPage() {
  const { mutate, isPending } = useAddClassData();

  /**
   * 강의등록 핸들러
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userName = Cookies.get(DATA_KEY_USER_NAME);

    const newClass = {
      title: formData.get("title") as string,
      capacity: Number(formData.get("capacity")),
      sellingPrice: Number(formData.get("sellingPrice")),
      instructor: userName || "instructor",
      applicants: 0,
    };

    mutate(newClass);
  };

  return (
    <main>
      <Card className="p-4">
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor={INPUT_CLASS_Title_ID}>강의명</FieldLabel>
              <Input
                id={INPUT_CLASS_Title_ID}
                name="title"
                placeholder="강의명"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={INPUT_CLASS_CAPACITY_ID}>
                수강인원
              </FieldLabel>
              <Input
                id={INPUT_CLASS_CAPACITY_ID}
                name="capacity"
                type="number"
                placeholder="10"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={INPUT_CLASS_PRICE_ID}>가격</FieldLabel>
              <Input
                id={INPUT_CLASS_PRICE_ID}
                name="sellingPrice"
                type="number"
                placeholder="100,000"
                required
              />
            </Field>
            <Field>
              <Button type="submit" disabled={isPending}>
                강의등록
              </Button>
            </Field>
          </FieldSet>
        </form>
      </Card>
    </main>
  );
}
