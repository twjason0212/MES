import {
    TableContainer, TableHead, TextField, Table, Typography, TableCell, TableRow,
    TableBody, Box, Grid, Button, Dialog, DialogTitle, DialogContent, useTheme, AccordionSummary, AccordionDetails, Collapse, InputAdornment, IconButton, Alert, Snackbar
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import NewCustomers from './newcustomers';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import withAuth from "../../components/withAuth";
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Search as SearchIcon } from "@mui/icons-material";

const Newcust = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [customers, setCustomers] = useState([{
        customerid: '',
        customername: '',
        customerphone: '',
        customeremail: '',
        customeraddress: '',
        customerfax: ''
    }]);

    const [filter, setFilter] = useState({
        customername: ''
    });

    const handleSearch = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value })
    }

    const filtercustomer = customers.filter((customer) => {
        const { customername } = filter;
        return (customer.customername.toLowerCase().includes(customername.toLowerCase()));
    });

    //edit
    const [open, setOpen] = useState(false);
    const [ncustomers, setNcustomers] = useState(null);

    const handleClick = (customer) => {
        setNcustomers(customer);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = (newData) => {
        axios.put('http://127.0.0.1:3702/coustomer/', newData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });

        const update = customers.map(row =>
            row.customerid === ncustomers.customerid ? ncustomers : row);
        setCustomers(update);
        setOpen(false);
        setAlertOpen(true);
    }

    const handleAdd = async () => {
        await axios.get('http://127.0.0.1:3702/coustomer')
            .then(response => {
                setCustomers(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    //手風琴
    const [collopen, setCollopen] = useState([]);

    const handleCollClick = (rowId) => {
        if (collopen.includes(rowId)) {
            setCollopen(collopen.filter(customerid => customerid !== rowId));
        } else {
            setCollopen([...collopen, rowId]);
        }
    };

    //資料
    useEffect(() => {
        axios.get('http://127.0.0.1:3702/coustomer')
            .then(response => {
                setCustomers(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const [alertOpen, setAlertOpen] = useState(false)
    const handleAlertClose = () => {
        setAlertOpen(false)
    };




    return (

        <Box m="20px" sx={{
            '& label.Mui-focused': {
                color: '#4cceac'
            }
        }}>
            <Header title="客戶管理" />

            <TableContainer m="40px 0 0 0">

                <Grid container alignItems="center" sx={{
                    '& .MuiTextField-root': { mt: 2 },
                    '& label.Mui-focused': { color: '#4cceac' },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                    '& .MuiOutlinedInput-root': { fontSize: '22px' },
                }}>
                    <Grid item xs={6} >
                        <Box sx={{
                        width: '30%', backgroundColor: colors.primary[400],pb:1
                    }}>
                            <TextField sx={{ m: 1, mr: 2 }}
                                name="customername"
                                label="搜索客戶"
                                value={filter.customername}
                                onChange={handleSearch}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="search"
                                            >
                                                <SearchIcon style={{ fontSize: 28 }} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-end">
                            <NewCustomers handleAdd={handleAdd} />
                        </Box>
                    </Grid>
                </Grid>
                <Snackbar open={alertOpen} autoHideDuration={1500} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
                    <Alert onClose={handleAlertClose} icon={false} sx={{ width: '100%', fontSize: 20, color: 'black', backgroundColor: '#4cceac' }}>
                        修改成功!
                    </Alert>
                </Snackbar>
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[700], mt: 2, '& .MuiTableCell-root': { fontSize: '22px', textAlign: "center" }
                    }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>客戶名稱</TableCell>
                            <TableCell>電話</TableCell>
                            <TableCell>email</TableCell>
                            {/* <TableCell>客戶地址</TableCell>
                        <TableCell>客戶傳真</TableCell> */}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtercustomer.map((customer) => (
                            <React.Fragment key={customer.customerid}>
                                <TableRow onClick={() => handleCollClick(customer.customerid)}
                                    sx={{ '& .MuiTableCell-root': { fontSize: '20px', textAlign: "center" } }}>
                                    <TableCell >{customer.customerid}</TableCell>
                                    <TableCell>{customer.customername}</TableCell>
                                    <TableCell>{customer.customerphone}</TableCell>
                                    <TableCell>{customer.customeremail}</TableCell>
                                    {/* <TableCell>{customer.customeraddress}</TableCell>
                            <TableCell>{customer.customerfax}</TableCell> */}
                                    <TableCell>
                                        <Button variant="contained" color="secondary" sx={{ fontSize: '20px', textAlign: "center" }}
                                            onClick={() => handleClick(customer)} startIcon={<EditIcon style={{ fontSize: 28 }} />}>
                                            編輯
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                        <Collapse in={collopen.includes(customer.customerid)} timeout="auto" unmountOnExit>
                                            <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
                                                <Typography variant="h4" sx={{ mt: 1, p: 1, backgroundColor: colors.blueAccent[700] }}>客戶資料</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ ml: 3 }}>
                                                <Typography variant="h4" sx={{ mb: 1 }}>客戶地址:{customer.customeraddress}</Typography>
                                                <Typography variant="h4">客戶傳真:{customer.customerfax}</Typography>
                                            </AccordionDetails>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>


                {ncustomers && (
                    <Dialog open={open} onClose={handleClose} sx={{
                        '& .MuiTextField-root': { mt: 2 },
                        '& label.Mui-focused': { color: '#4cceac' },
                        '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                        '& .MuiOutlinedInput-root': { fontSize: '22px' },
                        '& .MuiButton-root': { fontSize: '22px' },
                    }} >
                        <DialogTitle variant="h4" sx={{ color: colors.greenAccent[500] }}>編輯客戶資料</DialogTitle>
                        <DialogContent sx={{ ml: 2 }}>
                            <TextField
                                label="客戶ID"
                                value={ncustomers.customerid}
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="客戶名稱"
                                value={ncustomers.customername}
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="客戶電話"
                                type="tel"
                                value={ncustomers.customerphone}
                                fullWidth
                                onChange={(event) =>
                                    setNcustomers({
                                        ...ncustomers,
                                        customerphone: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="客戶email"
                                type="e-mail"
                                value={ncustomers.customeremail}
                                fullWidth
                                onChange={(event) =>
                                    setNcustomers({
                                        ...ncustomers,
                                        customeremail: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="客戶地址"
                                value={ncustomers.customeraddress}
                                fullWidth
                                onChange={(event) =>
                                    setNcustomers({
                                        ...ncustomers,
                                        customeraddress: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="客戶傳真"
                                type="tel"
                                value={ncustomers.customerfax}
                                fullWidth
                                onChange={(event) =>
                                    setNcustomers({
                                        ...ncustomers,
                                        customerfax: event.target.value,
                                    })
                                }
                            />
                            <Button fullWidth sx={{ mt: 2 }} variant="contained" type="submit" color="info" onClick={() => handleSave(ncustomers)} startIcon={<SaveAsIcon style={{ fontSize: 28 }} />}>
                                儲存
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </TableContainer>
        </Box>
    );

}
export default withAuth(Newcust);
