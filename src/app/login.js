'use client';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import {Lock, Key, Send} from '@mui/icons-material'
import Box from "@mui/material/Box";
import axios from 'axios';

const handleSubmit = async (e)=>{
    e.preventDefault();
    const form = new FormData(e.target);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVIDOR}/sessionStart`,Object.fromEntries(form));
    if (response.data._id) {
        sessionStorage.setItem("asamblea-sesion-id", JSON.stringify(response.data));
        window.location.reload();
    } else {
        return false
    }
}

export default function Login() {
    
    return (
        <main>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            >
                <Card>
                    <CardHeader title="Asamblea CEE" style={{textAlign:"center"}}>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Box sx={{mb:3}}>
                                <FormControl sx={{width: '100%' }} variant="outlined">
                                    <Typography component='div' fontWeight="fontWeightMedium" fontSize="1.2rem">Usuario</Typography>
                                    <OutlinedInput
                                        type="text"
                                        name="rut"
                                        id="rut"
                                        startAdornment={<InputAdornment position="start"><Lock/></InputAdornment>}
                                        aria-describedby="rut"
                                        inputProps={{
                                        'aria-label': 'rut',
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
                                        startAdornment={<InputAdornment position="start"><Key></Key></InputAdornment>}
                                        aria-describedby="password"
                                        inputProps={{
                                        'aria-label': 'password',
                                        }}
                                    />
                                </FormControl>
                            </Box>
                        </CardContent>
                        <CardActions style={{justifyContent: 'center'}}>
                                <Button type="submit" variant="outlined" startIcon={<Send/>} size="large">
                                    Iniciar Sesión
                                </Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid>
        </main>
    );
}
