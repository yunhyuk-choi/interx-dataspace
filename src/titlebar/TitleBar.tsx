import { Box, Chip, Typography } from "@mui/material";
import ChipBar from "./ChipBar";
import SearchBar from "./SearchBar";
import TitleActions from "./TitleActions";



export default function TitleBar () {


  return (
    <Box textAlign={"left"}>

      <Typography variant="subtitle1" sx={{fontWeight:500}}>프론트엔드 (Frontend) 개발자 - 데이터스페이스 (DataSpace)</Typography>
      <ChipBar/>
      <SearchBar/>

    </Box>
  )
}