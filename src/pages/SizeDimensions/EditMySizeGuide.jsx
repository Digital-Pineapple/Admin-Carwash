import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSizeGuide } from '../../hooks/useSizeGuide'
import TableClothes from '../Products/StepNewProduct/TablesTypeProduct/TableClothes'
import { Grid, Typography } from '@mui/material'
import TableFoods from '../Products/StepNewProduct/TablesTypeProduct/TableFoods'
import LoadingScreenBlue from '../../components/ui/LoadingScreenBlue'
import TableShoes from '../Products/StepNewProduct/TablesTypeProduct/TableShoes'
import TableOthers from '../Products/StepNewProduct/TablesTypeProduct/TableOthers'

const EditMySizeGuide = () => {
  const {loadOneSizeGuide, sizeGuide, rowsSizeGuide, loading} = useSizeGuide()
  const {id} =  useParams()
  useEffect(() => {
  loadOneSizeGuide(id)
  }, [id])

  if (loading) {
    return(
      <LoadingScreenBlue/>
    )
  }

  const renderedTable = ( type ) =>{
    
   if (type === 'clothes') {
     return(
      <TableClothes  initialRows={rowsSizeGuide} sizeGuide={sizeGuide? sizeGuide:''}/>
     )
   }else if (type === 'foods'){
    return(
      <TableFoods  initialRows={rowsSizeGuide} sizeGuide={sizeGuide? sizeGuide:''} />
    )
   }else if (type === 'shoes'){
    return (
      <TableShoes  initialRows={rowsSizeGuide} sizeGuide={sizeGuide? sizeGuide:''} />
    )
   }else if (type ==='others'){
    return(
      <TableOthers  initialRows={rowsSizeGuide} sizeGuide={sizeGuide? sizeGuide:''}  />
    )
   }
  }
 
    return(
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
          Editar {sizeGuide.name}
        </Typography>
      </Grid>
      {renderedTable(sizeGuide.type)}
    
      </Grid>
    )
  
 
}

export default EditMySizeGuide