import Inbox from "@mui/icons-material/Inbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
export const Links = [
  {
    title: "Usuarios",
    path: "/auth/usuarios",
    Icon: <Inbox />,
  },
  {
    title: "Servicios",
    path: "/auth/servicios",
    Icon: <CleaningServicesIcon />,
  },
  {
    title: "Tipo de automovil",
    path: "/auth/typeCar",
    Icon: <DriveEtaIcon />,
  },
  {
    title: "Categoria de servicios",
    path: "/auth/CategoriaServicios",
    Icon: <CategoryIcon />,
  },
  {
    title: "Sub-Categorias",
    path: "/auth/SubCategorias",
    Icon: <KeyboardTabIcon />,
  }
];