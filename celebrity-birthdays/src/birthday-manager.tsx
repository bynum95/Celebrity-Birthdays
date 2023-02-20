import {DataGrid, GridColDef, GridInputSelectionModel, GridRowModel, GridRowsProp} from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import {Box} from "@mui/system";
import {IconButton, Menu, MenuItem, TextFieldProps} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {AddDeleteDialog} from "./add-delete-dialog";
import {CSSTransition, TransitionGroup} from "react-transition-group";

interface BirthdayInfo {
    id: string,
    CelebrityName: string,
    BirthdayDate: string,
    DepartureDay: string
}

interface BasicMenuInput {
    addCallback: () => void
    deleteCallback: () => void
}

export function BasicMenu({addCallback, deleteCallback}: BasicMenuInput) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    addCallback()}}>Add Birthday</MenuItem>
                <MenuItem onClick={
                    () => {
                        handleClose();
                        deleteCallback();
                    }
                }>Delete Birthdays</MenuItem>
            </Menu>
        </div>
    );
}

export default function BirthdayManager()

{

    const defaultBirthdays: BirthdayInfo[] = JSON.parse(JSON.stringify([
            {
                "id": "1",
                "CelebrityName": "Beyonce",
                "BirthdayDate": "09/04/1981",
                "DepartureDay": ""
            },
            {
                "id": "2",
                "CelebrityName": "Martin Luther King Jr.",
                "BirthdayDate": "1/15/1929",
                "DepartureDay": "4/04/1968"
            },
            {
                "id": "3",
                "CelebrityName": "Maya Angelou",
                "BirthdayDate": "4/04/1928",
                "DepartureDay": "5/28/2014"
            },
            {
                "id": "4",
                "CelebrityName": "Marvin Gaye",
                "BirthdayDate": "4/02/1939",
                "DepartureDay": "4/01/1984"
            },
            {
                "id": "5",
                "CelebrityName": "Jean-Michel Basquiat",
                "BirthdayDate": "12/22/1960",
                "DepartureDay": "8/12/1988"
            },
            {
                "id": "6",
                "CelebrityName": "Serena Williams",
                "BirthdayDate": "9/26/1981",
                "DepartureDay": ""
            },
            {
                "id": "7",
                "CelebrityName": "Tupac Shakur",
                "BirthdayDate": "6/16/1971",
                "DepartureDay": "9/13/1996"
            },
            {
                "id": "8",
                "CelebrityName": "Malcolm x",
                "BirthdayDate": "5/19/1925",
                "DepartureDay": "2/21/1965"
            },
            {
                "id": "9",
                "CelebrityName": "Madam C.J. Walker",
                "BirthdayDate": "12/23/1867",
                "DepartureDay": "5/25/1919"
            },
            {
                "id": "10",
                "CelebrityName": "Barack Obama",
                "BirthdayDate": "8/04/1961",
                "DepartureDay": ""
            },
            {
                "id": "11",
                "CelebrityName": "Nelson Mandela",
                "BirthdayDate": "7/18/1918",
                "DepartureDay": "12/05/2013"
            },
            {
                "id": "12",
                "CelebrityName": "Billie Holiday",
                "BirthdayDate": "4/07/1915",
                "DepartureDay": "7/17/1959"
            },
            {
                "id": "13",
                "CelebrityName": "Sam Cooke",
                "BirthdayDate": "1/22/1931",
                "DepartureDay": "12/11/1964"
            }
        ]
    ));

    const totalRow: GridRowsProp = [{id: 1, TotalCompanyHolidays: 'total holiday amount', width: 'flex'}];

    const row: GridRowsProp = [...defaultBirthdays];

    //keep track of rows for deleting
    const [rows, setRows] = useState([...row]);
    const [selectedRow, setSelectedRow] = useState<GridRowModel>();
    //state for delete overlay open
    const [openDelete, setOpenDelete] = useState(false);
    const [selectionModel, setSelectionModel] = useState<GridInputSelectionModel>([]);
    //add overlay open
    const [openAdd, setOpenAdd] = useState(false);

    //state for holiday date pickers
    const [birthdayDate, setBirthdayDate] = useState<Dayjs | null>(
        dayjs('2022/09/28T21:11:54')
    );
    const [actualDate, setActualDate] = useState<Dayjs | null>(
        dayjs('2022-09-28T21:11:54')
    );
    const [newBirthday, setNewBirthday] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (newBirthday.length > 4) {
            setErrorMessage('');
        }
    }, [newBirthday, errorMessage]);

    useEffect(() => {
        if (newBirthday.length < 4) {
            setErrorMessage('Holiday name has less than 4 characters');
        }
    }, [newBirthday]);

    const handleBirthdayChange = (newValue: Dayjs | null ) => {
        setBirthdayDate(newValue);
    }

    const handleActualChange = (newValue: Dayjs | null ) => {
        setActualDate(newValue);
    }

    const handleClose = () => {
        setOpenDelete(false);
        setOpenAdd(false);
    };

    const handleDelete = (row: GridRowModel) => {
        setOpenDelete(true);
        setSelectedRow({...row});
    }

    const handleDeleteClickOpen = () => {
        setOpenDelete(true);
    };

    const handleAddClickOpen: () => void = () => {
        setOpenAdd(true);
    };

    const handleAddClick = () => {
        // const key: number = rows.length + 1;
        const key: number = Math.floor(Math.random() * 100) + 13;
        const newRow: GridRowModel = {
            id: key,
            CelebrityName: newBirthday,
            BirthdayDate: birthdayDate?.format('MM/DD/YYYY'),
            DepartureDay: actualDate?.format('MM/DD/YYYY')
        };
        if (rows.filter((row) => row['CelebrityName'] === newRow['CelebrityName']
            && row['BirthdayDate'] === newRow['BirthdayDate']
            && row['DepartureDay'] === newRow['DepartureDay']).length === 0){
            setRows(rows.concat(newRow));
        }
        handleClose();
    };

    const handleDeleteClick = (rowToDelete: GridRowModel) => {
        setRows(rows.filter((row) => row !== rowToDelete['row']));
        handleClose();
    };

    const handleMenuDelete = () => {
        if (typeof selectionModel !== "number") {
            setRows(rows.filter((row) => !selectionModel.includes(row['id'])))
        } else {
            setRows(rows.filter((row) => row['id'] !== selectionModel))
        }
    };

    const calculateAge = (currentRow: GridRowModel) => {
        const celebrityBirthday: Date = new Date(currentRow.row['BirthdayDate']);
        const celebrityYear: number = celebrityBirthday.getFullYear();
        const todayDate: Date = new Date();
        const todayYear: number = todayDate.getFullYear();
        const deathYear: number = new Date(currentRow.row['DepartureDay']).getFullYear();
        // console.log(deathYear);
        console.log(typeof deathYear);

        if (currentRow.row['DepartureDay'] === '') {
            return todayYear - celebrityYear;
        } else {
            return deathYear - celebrityYear;
        }
    }

    const totalColumn: GridColDef[] = [{
        field: 'TotalBirthdays',
        headerName: 'Total Birthdays',
        flex: 1,
        renderCell: () => {
            return (
                rows.length + ' birthdays'
            )
        }
    }];

    const columns: GridColDef[] = [
        {field: 'CelebrityName', headerName: 'Celebrity Name', flex: 1, minWidth: 300},
        {field: 'BirthdayDate', headerName: 'Birthday Date', flex: 1, minWidth: 300},
        {field: 'DepartureDay', headerName: 'Departure Day', flex: 1, minWidth: 300},
        {field: 'Age', headerName: 'Age', minWidth: 100, renderCell: (row: GridRowModel) => {
            return (calculateAge(row))
            }},
        {
            field: "",
            type: 'actions',
            cellClassName: 'actions',
            minWidth: 100,
            renderHeader: (() => {
                return (
                    <BasicMenu addCallback={handleAddClickOpen}
                               deleteCallback={handleMenuDelete}/>
                )
            }),
            renderCell: (row: GridRowModel) => {
                return (
                    <IconButton
                        data-testid='delete-btn'
                        onClick={() => {
                            handleDelete({...row});
                            handleDeleteClickOpen();
                        } }>
                        <DeleteIcon />
                    </IconButton>
                )
            }
        }
    ];

    return (
        <Box id="birthday-manager"
             sx={{
                 height: 800,
                 width: '100%',
                 fontFamily: "'Outfit'",
                 fontSize: "15px",
                 lineHeight: "26px",
                 letterSpacing: "0.46px"
             }}>
            <DataGrid
                autoHeight
                sx={{
                    label: 'total-column',
                    border: 'none',
                    width: '100%',
                    height: 100,
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#40514E',
                        width: '100%',
                        color: '#11999E',
                        fontSize: 18
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-pinnedColumns': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-cell': {
                        backgroundColor: "#E4F9F5"
                    }
                }
                }
                columns={totalColumn}
                rows={totalRow}
            />
            <DataGrid
                onSelectionModelChange={setSelectionModel}
                selectionModel={selectionModel}
                checkboxSelection
                sx={{
                    className: 'default-columns',
                    border: 'none',
                    width: '100%',
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#40514E',
                        width: '100%',
                        color: '#11999E',
                        fontSize: 18
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-pinnedColumns': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                        backgroundColor: "#E4F9F5"
                    }
                }
                }
                rows={rows}
                columns={columns}
            />

            <AddDeleteDialog open={openDelete} onClose={handleClose} selectedRow={selectedRow}
                                           onClick={() => handleDeleteClick({...selectedRow})} open1={openAdd}
                                           newBirthday={newBirthday} helperText={errorMessage}
                                           onChange={(newValue: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setNewBirthday(newValue.target.value)}
                                           onChange1={(newValue: Dayjs | null) => {
                                               handleBirthdayChange(newValue)
                                           }} value={birthdayDate} renderInput={(params: TextFieldProps) => <TextField {...params}
                                                                                                                      sx={{label: {color: "#141414"}}}/>}
                                           onChange2={(newValue: Dayjs | null) => {
                                               handleActualChange(newValue)
                                           }} value1={actualDate} onClick1={handleAddClick}/>
        </Box>
    );
}