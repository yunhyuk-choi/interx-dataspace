import { Button, Chip, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ChipBar() {
  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{ marginY: 1, alignItems: "center" }}
    >
      <Chip
        icon={<img src="/active.png" width={12} alt="active" />}
        label={"활성화"}
        variant="outlined"
        size="small"
        sx={{ marginY: "auto" }}
      />
      <Button
        variant="text"
        sx={{ color: "GrayText", paddingY: "4px", fontSize: "12px" }}
        size="small"
      >
        <AddIcon />
        메모 추가
      </Button>
    </Stack>
  );
}
