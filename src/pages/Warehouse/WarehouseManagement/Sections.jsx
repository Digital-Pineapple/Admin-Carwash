import {
  Grid2,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Skeleton,
  styled,
  tableCellClasses,
  Button,
  Modal,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Popover,
  MenuList,
} from "@mui/material";
import { useWarehouse } from "../../../hooks";
import { useCallback, useEffect, useState } from "react";
import { Add, Delete, Edit, MoreVert, QrCode } from "@mui/icons-material";
import { grey, teal } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { FilePdfFilled } from "@ant-design/icons";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: teal[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  display: "flex",
  gap: 2,
  p: 4,
};

const Sections = () => {
  const {
    loadAllSections,
    allSections,
    rows,
    loaderSections,
    allAisles,
    loadDeleteSection,
    loadAddSection,
    loadUpdateSection,
    loadSectionPDF
  } = useWarehouse();

  const [open, setOpen] = useState({ value: false, section: {}, type: "" });
  const [openPopover, setOpenPopover] = useState(null);

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    loadAllSections();
  }, []);

  const rowsSections = rows(allSections) || [];

  const handleOpen = (section = {}, type) => {
    setOpen({ value: true, section, type });
  };
  const handleClose = () => {
    setOpen({ value: false, section: {}, type: "" });
    reset();
  };
  const OnSubmit = (data) => {
    if (open.type === "Add") {
      loadAddSection(data, handleClose);
    } else if (open.type === "Update") {
      const id = open.section._id;
      loadUpdateSection(id, data, handleClose);
    }
  };

  const handleOpenPopover = useCallback((event, row) => {
    setOpenPopover(event.currentTarget);
    setOpen((prev) => ({ ...prev, section: row }));
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  if (loaderSections) {
    return <Skeleton variant="rounded" width={"100%"} height={"100%"} />;
  }

  return (
    <Grid2 container>
      <Grid2
        size={12}
        flexGrow={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
      >
        <Typography variant="h5">
          <strong>Secciones</strong>
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "capitalize", borderRadius: "10px" }}
          color="secondary"
          onClick={() => handleOpen({}, "Add")}
        >
          <Add /> Agregar Secciones
        </Button>
      </Grid2>

      <Grid2 size={12}>
        <TableContainer variant="elevation" component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Pasillo</StyledTableCell>
                <StyledTableCell align="right">Opciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsSections.map((row) => (
                <StyledTableRow key={row.id || row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.aisle.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={(e) => handleOpenPopover(e, row)}>
                      <MoreVert />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>

      <Modal open={open.value} onClose={handleClose}>
        <Grid2
          container
          sx={style}
          component="form"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <Typography marginBottom={3} variant="h6">
            {open.type === "Add" ? "Agregar sección" : "Editar sección"}
          </Typography>

          <Controller
            name="aisle"
            control={control}
            defaultValue={open.section.aisle?._id}
            rules={{ required: "Campo requerido" }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={fieldState.invalid}>
                <InputLabel>Seleccione pasillo</InputLabel>
                <Select {...field} label="Seleccione pasillo">
                  {allAisles.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="name"
            control={control}
            defaultValue={open.section?.name}
            rules={{ required: "Valor requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Nombre de sección"
                placeholder="Ej 1, 2, 3"
                fullWidth
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Grid2 display="flex" gap={1} size={12}>
            <Button
              fullWidth
              onClick={handleClose}
              variant="contained"
              color="error"
            >
              Cancelar
            </Button>
            <Button fullWidth type="submit" variant="contained" color="success">
              Guardar
            </Button>
          </Grid2>
        </Grid2>
      </Modal>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
          }}
        >
           <MenuItem
            onClick={() => {
              handleClosePopover();
              loadSectionPDF(open.section._id);
            }}
          >
            <QrCode fontSize="small" color="warning" /> Código
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleOpen(open.section, "Update");
            }}
          >
            <Edit fontSize="small" color="info" /> Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              loadDeleteSection(open.section._id);
            }}
          >
            <Delete fontSize="small" color="warning" /> Eliminar
          </MenuItem>
         
        </MenuList>
      </Popover>
    </Grid2>
  );
};

export default Sections;
