import { useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store"

export const AddButton = ({ isSaving }) => {
    const dispatch = useDispatch()
    const onNewNote = () => {
        dispatch(startNewNote())
    }
    return (
        <IconButton
            onClick={onNewNote}
            disabled={isSaving}
            size="large"
            sx={{
                color: "white",
                backgroundColor: "error.main",
                ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                position: "fixed",
                right: 50,
                bottom: 50
            }}
        >
            <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
    )
}
