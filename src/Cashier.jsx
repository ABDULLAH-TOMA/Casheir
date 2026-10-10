import CashierAside from "./CashierAside";
import CashierHeader from "./CashierHeader";
import MenuList from "./MenuList";
import Grid from '@mui/material/Grid';


export default function Cashier() {












  return (
    <>
    <CashierHeader/>

      <Grid container spacing={2}>
        <Grid size={8}>
    <MenuList/>

        </Grid>
        <Grid size={4}>

    <CashierAside/>
        </Grid>
      </Grid>

    </>
  );
}
