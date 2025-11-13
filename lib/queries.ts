"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";

import { QUERY_KEY_GET_CLASS } from "./constants";
import { ClassData, ClassListResponse } from "./types";

export const queryClient = new QueryClient();

axios.defaults.baseURL = "http://localhost:3001";

/**
 * react query hook - 강의 목록 무한 스크롤 조회
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

export const useAddClassData = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: [],
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
 * 강의 목록 페이지네이션 조회 요청
 */
const getClassDataWithPagination = async (
  page: number,
  limit: number
): Promise<ClassListResponse> => {
  try {
    // params _sort: json-server 에서 정렬 기준을 정의함
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

/**
 * 강의 목록 추가 요청
 * */
const addClassData = async (data: ClassData) => {
  try {
    await axios.post("/class", data);
  } catch (error) {
    console.error("강의 등록 실패:", error);
  }
};
