"use client";

import { useState, useMemo, useCallback } from "react";

import { Card } from "@/components/ui/card";
import {
  ClassFilter,
  ClassList,
  ClassItem,
  Buttons,
  TotalSection,
} from "@/components/class";
import { InfiniteScrollTrigger } from "@/components/InfiniteScrollTrigger";

import { CLASS_PER_PAGE, SORT_TYPE_ID_DESC } from "@/lib/constants";
import { SortType } from "@/lib/types";
import { useGetClassData } from "@/lib/queries";
import { useIntersectionObserver, useClassSelection } from "@/lib/hooks";
import { sortDataList } from "@/lib/utils";

/**
 * 강의 목록 클라이언트 컴포넌트 (데이터 페칭 포함)
 */
export function ClassPageContent() {
  const [sortBy, setSortBy] = useState<SortType>(SORT_TYPE_ID_DESC);

  const [displayCount, setDisplayCount] = useState(CLASS_PER_PAGE);

  const { data } = useGetClassData();

  // 강의 선택 hook
  const { selectedList, isSelected, toggleSelection, clearSelection } =
    useClassSelection();

  /** 정렬된 전체 데이터 리스트 */
  const sortedData = useMemo(() => {
    return sortDataList(data, sortBy);
  }, [data, sortBy]);

  /** 현재 표시 중인 데이터 */
  const displayedData = useMemo(() => {
    return sortedData.slice(0, displayCount);
  }, [sortedData, displayCount]);

  /** 총 선택 금액 계산 */
  const totalSellingPrice = useMemo(() => {
    return selectedList
      .map((item) => item.sellingPrice)
      .reduce((acc, curr) => acc + curr, 0);
  }, [selectedList]);

  /** 총 선택 강의 개수 */
  const totalAmount = useMemo(() => {
    return selectedList.length;
  }, [selectedList]);

  const hasNextPage = displayCount < sortedData.length;

  // 무한 스크롤 타겟 ref
  const { targetRef } = useIntersectionObserver({
    fetchNextPage: () => {
      if (hasNextPage) {
        setDisplayCount((prev) => prev + CLASS_PER_PAGE);
      }
    },
    hasNextPage,
  });

  /** 정렬 변경 핸들러 */
  const handleSortChange = useCallback((newSort: SortType) => {
    setSortBy(newSort);
    setDisplayCount(CLASS_PER_PAGE);
  }, []);

  return (
    <Card className="p-4">
      {/* 정렬 선택 필터 */}
      <ClassFilter sortBy={sortBy} onSortChange={handleSortChange} />
      {/* 강의 목록 */}
      <ClassList>
        {displayedData.length &&
          displayedData.map((classData) => (
            <ClassItem
              key={`class-item-${classData.id}`}
              data={classData}
              checked={isSelected(classData.id!)}
              onToggle={() => toggleSelection(classData)}
            />
          ))}
        {/* 무한 스크롤 트리거 */}
        <InfiniteScrollTrigger
          targetRef={targetRef}
          hasNextPage={hasNextPage}
        />
      </ClassList>
      {/* 총 선택 갯수, 금액 표시 */}
      <TotalSection
        totalAmount={totalAmount}
        totalSellingPrice={totalSellingPrice}
      />
      {/* 수강신청, 강의등록 버튼 영역 */}
      <Buttons
        selectedClassList={selectedList}
        onClearSelection={clearSelection}
      />
    </Card>
  );
}
