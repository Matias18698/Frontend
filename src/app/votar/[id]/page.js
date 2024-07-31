'use client';
import { Card,CardHeader,CardContent,Box,FormControl,Typography,CardActions,Button,NativeSelect,Grid } from "@mui/material";
import {Send} from '@mui/icons-material'
import { useEffect,useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function Page({params}) {
    const id = params?.id;
    const [votacion, setvotacion] = useState({});
    const router = useRouter();
  
    const getvotacion = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_SERVIDOR}/votacion/search/${id}`)
        .then(function (response) {
            setvotacion(response.data);
        })
        .catch(function (error) {
            console.log(error);
            if(error.response){
                alert(error.response.data.message);
            }
        })
    }

    const contentOptions = ()=>{
        return votacion.opciones?.split(",").map(((opcion,index) => {
            return (
                <option key={index}  value={opcion}>{opcion}</option>
            )
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const jsonsession = JSON.parse(sessionStorage.getItem('asamblea-sesion-id'));
        form.append('alumno',jsonsession._id);
        await axios.post(`${process.env.NEXT_PUBLIC_SERVIDOR}/votar/${id}`,Object.fromEntries(form))
        .then(function (response) {
            router.push('/votaciones');
        })
        .catch(function (error) {
            console.log(error);
            if(error.response){
                alert(error.response.data.message);
            }
        });
    }
  
    useEffect(() => {
        getvotacion()
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
                            <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Voto</Typography>
                            <NativeSelect
                                id="opcion"
                                name="opcion"
                                defaultValue=""
                            >
                                <option  value="">Seleccionar Voto</option>
                                {contentOptions()}
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