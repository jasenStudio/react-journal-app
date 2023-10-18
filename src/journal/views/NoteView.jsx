import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImagesGallery } from "../components"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"

import 'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved,isSaving} = useSelector( state => state.journal );

    const { title,body,formState,onInputChange,date} = useForm( note);

    const dateString = useMemo(()=>{
            const newDate = new Date( date );
            
        return  newDate.toUTCString();

    },[date])

    useEffect(() => {
      
        dispatch( setActiveNote(formState))

    }, [formState])

    useEffect(() => {
      
        if( messageSaved.length > 0 ){
            Swal.fire('Nota Actualizada',messageSaved,'success');
        }
        

    }, [messageSaved])


    const fileInput = useRef();


    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({target}) => {

        if( target.files === 0) return;

        // console.log('subiendo archivos');
        // console.log(target.files)

        dispatch( startUploadingFiles( target.files ));

    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }
    

  return (
   

    <Grid container direction='row' justifyContent='space-between' sx={{ mb:1}} className="animate__animated animate__fadeIn  animate__faster">

        <Grid item>
            <Typography fontSize={39} fontWeight={'light'}>
                {dateString}
            </Typography>
        </Grid>


        <Grid item> 
            <input 
            type="file"
            multiple 
            ref={ fileInput }
            onChange={ onFileInputChange }
            style={{ display:'none'}}
            />

            <IconButton 
                    color="primary" 
                    disabled={isSaving}
                    onClick={ ()=> fileInput.current.click() }
            >
                <UploadOutlined />
            </IconButton>

            <Button 
            disabled={isSaving}
                    onClick={ onSaveNote }
                    color="primary" 
                    sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize:30, mr: 1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                name="title"
                value={ title }
                onChange={ onInputChange }
                sx={{ border: 'none', mb: 1 }}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿  Que sucedío hoy?"
                label="Titulo"
                name="body"
                value={ body }
                onChange={ onInputChange }
                minRows={ 5 }
            
            /> 

        </Grid>

        <Grid container justifyContent='end'>
            <Button
            onClick={ onDelete }
            sx={{mt:2}}
            color="error"
            >

                <DeleteOutline />
    Borrar
            </Button>
          
        </Grid>
{
    !!note.imageUrls ?  <ImagesGallery images={ note.imageUrls }/> : '' 
}
       

    </Grid>

  )
}
