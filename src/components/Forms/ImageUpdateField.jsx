import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { styled, Card, CardMedia, CardActions, Skeleton, Fab, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { Cancel, Close, CloudDone, CloudUpload, Done, Edit } from "@mui/icons-material";
import noImage from "../../assets/Images/ui/no-image.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImageUpdateField = ({idProduct,imageProduct, onSubmit, textButton}) => {
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if(imageProduct?.length > 0){
        setImagePreview(imageProduct)
    } 
    setOpen(false)};
  const [imagePreview, setImagePreview] = useState(null);
  const [fileImage, setFileImage] = useState([]);

  useEffect(() => {
    if (imageProduct !== null) {
        setImagePreview(imageProduct);
    }
  }, [imageProduct]);

  const handleUploadImage = (event) => {
    setloader(true);
    event.preventDefault();
    const file = event.target.files[0];
    setFileImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setloader(false);
  };

  const handleSaveImage  = () => {
    onSubmit(idProduct,fileImage);
     setFileImage('')
     handleClose()
  }
  if (loader) {
    return<Skeleton  variant="circular" width={40} height={40} />;
  }


  return (
    <div>
      <Card sx={{padding:2}} variant="outlined">
          <CardMedia sx={{display:'flex', justifyContent:'center'}}>
            {open ? (
              <Skeleton variant="rectangular" width={250} height={'450px'}/>
            ) : imagePreview !== null ? (
              <img style={{borderRadius:'10px'}} width="300" height='450' src={imagePreview} />
            ) : (
              <img style={{borderRadius:'10px'}} width="300" height='450' src={noImage} alt="No image available" />
            )}
          </CardMedia>
        <CardActions>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            fullWidth
            tabIndex={-1}
            startIcon={imagePreview ? <Edit /> : <CloudUpload />}
            onClick={() => handleOpen()}
          >
            {imagePreview ? `${textButton}` : "Subir "}
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container display={'flex'} justifyContent={'end'} spacing={0}>   
            <Fab
              color="primary"
              aria-label="Cancelar"
              sx={{alignContent:'flex-end'}}
              title="Cancelar"
              onClick={() => handleClose()}
            >
              <Close />
            </Fab>
            </Grid>
          <Card variant="elevation">
            <CardMedia sx={{display:'flex', justifyContent:'center'}}>
              {loader ? (
                <Skeleton />
              ) : imagePreview !== null ? (
                <img style={{objectFit:'contain'}} width="300" height={'450px'}   src={imagePreview}  />
              ) : (
                <img src={noImage} width="300" height={'450px'}  alt="No image available" />
              )}
            </CardMedia>
            <CardActions>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                fullWidth
              >
                Editar
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg "
                  onChange={(e) => handleUploadImage(e)}
                />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudDone/>}
                onClick={() => handleSaveImage()}
                fullWidth
                color="success"
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};


export default ImageUpdateField
