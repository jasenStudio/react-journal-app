import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import {startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useDispatch, useSelector  } from "react-redux";
import { useMemo } from "react";

const formData = {
  
    email:'',
    password:''
  
}

export const LoginPage = () => {

  const { status,errorMessage } = useSelector( state => state.auth );

  const { email,password, onInputChange,formState} = useForm(formData)


  const isAuthenticating = useMemo(()=> status === 'checking',[status])

  const dispatch = useDispatch();

  const onSubmit = ( event ) =>{
    event.preventDefault();
    

    dispatch(startLoginWithEmailPassword(formState));
    // console.log( {formState} );
  }

  const onGoogleSignIn = () => {

    dispatch( startGoogleSignIn() );
    console.log('google')
  }

  return (
    <AuthLayout titulo="Login">
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn  animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              value={ email }
              name="email"
              placeholder="correo@google.com"
              onChange={ onInputChange }
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              value={ password }
              name="password"
              onChange={ onInputChange }
              placeholder="contraseña"
              fullWidth
            />
          </Grid>

          {/* contenedor de botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

          <Grid item xs={12} display={ !!errorMessage ? '' : 'none'} >
            <Alert severity="error">{ errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button type="submit"
              disabled={ isAuthenticating }
              variant="contained" fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
              disabled={ isAuthenticating }
              onClick={ onGoogleSignIn }
              variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}> Google</Typography>
              </Button>
            </Grid>
          </Grid>
          {/* contenedor de botones */}

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
