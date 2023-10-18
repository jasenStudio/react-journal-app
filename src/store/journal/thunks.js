import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote,savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";
import { loadNotes } from "../../helpers";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {

    return async ( dispatch ,getState) => {

        console.log( getState() );

        dispatch( savingNewNote());

        const {uid} = getState().auth;
        console.log(uid);
        console.log('startNewNote');

        const newNote = {
            title:'',
            body:'',
            date:new Date().getTime()
        }

        const newDoc = doc( collection(firebaseDB,`${uid}/journal/notes`) );
        const setDocResp =  await setDoc( newDoc,newNote);

        newNote.id = newDoc.id

        dispatch( addNewEmptyNote(newNote));
        dispatch(   setActiveNote(newNote));
        

       
    }

}

export const startLoadingNotes = () => {
    return  async( dispatch,getState ) => {
        const {uid} = getState().auth;
        if( !uid ) throw new Error('El id del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch( setNotes(notes) );
        // console.log( notes );
    }
}


export const startSaveNote =  () => {

    return async ( dispatch,getState ) => {

        dispatch( setSaving() );

        const  {uid}        = getState().auth;
        const  {active:note}= getState().journal;

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        // console.log(noteToFireStore);

        const docRef = doc( firebaseDB,`${uid}/journal/notes/${note.id}`);
        await setDoc(docRef,noteToFireStore,{merge:true});

        dispatch( updateNote(note));

    }
}

export const startUploadingFiles = ( files = [] ) => {

    return async(dispatch) => {
        dispatch(setSaving())

        // await fileUpload( files[0]) ;
        const fileUploadPromises = [];

        for (const file of files){
            fileUploadPromises.push( fileUpload(file) )
        }

        const photoUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote(photoUrls) )

    }
}


export const startDeletingNote = () => {
    return async ( dispatch,getState) => {


        const  {uid}        = getState().auth;
        const  {active:note}= getState().journal;

        console.log({uid,note});

        const docRef = doc( firebaseDB,`${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);


        dispatch( deleteNoteById(note.id))


    }

}