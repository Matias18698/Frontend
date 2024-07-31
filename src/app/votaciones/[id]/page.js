'use client';
import { Card,CardHeader,CardContent,Box,FormControl,Typography,OutlinedInput,CardActions,Button,NativeSelect,Grid } from "@mui/material";
import {Send} from '@mui/icons-material'
import { useEffect,useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function Page({params}) {
    const id = params?.id;
    
    const [votacion, setvotacion] = useState({});
    const [asambleas, setasambleas] = useState([]);
    const router = useRouter();
  
    const getvotacion = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_SERVIDOR}/votacion/search/${id}`)
        .then(function (response) {
            setvotacion(response.data)
        })
        .catch(function (error) {
            console.log(error);
            if(error.response){
                alert(error.response.data.message);
            }
        })
    }

    const getAsambleas = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_SERVIDOR}/asambleas`)
        .then(function (response) {
            setasambleas(response.data)
        })
        .catch(function (error) {
            console.log(error);
            if(error.response){
                alert(error.response.data.message);
            }
        })
    }

    const contentOptions = ()=>{
        return asambleas.map((asamblea => {
            return (
                <option key={asamblea._id}  value={asamblea._id} selected={votacion?.asamblea==asamblea._id ? 'selected' : ''}>{asamblea.titulo_asamblea}</option>
            )
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        if(id!='nuevo'){
            await axios.put(`${process.env.NEXT_PUBLIC_SERVIDOR}/votacion/update/${id}`,Object.fromEntries(form))
            .then(function (response) {
                router.push('/votaciones');
            })
            .catch(function (error) {
                console.log(error);
                if(error.response){
                    alert(error.response.data.message);
                }
            })
        }else{
            await axios.post(`${process.env.NEXT_PUBLIC_SERVIDOR}/votacion`,Object.fromEntries(form))
            .then(function (response) {
                router.push('/votaciones');
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
        getAsambleas()
        if(id!='nuevo'){
            getvotacion()
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
            <CardHeader title={id=='nuevo' ? "Nuevo Votacion" : "Modificar Votacion"} style={{textAlign:"center"}}/>
            <form onSubmit={handleSubmit}>
                <CardContent>                    
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Asamblea</Typography>
                            <NativeSelect
                                id="asamblea"
                                name="asamblea"
                                defaultValue=""
                                disabled={id!='nuevo' ? 'disabled' : ''}
                            >
                                <option  value="">Seleccionar asamblea</option>
                                {contentOptions()}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Titulo</Typography>
                            <OutlinedInput
                                type="text"
                                name="titulo"
                                id="titulo"
                                defaultValue ={votacion?.titulo}
                                aria-describedby="titulo"
                                inputProps={{
                                'aria-label': 'titulo',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Descripción</Typography>
                            <OutlinedInput
                                type="text"
                                name="descripcion"
                                id="descripcion"
                                defaultValue ={votacion?.descripcion}
                                aria-describedby="descripcion"
                                inputProps={{
                                'aria-label': 'descripcion',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Opciones</Typography>
                            <OutlinedInput
                                type="text"
                                name="opciones"
                                id="opciones"
                                defaultValue ={votacion?.opciones}
                                aria-describedby="opciones"
                                inputProps={{
                                'aria-label': 'opciones',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Estatus</Typography>
                            <NativeSelect
                                id="status"
                                name="status"
                            >
                                <option  value={"Activa"} selected={votacion?.status=="Activa" ? 'selected' : ''}>Activa</option>
                                <option  value={"Inactiva"} selected={votacion?.status=="Inactiva" ? 'selected' : ''}>Inactiva</option>
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