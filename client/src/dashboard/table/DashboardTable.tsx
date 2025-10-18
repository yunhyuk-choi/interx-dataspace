import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DashboardTableType } from "./types/DashboardTableType";
import DashboardTableActions from "./DashboardTableActions";
import ApplicantCard from "../item/ApplicantCard";

export default function DashboardTable({
  title,
  dataType,
  applicantList,
}: DashboardTableType) {
  return (
    <Grid size={"grow"}>
      <Card
        sx={{ height: "100dvh", backgroundColor: grey[300], padding: "4px" }}
      >
        <CardHeader
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            paddingX: "4px",
            paddingY: "8px",
          }}
          title={title}
          slotProps={{
            title: { fontSize: 12, fontWeight: 500, textAlign: "left" },
          }}
          action={<DashboardTableActions />}
        />
        <Divider />
        <CardContent
          sx={{
            height: "calc( 100dvh - 100px )",
            overflowY: "auto",
            padding: "4px",
          }}
        >
          {applicantList &&
            applicantList.map((item) => <ApplicantCard itemData={item} />)}
          <ApplicantCard
            itemData={{
              name: "최윤혁",
              way: "recommendation",
              date: "2025.10.17",
              isEvaluation: false,
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
