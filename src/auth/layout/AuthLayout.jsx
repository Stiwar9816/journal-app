import { Grid2, Typography } from "@mui/material"

export const AuthLayout = ({ title = 'Title form', children }) => {
    return (
        <Grid2
            container
            spacing={0}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid2
                className='box-shadow'
                sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, width: { md: 450 } }}
            >
                <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>{title}</Typography>
                {children}
            </Grid2>
        </Grid2>
    )
}
