import { ApplicantDataType } from "../dashboard/item/types/ApplicantCardType";
import { DataType } from "../dashboard/table/types/DashboardTableType";
import { apiClient } from "./apiClient";

/**
 * 각 채용 단계(`DataType`)별 지원자 목록을 매핑하는 응답 타입입니다.
 *
 * 예시:
 * ```ts
 * {
 *   "support": [...],
 *   "coding-test": [...],
 *   "passed": [...]
 * }
 * ```
 */
export type ApplicantListResponseType = {
  [key in DataType]: ApplicantDataType[];
};

type SearchParams = {
  searchText: string;
  searchOption: string;
};

/**
 * 모든 지원자 데이터를 서버로부터 가져옵니다.
 *
 * @param {string} searchText = 검색할 문자열
 * @param {string} searchOption = 검색 조건(검색할 field)
 * @returns {Promise<ApplicantListResponseType>}
 * 각 채용 단계별(`DataType`)로 분류된 지원자 리스트를 반환합니다.
 *
 * @example
 * ```ts
 * const data = await getApplicantData();
 * console.log(data["coding-test"]); // 코딩 테스트 단계 지원자 목록
 * ```
 */
export const getApplicantData = async (
  searchParams?: SearchParams
): Promise<ApplicantListResponseType> => {
  const urlSearchParams = new URLSearchParams(searchParams);
  const { data } = await apiClient.get<ApplicantListResponseType>("/data", {
    params: urlSearchParams,
  });
  return data;
};

/**
 * 새로운 지원자 데이터를 추가합니다.
 *
 * @param {Omit<ApplicantDataType, "id">} item - 추가할 지원자 정보 객체 (id는 자동 추가되므로 제외)
 * @returns {Promise<ApplicantDataType[]>}
 * 추가 후 최신 지원자 데이터 배열을 반환합니다.
 *
 * @example
 * ```ts
 * await addData({ id: 5, name: "홍길동", way: "self", step: "support", date: "2025-10-18", isEvaluation: false });
 * ```
 */
export const addData = async (
  item: Omit<ApplicantDataType, "id">
): Promise<ApplicantDataType[]> => {
  const { data } = await apiClient.post("/data", item);
  return data.data;
};

/**
 * 지원자의 현재 단계를 변경합니다.
 *
 * @param {ApplicantDataType} item - 단계가 변경된 지원자 데이터
 * @returns {Promise<ApplicantDataType[]>}
 * 변경 후 전체 지원자 데이터 배열을 반환합니다.
 *
 * @example
 * ```ts
 * await changeStep({ ...applicant, step: "second-interview" });
 * ```
 */
export const changeStep = async (
  item: ApplicantDataType
): Promise<ApplicantDataType[]> => {
  const { data } = await apiClient.put("/data", item);
  return data.data;
};

/**
 * 특정 지원자 데이터를 삭제합니다.
 *
 * @param {number} id - 삭제할 지원자 정보의 고유 ID
 * @returns {Promise<ApplicantDataType[]>}
 * 삭제 후 전체 지원자 데이터 배열을 반환합니다.
 *
 * @example
 * ```ts
 * await deleteData(3); // ID가 3인 지원자 정보 삭제
 * ```
 */
export const deleteData = async (id: number): Promise<ApplicantDataType[]> => {
  const { data } = await apiClient.delete("/data", { data: { id } });
  return data.data;
};
