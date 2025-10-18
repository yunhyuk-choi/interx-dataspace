import { Button, Chip, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export default function ChipBar () {


  return (
    <Stack direction={"row"} spacing={2}>
      <Chip icon={<img src="/active.png" width={12}/>} label={"활성화"} variant="outlined"/>
      <Button variant="text" sx={{color:"GrayText"}}><AddIcon/>메모 추가</Button>
    </Stack>
  )
}