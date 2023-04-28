import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Titles from '../../components/ui/Titles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import { redirectPages } from '../../helpers/helpers';
import WarningAlert from '../../components/ui/WarningAlert';

import { useUsers } from '../../hooks/useUsers';


const Index = () => {

  const navigate = useNavigate();

  const { loadUsers, users } = useUsers();

  useEffect(() => {
    loadUsers();
  }, [])



  return (
    <>
      <Titles
        name={<h2 align='center'>Usuarios</h2>}
      />
      <Button variant="contained" disableElevation sx={{ color: "CC3C5C", my: 5, p: 1, borderRadius: 5, px: 5 }} onClick={() => redirectPages(navigate, '/Nuevo-usuario')}>
        Registrar nuevo usuario
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Telefono</TableCell>
              <TableCell align="center">Correo</TableCell>
              <TableCell align="center">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.fullname}
                </TableCell>
                <TableCell align="center">{user?.phone?.phone_number || 'N/A'}</TableCell>
                <TableCell align="center">{user?.email}</TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <WarningAlert
                    route={`/Editar-usuario/${user._id}`}
                    title="Estas seguro que deseas eliminar al usuario"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Box display="flex" justifyContent="center" py={10}>
        <Pagination count={10} color="primary" />
      </Box> */}
    </>
  )
}

export default Index