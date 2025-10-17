import { Grid } from "@mui/material";
import DashboardTable from "./table/DashboardTable";

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <DashboardTable title="✏️ 지원(서류 전형)" dataType="support" />
      <DashboardTable title="✏️ 지원(서류 전형)" dataType="support" />
      <DashboardTable title="✏️ 지원(서류 전형)" dataType="support" />
      <DashboardTable title="✏️ 지원(서류 전형)" dataType="support" />
      <DashboardTable title="✏️ 지원(서류 전형)" dataType="support" />
      <DashboardTable title="✏️ 지원(서류 전형)" dataType="support" />
      <DashboardTable title="✏️ 지원(서류 전형)" dataType="support" />
    </Grid>
  );
}
