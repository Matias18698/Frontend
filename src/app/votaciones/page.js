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
import {HowToVote,Edit,Delete,Add,Close} from '@mui/icons-material'
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

  const [votaciones, setvotaciones] = useState([]);
  const [modalState, setmodalState] = useState(false);
  const [deleteSelected, setdeleteSelected] = useState({});
  const [session, setSession] = useState(null);

  const getSession = () => {
    const jsonsession = JSON.parse(sessionStorage.getItem('asamblea-sesion-id'));
    if (jsonsession) {
      setSession(jsonsession);
    }
  };

  const getvotaciones = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_SERVIDOR}/votaciones`)
    .then(function (response) {
      setvotaciones(response.data)
    })
    .catch(function (error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }
    })
  }

  const modalOpen=()=>setmodalState(true);
  const modalClose=()=>setmodalState(false);

  const deleteAks=(row)=>{
    setdeleteSelected(row);
    modalOpen();
  }

  const deleteVotacion = async () => {

    await axios.delete(`${process.env.NEXT_PUBLIC_SERVIDOR}/votacion/delete/${deleteSelected._id}`)
    .then(function (response) {
      getvotaciones();
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
      return votaciones.map((row => {
          return (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell >{row.titulo}</TableCell>
                  <TableCell >{row.descripcion}</TableCell>
                  <TableCell >{row.status}</TableCell>
                  <TableCell >{row.asamblea.titulo_asamblea}</TableCell>
                  <TableCell >{row.users.length}</TableCell>
                  <TableCell >
                    <Link href={"/votar/"+row._id}>
                      <IconButton aria-label="Votar" color="secondary"  size="large">
                          <HowToVote/>
                      </IconButton> 
                    </Link>
                    {adminButtons(row)}
                  </TableCell>
              </TableRow>
          )
      }))
  }

  const adminButtons=(row)=>{
    if(session?.rol=='Admin'){
      return(
        <>
          <Link href={"/votaciones/"+row._id}>
            <IconButton aria-label="Editar" color="primary" size="large">
                <Edit/>
            </IconButton> 
          </Link>
          <IconButton aria-label="Eliminar" color="error" onClick={()=>deleteAks(row)} size="large">
              <Delete/>
          </IconButton> 
        </>
      )
    }
  }

  const adminButtonAdd=()=>{
    if(session?.rol=='Admin'){
      return(
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <Link href={"/votaciones/nuevo"}>
                <Button type="button" variant="contained" startIcon={<Add/>} size="large" color="success">
                  Nueva Votacion
                </Button> 
              </Link>
            </TableCell>
          </TableRow>
        </TableFooter>
      )
    }
  }

  useEffect(() => {
      getvotaciones();
      getSession();
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
              Esta seguro de eliminar la votacion {deleteSelected?.titulo}? 
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button type="button" variant="contained" startIcon={<Close/>} size="medium" onClick={modalClose}>
                Cancelar
              </Button> 
              <Button type="button" variant="contained" startIcon={<Delete/>} size="medium" color="error" onClick={deleteVotacion}>
                Eliminar
              </Button> 
            </Stack>
          </Box>
        </Modal>

        <TableContainer component={Paper} style={{maxWidth:900,margin:"auto"}} >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titulo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Asamblea</TableCell>
                <TableCell>Votos realizados</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contentTable()}
            </TableBody>
            {adminButtonAdd()}
            </Table>
          </TableContainer>
      </Container>
    </main>
  );
}