import React, { useState } from 'react'
import { DeleteTwoTone, EditTwoTone, ExclamationCircleFilled } from "@ant-design/icons";

import { useNavigate } from 'react-router-dom';
import { redirectPages, alerConfirm } from '../../helpers/';
import { Box, Button, IconButton, Modal, Tooltip, Typography, TextField } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Add, Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green, red } from '@mui/material/colors';
import { Controller, useForm } from 'react-hook-form';
import { useStoreHouse } from '../../hooks/useStoreHouse';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px  #000',
    borderRadius:'20px',
    boxShadow: 24,
    p: 5,
  };


const AddButton2 = ({title,text, product}) => {

    const [openForm, setopenForm] = useState(false)
    const handleOpen = () => setopenForm(true);
    const handleClose = () => setopenForm(false);
    const {addStockProduct} = useStoreHouse()

    const { control, handleSubmit, reset } = useForm({
        defaultValues:{
            stock: '',
        }
    })

    const sendInfo = async(data)=>{
        addStockProduct(product.stock_id,data)
        handleClose()
        reset()
    }

    const ModalSweet = () => {
       
        Swal.fire({
            title: title,
            text: text,
            showDenyButton: true,
            denyButtonText:'Cancelar',
            confirmButtonText: "Agregar",
            confirmButtonColor: green[700]
          }).then((result) => {
            if (result.isConfirmed) {
                handleOpen()
            } else if (result.isDenied) {
              Swal.fire({
                title:'Cancelado',
                icon:'error',
                confirmButtonColor:red[900],
                timer:2000,
                timerProgressBar:true

              });
            }
          });
    
       
    };

    const validateGreaterThanZero = (value) => {
        return parseInt(value) > 0 || "El valor debe ser mayor a 0";
      };

    return (
        <>
        <Tooltip title={title? title:''}>
                <IconButton
                color='success'
                onClick={() => ModalSweet()}
                title='Activar Sucursal'
                startIcon={<Add/>}
                variant='contained'
                fullWidth
                >
               <Add/>
                </IconButton>
        </Tooltip>
        <Modal
        open={openForm}
        onClose={handleClose}
        component={'form'}
        onSubmit={handleSubmit(sendInfo)}
      >
        <Box sx={style}>
          <Typography  variant="h4"  component="h2">
            Agregar Stock {product?.name}
          </Typography>
          <br />
          <Typography  variant="h6"  component="h2">
            Stock Actual {product?.stock}
          </Typography>
          <Controller
          name="stock"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Valor requerido" },
            validate: validateGreaterThanZero
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="outlined"
              label="Cantidad"
              fullWidth
              sx={{marginY:'20px'}}
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : ""
              }
              error={fieldState.invalid}
              inputProps={{ ...field }}
            />
          )}
        />
        <Button variant="contained" type="submit" fullWidth color="primary">
          Agregar stock
        </Button>
        </Box>
      </Modal>
        </>
    )
}

export default AddButton2
