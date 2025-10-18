import { ApplicantDataType } from "../dashboard/item/types/ApplicantCardType";
import { DataType } from "../dashboard/table/types/DashboardTableType";
import { apiClient } from "./apiClient";

type ApplicantListResponseType = {
  [key in DataType]: ApplicantDataType[];
};

export const getApplicantData =
  async (): Promise<ApplicantListResponseType> => {
    const { data } = await apiClient.get<ApplicantListResponseType>("/data");
    return data;
  };

export const addData = async (
  item: ApplicantDataType
): Promise<ApplicantDataType[]> => {
  const { data } = await apiClient.post("/data", item);
  return data.data;
};

export const changeStep = async (
  item: ApplicantDataType
): Promise<ApplicantDataType[]> => {
  const { data } = await apiClient.put("/data", item);
  return data.data;
};
