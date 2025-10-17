import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import {grey} from "@mui/material/colors";
import { DashboardTableType } from "./types/DashboardTableType";
import DashboardTableActions from "./DashboardTableActions";

export default function DashboardTable({
  title,
  dataType,
}: DashboardTableType) {
  return (
    <Grid size={"grow"}>
      <Card sx={{ height: "100dvh", backgroundColor:grey[300] }}>
        <CardHeader
          sx={{ position: "sticky", top: 0, zIndex: 1 }}
          title={title}
          slotProps={{ title: { fontSize: 14, fontWeight: 500,textAlign:"left" } }}
          action={<DashboardTableActions />}
        />
        <Divider/>
        <CardContent sx={{height:"calc( 100dvh - 100px )", overflowY:"auto",}}>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
          <Card>1</Card>
        </CardContent>
      </Card>
    </Grid>
  );
}
