import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProductOrder } from '../../../hooks/useProductOrder';
import { useAuthStore } from '../../../hooks';
import { AppBar, Button, Grid2, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import ReadyToSend from '../ReadyToSend';
import { useTheme } from '@mui/material/styles';
import { localDate } from '../../../Utils/ConvertIsoDate';
import LoadingScreenBlue from '../../../components/ui/LoadingScreenBlue';
import { useMediaQuery } from '@mui/system';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{width:'100%'}}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const rowsPO = (PO) =>
  PO?.map((item, index) => ({
    id: index,
    date: localDate(item.createdAt),
    supply_date: localDate(item.supply_detail?.date),
    ...item,
  }));


const filteredPOPaid = (data)=>{
  const rowsAllPO = rowsPO(data)
  const assignedUser = rowsPO( data.filter((i)=> i.route_detail?.user) )
  const assignedCompany = rowsPO( data.filter((i)=> i.route_detail?.guide) )
  const NoAssigned = rowsPO( data.filter((i)=> !i.route_detail))
 return {assignedUser, assignedCompany, NoAssigned, rowsAllPO}
}

const MainToSend = () => {
  const { user } = useAuthStore();
   const theme = useTheme();
      const { loadProductOrdersPaidAndFill, productOrders, loading } =
        useProductOrder();
  const [value, setValue] = useState(0);

  const rowsFiltered = useMemo(() => filteredPOPaid(productOrders), [
    productOrders,
  ]);

  const CallBackAllPO = useCallback(
    () => {
      loadProductOrdersPaidAndFill()
    },
    [user]
  )
  
  const handleChange = (event, newValue) => setValue(newValue);

  
  useEffect(() => {
      CallBackAllPO()
    }, [CallBackAllPO]);
    const isXs = useMediaQuery('(max-width:600px)');
    



    const getCurrentTabData = () => {
      if (value === 0) return rowsFiltered.rowsAllPO;
      if (value === 1) return rowsFiltered.NoAssigned;
      if (value === 2) return rowsFiltered.assignedCompany;
      if (value === 3) return rowsFiltered.assignedUser;
      return [];
    };


  if (loading) return <LoadingScreenBlue />;

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2}>   
    <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{fontSize:{xs:"16px", lg:"30px"}}}>
          <strong>Asignar envío</strong>
        </Typography>
      </Grid2>
    
    <AppBar position="static" sx={{ borderRadius: "10px", bgcolor:'#fff', color:'#000', fontWeight:'Bold' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant={isXs ? "scrollable" : "fullWidth"}
          aria-label="full width tabs example"
        >
          <Tab label="Todos"  />
          <Tab label="Pedidos por asignar" />
          <Tab label="Asignados a paquetería" />
          <Tab label="Asignados a usuario" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
       <ReadyToSend rows={getCurrentTabData()} type={0} /> 
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
      <ReadyToSend rows={getCurrentTabData()} type={1} /> 
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
      <ReadyToSend rows={getCurrentTabData()} type={2} /> 
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
      <ReadyToSend rows={getCurrentTabData()} type={3} /> 
     
      </TabPanel>
    </Grid2>
  );
}


export default MainToSend

