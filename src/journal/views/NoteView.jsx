import { useMemo, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { SaveOutlined, UploadOutlined, DeleteOutline } from "@mui/icons-material"
import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { setActiveNote, startUploadingFiles, startSavingNote, startDeletingNote } from "../../store"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"

export const NoteView = () => {
    const dispatch = useDispatch()
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
    const { title, body, date, onInputChange, formState } = useForm(note)
    const dateString = useMemo(() => {
        const newDate = new Date(date).toLocaleDateString()
        return newDate
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }
    return (
        <>
            <Grid2 className='animate__animated animate__fadeIn animate__faster' container direction={"row"} justifyContent={"space-between"} alignContent={"center"} sx={{ mb: 1, mt: 2 }}>
                <Grid2>
                    <Typography fontSize={28} fontWeight={"ligth"}>Fecha de creación: {dateString}</Typography>
                </Grid2>

                <Grid2>
                    <input type="file" ref={fileInputRef} multiple onChange={onFileInputChange} style={{ display: 'none' }} />
                    <IconButton color="primary.main" onClick={() => fileInputRef.current.click()} disabled={isSaving}>
                        <UploadOutlined />
                    </IconButton>
                    <Button onClick={onSaveNote} color="primary.main" variant="text" sx={{ p: 1 }}>
                        <SaveOutlined sx={{ fontSize: 24, mr: 1 }} />
                        Guardar
                    </Button>
                    <Button onClick={onDelete} sx={{ my: 2 }} color="error" variant="text">
                        <DeleteOutline />
                        Borrar
                    </Button>
                </Grid2>
            </Grid2>
            <Grid2 container className='animate__animated animate__fadeIn animate__faster'>
                <TextField
                    type="text"
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', my: 1 }}
                    fullWidth
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    multiline
                    placeholder="¿Qué sucedió hoy?"
                    sx={{ border: 'none', my: 1 }}
                    fullWidth
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid2>

            {/* Image Gallery */}
            < ImageGallery images={note.imageUrls} />
        </>
    )
}
