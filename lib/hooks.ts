import { useEffect, useRef, useState, useCallback } from "react";

import { ClassData, SelectedClass } from "./types";

interface UseIntersectionObserverProps {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  threshold?: number;
}

/**
 * 무한 스크롤 hook
 * - Intersection Observer
 *
 * @return targetRef
 */
export const useIntersectionObserver = ({
  fetchNextPage,
  hasNextPage = true,
  threshold = 0.1,
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }

    const target = targetRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      { threshold }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasNextPage, fetchNextPage, threshold]);

  return { targetRef };
};

/**
 * 강의 선택 관리 hook
 * - 체크박스 상태 관리 추상화
 *
 * @returns selectedList, isSelected, toggleSelection, clearSelection
 */
export const useClassSelection = () => {
  const [selectedList, setSelectedList] = useState<SelectedClass[]>([]);

  /** 선택 여부 확인 */
  const isSelected = useCallback(
    (id: number) => {
      return selectedList.some((item) => item.id === id);
    },
    [selectedList]
  );

  /** 강의 선택/해제 토글 */
  const toggleSelection = useCallback((classData: ClassData) => {
    setSelectedList((prev) => {
      const isChecked = prev.some((item) => item.id === classData.id);

      if (isChecked) {
        return prev.filter((item) => item.id !== classData.id);
      } else {
        const selectedData: SelectedClass = {
          id: classData.id!,
          capacity: classData.capacity,
          applicants: classData.applicants,
          sellingPrice: classData.sellingPrice,
        };
        return [...prev, selectedData];
      }
    });
  }, []);

  /** 선택 목록 초기화 */
  const clearSelection = useCallback(() => {
    setSelectedList([]);
  }, []);

  return {
    selectedList,
    isSelected,
    toggleSelection,
    clearSelection,
  };
};
