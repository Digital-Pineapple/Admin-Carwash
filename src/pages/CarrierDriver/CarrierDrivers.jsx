import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Button, Fab, Grid2, Skeleton, Typography } from "@mui/material";
import { useTypeUser } from "../../hooks/useTypeUser";
import { useAuthStore } from "../../hooks";
import { useUsers } from "../../hooks/useUsers";
import { Add, Delete, Edit } from "@mui/icons-material";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import EditButton from "../../components/Buttons/EditButton";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

const CarrierDrivers = () => {
  const {
    rowsCarrierDrivers,
    deleteOneCD,
    loadCarrierDrivers,
    navigate,
    loading,
  } = useUsers();
  const { user } = useAuthStore();

  useEffect(() => {
    loadCarrierDrivers();
  }, [user]);

  const Delete = (value) => {
    deleteOneCD(value);
  };
  if (loading) {
    return <LoadingScreenBlue />;
  }
  const paths = [
    { path: `/usuarios/transportistas`, name: "Transportistas" },
  ];

  return (
    <Grid2 container paddingX={10}>
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4">
          <strong>Transportistas</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12} display={"flex"}margin={2} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />

        <Fab
          onClick={() =>
            navigate("/usuarios/agregar-transportista", { replace: true })
          }
          color="secondary"
          aria-label="Alta de transportista"
          title="Alta de transportista"
        >
          <Add />
        </Fab>
      </Grid2>
      <Grid2 size={12}>
        {rowsCarrierDrivers ? (
          <DataGrid
            sx={{
              fontSize: "12px",
              fontFamily: "sans-serif",
              borderRadius: "20px",
              bgcolor: "#fff",
              border: "1px solid rgb(209, 205, 205)", // Borde exterior naranja
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgb(230, 223, 223)", // Borde interno claro
              },
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={[
              {
                field: "fullname",
                hideable: false,
                headerName: "Nombre",
                flex: 2,
                sortable: false,
              },
              {
                field: "email",
                hideable: false,
                headerName: "Correo",
                flex: 2,
                sortable: false,
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
                    title="¿Desea eliminar el siguiente elemento?"
                    callbackToDeleteItem={() => Delete(params.row._id)}
                  />,
                  <EditButton
                    title={`Desea editar ${params.row.fullname}?`}
                    callbackToEdit={() =>
                      navigate(
                        `/usuarios/transportistas/editar/${params.row._id}`
                      )
                    }
                  />,
                ],
              },
            ]}
            rows={rowsCarrierDrivers}
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
            initialState={{
              sorting: {
                sortModel: [{ field: "name", sort: "desc" }],
              },
              pagination: {
                paginationModel: { pageSize: 20, page: 0 },
              },
            }}
          />
        ) : (
          <Skeleton title="Cargando..." variant="rectangular" />
        )}
      </Grid2>
    </Grid2>
  );
};

export default CarrierDrivers;
