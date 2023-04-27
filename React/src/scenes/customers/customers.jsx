import {
    TableContainer, TableHead, TextField, Table, Typography, TableCell, TableRow,
    TableBody, Box, Grid, Button, Dialog, DialogTitle, DialogContent, Accordion,AccordionSummary,AccordionDetails ,Collapse
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import NewCustomers from './newcustomers';


const Newcust = () => {
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
    }

    const handleAdd = async() =>{
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


    return (
        <TableContainer>
            <NewCustomers handleAdd={handleAdd}/>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography display={"inline"}>客戶列表</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <TextField sx={{ m: 1  , mr: 2}}
                            name="customername"
                            label="客戶名稱"
                            value={filter.customername}
                            onChange={handleSearch}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>客戶ID</TableCell>
                        <TableCell>客戶名稱</TableCell>
                        <TableCell>客戶電話</TableCell>
                        <TableCell>客戶email</TableCell>
                        {/* <TableCell>客戶地址</TableCell>
                        <TableCell>客戶傳真</TableCell> */}
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filtercustomer.map((customer) => (
                        <React.Fragment key={customer.customerid}>
                            <TableRow onClick={() => handleCollClick(customer.customerid)}>
                                <TableCell >{customer.customerid}</TableCell>
                                <TableCell>{customer.customername}</TableCell>
                                <TableCell>{customer.customerphone}</TableCell>
                                <TableCell>{customer.customeremail}</TableCell>
                                {/* <TableCell>{customer.customeraddress}</TableCell>
                            <TableCell>{customer.customerfax}</TableCell> */}
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleClick(customer)}>
                                        編輯
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                <Collapse in={collopen.includes(customer.customerid)} timeout="auto" unmountOnExit>
                                        <AccordionSummary  aria-controls="panel1c-content" id="panel1c-header">
                                            <Typography >詳細資料</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <strong>客戶地址:</strong> {customer.customeraddress}
                                                <br />
                                                <strong>客戶傳真:</strong> {customer.customerfax}
                                            </Typography>
                                        </AccordionDetails>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>


            {ncustomers && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>編輯客戶資料</DialogTitle>
                    <DialogContent>
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
                        <Button variant="contained" onClick={() => handleSave(ncustomers)}>
                            儲存
                        </Button>
                    </DialogContent>
                </Dialog>
            )}



        </TableContainer>
    );

}
export default Newcust;