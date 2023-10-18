import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email:'',
  password:'',
  displayName: ''
}

const formValidations = {
  email:       [ (value)=> value.includes('@') ,'El correo debe tener un arroba @'],
  password:    [ (value)=> value.length >= 6   ,'El contraseña debe de tener mas de 6 caracteres'],
  displayName: [ (value)=> value.length >= 1   ,'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const  dispatch = useDispatch();


  const { formState, displayName,email,password, onInputChange,
          isFormValid ,displayNameValid,emailValid,passwordValid
        } = useForm( formData , formValidations )


  const { status,errorMessage } = useSelector( state => state.auth)
  const isCheckingAuthentication = useMemo( ()=> status === 'checking', [status] )



  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if( !isFormValid ) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
    
  
  }
  
  return (
    <AuthLayout titulo="Registrar">
      {/* <h1>FormValid{ isFormValid ? ' valido' : ' incorrecto' }</h1> */}
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn  animate__faster">
        <Grid container>


        <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              placeholder="John Doe"
              error={ !!displayNameValid && formSubmitted }
              helperText={displayNameValid}
              fullWidth 
            />
          </Grid>




          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              value={ email }
              onChange={ onInputChange }
              placeholder="correo@google.com"
              error={ !!emailValid && formSubmitted }
              helperText={emailValid}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              value={ password }
              onChange={ onInputChange }
              placeholder="contraseña"
              fullWidth
              error={ !!passwordValid && formSubmitted }
              helperText={passwordValid}
            />
          </Grid>

          {/* contenedor de botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={ !!errorMessage ? '' : 'none'} >
            <Alert severity="error">{ errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} >
              <Button 
                      disabled={ isCheckingAuthentication}
                      variant="contained" 
                      type="submit" fullWidth>
                Crear
              </Button>
            </Grid>
          </Grid>
          {/* contenedor de botones */}

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1}}>¿ Ya tienes una cuenta ?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
             Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

