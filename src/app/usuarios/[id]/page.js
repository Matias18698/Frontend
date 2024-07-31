'use client';
import { Card,CardHeader,CardContent,Box,FormControl,Typography,OutlinedInput,CardActions,Button,NativeSelect,Grid } from "@mui/material";
import {Send} from '@mui/icons-material'
import { useEffect,useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'



export default function Page({params}) {
    const id = params?.id;
    
    const [user, setuser] = useState([]);
    const router = useRouter();
  
    const getuser = async () => {
        
        await axios.get(`${process.env.NEXT_PUBLIC_SERVIDOR}/user/search/${id}`)
        .then(function (response) {
            setuser(response.data)
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
            await axios.put(`${process.env.NEXT_PUBLIC_SERVIDOR}/user/update/${id}`,Object.fromEntries(form))
            .then(function (response) {
                router.push('/usuarios');
            })
            .catch(function (error) {
                console.log(error);
                if(error.response){
                    alert(error.response.data.message);
                }
            })
        }else{
            await axios.post(`${process.env.NEXT_PUBLIC_SERVIDOR}/user`,Object.fromEntries(form))
            .then(function (response) {
                router.push('/usuarios');
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
            getuser()
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
            <CardHeader title={id=='nuevo' ? "Nuevo user" : "Modificar user"} style={{textAlign:"center"}}/>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">RUT</Typography>
                            <OutlinedInput
                                type="text"
                                name="rut"
                                id="rut"
                                defaultValue ={user?.rut}
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
                                defaultValue ={user?.nombre}
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
                                defaultValue ={user?.apellido}
                                aria-describedby="apellido"
                                inputProps={{
                                'aria-label': 'apellido',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Correo</Typography>
                            <OutlinedInput
                                type="text"
                                name="correo"
                                id="correo"
                                defaultValue ={user?.correo}
                                aria-describedby="correo"
                                inputProps={{
                                'aria-label': 'correo',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Contraseña</Typography>
                            <OutlinedInput
                                type="password"
                                name="password"
                                id="password"
                                defaultValue ={user?.password}
                                aria-describedby="password"
                                inputProps={{
                                'aria-label': 'password',
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
                                <option  value="665ee8bb1421aa408c60320d" selected={user?.carrera=="665ee8bb1421aa408c60320d" ? 'selected' : ''}>IECI</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Rol</Typography>
                            <NativeSelect
                                id="rol"
                                name="rol"
                            >
                                <option  value={"Admin"} selected={user?.status=="Admin" ? 'selected' : ''}>Admin</option>
                                <option  value={"Alumno"} selected={user?.status=="Alumno" ? 'selected' : ''}>Alumno</option>
                                <option  value={"Miembro CEE"} selected={user?.status=="Miembro CEE" ? 'selected' : ''}>Miembro CEE</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Status</Typography>
                            <NativeSelect
                                id="status"
                                name="status"
                            >
                                <option  value={"Regular"} selected={user?.status=="Regular" ? 'selected' : ''}>Regular</option>
                                <option  value={"No regular"} selected={user?.status=="No regular" ? 'selected' : ''}>No regular</option>
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