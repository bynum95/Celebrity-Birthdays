import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Box } from "@mui/system";
import BirthdayManager from "../birthday-manager";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import React from "react";


const theme = createTheme({
    palette: {
        primary: {
            main: "#11999E",
            light: "rgba(204, 100, 2, 0.3)",
        },
        secondary: {
            main: "#40514E",
        },
        text: {
            primary: "#141414",
            secondary: "#F1F1F1",
        },
        background: {
            default: "#F1F1F1",
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: {variant: "contained", color: "primary"},
                    style: ({theme}) => ({
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.text.primary,
                        fontFamily: "cursive",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0.46px",
                        textTransform: "uppercase",
                        flex: "none",
                        order: 0,
                        flexGrow: 0,
                    }),
                },
                {
                    props: {variant: "contained", color: "secondary"},
                    style: ({theme}) => ({
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.text.secondary,
                        fontFamily: "cursive",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0.46px",
                        textTransform: "uppercase",
                        flex: "none",
                        order: 0,
                        flexGrow: 0,
                    }),
                },
            ],
        },
    },
});

export default {
    component: BirthdayManager,
} as ComponentMeta<typeof BirthdayManager>;

const Template: ComponentStory<typeof BirthdayManager> = (args) => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{

                    borderRadius: 1,
                    borderColor: '#40514E',
                    height: '53rem',
                    backgroundColor: '#E4F9F5',
                    borderBlock: 'auto'
                }}>
                <BirthdayManager/>
            </Box>
        </ThemeProvider>
    )
}
export const Primary = Template.bind({});
Primary.args = {
    title: 'Birthday Manager'
};