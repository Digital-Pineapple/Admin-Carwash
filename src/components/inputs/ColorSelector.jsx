import * as React from 'react';
import { Box, TextField, Typography, Autocomplete, Button, createFilterOptions } from '@mui/material';

// Lista de 100 colores con sus nombres en español y formato hexadecimal
const colors = [
  { hex: '#FF0000', name: 'Rojo' },
  { hex: '#00FF00', name: 'Verde' },
  { hex: '#0000FF', name: 'Azul' },
  { hex: '#FFFF00', name: 'Amarillo' },
  { hex: '#FF00FF', name: 'Fucsia' },
  { hex: '#00FFFF', name: 'Cian' },
  { hex: '#800000', name: 'Marrón' },
  { hex: '#808000', name: 'Oliva' },
  { hex: '#800080', name: 'Púrpura' },
  { hex: '#008080', name: 'Turquesa' },
  { hex: '#FFA500', name: 'Naranja' },
  { hex: '#FFC0CB', name: 'Rosa claro' },
  { hex: '#FFD700', name: 'Oro' },
  { hex: '#000080', name: 'Azul marino' },
  { hex: '#F0E68C', name: 'Caqui' },
  { hex: '#ADD8E6', name: 'Celeste' },
  { hex: '#E6E6FA', name: 'Lavanda' },
  { hex: '#FF4500', name: 'Naranja oscuro' },
  { hex: '#DA70D6', name: 'Orquídea' },
  { hex: '#B0C4DE', name: 'Azul claro' },
  { hex: '#008000', name: 'Verde oscuro' },
  { hex: '#4B0082', name: 'Índigo' },
  { hex: '#BDB76B', name: 'Oliva dorado' },
  { hex: '#FA8072', name: 'Salmón' },
  { hex: '#20B2AA', name: 'Verde azulado' },
  { hex: '#87CEEB', name: 'Azul cielo' },
  { hex: '#FF6347', name: 'Tomate' },
  { hex: '#40E0D0', name: 'Turquesa claro' },
  { hex: '#D2B48C', name: 'Bronceado' },
  { hex: '#CD5C5C', name: 'Rojo indio' },
  { hex: '#9932CC', name: 'Violeta oscuro' },
  { hex: '#8A2BE2', name: 'Azul violeta' },
  { hex: '#A52A2A', name: 'Castaño' },
  { hex: '#5F9EA0', name: 'Verde cobalto' },
  { hex: '#556B2F', name: 'Verde oliva oscuro' },
  { hex: '#FF1493', name: 'Rosa profundo' },
  { hex: '#696969', name: 'Gris oscuro' },
  { hex: '#00CED1', name: 'Cian oscuro' },
  { hex: '#4682B4', name: 'Acero azulado' },
  { hex: '#D2691E', name: 'Chocolate' },
  { hex: '#9ACD32', name: 'Amarillo verdoso' },
  { hex: '#9400D3', name: 'Púrpura fuerte' },
  { hex: '#7B68EE', name: 'Lavanda oscuro' },
  { hex: '#2F4F4F', name: 'Verde grisáceo' },
  { hex: '#B8860B', name: 'Oro antiguo' },
  { hex: '#FF8C00', name: 'Mandarina' },
  { hex: '#32CD32', name: 'Verde lima' },
  { hex: '#8B0000', name: 'Rojo vino' },
  { hex: '#B22222', name: 'Rojo fuego' },
  { hex: '#E9967A', name: 'Salmón claro' },
  { hex: '#FAEBD7', name: 'Blanco antiguo' },
  { hex: '#8FBC8F', name: 'Verde mar' },
  { hex: '#8B008B', name: 'Magenta oscuro' },
  { hex: '#00FA9A', name: 'Verde primavera' },
  { hex: '#FF69B4', name: 'Rosa intenso' },
  { hex: '#1E90FF', name: 'Azul dodger' },
  { hex: '#B0E0E6', name: 'Azul polvo' },
  { hex: '#C71585', name: 'Carmesí fuerte' },
  { hex: '#DB7093', name: 'Rosa viejo' },
  { hex: '#98FB98', name: 'Verde pálido' },
  { hex: '#FFDAB9', name: 'Durazno' },
  { hex: '#6A5ACD', name: 'Pizarra azul' },
  { hex: '#FFB6C1', name: 'Rosado' },
  { hex: '#2E8B57', name: 'Verde mar oscuro' },
  { hex: '#87CEFA', name: 'Azul cielo claro' },
  { hex: '#7FFF00', name: 'Verde lima fuerte' },
  { hex: '#DC143C', name: 'Carmesí' },
  { hex: '#F4A460', name: 'Arena' },
  { hex: '#ADFF2F', name: 'Amarillo verdoso claro' },
  { hex: '#A9A9A9', name: 'Gris medio' },
  { hex: '#778899', name: 'Gris azulado' },
  { hex: '#90EE90', name: 'Verde claro' },
  { hex: '#BA55D3', name: 'Orquídea medio' },
  { hex: '#D3D3D3', name: 'Gris claro' },
  { hex: '#FFDEAD', name: 'Blanco Navajo' },
  { hex: '#CD853F', name: 'Peruano' },
  { hex: '#FF4500', name: 'Naranja rojizo' },
  { hex: '#6B8E23', name: 'Verde oliva' },
  { hex: '#FFE4B5', name: 'Arena suave' },
  { hex: '#8A3324', name: 'Marrón rojizo' },
  { hex: '#F08080', name: 'Coral rosado' },
  { hex: '#FFFACD', name: 'Amarillo limón' },
  { hex: '#FF7F50', name: 'Coral' },
  { hex: '#708090', name: 'Pizarra' },
  { hex: '#DAA520', name: 'Oro intenso' },
  { hex: '#F5F5DC', name: 'Beige' },
  { hex: '#FAFAD2', name: 'Amarillo claro' },
  { hex: '#C0C0C0', name: 'Plata' },
  { hex: '#B0C4DE', name: 'Azul celeste' },
  { hex: '#FFDAB9', name: 'Melocotón' },
  { hex: '#FFF8DC', name: 'Maíz' },
  { hex: '#F5DEB3', name: 'Trigo' },
  { hex: '#EEE8AA', name: 'Amarillo pálido' },
  { hex: '#FFE4C4', name: 'Crema' },
  { hex: '#8B4513', name: 'Siena' },
  { hex: '#DEB887', name: 'Madera clara' },
  { hex: '#5F9EA0', name: 'Verde cadete' },
  { hex: '#E0FFFF', name: 'Azul celeste claro' },
  { hex: '#AFEEEE', name: 'Verde agua' },
  { hex: '#F0FFF0', name: 'Verde menta' },
  { hex: '#F5FFFA', name: 'Turquesa suave' },
  { hex: '#FAF0E6', name: 'Blanco lino' },
  { hex: '#FFF5EE', name: 'Rosa melón' },
  { hex: '#FFE4E1', name: 'Blanco suave' },
  { hex: '#E6E6FA', name: 'Lila claro' },
  { hex: '#DCDCDC', name: 'Gris claro medio' },
  { hex: '#FFFAF0', name: 'Flor blanco' },
  { hex: '#F0E68C', name: 'Caqui claro' },
  { hex: '#FFFAFA', name: 'Nieve' },
  { hex: '#A52A2A', name: 'Marrón fuerte' },
  { hex: '#CD5C5C', name: 'Coral pálido' },
  { hex: '#A0522D', name: 'Siena quemado' },
  { hex: '#D2691E', name: 'Chocolate oscuro' },
  { hex: '#B8860B', name: 'Oro bronce' },
  { hex: '#8B0000', name: 'Rojo vino oscuro' },
  { hex: '#B22222', name: 'Rojo fuego intenso' },
  { hex: '#BC8F8F', name: 'Rosa carne' },
  { hex: '#FFEBCD', name: 'Melón suave' },
  { hex: '#FAF0E6', name: 'Blanco lino claro' },
  { hex: '#FFF8DC', name: 'Maíz crema' },
  { hex: '#FFFACD', name: 'Amarillo crema' },
  { hex: '#FFDAB9', name: 'Durazno claro' },
  { hex: '#FFE4C4', name: 'Crema suave' },
  { hex: '#DEB887', name: 'Bronce claro' },
  { hex: '#D3D3D3', name: 'Gris piedra' },
  { hex: '#BDB76B', name: 'Caqui oscuro' },
  { hex: '#D2691E', name: 'Siena oscuro' },
  { hex: '#A52A2A', name: 'Café' },
  { hex: '#A0522D', name: 'Bronce oscuro' },
  { hex: '#FF6347', name: 'Tomate claro' },
  { hex: '#FFE4B5', name: 'Madera blanca' },
  { hex: '#BC8F8F', name: 'Carne' },
  { hex: '#FFB6C1', name: 'Rosa pálido' },
  { hex: '#FAF0E6', name: 'Flor blanca' },
  { hex: '#FFF0F5', name: 'Flor rosa' },
  { hex: '#E6E6FA', name: 'Púrpura suave' },
  { hex: '#DDA0DD', name: 'Orquídea claro' },
  { hex: '#EE82EE', name: 'Violeta claro' },
  { hex: '#D8BFD8', name: 'Cardo' },
  { hex: '#FF1493', name: 'Rosa fuerte' },
  { hex: '#BA55D3', name: 'Orquídea oscuro' },
  { hex: '#9400D3', name: 'Violeta fuerte' },
  { hex: '#9932CC', name: 'Lila oscuro' },
  { hex: '#9370DB', name: 'Púrpura medio' },
];


