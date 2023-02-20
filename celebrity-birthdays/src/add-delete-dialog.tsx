import {GridValidRowModel} from "@mui/x-data-grid";
import * as React from "react";
import * as dayjs from "dayjs";
import {Stack, TextFieldProps} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

export function AddDeleteDialog(props: {
    open: boolean, onClose: () => void,
    selectedRow: GridValidRowModel | undefined, onClick: () => void, open1: boolean, newBirthday: string,
    helperText: string, onChange: (newValue: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onChange1: (newValue: (dayjs.Dayjs | null)) => void, value: dayjs.Dayjs | null,
    renderInput: (params: TextFieldProps) => JSX.Element, onChange2: (newValue: (dayjs.Dayjs | null)) => void,
    value1: dayjs.Dayjs | null, onClick1: () => void
}) {
    return <>
        <Dialog
            PaperProps={{
                sx: {
                    maxWidth: 300,
                    verticalAlign: "middle",
                    fontFamily: "cursive"
                }
            }}
            open={props.open} onClose={props.onClose}>
            <DialogTitle sx={{fontFamily: "cursive"}}>Delete Birthday</DialogTitle>
            <DialogContent>
                <div>
                    <TextField sx={{
                        "& .MuiFormLabel-root": {
                            color: "primary.main",
                            fontFamily: "cursive"
                        },
                        maxWidth: 400
                    }
                    }
                               disabled
                               margin="dense"
                               id="standard"
                               label="Celebrity Name"
                               defaultValue={props.selectedRow?.["row"].CelebrityName}
                               fullWidth
                               variant="standard"
                    />
                    <TextField sx={{
                        "& .MuiFormLabel-root": {
                            color: "primary.main",
                            fontFamily: "cursive"
                        },
                        maxWidth: 400
                    }
                    }
                               disabled
                               margin="dense"
                               id="outlined"
                               label="Birthday Date"
                               defaultValue={props.selectedRow?.["row"].BirthdayDate}
                               fullWidth
                               variant="outlined"
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <CalendarMonthIcon/>
                                       </InputAdornment>
                                   )
                               }
                               }
                    />
                    <TextField sx={{
                        "& .MuiFormLabel-root": {
                            color: "primary.main",
                            fontFamily: "cursive"
                        },
                        maxWidth: 400
                    }
                    }
                               disabled
                               margin="dense"
                               id="outlined"
                               label="Departure Day"
                               defaultValue={props.selectedRow?.["row"].DepartureDay}
                               fullWidth
                               variant="outlined"
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <CalendarMonthIcon/>
                                       </InputAdornment>
                                   )
                               }
                               }
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={props.onClick}
                >Delete
                </Button>
                <Button variant="contained" onClick={props.onClose} background-color='#40514E'
                        color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={props.open1} onClose={props.onClose}>
            <DialogTitle sx={{fontFamily: "cursive"}}>Create New Birthday</DialogTitle>
            <DialogContent>
                <TextField sx={{
                    "& .MuiFormLabel-root": {
                        color: "primary.main",
                        fontFamily: "cursive"
                    }
                }
                } error={props.newBirthday.length < 4}
                           helperText={props.helperText}
                           margin="dense"
                           id="celebrity-name"
                           label="Celebrity Name"
                           placeholder="Start typing"
                           type="search"
                           fullWidth
                           variant="standard"
                           onChange={props.onChange}
                />
                <LocalizationProvider sx={{fontFamily: "cursive"}} dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            components={{
                                OpenPickerIcon: CalendarMonthIcon
                            }
                            }
                            label="Birthday Date"
                            inputFormat="MM/DD/YYYY"
                            onChange={props.onChange1}
                            value={props.value}
                            renderInput={props.renderInput}
                        />
                        <DesktopDatePicker
                            components={{
                                OpenPickerIcon: CalendarMonthIcon
                            }
                            }
                            label="Departure Day"
                            inputFormat="MM/DD/YYYY"
                            onChange={props.onChange2}
                            value={props.value1}
                            renderInput={props.renderInput}
                        />
                    </Stack>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button data-testid="save" variant="contained" onClick={props.onClick1}>Save</Button>
                <Button variant="contained" onClick={props.onClose} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    </>;
}
