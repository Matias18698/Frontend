'use client';
import { Card,CardHeader,CardContent,Box,FormControl,Typography,OutlinedInput,CardActions,Button,NativeSelect,Grid } from "@mui/material";
import {Send} from '@mui/icons-material'
import { useEffect,useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'



export default function Page({params}) {
    const id = params?.id;
    
    const [asamblea, setasamblea] = useState([]);
    const router = useRouter();
  
    const getasamblea = async () => {
        
        await axios.get(`${process.env.NEXT_PUBLIC_SERVIDOR}/asamblea/search/${id}`)
        .then(function (response) {
            setasamblea(response.data)
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
            await axios.put(`${process.env.NEXT_PUBLIC_SERVIDOR}/asamblea/update/${id}`,Object.fromEntries(form))
            .then(function (response) {
                router.push('/asambleas');
            })
            .catch(function (error) {
                console.log(error);
                if(error.response){
                    alert(error.response.data.message);
                }
            })
        }else{
            await axios.post(`${process.env.NEXT_PUBLIC_SERVIDOR}/asamblea`,Object.fromEntries(form))
            .then(function (response) {
                router.push('/asambleas');
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
        if(id!='nueva'){
            getasamblea()
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
            <CardHeader title={id=='nuevo' ? "Nueva asamblea" : "Modificar asamblea"} style={{textAlign:"center"}}/>
            <form onSubmit={handleSubmit}>
                <CardContent>

                    
                <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Fecha inicio</Typography>
                            <OutlinedInput
                                type="date"
                                name="fecha_inicio"
                                id="fecha_inicio"
                                defaultValue ={asamblea?.fecha_inicio}
                                aria-describedby="fecha_inicio"
                                inputProps={{
                                'aria-label': 'fecha_inicio',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Fecha fin</Typography>
                            <OutlinedInput
                                type="date"
                                name="fecha_fin"
                                id="fecha_fin"
                                defaultValue ={asamblea?.fecha_fin}
                                aria-describedby="fecha_fin"
                                inputProps={{
                                'aria-label': 'fecha_fin',
                                }}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Titulo Asamblea</Typography>
                            <OutlinedInput
                                type="text"
                                name="titulo_asamblea"
                                id="titulo_asamblea"
                                defaultValue ={asamblea?.titulo_asamblea}
                                aria-describedby="titulo_asamblea"
                                inputProps={{
                                'aria-label': 'titulo_asamblea',
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{mb:3}}>
                        <FormControl sx={{width: '100%' }} variant="outlined">
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">descripcion</Typography>
                            <OutlinedInput
                                type="text"
                                name="descripcion"
                                id="descripcion"
                                defaultValue ={asamblea?.descripcion}
                                aria-describedby="descripcion"
                                inputProps={{
                                'aria-label': 'descripcion',
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
                                <option  value={"Activa"} selected={asamblea?.status=="Activa" ? 'selected' : ''}>Activa</option>
                                <option  value={"Inactiva"} selected={asamblea?.status=="Inactiva" ? 'selected' : ''}>Inactiva</option>
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