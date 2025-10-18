import { ApplicantDataType } from "../../item/types/ApplicantCardType";


/**
 * 지원자의 진행 상태를 나타내는 데이터 유형입니다.
 * 각 문자열은 채용 프로세스의 특정 단계를 의미합니다.
 *
 * - `"support"`: 지원 완료 상태
 * - `"screen-call"`: 서류 및 전화 면접 단계
 * - `"first-interview"`: 1차 인터뷰 단계
 * - `"coding-test"`: 코딩 테스트 단계
 * - `"second-interview"`: 2차 인터뷰 단계
 * - `"salary-negotiation"`: 연봉 협상 단계
 * - `"passed"`: 최종 합격 상태
 */
export type DataType =
  | "support"
  | "screen-call"
  | "first-interview"
  | "coding-test"
  | "second-interview"
  | "salary-negotiation"
  | "passed";

/**
 * 대시보드의 각 테이블(단계별 지원자 목록)을 정의하는 인터페이스입니다.
 *
 * @property {string} title - 해당 테이블의 제목 (예: “코딩테스트”)
 * @property {DataType} dataType - 테이블이 나타내는 진행 상태 유형
 * @property {ApplicantDataType[]=} applicantList - 선택적 지원자 목록 데이터. 
 * 각 항목은 {@link ApplicantDataType} 형식으로 구성됩니다.
 */
export interface DashboardTableType {
  title: string;
  dataType: DataType;
  applicantList?: ApplicantDataType[];
}
