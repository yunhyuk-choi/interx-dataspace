import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertSharpIcon from "@mui/icons-material/SwapVertSharp";

export default function SearchBar() {
  return (
    <Stack direction={"row"}>
      <FormControl size="small">
        <InputLabel id={"search-selector-label"}>검색 유형</InputLabel>
        <Select labelId="search-selector-label" size="small">
          <MenuItem>평가 대상</MenuItem>
          <MenuItem>등록 유형</MenuItem>
        </Select>
      </FormControl>
      <OutlinedInput startAdornment={<SearchIcon />} size="small" />
      <Stack direction={"row"} sx={{ marginY: 1 }}>
        <AddIcon />
        <FilterListIcon />
        <SwapVertSharpIcon />
      </Stack>
    </Stack>
  );
}
