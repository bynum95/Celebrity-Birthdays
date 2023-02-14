import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Box } from "@mui/system";
import BirthdayManager from "../birthday-manager";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {GridColDef, GridRowsProp} from "@mui/x-data-grid";

const theme = createTheme({
    palette: {
        primary: {
            main: "rgba(204, 100, 2, 1)",
            light: "rgba(204, 100, 2, 0.3)",
        },
        secondary: {
            main: "rgba(50, 54, 67, 1)",
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
                        fontFamily: "'Outfit'",
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
                        fontFamily: "'Outfit'",
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
const row: GridRowsProp = [{}];
const totalRow: GridRowsProp = [{}];
const columns: GridColDef[] = [{field: '' }];
const totalColumn: GridColDef[] = [{field: ''}];
export default {
    component: BirthdayManager,
} as ComponentMeta<typeof BirthdayManager>;

const Template: ComponentStory<typeof BirthdayManager> = (args) => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'background.default',
                    height: '53rem'
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