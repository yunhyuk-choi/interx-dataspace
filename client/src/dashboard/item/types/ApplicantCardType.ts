import { DataType } from "../../table/types/DashboardTableType";

/**
 * 지원자의 지원 방식을 정의하는 타입입니다.
 *
 * - `"self"`: 본인이 직접 지원한 경우
 * - `"recommendation"`: 추천을 통해 지원한 경우
 */
type WayType = "self" | "recommendation";

/**
 * 개별 지원자 정보를 나타내는 데이터 구조입니다.
 *
 * @property {number} id - 지원자를 식별하기 위한 고유 ID
 * @property {string} name - 지원자의 이름
 * @property {WayType} way - 지원 방식 (`"self"` 또는 `"recommendation"`)
 * @property {DataType} step - 현재 지원자의 진행 단계 (예: `"coding-test"`, `"passed"` 등)
 * @property {string} date - 지원 일자 또는 단계 변경 일자 (ISO 형식 문자열)
 * @property {boolean} isEvaluation - 해당 지원자에 대한 평가 여부 (true일 경우 평가 완료)
 */
export type ApplicantDataType = {
  id: number;
  name: string;
  way: WayType;
  step: DataType;
  date: string;
  isEvaluation: boolean;
};

/**
 * 개별 지원자 카드를 렌더링하기 위한 컴포넌트 속성 타입입니다.
 *
 * @property {ApplicantDataType} itemData - 카드에 표시될 지원자 정보 데이터
 */
export interface ApplicantCardType {
  itemData: ApplicantDataType;
}
