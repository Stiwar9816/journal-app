import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0097A7',
        },
        secondary: {
            main: '#E91E63'
        },
        error: {
            main: red.A400
        }
    }
})