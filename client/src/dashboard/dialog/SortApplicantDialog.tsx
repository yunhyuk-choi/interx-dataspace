import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import useDashboard from "../hook/useDashboard";
import useAddDialog from "../hook/useAddDialog";

export default function SortApplicantDialog() {
  const { sortOption, handleChangeSortOption } = useDashboard();
  const { open, handleClickOpen, handleClose } = useAddDialog();

  return (
    <>
      <IconButton onClick={handleClickOpen} color="primary" title="지원자 추가">
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>정렬</DialogTitle>
        <DialogContent>
          <DialogContentText>정렬 기준 속성을 선택하세요.</DialogContentText>
          <FormControl id="sort-option">
            <RadioGroup
              defaultValue={sortOption}
              onChange={handleChangeSortOption}
              id="sortOption"
            >
              <FormControlLabel
                value="date"
                control={<Radio />}
                label="지원일자"
              />
              <FormControlLabel value="name" control={<Radio />} label="이름" />
              <FormControlLabel value="id" control={<Radio />} label="등록순" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
