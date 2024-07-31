'use client';
import {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, TableFooter,Button,IconButton,Modal,Typography,Box,Stack} from '@mui/material';
import {Send,Edit,Delete,Add,Close} from '@mui/icons-material'
import Link from "next/link";
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#546e7a',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {

  const [alumnos, setalumnos] = useState([]);
  const [modalState, setmodalState] = useState(false);
  const [deleteSelected, setdeleteSelected] = useState({});

  const getalumnos = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVIDOR}/alumnos`);
    setalumnos(response.data)
  }

  const modalOpen=()=>setmodalState(true);
  const modalClose=()=>setmodalState(false);

  const deleteAks=(row)=>{
    setdeleteSelected(row);
    modalOpen();
  }

  const deleteAlumno = async () => {

    await axios.delete(`${process.env.NEXT_PUBLIC_SERVIDOR}/alumno/delete/${deleteSelected._id}`)
    .then(function (response) {
      getalumnos();
      modalClose();
    })
    .catch(function (error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }
    })
  }

  const contentTable = () => {
      return alumnos.map((row => {
          return (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell >{row.nombre}</TableCell>
                  <TableCell >{row.apellido}</TableCell>
                  <TableCell >{row.numero}</TableCell>
                  <TableCell >{row.correo}</TableCell>
                  <TableCell >{row.carrera.abreviacion}</TableCell>
                  <TableCell >
                    <Link href={"/alumnos/"+row._id}>
                      <IconButton aria-label="Editar" color="primary">
                          <Edit/>
                      </IconButton> 
                    </Link>
                    <IconButton aria-label="Eliminar" color="error" onClick={()=>deleteAks(row)}>
                        <Delete/>
                    </IconButton> 
                  </TableCell>
              </TableRow>
          )
      }))
  }

  useEffect(() => {
      getalumnos()
  }, [])

  return (
    <main>
      <Container>
        <br></br>
        
        <Modal
          open={modalState}
          onClose={modalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Eliminar
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Esta seguro de eliminar a {deleteSelected?.nombre} {deleteSelected?.apellido}? 
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button type="button" variant="contained" startIcon={<Close/>} size="medium" onClick={modalClose}>
                Cancelar
              </Button> 
              <Button type="button" variant="contained" startIcon={<Delete/>} size="medium" color="error" onClick={deleteAlumno}>
                Eliminar
              </Button> 
            </Stack>
          </Box>
        </Modal>

        <TableContainer component={Paper} style={{maxWidth:750,margin:"auto"}} >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Numero</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Carrera</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contentTable()}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <Link href={"/alumnos/nuevo"}>
                    <Button type="button" variant="contained" startIcon={<Add/>} size="large" color="success">
                      Nuevo Alumno
                    </Button> 
                  </Link>
                </TableCell>
              </TableRow>
            </TableFooter>
            </Table>
          </TableContainer>
      </Container>
    </main>
  );
}