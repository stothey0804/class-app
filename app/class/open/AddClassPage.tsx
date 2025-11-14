"use client";

import { useState } from "react";
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
import { formatPrice } from "@/lib/utils";

/**
 * 강의 등록 페이지 클라이언트 컴포넌트
 */
export function AddClassPage() {
  const [priceValue, setPriceValue] = useState("");

  const { mutate, isPending } = useAddClassData();

  /** 가격 입력 핸들러*/
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    const value = e.target.value.replace(/[^\d]/g, "");
    const formatted = value ? formatPrice(Number(value)) : "";
    setPriceValue(formatted);
  };

  /** 강의등록 핸들러*/
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userName = Cookies.get(DATA_KEY_USER_NAME);

    // 쉼표 제거 후 숫자로 변환
    const priceString = formData.get("sellingPrice") as string;
    const priceNumber = Number(priceString.replace(/,/g, ""));

    const newClass = {
      title: formData.get("title") as string,
      capacity: Number(formData.get("capacity")),
      sellingPrice: priceNumber,
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
                type="text"
                placeholder="100,000"
                value={priceValue}
                onChange={handlePriceChange}
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
