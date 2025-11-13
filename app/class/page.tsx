"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  ClassFilter,
  ClassList,
  ClassItem,
  Buttons,
} from "../components/class";

import { useGetClassData } from "@/lib/queries";
import { useIntersectionObserver } from "@/lib/hooks";
import { Spinner } from "@/components/ui/spinner";
import { CLASS_PER_PAGE, SORT_TYPE_ID_DESC } from "@/lib/constants";
import { SortType } from "@/lib/types";
import { sortDataList } from "@/lib/utils";

/**
 * /class - 강의 목록 컴포넌트
 */
export default function Page() {
  const [sortBy, setSortBy] = useState<SortType>(SORT_TYPE_ID_DESC);
  const [displayCount, setDisplayCount] = useState(CLASS_PER_PAGE);

  const { data, isLoading } = useGetClassData();

  /** 정렬된 전체 데이터 리스트 */
  const sortedData = useMemo(() => {
    return sortDataList(data, sortBy);
  }, [data, sortBy]);

  /** 현재 표시 중인 데이터 */
  const displayedData = useMemo(() => {
    return sortedData.slice(0, displayCount);
  }, [sortedData, displayCount]);

  const hasNextPage = displayCount < sortedData.length;

  /** 무한 스크롤 타겟 ref */
  const { targetRef } = useIntersectionObserver({
    fetchNextPage: () => {
      if (hasNextPage) {
        setDisplayCount((prev) => prev + CLASS_PER_PAGE);
      }
    },
    hasNextPage,
  });

  /** 정렬 변경 핸들러 */
  const handleSortChange = (newSort: SortType) => {
    setSortBy(newSort);
    setDisplayCount(10);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main>
      <Card className="p-4">
        <ClassFilter sortBy={sortBy} onSortChange={handleSortChange} />
        <ClassList>
          {displayedData.length &&
            displayedData.map((classData) => (
              <ClassItem key={`class-item-${classData.id}`} data={classData} />
            ))}
          {/* 무한 스크롤 트리거 */}
          <div ref={targetRef} className="h-1 flex items-center justify-center">
            {hasNextPage && <Spinner />}
          </div>
        </ClassList>
        <Buttons />
      </Card>
    </main>
  );
}
