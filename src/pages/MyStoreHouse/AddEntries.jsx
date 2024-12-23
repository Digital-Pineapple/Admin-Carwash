import {
  Grid,
  Typography,
  TextField,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormSearch from "../../components/Filters/FormSearch";
import { useAuthStore, useProducts } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import TableQuantity from "../../components/Tables/TableQuantity";

const AddEntries = () => {
  const { loadProducts, addMultipleEntries, navigate, loadProduct } =
    useProducts();
  const { user } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      // user_delivery: "",
      // user_received: "",
      products: [],
    },
  });

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ' ]{8,}$/;

  const validateQuantities = (rows) => {
    // Verificamos si hay alguna fila con cantidad vacía
    return rows.every((row) => row.quantity !== "");
  };

  const handleSelectedItem = async (value) => {
    try {
      const product = await loadProduct(value._id); // Cargar el producto por ID
      const variants = product?.variants || []; // Asegurarse de que variants sea un array válido
  
      if (variants.length > 0) {
        // Si hay variantes, procesarlas
        const productVariants = variants.map((item) => {
          return {
            ...item,
            name: product.name +'-' + item.attributes.color, // Ejemplo: agregar un campo del producto
          };
        });
        setProductVariants(productVariants); // Configurar las variantes procesadas
      } else {
        // Si no hay variantes, configurar el producto directamente
        setProduct(product);
      }
    
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const onSubmit = async (data) => {
    if (!validateQuantities(rowsIds)) {
      Swal.fire("Por favor, completa todas las cantidades.", "", "error");
      return;
    }
    setValue("products", allProducts);
    const values = getValues();
    addMultipleEntries(values);
  };

  useEffect(() => {
    loadProducts();
  }, [user]);

  useEffect(() => {
    if (product) {
      setAllProducts((prevProducts) => [...prevProducts, product]);
    }
  }, [product]);

  const rowsIds = allProducts?.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Grid
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault(); // Previene el envío por defecto
        handleSubmit(onSubmit)(); // Llama a tu función de envío
      }}
      container
      gap={2}
    >
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
          Agregar entrada
        </Typography>
      </Grid>

      {/* <Grid item xs={12} display={"flex"} gap={2} justifyContent={"center"}>
        <Controller
          control={control}
          name="user_delivery"
          rules={{
            required: { message: "Campo requerido", value: true },
            pattern: { message: "Ingrese un nombre válido", value: regexName },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="user_delivery"
              name="user_delivery"
              label="Usuario que entrega el producto"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors.user_delivery}
              helperText={errors.user_delivery && errors.user_delivery.message}
              autoComplete="off"
            />
          )}
        />
        <Controller
          control={control}
          name="user_received"
          rules={{
            required: { message: "Campo requerido", value: true },
            pattern: { message: "Ingrese un nombre válido", value: regexName },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="user_received"
              name="user_received"
              label="Usuario que recibe el producto"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors.user_received}
              helperText={errors.user_received && errors.user_received.message}
              autoComplete="off"
            />
          )}
        />
      </Grid> */}
      <Grid
        container
        padding={{ xs: 2, lg: 4 }}
        gap={2}
        justifyContent={"center"}
      >
        <Typography variant="h4" textAlign={"center"} color="initial">
          Introduzca el nombre o código de barras del producto
        </Typography>
        <Grid item xs={6}>
          <FormSearch
            setSelected={handleSelectedItem}
            allValues={allProducts}
            titleAlert={"Ya se agrego este producto"}
          />
        </Grid>
        <Grid item xs={5}>
        <FormControl fullWidth>
          <FormLabel>{ productVariants.length > 0 ?' Selecciona una variante':''}</FormLabel>
              <Select
                id="variant"
                name="variant"
                onChange={(e) => {
                  setProduct(e.target.value)
                  setProductVariants([])
                  
                }}
                style={{
                  border: productVariants.length > 0 ? "2px solid blue" : "",
                  borderRadius: "4px",
                  transition: "border-color 0.3s ease-in-out", // Efecto de transición
                }}
              >
                {productVariants?.map((variant) => (
                  <MenuItem key={variant._id} value={variant}>
                    {variant.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Selecciona una variante</FormHelperText>
            </FormControl>
        </Grid>
        <Grid item xs={12} lg={8}>
          <TableQuantity
            values={rowsIds}
            setValues={setAllProducts}
            allValues={allProducts}
            type={'entries'}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ButtonGroup fullWidth variant="text" color="primary" aria-label="">
            <Button
              variant="contained"
              onClick={() => navigate("/mi-almacen/productos/entradas")}
              color="error"
            >
              Salir
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              color="success"
            >
              Subir entrada
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddEntries;
