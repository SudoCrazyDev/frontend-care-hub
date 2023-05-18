import { createTheme } from "@mui/material/styles";

const globalTheme = createTheme({
    palette: {
        primary: {
            light: '#88d8f3',
            main: '#2fb0ea',
            dark: '#155e93',
            contrastText: '#fff',
        },
    }
});

export default globalTheme;