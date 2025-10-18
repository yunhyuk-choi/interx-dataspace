import { Typography } from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

export default function EmptyList() {
  return (
    <>
      <Typography
        variant="body2"
        sx={{
          alignSelf: "center",
          marginY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
        color="textDisabled"
      >
        <InfoOutlineIcon sx={{ margin: "auto" }} />
        지원자 없음
      </Typography>
    </>
  );
}
