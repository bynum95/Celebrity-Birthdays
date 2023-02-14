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

interface HolidayInfo {
    id: string,
    CompanyHolidayName: string,
    HolidayDate: string,
    ActualDayOff: string
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
                    addCallback()}}>Add Holiday</MenuItem>
                <MenuItem onClick={
                    () => {
                        handleClose();
                        deleteCallback();
                    }
                }>Delete Holidays</MenuItem>
            </Menu>
        </div>
    );
}

export default function BirthdayManager()

{

    const defaultHolidays: HolidayInfo[] = JSON.parse(JSON.stringify([
            {
                "id": "1",
                "CompanyHolidayName": "New Year's Day",
                "HolidayDate": "1/01/2023",
                "ActualDayOff": "1/01/2023"
            },
            {
                "id": "2",
                "CompanyHolidayName": "MLK Day",
                "HolidayDate": "1/17/2023",
                "ActualDayOff": "1/17/2023"
            },
            {
                "id": "3",
                "CompanyHolidayName": "President's Day",
                "HolidayDate": "2/15/2023",
                "ActualDayOff": "2/15/2023"
            },
            {
                "id": "4",
                "CompanyHolidayName": "Memorial Day",
                "HolidayDate": "5/30/2023",
                "ActualDayOff": "5/30/2023"
            },
            {
                "id": "5",
                "CompanyHolidayName": "Juneteenth",
                "HolidayDate": "6/19/2023",
                "ActualDayOff": "6/20/2023"
            },
            {
                "id": "6",
                "CompanyHolidayName": "Independence Day",
                "HolidayDate": "7/04/2023",
                "ActualDayOff": "7/04/2023"
            },
            {
                "id": "7",
                "CompanyHolidayName": "Labor Day",
                "HolidayDate": "9/04/2023",
                "ActualDayOff": "9/04/2023"
            },
            {
                "id": "8",
                "CompanyHolidayName": "US Indigenous People's Day",
                "HolidayDate": "10/11/2023",
                "ActualDayOff": "10/11/2023"
            },
            {
                "id": "9",
                "CompanyHolidayName": "Veteran's Day",
                "HolidayDate": "11/11/2023",
                "ActualDayOff": "11/11/2023"
            },
            {
                "id": "10",
                "CompanyHolidayName": "Thanksgiving",
                "HolidayDate": "11/27/2023",
                "ActualDayOff": "11/27/2023"
            },
            {
                "id": "11",
                "CompanyHolidayName": "Day After Thanksgiving",
                "HolidayDate": "11/28/2023",
                "ActualDayOff": "11/28/2023"
            },
            {
                "id": "12",
                "CompanyHolidayName": "Christmas Eve",
                "HolidayDate": "12/24/2023",
                "ActualDayOff": "12/24/2023"
            },
            {
                "id": "13",
                "CompanyHolidayName": "Christmas",
                "HolidayDate": "12/25/2023",
                "ActualDayOff": "12/25/2023"
            }
        ]
    ));

    const totalRow: GridRowsProp = [{id: 1, TotalCompanyHolidays: 'total holiday amount', width: 'flex'}];

    const row: GridRowsProp = [...defaultHolidays];

    //keep track of rows for deleting
    const [rows, setRows] = useState([...row]);
    const [selectedRow, setSelectedRow] = useState<GridRowModel>();
    //state for delete overlay open
    const [openDelete, setOpenDelete] = useState(false);
    const [selectionModel, setSelectionModel] = useState<GridInputSelectionModel>([]);
    //add overlay open
    const [openAdd, setOpenAdd] = useState(false);

    //state for holiday date pickers
    const [holidayDate, setHolidayDate] = useState<Dayjs | null>(
        dayjs('2022/09/28T21:11:54')
    );
    const [actualDate, setActualDate] = useState<Dayjs | null>(
        dayjs('2022-09-28T21:11:54')
    );
    const [newHoliday, setNewHoliday] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (newHoliday.length > 4) {
            setErrorMessage('');
        }
    }, [newHoliday, errorMessage]);

    useEffect(() => {
        if (newHoliday.length < 4) {
            setErrorMessage('Holiday name has less than 4 characters');
        }
    }, [newHoliday]);

    const handleHolidayChange = (newValue: Dayjs | null ) => {
        setHolidayDate(newValue);
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
            CompanyHolidayName: newHoliday,
            HolidayDate: holidayDate?.format('MM/DD/YYYY'),
            ActualDayOff: actualDate?.format('MM/DD/YYYY')
        };
        if (rows.filter((row) => row['CompanyHolidayName'] === newRow['CompanyHolidayName']
            && row['HolidayDate'] === newRow['HolidayDate']
            && row['ActualDayOff'] === newRow['ActualDayOff']).length === 0){
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

    const totalColumn: GridColDef[] = [{
        field: 'TotalCompanyHolidays',
        headerName: 'Total Company Holidays',
        flex: 1,
        renderCell: () => {
            return (
                rows.length * 8 + ' hours'
            )
        }
    }];

    const columns: GridColDef[] = [
        {field: 'CompanyHolidayName', headerName: 'Company Holiday Name', flex: 1, minWidth: 300},
        {field: 'HolidayDate', headerName: 'Holiday Date', flex: 1, minWidth: 300},
        {field: 'ActualDayOff', headerName: 'Actual Day Off', flex: 1, minWidth: 300},
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
        <Box id="holiday-manager"
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
                        backgroundColor: 'primary.light',
                        width: '100%'
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-pinnedColumns': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        display: 'none'
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
                        backgroundColor: 'primary.light',
                        width: '100%'
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
                        borderBottom: 'none'
                    }
                }
                }
                rows={rows}
                columns={columns}
            />

            <AddDeleteDialog open={openDelete} onClose={handleClose} selectedRow={selectedRow}
                                           onClick={() => handleDeleteClick({...selectedRow})} open1={openAdd}
                                           newHoliday={newHoliday} helperText={errorMessage}
                                           onChange={(newValue: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setNewHoliday(newValue.target.value)}
                                           onChange1={(newValue: Dayjs | null) => {
                                               handleHolidayChange(newValue)
                                           }} value={holidayDate} renderInput={(params: TextFieldProps) => <TextField {...params}
                                                                                                                      sx={{label: {color: "#141414"}}}/>}
                                           onChange2={(newValue: Dayjs | null) => {
                                               handleActualChange(newValue)
                                           }} value1={actualDate} onClick1={handleAddClick}/>
        </Box>
    );
}