import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import AvatarCustom from "../ui/AvatarCustom";
import { useDynamicRoutes } from "../../hooks/useDynamicRoutes";
import MenuDrawer from "../Drawers/MenuDrawer";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAuthStore } from "../../hooks";
import { Divider, Grid2, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import ImageMain from '../../assets/Images/CHMX/Imagotipo CICHMEX Naranja.png'
import Image from "mui-image";
import BtnIconNotification from "../ui/BtnIconNotification";
import NotificationsPanel from "../ui/Notifications";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { addNotification } from "../../store/reducer/notificationsReducer";
import io from "socket.io-client";

const drawerWidth = 240;

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  backgroundColor: `${theme.palette.primary.main}`,
  color: `${theme.palette.primary.contrastText}`,
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", color: "primary.contrastText" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));


// const socket = io.connect(import.meta.env.VITE_SOCKET_URL, {
//   reconnection: true,
//   forceNew: true 
// })
export const Navbar = (props) => {
  const { logged } = useAuthStore();

  // useEffect(()=> {  
  //   if(logged){
  //     socket.on("received_notification", (data)=>{
  //       enqueueSnackbar(`${data.message}`,  {
  //         autoHideDuration: 2000,
  //         anchorOrigin: { horizontal: "right", vertical: "top" },
  //         variant: "default",
  //       });
  //       dispatch(addNotification(data));
  //     })          
  //   }  
  //   // funcion cleanup como desconectarse del socket
  //   return () => {
  //     // socket.disconnect();
  //   }
  // },[logged]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { notifications } = useSelector(state => state.notifications);
  const { groupRoutes } = useDynamicRoutes();
  const [expanded, setExpanded] = useState("");
  const [ showNotiDrawer, setShowNotiDrawer ] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { navigate, user, routes } = useAuthStore();

  const listLinks = groupRoutes(routes);

  const handleButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleNavigateClick = (value) => {
    navigate(value, { replace: true });
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}  
        open={showNotiDrawer} 
        anchor="right" 
        onClose={() => setShowNotiDrawer(false)}
      >
        <NotificationsPanel />            
      </Drawer>   
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "success.main",
          color: "primary.contrastText",
        }}
        
      >
        <Grid2
          sx={{
            display: "flex",
            justifyContent:'start'
            
          }}
          container
        >
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "primary.main" }}
            onClick={handleButtonClick}
          >
            <Menu />
          </IconButton>
          <Grid2 width={drawerWidth} sx={{display:{xs:'none', md:'flex'}}} alignContent={'center'}  display={'flex'} paddingX={5} >
          <Link to={'/'}>
          <Image  src={ImageMain}  alt="image-main" style={{objectFit:'contain'}}  width={'160px'} />
          </Link>
          </Grid2>
          <Divider orientation="vertical" flexItem/>
          <Grid2 size={{xs:6, md:8, xl:9}} padding={1}>
          <Typography
            variant="h6"
            fontSize={{ xs: "20px", sm: "30px" }}
            fontWeight={'Bold'}
            
          >
            {user.fullname}
          </Typography>
          </Grid2>
          
          <Grid2 size={{xs:1}} justifyContent={'center'} alignContent={'center'}>   
          <AvatarCustom />
          </Grid2>
          <BtnIconNotification 
            amount={notifications?.filter(item => !(item?.readed)).length} 
            onClick={() => setShowNotiDrawer(true)}
          />
              
        </Grid2>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "primary.main",
            backgroundColor: "primary.main",
          },
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <Toolbar />
        <MenuDrawer navLinks={listLinks} />
      </Drawer>

      <Drawer
        anchor="left"
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "primary.main",
            backgroundColor: "primary.main",
          },
        }}
        open={drawerOpen}
        onClose={handleButtonClick}
      >
        <Box sx={{ width: drawerWidth, mt: { xs: "56px", sm: "65px" } }}>
          {listLinks.map((group, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
              >
                <Typography>{group.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {group.subRoutes.map((item, subIndex) => (
                  <ListItemButton 
                    onClick={() => handleNavigateClick(item.path)}
                    key={subIndex}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 5, minHeight:'100vh' }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};
