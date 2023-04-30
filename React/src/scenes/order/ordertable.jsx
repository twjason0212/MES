import React, { useState, useEffect } from 'react';

import { TablePagination, Select, MenuItem, useTheme, Box, Button, Dialog, DialogContent, DialogTitle, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, AccordionSummary, AccordionDetails, Collapse, Typography, TableFooter } from '@mui/material';
import axios from 'axios';
import { tokens } from "../../theme";
import Neworder2 from './neworder2.jsx';
import Grid from '@mui/material/Unstable_Grid2';
function getDaysDiff(date1, date2) {
    const timeDiff = date2.getTime() - date1.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

const OrdersTable = () => {
    const [orders, setOrders] = useState([
    ]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    useEffect(() => {
        if (shouldUpdate) {
            axios.get('http://127.0.0.1:3702/order')
                .then(response => {
                    setOrders(response.data)
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
            setShouldUpdate(false);
        }
    }, [shouldUpdate]);

    const [filter, setFilter] = useState({
        orderid: '',
        orderdate: '',
        customername: '',
    });

    const handleChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    const filteredOrders = orders.filter((order) => {
        const { orderid, orderdate, customername } = filter;
        return (
            order.orderid?.toString().includes(orderid) &&
            order.orderdate?.includes(orderdate) &&
            order.customername?.toLowerCase().includes(customername.toLowerCase())
        );
    });
    console.log(filteredOrders)

    //edit
    const [clickOpen, setclickOpen] = useState(false);
    const [orderdata, setOrderData] = useState(null);

    const handleRowClick = (order) => {
        setOrderData(order);
        setclickOpen(true);
    };

    const handleClose = () => {
        setclickOpen(false);
    };

    const handleSaveClick = (data) => {
        axios.put("http://127.0.0.1:3702/order/edit", data)
            .then((response) => {
                console.log(response.data);
                return axios.get('http://127.0.0.1:3702/order')
            })
            .then((response) => {
                setOrders(response.data)
                console.log('修改成功');
            })
            .catch((error) => {
                console.log(error);
            });
        // const updatedRows = orders.map(row =>
        //     row.orderid === orderdata.orderid ? orderdata : row
        // );

        // setOrders(updatedRows);
        setclickOpen(false);
    };

    //手風琴
    const [collopen, setCollopen] = useState([]);

    const handleCollClick = (rowId) => {
        if (collopen.includes(rowId)) {
            setCollopen(collopen.filter(orderid => orderid !== rowId));
        } else {
            setCollopen([...collopen, rowId]);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Box style={{ backgroundColor: colors.primary[400], marginBottom: '20px' }} sx={{
                '& label.Mui-focused': {
                    color: '#4cceac'
                }
            }}>
                <Typography sx={{
                    color: colors.greenAccent[300],
                    fontSize: "24px", px: "30px", py: '20px'
                }}>
                    搜索欄
                </Typography>
                <Box sx={{
                    display: 'flex', justifyContent: 'Space-evenly', pb: '20px',
                    '& label.Mui-focused': {
                        color: '#4cceac'
                    }, '& .MuiInputLabel-outlined': {
                        color: '#4cceac',
                        fontSize: "22px",
                        pl: 2
                    }, '& .MuiOutlinedInput-root': {
                        fontSize: '22px'
                    },
                }}>
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="orderid"
                        label="訂單編號"
                        value={filter.orderid}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="orderdate"
                        label="建單日期"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filter.orderdate}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="customername"
                        label="客戶名稱"
                        value={filter.customername}
                        onChange={handleChange}
                    />
                </Box>
            </Box>
            <Neworder2 setShouldUpdate={setShouldUpdate} />
            <TableContainer >
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, '& .textcen': { fontSize: '22px', textAlign: "center" } }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[600], mt: 2,
                    }}>
                        <TableRow>
                            <TableCell className='textcen'>訂單編號</TableCell>
                            <TableCell className='textcen'>客戶名稱</TableCell>
                            {/* <TableCell>產品品名</TableCell> */}
                            <TableCell className='textcen'>建單日期</TableCell>
                            <TableCell className='textcen'>出貨日期</TableCell>
                            <TableCell className='textcen' sx={{ width: "10%" }}>目前狀況</TableCell>
                            <TableCell className='textcen' sx={{ width: "10%" }}>剩餘天數</TableCell>
                            <TableCell className='textcen' sx={{ width: "10%" }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <React.Fragment key={order.id}>
                                <TableRow >
                                    <TableCell className='textcen' onClick={() => handleCollClick(order.orderid)}>{order.orderid}</TableCell>
                                    <TableCell className='textcen'>{order.customername}</TableCell>
                                    {/* <TableCell>{order.productName}</TableCell> */}
                                    <TableCell className='textcen'>{order.orderdate}</TableCell>
                                    <TableCell className='textcen'>{order.deliverydate}</TableCell>
                                    <TableCell className='textcen'>{order.orderstate_name}</TableCell>
                                    <TableCell className='textcen'>{getDaysDiff(new Date(), new Date(order.deliverydate)) < 0 ? '-' : getDaysDiff(new Date(), new Date(order.deliverydate))}天</TableCell>
                                    <TableCell className='textcen'>
                                        <Button variant="contained" size='large' className='textcen' color="secondary" onClick={() => handleRowClick(order)}>
                                            編輯
                                        </Button>

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                        <Collapse in={collopen.includes(order.orderid)} timeout="auto" unmountOnExit>
                                            <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
                                                <Typography variant="h4" sx={{ mt: 1, p: 1, backgroundColor: colors.blueAccent[700] }}>客戶資料</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container spacing={3} sx={{ ml: 3 }}>
                                                    <Grid xs={6}>
                                                        <Typography variant='h4'>客戶名稱:{order.customername}</Typography>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <Typography variant='h4'>客戶電話:{order.customerphone}</Typography>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <Typography variant='h4'>客戶e-mail: {order.customeremail}</Typography>
                                                    </Grid>
                                                    <Grid xs={6}>

                                                        <Typography variant='h4'>客戶傳真:{order.customerfax}</Typography>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <Typography variant='h4'>客戶地址:{order.customeraddress}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </AccordionDetails>
                                            <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
                                                <Typography variant="h4" sx={{ mt: 1, p: 1, backgroundColor: colors.blueAccent[700] }}>訂單資料</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Table sx={{
                                                    '& .MuiTableCell-body': { fontSize: '20px' },
                                                    '& .MuiTableCell-head': { fontSize: '20px' }
                                                }}>
                                                    <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                                                        <TableRow>
                                                            <TableCell align='center'>產品名稱</TableCell>
                                                            <TableCell align='center'>數量</TableCell>
                                                            <TableCell align='center'>價格</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    {order.product.map((product) => (

                                                        <TableBody key={product.productname}>
                                                            <TableRow>
                                                                <TableCell align='center'>{product.productname}</TableCell>
                                                                <TableCell align='center'>{product.quty}</TableCell>
                                                                <TableCell align='center'>{product.price}</TableCell>
                                                            </TableRow>
                                                        </TableBody>

                                                    ))}
                                                </Table>
                                            </AccordionDetails>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}

                    </TableBody>
                    {/* <TableFooter sx={{
                        backgroundColor: colors.blueAccent[700]
                    }}>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                                <TablePagination sx={{ fontSize:'16px',
                                '& .css-7ms3qr-MuiTablePagination-displayedRows':{fontSize:'16px'},
                                '& .css-1rt5bto-MuiTablePagination-selectLabel':{fontSize:'16px'}}}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={orders.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelRowsPerPage="每頁筆數："
                                />

                            </TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>

                {/* 編輯資料 */}
                {orderdata && (
                    <Dialog open={clickOpen} onClose={handleClose} sx={{
                        '& .MuiTextField-root': { mt: 2 },
                        '& label.Mui-focused': { color: '#4cceac' },
                        '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                        '& .MuiOutlinedInput-root': { fontSize: '22px' },
                        '& .MuiButton-root': { fontSize: '22px' },
                    }}
                    >
                        <DialogTitle variant="h3" sx={{ color: colors.greenAccent[500] }}>編輯訂單</DialogTitle>
                        <DialogContent >
                            <TextField
                                label="訂單編號"
                                value={orderdata.orderid}
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="建單日期"
                                type="date"
                                value={orderdata.orderdate}
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="出貨日期"
                                type="date"
                                value={orderdata.deliverydate}
                                fullWidth
                                onChange={(event) =>
                                    setOrderData({
                                        ...orderdata,
                                        changdate: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="修改日期"
                                type="date"
                                value={orderdata.changdate}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                onChange={(event) =>
                                    setOrderData({
                                        ...orderdata,
                                        changdate: event.target.value,
                                    })
                                }
                            />
                            {/* <TextField
                                label="目前狀況"
                                value={orderdata.orderstate}
                                fullWidth
                                onChange={(event) =>
                                    setOrderData({
                                        ...orderdata,
                                        orderstate: event.target.value,
                                    })
                                }
                            /> */}

                            <TextField
                                id='orderstate'
                                label="目前狀況"

                                value={orderdata.orderstate}
                                select
                                fullWidth
                                onChange={(event) =>
                                    setOrderData({
                                        ...orderdata,
                                        orderstate: event.target.value,
                                    })
                                }
                            >
                                <MenuItem value={1}>已接單</MenuItem>
                                <MenuItem value={2}>生產完成</MenuItem>
                                <MenuItem value={3}>已結單</MenuItem>
                            </TextField>
                            {/* <Select
                                label="目前狀況"
                                value={orderdata.orderstate}
                                fullWidth
                                onChange={(event) =>
                                    setOrderData({
                                        ...orderdata,
                                        orderstate: event.target.value,
                                    })}
                            >
                                <MenuItem value={1}>已接單</MenuItem>
                                <MenuItem value={2}>生產完成</MenuItem>
                                <MenuItem value={3}>已結單</MenuItem>
                            </Select> */}
                            <DialogActions sx={{ mt: 2 }}>
                                <Button variant="contained" onClick={handleClose} color="error">取消</Button>
                                <Button variant="contained" type="submit" color="info" onClick={() => handleSaveClick(orderdata)}>
                                    儲存
                                </Button>
                            </DialogActions>
                        </DialogContent>

                    </Dialog>
                )}

            </TableContainer>

        </Box >
    );
};

export default OrdersTable;
