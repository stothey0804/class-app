import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassData, SortType } from "./types";
import { SORT_TYPE_CAPACITY_DESC, SORT_TYPE_RATE_DESC } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 비밀번호 유효성 검사
 * - 6자 이상 10자 이하
 * - 영문 소문자, 대문자, 숫자 중 최소 두 가지 이상 조합
 *
 * @param password 비밀번호
 * @return 충족 여부
 */
export const isAvailablePassword = (password: string): boolean => {
  // 6자 이상 10자 이하
  if (password.length < 6 || password.length > 10) {
    return false;
  }

  // 영문 소문자, 대문자, 숫자 최소 2가지 이상 조합 체크
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const combinationCount = [hasLowerCase, hasUpperCase, hasNumber].filter(
    (result) => result === true
  ).length;

  return combinationCount >= 2;
};

/**
 * 강의 목록 정렬 함수
 *
 * @param data 정렬할 강의 데이터 배열
 * @param sortBy 정렬 타입
 * @returns 정렬된 강의 목록
 */
export const sortDataList = (
  data: ClassData[] | undefined,
  sortBy: SortType
): ClassData[] => {
  if (!data) {
    return [];
  }

  const list = [...data];

  if (sortBy === SORT_TYPE_RATE_DESC) {
    // 수강률 높은순
    return list.sort((a, b) => {
      const rateA = a.capacity > 0 ? a.applicants / a.capacity : 0;
      const rateB = b.capacity > 0 ? b.applicants / b.capacity : 0;
      return rateB - rateA;
    });
  } else if (sortBy === SORT_TYPE_CAPACITY_DESC) {
    // 신청자 많은순
    return list.sort((a, b) => b.applicants - a.applicants);
  } else {
    // 최근 등록순 (default)
    return list.sort((a, b) => (b.id || 0) - (a.id || 0));
  }
};

/**
 * 숫자를 금액 형식의 문자열로 변환
 *
 * @param num 변환할 숫자
 * @returns 금액 형식 문자열 (e.g. "1,000,000")
 */
export const formatPrice = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
