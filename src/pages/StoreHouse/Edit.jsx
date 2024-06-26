import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useServices } from "../../hooks/useServices";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useSelector } from "react-redux";
import AddImage from "../../assets/Images/add.png";

const Edit = () => {
  const { id } = useParams();
  const { loadService, service, editService } = useServices();
  const navigate = useNavigate();
  const { loadSubCategories } = useSubCategories();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
    );
    
    const handleImage = ({ target }) => {
      setPreviewImage(URL.createObjectURL(target.files[0]));
      setSelectedFile(target.files[0]);
    };

  useEffect(() => {
    loadService(id);
    loadSubCategories();
  }, [id]);

  useEffect(() => {
    formik.setValues({
      name: service.name,
      description: service.description,
      status: service.status,
      subCategory: service.subCategory,
      service_image: previewImage,
    });
    setPreviewImage(service.service_image);
  }, [service]);


  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: true,
      subCategory: "",
      service_image: "",
    },
    onSubmit: (values) => {
      try {
        values.service_image = selectedFile;
        editService(service._id, values);
        navigate("/auth/servicios", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al editar el servicio", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });
  const outEdit = () => {
    navigate("/auth/servicios", { replace: true });
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Editar Servicio</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
        <Grid
          item
          sm={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <CardMedia
                  sx={{ height: 140 }}
                  image={
                    previewImage
                      ? previewImage
                      : service.service_image || AddImage
                  }
                  title={selectedFile ? selectedFile.name : "Selecciona imagen"}
                />

                <Typography gutterBottom variant="h5" component="div">
                  {selectedFile
                    ? selectedFile.name
                    : previewImage
                    ? "Cambiar imagen"
                    : "Elige una imagen"}
                </Typography>
              </CardContent>
              <CardActions>
                <input
                  type="file"
                  id="service_image"
                  name="service_image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleImage(e)}
                  
                />
              </CardActions>
            </Card>
          </Grid>
          <TextField
            focused
            fullWidth
            id="name"
            name="name"
            label="Nombre del servicio"
            variant="outlined"
            value={formik.values.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
          <Typography>Descipcion del servicio</Typography>
          <TextareaAutosize
            aria-label="minimum height"
            id="description"
            name="description"
            minRows={6}
            label="Descripcion"
            value={formik.values.description}
            style={{ width: "100%", fontFamily: "BikoBold", marginBottom: 20 }}
            onChange={formik.handleChange}
          />
          <FormControl>
            <FormLabel>Subcategoria</FormLabel>
            <Select
              id="subCategory"
              name="subCategory"
              value={formik.values.subCategory}
              label="Subcategoria"
              onChange={formik.handleChange}
            >
              {subCategories.map((subCategory) => (
                <MenuItem key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Selecciona una sub-categoria</FormHelperText>
          </FormControl>

          <Grid
            container
            justifyContent={"center"}
            justifyItems={"center"}
            alignItems={"center"}
          >
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
              <Button onClick={outEdit} variant="outlined" color="secondary">
                Salir
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Edit;
