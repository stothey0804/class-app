"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SORT_TYPE_CAPACITY_DESC,
  SORT_TYPE_ID_DESC,
  SORT_TYPE_RATE_DESC,
} from "@/lib/constants";
import { SortType } from "@/lib/types";

interface ClassFilterProps {
  sortBy: SortType;
  onSortChange: (value: string) => void;
}

/**
 * 클래스 정렬 기준 select
 * @param sortBy 정렬 기준
 */
export function ClassFilter({ sortBy, onSortChange }: ClassFilterProps) {
  return (
    <div className="flex w-full">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger>
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>정렬</SelectLabel>
            <SelectItem value={SORT_TYPE_ID_DESC}>최신 등록순</SelectItem>
            <SelectItem value={SORT_TYPE_CAPACITY_DESC}>
              신청자 많은순
            </SelectItem>
            <SelectItem value={SORT_TYPE_RATE_DESC}>수강률 높은순</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
