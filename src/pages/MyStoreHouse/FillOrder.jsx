import { Grid, Skeleton, Button } from "@mui/material";
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
    <Grid marginX={"10%"}>
      <h1>Surtir Orden </h1>
      <Grid container spacing={0}>
        <Grid item xs={12}>  
        <h2>Id de orden:{productOrder?._id}</h2>
        <h2>Lista de productos</h2>
        </Grid>
        <Grid item xs={12}>    
        {rows ? (
          <DataGrid
             checkboxSelection
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
        {
          activeButton1 ? (
            <Button variant="contained" onClick={()=>completeOrder()} color="primary">
              Completar pedido
            </Button>
          ):(<Button variant="contained" disabled color="warning">
            NO Completo
          </Button>)
        }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FillOrder;
