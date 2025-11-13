"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ClassData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

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
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <h3 className="class__title text-sm font-bold line-clamp-1">
              {title}
            </h3>
            <p className="text-sm font-medium">{formatPrice(sellingPrice)}원</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs">강사명: {instructor}</p>
            <Badge variant="outline">
              {applicants}/{capacity}
            </Badge>
          </div>
        </div>
      </Label>
    </li>
  );
}
