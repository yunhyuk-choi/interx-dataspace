import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import useAddDialog from "../hook/useAddDialog";

export default function AddApplicantDialog() {
  const { open, defaultDate, handleClickOpen, handleClose, handleSubmit } =
    useAddDialog();

  return (
    <>
      <IconButton onClick={handleClickOpen} color="primary" title="지원자 추가">
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>지원자 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            추가할 지원자 정보를 입력하세요.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="지원자 명"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="date"
              name="date"
              label="지원일자"
              type="date"
              fullWidth
              variant="standard"
              defaultValue={defaultDate}
              slotProps={{
                htmlInput: {
                  max: dayjs().format("YYYY-MM-DD"),
                },
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit" form="subscription-form">
            지원자 추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