const filter = createFilterOptions();

const ColorSelector = ({
  value,
  onChange,
  fullWidth,
  disabled,
  label,
  error,
  helperText,
}) => {
  
  const [selectedValue, setSelectedValue] = React.useState(null);

  React.useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);
  
  return (
    <Autocomplete
      value={selectedValue}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          const existingColor = colors.find(
            (color) => color.name.toLowerCase() === newValue.toLowerCase()
          );
          const finalValue = existingColor || { name: newValue };
          setSelectedValue(finalValue);
          onChange(finalValue);
        } else if (newValue && newValue.inputValue) {
          const finalValue = { name: newValue.inputValue };
          setSelectedValue(finalValue);
          onChange(finalValue);
        } else {
          setSelectedValue(newValue);
          onChange(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue.toLowerCase() === option.name.toLowerCase()
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: inputValue,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={colors}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.name;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box component="li" {...optionProps} sx={{ display: "flex", alignItems: "center" }}>
            {option.hex && (
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "100px",
                  backgroundColor: option.hex,
                  marginRight: 2,
                  border: "1px solid white",
                }}
              />
            )}
            <Typography fontSize={"15px"}>{option.name}</Typography>
          </Box>
        );
      }}
      sx={{ width: fullWidth ? "100%" : 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          disabled={disabled}
          error={error}
          helperText={helperText}
          size="small"
        />
      )}
    />
  );
};

export default ColorSelector