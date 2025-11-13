"use client";

import { Card } from "@/components/ui/card";
import {
  ClassFilter,
  ClassList,
  ClassItem,
  Buttons,
} from "../components/class";
import { useGetClassData } from "@/lib/queries";

/**
 * /class - 강의 목록 컴포넌트
 */
export default function Page() {
  const { data = [], isFetching } = useGetClassData();

  if (isFetching) {
    return <></>;
  }

  return (
    <main>
      <Card className="p-4">
        <ClassFilter />
        <ClassList>
          {data.length &&
            data.map((data) => (
              <ClassItem
                key={`class-item-${data.id ? data.id : ""}`}
                data={data}
              />
            ))}
        </ClassList>
        <Buttons />
      </Card>
    </main>
  );
}
