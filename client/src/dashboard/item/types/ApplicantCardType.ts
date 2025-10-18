import { DataType } from "../../table/types/DashboardTableType";

type WayType = "self" | "recommendation";

export type ApplicantDataType = {
  id: number;
  name: string;
  way: WayType;
  step: DataType;
  date: string;
  isEvaluation: boolean;
};

export interface ApplicantCardType {
  itemData: ApplicantDataType;
}
