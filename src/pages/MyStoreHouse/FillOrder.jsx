import { Grid, Skeleton, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { DataGrid } from "@mui/x-data-grid";
import { replace } from "formik";

const FillOrder = () => {
  const { id } = useParams();
  const { loadProductOrder, productOrder, rowsProducts,completeProductOrder } = useProductOrder();
  const [rowSelection, setRowSelection] = useState([])
  const [activeButton1, setActiveButton] = useState(false)
  useEffect(() => {
    loadProductOrder(id);
  }, [id]);
  const rows = rowsProducts()
  function activeButton (i){
    const a1 = rows.length 
    if (a1 ===  i ) {
      setActiveButton(true)
    } 
    if (a1 !== i) {
      setActiveButton(false)
    }  
  }

  const completeOrder =()=>{
    completeProductOrder(id)
  }


  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
       <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h2"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Surtir Producto
        </Typography>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12}>  
        <h2>Id de orden: {productOrder?.order_id}</h2>
        <h2>Lista de productos</h2>
        </Grid>
        <Grid item xs={12}>    
        {rows ? (
          <DataGrid
            onRowSelectionModelChange={(value) => {
                setRowSelection(value)
                activeButton(value.length)
                ;
              }}
            rowSelectionModel={rowSelection}
            hideFooterSelectedRowCount={true}
            columns={[
              {
                field: "name",
                headerName: "Nombre del producto",
                flex: 1,
                align: "center",
              },
              {
                field: "quantity",
                headerName: "Cantidad de producto",
                flex: 1,
                align: "center",
              },
            ]}
            rows={rows}
          />
        ) : (
          <Skeleton variant="rectangular" />
        )}
      
            <Button style={{marginTop:10}} variant="contained" fullWidth onClick={()=>completeOrder()} color="primary">
              Pedido surtido
            </Button>
         
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FillOrder;
