import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OrderItem from "./OrderItem";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import EmptyCart from "./EmptyCart";

import { OrderContext } from './Context/OrderContext';
import { useContext, useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import { SnackbarContext } from "./Context/SnackbarContext";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CashierAside() {
  
  const {orders, setOrders} = useContext(OrderContext);
  const {handleOpenSnackbar} = useContext(SnackbarContext)


  const [couponInput, setCouponInput] = useState("");
  const [activeCoupon, setActiveCoupon] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [serviceMethod, setServiceMethod] = useState("Pickup")

const availableCoupons = [
  { code: 'SAVE10', value: 0.10 }, 
  { code: 'BURGER5', value: 0.05 },     
  { code: 'ABDO23', value: 0.20 },     
  { code: 'SNKRT0', value: 0.15 },     
];

  


  function handleChangeCouponInput(event) {
    setCouponInput(event.target.value)
  }

  function handleApplyCoupon() {
    const couponStatus = availableCoupons.find((coupon) => {
      return coupon.code == couponInput
    })
    if(couponStatus) {
      setActiveCoupon(couponStatus.value)
      handleOpenSnackbar("Discount applied","success")
    }else {
      handleOpenSnackbar("Invalid coupon code","warning")
    }
    setCouponInput("")
  }

  function handleOpenConfirmDialog() {
    if(orders.length != 0) {
      setOpenConfirmDialog(true)
    } else {
      handleOpenSnackbar("Cannot checkout with an empty cart.", "warning")
    }
  }

  function handleCloseConfirmDialog() {
    setOpenConfirmDialog(false)
  }

  function handleConfirmClick(){
    handleOpenSnackbar("Payment completed successfully")
    handleCloseConfirmDialog();
    setActiveCoupon("");
    setOrders([])
    localStorage.setItem("orders",JSON.stringify([]))
  }

  function handleChangeServiceMethod(event,newService) {
    setServiceMethod(newService)
  }

  useEffect(() => {
      const storageOrders = JSON.parse(localStorage.getItem("orders")) ?? [];
      setOrders(storageOrders)
    },[])

const orderList = orders.map((order) => {
  return (
    <OrderItem key={order.id} order={order}/>
  )
})



const product = orders.reduce((acc, order) =>{ 
  return acc + (order.price * order.count)
},0)

const countItems = orders.reduce((acc, order) =>{ 
  return acc + order.count
},0)

const tax = (product* 0.05).toFixed(2)

const discount = (product*activeCoupon).toFixed(2)

  return (

    <>
    {/* Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}

        role="alertdialog"
      >
        <DialogTitle >
          Confirm Payment
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to complete this order and proceed with payment?
          </DialogContentText>

          <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Service Method: <strong>{serviceMethod}</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Total Items: <strong>{countItems}</strong>
      </Typography>
      <Typography variant="h6" color="primary.main" sx={{ mt: 1, fontWeight: 'bold' }}>
        Total Amount: ${Number(product) + Number(tax) - discount }
      </Typography>
    </Box>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={handleCloseConfirmDialog} 
          autoFocus>
            Disagree
          </Button>
          <Button 
          onClick={handleConfirmClick}
          >Confirm</Button>
        </DialogActions>
      </Dialog>
    {/* === Dialog === */}

    <Stack direction={"column"} spacing={2}>
      <Typography variant="h3">Order Derails</Typography>

      {/* Service Method Button */}
      <ToggleButtonGroup color="primary" exclusive value={serviceMethod} onChange={handleChangeServiceMethod}  sx={{justifyContent:"center"}}>
        <ToggleButton value="Pickup">Pickup</ToggleButton>
        <ToggleButton value="Delivery">Delivery</ToggleButton>
        <ToggleButton value="Dine-in">Dine-in</ToggleButton>
      </ToggleButtonGroup>

      {/* === Service Method Button === */}

      <Typography variant="h3">Products</Typography>

    {/* Order Item List */}
    <Stack direction={"column"} spacing={2} sx={{ overflowY:"auto", maxHeight:"600px", paddingRight:2,
      "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main", 
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "primary.dark", 
      },
    },
    } }>
    {orderList.length == 0?<EmptyCart/>:orderList}

    </Stack>

    
    {/* === Order Item List === */}

    {/* Discount  */}
    <Stack spacing={2}>
      <Typography variant="h3">
      Discount
      </Typography>
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <TextField  size="medium" label="Discount" variant="outlined" value={couponInput} onChange={handleChangeCouponInput}  />
        <Button onClick={handleApplyCoupon} variant="contained" size="large">Apply</Button>
      </Box>
    </Stack>
    {/*=== Discount === */}
      
      <Card sx={{ minWidth: 275 }}>
        <CardContent sx={{display:"flex", flexDirection:"column",gap:1.5}}>
          <Typography variant="h3" sx={{ fontSize: 25 }}>
            Payment Summary
          </Typography>

          <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}> 
            <Typography variant="body2">
              Products:
            </Typography>
            <Typography>
              ${product}
            </Typography>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}> 
            <Typography variant="body2">
              Tax:
            </Typography>
            <Typography>
              ${tax}
            </Typography>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}> 
            <Typography variant="body2">
              Discount:
            </Typography>
            <Typography>
              ${discount}
            </Typography>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}> 
            <Typography variant="subtitle1" sx={{fontWeight:"600"}}>
              Total:
            </Typography>
            <Typography>
              ${Number(product) + Number(tax) - discount }
            </Typography>
          </Box>
        </CardContent>
              <CardActions>
        <Button fullWidth variant="contained" sx={{color:"white",borderRadius:2}} onClick={handleOpenConfirmDialog}>
          Proceed to Payment
        </Button>
      </CardActions>
      </Card>
    </Stack>
          </>
  );
}
