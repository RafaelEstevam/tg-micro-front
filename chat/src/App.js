import React from "react";
import { useSelector } from 'react-redux';
import { ChatBar } from './components/chatBar.component';

import GlobalStyle from './styles/global';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { COLORS } from './styles/colors';

const theme = createTheme({
    palette: {
        success: {
            main: "#bac778",
        },
        primary: {
            main: COLORS.primary,
        },
        secondary: {
            main: COLORS.secondary,
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
            dark: "rgb(152, 39, 45)",
            light: "rgb(225, 96, 103)"
        },
    },
    typography: {
        fontSize: 12,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

const App = () => {

    const accessibility = useSelector(state => state.accessibility);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle theme={accessibility} />
            <ChatBar />
        </ThemeProvider>
    )
}

export default App;