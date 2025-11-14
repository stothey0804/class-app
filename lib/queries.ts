"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import {
  MUTATE_KEY_ADD_CLASS,
  MUTATE_KEY_APPLY_CLASS,
  QUERY_KEY_GET_CLASS,
} from "./constants";
import { ClassData, ClassListResponse } from "./types";

// 공통 queryClient
export const queryClient = new QueryClient();

axios.defaults.baseURL = "http://localhost:3001"; // json-server 실행 포트

/**
 * react query hook
 * - 강의 전체 목록 조회
 * - 클라이언트 정렬로 인해 전체 목록 조회를 사용합니다.
 */
export const useGetClassData = () => {
  return useQuery({
    queryKey: [QUERY_KEY_GET_CLASS],
    queryFn: () => getAllClassData(),
    staleTime: Infinity,
  });
};

/**
 * react query hook
 * - 강의 목록 무한 스크롤 조회
 * - 클라이언트 정렬로 변경하였기 때문에 현재 사용하지 않습니다.
 */
export const useGetInfiniteClassData = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY_GET_CLASS],
    queryFn: ({ pageParam = 1 }) =>
      getClassDataWithPagination(pageParam, limit),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next;
    },
    initialPageParam: 1,
    staleTime: Infinity,
  });
};

/**
 * react query hook
 * - 강의 등록
 */
export const useAddClassData = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: [MUTATE_KEY_ADD_CLASS],
    mutationFn: (param: ClassData) => addClassData(param),
    onSuccess: () => {
      router.push("/class");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GET_CLASS] });
    },
    onError: (error) => {
      console.error(error);
      alert("에러가 발생했습니다. 다시 시도해주세요.");
    },
  });
};

/**
 * react query hook
 * - 강의 신청 (applicants 증가)
 */
export const useIncreaseApplicant = () => {
  return useMutation({
    mutationKey: [MUTATE_KEY_APPLY_CLASS],
    mutationFn: (ids: Array<number>) => increaseApplicant(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GET_CLASS] });
      alert("수강 신청이 완료되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      alert("수강 신청 중 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });
};

// functions

/** 강의 목록 페이지네이션 조회 요청*/
const getClassDataWithPagination = async (
  page: number,
  limit: number
): Promise<ClassListResponse> => {
  try {
    const response = await axios.get<ClassListResponse>("/class", {
      params: {
        _page: page,
        _per_page: limit,
        _sort: "id",
        _order: "desc",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 강의 전체 목록 조회 요청 */
const getAllClassData = async (): Promise<ClassData[]> => {
  try {
    const response = await axios.get<ClassData[]>("/class", {
      params: {
        _sort: "id",
        _order: "desc",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 강의 목록 추가 요청*/
const addClassData = async (data: ClassData) => {
  try {
    await axios.post("/class", data);
  } catch (error) {
    console.error("강의 등록 실패:", error);
  }
};

/** 강의 신청 시 인원 추가 처리*/
const increaseApplicant = async (ids: Array<number>) => {
  try {
    const updatePromises = ids.map(async (id) => {
      const { data: classData } = await axios.get<ClassData>(`/class/${id}`);

      // capacity를 초과하지 않는 경우에만 증가
      if (classData.applicants < classData.capacity) {
        await axios.patch(`/class/${id}`, {
          applicants: classData.applicants + 1,
        });
      }
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("강의 신청 실패:", error);
    throw error;
  }
};
