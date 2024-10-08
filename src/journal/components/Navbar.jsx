import { useDispatch } from "react-redux"
import { AppBar, Grid2, IconButton, Toolbar, Typography } from "@mui/material"
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material"
import { startLogout } from "../../store/auth"

export const Navbar = ({ drawerWidth = 240 }) => {
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(startLogout())
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton color="inherit" edge='start' sx={{
                    mr: 2,
                    display: { sm: 'none' }
                }}>
                    <MenuOutlined />
                </IconButton>
                <Grid2 container direction={'row'} justifycontent={'space-between'} alignItems={"center"}>
                    <Typography variant="h6" noWrap component={'div'}>Journal App</Typography>
                    <IconButton onClick={onLogout}>
                        <LogoutOutlined color="error" />
                    </IconButton>
                </Grid2>
            </Toolbar>
        </AppBar>
    )
}
