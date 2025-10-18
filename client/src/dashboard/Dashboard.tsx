import { Grid } from "@mui/material";
import DashboardTable from "./table/DashboardTable";
import { useQuery } from "@tanstack/react-query";
import { getApplicantData } from "../apis/api";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["applicant-list"],
    queryFn: getApplicantData,
  });

  console.log(data);
  return (
    <Grid container spacing={2}>
      <DashboardTable
        title="✏️ 지원(서류 전형)"
        dataType="support"
        applicantList={data?.support}
      />
      <DashboardTable
        title="✏️ TA 스크린 콜"
        dataType="screen-call"
        applicantList={data?.["screen-call"]}
      />
      <DashboardTable
        title="✏️ 1차 인터뷰 (실무)"
        dataType="first-interview"
        applicantList={data?.["first-interview"]}
      />
      <DashboardTable
        title="✏️ 코딩테스트"
        dataType="coding-test"
        applicantList={data?.["coding-test"]}
      />
      <DashboardTable
        title="✏️ 2차 인터뷰 (임원)"
        dataType="second-interview"
        applicantList={data?.["second-interview"]}
      />
      <DashboardTable
        title="✏️ 처우 협의"
        dataType="salary-negotiation"
        applicantList={data?.["salary-negotiation"]}
      />
      <DashboardTable
        title="✏️ 입사 확정"
        dataType="passed"
        applicantList={data?.passed}
      />
    </Grid>
  );
}
