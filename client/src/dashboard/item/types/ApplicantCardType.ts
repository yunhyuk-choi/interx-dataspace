type WayType = "self" | "recommendation";

export type ApplicantDataType = {
  name: string;
  way: WayType;
  date: string;
  isEvaluation: boolean;
};

export interface ApplicantCardType {
  itemData: ApplicantDataType;
}
