
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { OrderContext } from './Context/OrderContext';
import { useContext } from 'react';

export default function OrderItem({order}) {

  const {orders, setOrders} = useContext(OrderContext);


  function handleIncreaseQty() {
  const updateOrders = orders.map((orderItem) => {
    if(orderItem.id == order.id) {
      return {...orderItem,count:orderItem.count + 1}
    }else {
      return orderItem
    }
  })
  setOrders(updateOrders);
  localStorage.setItem("orders",JSON.stringify(updateOrders))
  }

    function handleDecreaseQty() {
 
  if(order.count == 1) {

   const updateOrders = orders.filter((orderItem) =>{
      return orderItem.id != order.id
    })
        setOrders(updateOrders)
    localStorage.setItem("orders",JSON.stringify(updateOrders))
    

  }else {
    
    
    
    const updateOrders = orders.map((orderItem) => {
      if(orderItem.id == order.id) {
        return {...orderItem,count:orderItem.count - 1}
      }else {
        return orderItem
      }
    })
    setOrders(updateOrders)
    localStorage.setItem("orders",JSON.stringify(updateOrders))
    
  }
  }



  
  return (
    <Card sx={{ display: 'flex',flexDirection:"column",flexShrink: 0,boxShadow:"none",backgroundColor:"" }}>

      {/* Order Item */}
      <Box sx={{ display: 'flex', justifyContent:"space-between"}}>

                    <CardMedia
        component="img"
        sx={{ width: 100, height:100 }}
        image={order.image}
        alt={order.name}
        
      />

              <CardContent sx={{ display:"flex", flexDirection:"column"}}>
          <Typography component="div" variant="h6">
            {order.name}
          </Typography>

        </CardContent>
      </Box>
        {/* === Order Item === */}


      {/* Count Order */}
      <Grid container spacing={2} sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <Grid size={8} sx={{display:"flex", alignItems:"center"}}>

      
           <IconButton color='primary'  onClick={handleDecreaseQty}>
      <RemoveIcon/>
      </IconButton>

      <Typography
        component="span"
        variant="body1"
        sx={{
          minWidth: '28px',
          textAlign: 'center',
          fontWeight: 600,
          userSelect: 'none', 
        }}
        >
    {order.count}
      </Typography>
    
      <IconButton color='primary' onClick={handleIncreaseQty}>
      <AddIcon/>
      </IconButton>
 
        </Grid>
        <Grid size={4}>
              <Typography
        component="span"
        variant="body1"
        sx={{
          minWidth: '28px',
          textAlign: 'center',
          fontWeight: 600,
          userSelect: 'none', 
        }}
        >
    ${order.price * order.count}
      </Typography>
        </Grid>
      </Grid>
      
        {/* === Count Order  ===*/}


<Divider/>
    </Card>
  );
}

