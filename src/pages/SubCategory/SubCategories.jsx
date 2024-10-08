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
import { useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import { Add, Download, Visibility } from "@mui/icons-material";
import {
  Button,
  Avatar,
  Grid,
  Typography,
  Fab,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import DeleteAlert from "../../components/ui/DeleteAlert";
import EditButton from "../../components/Buttons/EditButton";
import { useSubCategories } from "../../hooks/useSubCategories";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore } from "../../hooks";
import SubcategoryModal from "../../components/Modals/SubcategoryModal";

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

const SubCategories = () => {
  const {
    loadSubCategories,
    rowsSubCategories,
    navigate,
    deleteSubCategory,
    loading,
    loadSubCategoryDetail,
    subCategory,
  } = useSubCategories();
  const { user } = useAuthStore();
  useEffect(() => {
    loadSubCategories();
  }, [user]);
  const [open, setOpen] = useState(false);

  const handleOpen = async (id) => {
    await loadSubCategoryDetail(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Subcategorias");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow(["Nombre de la subcategoria"]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsSubCategories.forEach((row) => {
      worksheet.addRow([row.name]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "subcategorias.xlsx");
    });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();
    const handleGoToPage1 = () => apiRef.current.setPage(0);

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

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid container gap={2} maxWidth={"85vw"}>
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Subcategorías
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Fab
          sx={{ right: "-80%" }}
          onClick={() => navigate("/mi-almacen/subcategorias/agregar")}
          color="secondary"
          aria-label="Agregar subcategoría"
          title="Agragar subcategoría"
        >
          <Add />
        </Fab>
      </Grid>

      <DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          {
            field: "name",
            hideable: false,
            headerName: "Nombre de la categoria",
            flex: 2,
            sortable: false,
          },
          {
            field: "subCategory_image",
            hideable: false,
            headerName: "Imagen",
            flex: 1,
            sortable: "false",
            renderCell: (params) =>
              params?.value ? (
                <Avatar alt={params.value} src={params.value} />
              ) : null,
          },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              <DeleteAlert
                title={`¿Desea eliminar ${params.row.name}?`}
                callbackToDeleteItem={() => deleteSubCategory(params.row._id)}
              />,
              <EditButton
                title={`Desea editar ${params.row.name}?`}
                callbackToEdit={() =>
                  navigate(`/mi-almacen/subcategorias/editar/${params.row._id}`)
                }
              />,
              <Tooltip title="Ver detalle">
                <IconButton
                  color="primary"
                  aria-label="Ver detalle"
                  onClick={() => handleOpen(params.row._id)}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>,
            ],
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }],
          },
          pagination: {
            paginationModel: { pageSize: 20 },
          },
        }}
        rows={rowsSubCategories}
        density="standard"
        pagination
        slots={{
          pagination: CustomPagination,
          toolbar: CustomToolbar,
          columnSortedDescendingIcon: SortedDescendingIcon,
          columnSortedAscendingIcon: SortedAscendingIcon,
          columnUnsortedIcon: UnsortedIcon,
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
        style={{ fontFamily: "sans-serif", fontSize: "15px" }}
      />
      <SubcategoryModal
        subCategory={subCategory}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
};

export default SubCategories;
