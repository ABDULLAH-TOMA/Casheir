import Box from "@mui/material/Box"
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import Typography from "@mui/material/Typography";
export default function EmptyCart() {
  return(
    <Box      sx={{
          width: "100%",
          height: "200px",
          borderRadius: 1,
          bgcolor:"#f4f6f8",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          flexDirection:"column",
          gap:1
        }}
>
      <RemoveShoppingCartOutlinedIcon fontSize="large" color="primary"/>
      <Typography variant="subtitle2">
        empty
      </Typography>
    </Box>
  )
}