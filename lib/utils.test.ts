import { isAvailablePassword, sortDataList } from "./utils";
import { ClassData } from "./types";
import {
  SORT_TYPE_CAPACITY_DESC,
  SORT_TYPE_ID_DESC,
  SORT_TYPE_RATE_DESC,
} from "./constants";

describe("isAvailablePassword", () => {
  describe("유효한 비밀번호", () => {
    it("소문자 + 숫자 조합 6자 통과", () => {
      expect(isAvailablePassword("abc123")).toBe(true);
    });

    it("대문자 + 숫자 조합 6자 통과", () => {
      expect(isAvailablePassword("ABC123")).toBe(true);
    });

    it("소문자 + 대문자 조합 6자 통과", () => {
      expect(isAvailablePassword("abcABC")).toBe(true);
    });
  });

  describe("유효하지 않은 비밀번호", () => {
    it("6자 미만 실패", () => {
      expect(isAvailablePassword("abc")).toBe(false);
    });

    it("10자 초과 실패", () => {
      expect(isAvailablePassword("abcdefghijk")).toBe(false);
    });

    it("소문자만 있는 경우 실패", () => {
      expect(isAvailablePassword("abcdef")).toBe(false);
    });

    it("숫자만만 있는 경우 실패", () => {
      expect(isAvailablePassword("123456")).toBe(false);
    });

    it("대문자만 있는 경우 실패", () => {
      expect(isAvailablePassword("AABBCC")).toBe(false);
    });
  });
});

describe("sortDataList", () => {
  const mockData: ClassData[] = [
    {
      id: 1,
      title: "강의 1",
      capacity: 100,
      applicants: 50,
      instructor: "강사A",
      sellingPrice: 100000,
    },
    {
      id: 2,
      title: "강의 2",
      capacity: 50,
      applicants: 40,
      instructor: "강사B",
      sellingPrice: 80000,
    },
    {
      id: 3,
      title: "강의 3",
      capacity: 200,
      applicants: 100,
      instructor: "강사C",
      sellingPrice: 150000,
    },
    {
      id: 4,
      title: "강의 4",
      capacity: 30,
      applicants: 30,
      instructor: "강사D",
      sellingPrice: 50000,
    },
    {
      id: 5,
      title: "강의 5",
      capacity: 0,
      applicants: 0,
      instructor: "강사E",
      sellingPrice: 120000,
    },
  ];

  describe("최근 등록순 정렬 (id_desc)", () => {
    it("ID가 높은 순서대로 정렬", () => {
      const result = sortDataList(mockData, SORT_TYPE_ID_DESC);

      expect(result[0].id).toBe(5);
      expect(result[1].id).toBe(4);
      expect(result[2].id).toBe(3);
      expect(result[3].id).toBe(2);
      expect(result[4].id).toBe(1);
    });

    it("원본 데이터를 변경하지 않음", () => {
      const originalData = [...mockData];
      sortDataList(mockData, SORT_TYPE_ID_DESC);

      expect(mockData).toEqual(originalData);
    });
  });

  describe("신청자 많은순 정렬 (capacity_desc)", () => {
    it("신청자 수가 많은 순서대로 정렬", () => {
      const result = sortDataList(mockData, SORT_TYPE_CAPACITY_DESC);

      expect(result[0].applicants).toBe(100); // 강의 3
      expect(result[1].applicants).toBe(50); // 강의 1
      expect(result[2].applicants).toBe(40); // 강의 2
      expect(result[3].applicants).toBe(30); // 강의 4
      expect(result[4].applicants).toBe(0); // 강의 5
    });
  });

  describe("수강률 높은순 정렬 (rate_desc)", () => {
    it("수강률이 높은 순서대로 정렬", () => {
      const result = sortDataList(mockData, SORT_TYPE_RATE_DESC);

      // 강의 4: 30/30 = 100%
      // 강의 2: 40/50 = 80%
      // 강의 1: 50/100 = 50%
      // 강의 3: 100/200 = 50%
      // 강의 5: 0/0 = 0%

      expect(result[0].id).toBe(4); // 100%
      expect(result[1].id).toBe(2); // 80%

      // 강의 1과 3은 모두 50%
      const rate50Ids = [result[2].id, result[3].id];
      expect(rate50Ids).toContain(1);
      expect(rate50Ids).toContain(3);

      expect(result[4].id).toBe(5); // 0%
    });
  });

  describe("기타 경우", () => {
    it("빈 배열인 경우 빈 배열 리턴", () => {
      const result = sortDataList([], SORT_TYPE_ID_DESC);

      expect(result).toEqual([]);
    });

    it("undefined인 경우 빈 배열 리턴", () => {
      const result = sortDataList(undefined, SORT_TYPE_ID_DESC);

      expect(result).toEqual([]);
    });

    it("데이터가 1개인 경우 리턴", () => {
      const singleData: ClassData[] = [mockData[0]];
      const result = sortDataList(singleData, SORT_TYPE_ID_DESC);

      expect(result).toEqual(singleData);
    });

    it("ID가 없는 데이터는 0으로 처리", () => {
      const dataWithoutId: ClassData[] = [
        { ...mockData[0], id: undefined },
        { ...mockData[1], id: 2 },
      ];

      const result = sortDataList(dataWithoutId, SORT_TYPE_ID_DESC);

      expect(result[0].id).toBe(2);
      expect(result[1].id).toBeUndefined();
    });
  });

  describe("정렬 타입 변경", () => {
    it("각 정렬 타입마다 다른 결과 리턴", () => {
      const resultById = sortDataList(mockData, SORT_TYPE_ID_DESC);
      const resultByCapacity = sortDataList(
        mockData,
        SORT_TYPE_CAPACITY_DESC
      );
      const resultByRate = sortDataList(mockData, SORT_TYPE_RATE_DESC);

      // 첫 번째 아이템이 각각 달라야 함
      expect(resultById[0].id).not.toBe(resultByCapacity[0].id);
      expect(resultByCapacity[0].id).not.toBe(resultByRate[0].id);
    });
  });
});