import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import MuiPagination from "@mui/material/Pagination";
import {
  CancelScheduleSend,
  Clear,
  Done,
  Download,
  LocalShipping,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Workbook } from "exceljs";
import { useProductOrder } from "../../hooks/useProductOrder";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import CustomNoRows from "../../components/Tables/CustomNoRows";
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
const ShippingDelivery = () => {

  const {
    loadPOPaidAndSuply,
    navigate,
    productOrders,
    loading,
  } = useProductOrder();
  const {user} = useAuthStore()

  useEffect(() => {
    loadPOPaidAndSuply();
  }, [user]);

  const rowsWithIds = productOrders?.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    const statusRoute = item?.route_detail?.route_status ? item?.route_detail?.route_status:'No signado'
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      status_route: statusRoute,
      ...item,
    };
  });
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Stock de productos");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "Cantidad de productos",
      "Tipo de envio",
      "Existencias",
      "Precio",
      "Tamaño",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row._id,
        row.name,
        row.description,
        row.price,
        row.size,
        row.tag,
      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Pedidos.xlsx");
    });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
        <GridToolbarQuickFilter />
        <Button
          variant="text"
          startIcon={<Download />}
          disableElevation
          sx={{ color: "secondary" }}
          onClick={exportToExcel}
        >
          Descargar Excel
        </Button>
      </GridToolbarContainer>
    );
  }
  const paymentValuate = (row)=>{
    if (row.payment_status !== 'approved') {
      Swal.fire('Pendiente de pago','','error')
    }
    else{
      navigate(`/almacenista/surtir-venta/${row._id}`)
    }
  }



  const renderIcon = (values) => {
    if (!values.row.storeHouseStatus) {
      return (
        <Tooltip title="Surtir orden">
          <Button
            aria-label="Surtir"
            color="success"
            onClick={()=>paymentValuate(values.row)}
            variant="outlined"
          >
            Surtir
          </Button>
        </Tooltip>
      );
    } else if (!values.row.route_status) {
      return (
        <Tooltip title="Asignar ruta">
          <Button
            aria-label="Asignar ruta"
            color="info"
            variant="outlined"
            onClick={() =>navigate(`/almacenista/medio-de-envio/${values.row._id}`, {replace:true})}
          >
            Enviar
          </Button>
        </Tooltip>
      );
    } else if (!values.row.deliveryStatus)  {
      return (
        <Tooltip title="En envio">
          <IconButton
            aria-label="secondary"
            color="secondary"
          >
            <ScheduleSendIcon />
          </IconButton>
        </Tooltip>
      );
    }
    else{
      return (
        <Tooltip title="Pedido entregado">
          <IconButton
            aria-label="Pedido entregado"
            color="primary"
          >
            <ThumbUpAltIcon />
          </IconButton>
        </Tooltip>
      );
    }
  };

  if (loading) {
    return (<LoadingScreenBlue/>)
  }

  return (
    <Grid container >
      <Grid item xs={12} marginY={2}>
        <DataGrid
          sx={{ fontSize: "14px", fontFamily: "sans-serif" }}
          columns={[
            {
              field: "createdAt",
              headerName: "Fecha de solicitud",
              flex:1,
              align: "center",
            },
            {
              field: "order_id",
              headerName: "Id de pedido",
              flex:1,
              align: "center",
            },
            {
              field: "status_route",
              hideable: false,
              headerName: "Estado de ruta",
              flex:1,
              sortable: false,
            },

            {
              field: "Opciones",
              headerName: "Opciones",
              align: "center",
              flex:1,
              sortable: false,
              type: "actions",
              getActions: (params) => [renderIcon(params)],
            },
          ]}
          rows={rowsWithIds}
          autoHeight
          pagination
          slots={{
            pagination: CustomPagination,
            toolbar: CustomToolbar,
            columnSortedDescendingIcon: SortedDescendingIcon,
            columnSortedAscendingIcon: SortedAscendingIcon,
            columnUnsortedIcon: UnsortedIcon,
            noRowsOverlay: CustomNoRows,
          }}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
      </Grid>
    </Grid>
  );
};


export default ShippingDelivery