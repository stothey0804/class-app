"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ClassData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function ClassItem({ data }: { data: ClassData }) {
  const { id, title, capacity, instructor, applicants, sellingPrice } = data;

  return (
    <li>
      <Label className="flex items-start gap-2 rounded-lg border p-3 has-[[aria-checked=true]]:border-gray-600 has-[[aria-checked=true]]:bg-gray-50 dark:has-[[aria-checked=true]]:border-gray-900 dark:has-[[aria-checked=true]]:bg-gray-950">
        <Checkbox
          id={`class-checkbox-${id}`}
          data-id={id}
          className="data-[state=checked]:border-gray-600 data-[state=checked]:bg-gray-600 data-[state=checked]:text-white dark:data-[state=checked]:border-gray-700 dark:data-[state=checked]:bg-gray-700"
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h3>{title}</h3>
            <Badge variant="outline">
              {applicants}/{capacity}
            </Badge>
          </div>
          <p>{instructor}</p>
          <p>{sellingPrice}원</p>
        </div>
      </Label>
    </li>
  );
}
