import React, { useState, useEffect } from 'react';

import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, AccordionSummary, AccordionDetails, Collapse, Typography } from '@mui/material';
import axios from 'axios';



function getDaysDiff(date1, date2) {
    const timeDiff = date2.getTime() - date1.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

const OrdersTable = () => {
    const [orders, setOrders] = useState([
    ]);

    useEffect(() => {
        axios.get('http://127.0.0.1:3702/order')
            .then(response => {
                setOrders(response.data)

            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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
            })
            .catch((error) => {
                console.log(error);
            });
        const updatedRows = orders.map(row =>
            row.orderid === orderdata.orderid ? orderdata : row
        );

        setOrders(updatedRows);
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
        <TableContainer>
            <div>
                <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
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
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ textAlign: 'center' }}>訂單編號</TableCell>
                        <TableCell>客戶名稱</TableCell>
                        {/* <TableCell>產品品名</TableCell> */}
                        <TableCell>建單日期</TableCell>
                        <TableCell>出貨日期</TableCell>
                        <TableCell>目前狀況</TableCell>
                        <TableCell>剩餘天數</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <React.Fragment key={order.orderid}>
                            <TableRow >
                                <TableCell onClick={() => handleCollClick(order.orderid)}>{order.orderid}</TableCell>
                                <TableCell>{order.customername}</TableCell>
                                {/* <TableCell>{order.productName}</TableCell> */}
                                <TableCell>{order.orderdate}</TableCell>
                                <TableCell>{order.deliverydate}</TableCell>
                                <TableCell>{order.orderstate}</TableCell>
                                <TableCell>{getDaysDiff(new Date(), new Date(order.deliverydate))}天</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleRowClick(order)}>
                                        編輯
                                    </Button>

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                    <Collapse in={collopen.includes(order.orderid)} timeout="auto" unmountOnExit>
                                        <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
                                            <Typography >客戶資料</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            
                                            客戶名稱: {order.customername}<br />
                                            客戶e-mail:   {order.customeremail}<br />
                                            客戶電話:   {order.customerphone}<br />
                                            客戶傳真:   {order.customerfax}<br />
                                            客戶地址:   {order.customeraddress}<br />
                                            
                                            </Typography>
                                        </AccordionDetails>
                                        <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
                                            <Typography >產品資料</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>產品名稱</TableCell>
                                                        <TableCell>數量</TableCell>
                                                        <TableCell>價格</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {order.product.map((product) => (
                                                    
                                                        <TableBody key={product.productname}>
                                                            <TableRow>
                                                                <TableCell>{product.productname}</TableCell>
                                                                <TableCell>{product.quty}</TableCell>
                                                                <TableCell>{product.price}</TableCell>
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
            </Table>

            {/* 編輯資料 */}
            {orderdata && (
                <Dialog open={clickOpen} onClose={handleClose} sx={{ '& .MuiTextField-root': { mt: 2 }, }}
                    maxWidth='lg'
                >
                    <DialogTitle>編輯訂單</DialogTitle>
                    <DialogContent>
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
                                    deliverydate: event.target.value,
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
                        <TextField
                            label="目前狀況"
                            value={orderdata.orderstate}
                            fullWidth
                            onChange={(event) =>
                                setOrderData({
                                    ...orderdata,
                                    orderstate: event.target.value,
                                })
                            }
                        />
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose} color="primary">取消</Button>
                            <Button variant="contained" onClick={() => handleSaveClick(orderdata)}>
                                儲存
                            </Button>
                        </DialogActions>
                    </DialogContent>

                </Dialog>
            )}

        </TableContainer>
    );
};

export default OrdersTable;
