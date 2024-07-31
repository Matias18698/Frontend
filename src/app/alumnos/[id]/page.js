'use client';
import { Card,CardHeader,CardContent,Box,FormControl,Typography,OutlinedInput,CardActions,Button,NativeSelect,Grid } from "@mui/material";
import {Send} from '@mui/icons-material'
import { useEffect,useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'



export default function Page({params}) {
    const id = params?.id;
    
    const [alumno, setalumno] = useState([]);
    const router = useRouter();
  
    const getalumno = async () => {
        
        await axios.get(`${process.env.NEXT_PUBLIC_SERVIDOR}/alumno/search/${id}`)
        .then(function (response) {
            setalumno(response.data)
        })
        .catch(function (error) {
            console.log(error);
            if(error.response){
                alert(error.response.data.message);
            }
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        if(id!='nuevo'){
            await axios.put(`${process.env.NEXT_PUBLIC_SERVIDOR}/alumno/update/${id}`,Object.fromEntries(form))
            .then(function (response) {
                router.push('/alumnos');
            })
            .catch(function (error) {
                console.log(error);
                if(error.response){
                    alert(error.response.data.message);
                }
            })
        }else{
            await axios.post(`${process.env.NEXT_PUBLIC_SERVIDOR}/alumno`,Object.fromEntries(form))
            .then(function (response) {
                router.push('/alumnos');
            })
            .catch(function (error) {
                console.log(error);
                if(error.response){
                    alert(error.response.data.message);
                }
            })
        }
    }
  
    useEffect(() => {
        if(id!='nuevo'){
            getalumno()
        }
    }, [])

    return  (
        <main>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
        <Card style={{width:450}}>
            <CardHeader title={id=='nuevo' ? "Nuevo Alumno" : "Modificar Alumno"} style={{textAlign:"center"}}/>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">RUT</Typography>
                            <OutlinedInput
                                type="text"
                                name="rut"
                                id="rut"
                                defaultValue ={alumno?.rut}
                                aria-describedby="rut"
                                inputProps={{
                                'aria-label': 'rut',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Nombre</Typography>
                            <OutlinedInput
                                type="text"
                                name="nombre"
                                id="nombre"
                                defaultValue ={alumno?.nombre}
                                aria-describedby="nombre"
                                inputProps={{
                                'aria-label': 'nombre',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Apellido</Typography>
                            <OutlinedInput
                                type="text"
                                name="apellido"
                                id="apellido"
                                defaultValue ={alumno?.apellido}
                                aria-describedby="apellido"
                                inputProps={{
                                'aria-label': 'apellido',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Numero</Typography>
                            <OutlinedInput
                                type="text"
                                name="numero"
                                id="numero"
                                defaultValue ={alumno?.numero}
                                aria-describedby="numero"
                                inputProps={{
                                'aria-label': 'numero',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Correo</Typography>
                            <OutlinedInput
                                type="email"
                                name="correo"
                                id="correo"
                                defaultValue ={alumno?.correo}
                                aria-describedby="correo"
                                inputProps={{
                                'aria-label': 'correo',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Carrera</Typography>
                            <NativeSelect
                                id="carrera"
                                name="carrera"
                            >
                                <option  value="665ee8bb1421aa408c60320d" selected={alumno?.carrera=="665ee8bb1421aa408c60320d" ? 'selected' : ''}>IECI</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Estatus</Typography>
                            <NativeSelect
                                id="status"
                                name="status"
                            >
                                <option  value={"Regular"} selected={alumno?.status=="Regular" ? 'selected' : ''}>Regular</option>
                                <option  value={"Irregular"} selected={alumno?.status=="Irregular" ? 'selected' : ''}>Irregular</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                        <Button type="submit" variant="outlined" startIcon={<Send/>} size="large">
                            Guardar Datos
                        </Button>
                </CardActions>
            </form>
        </Card>
    </Grid>
    </main>
    )
}