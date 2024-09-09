import { Box } from "@mui/material"
import { Navbar, Sidebar } from "../components"

const drawerWidth = 240
export const JournalLayout = ({ children }) => {
    return (
        <Box className='animate__animated animate__fadeIn animate__faster' component="section" sx={{ display: 'flex' }}>
            {/* Navbar */}
            <Navbar drawerWidth={drawerWidth} />

            {/* Sidebar */}
            <Sidebar drawerWidth={drawerWidth} />

            <Box component={'main'} sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                {/* Toolbar */}
                {children}
            </Box>
        </Box>
    )
}
