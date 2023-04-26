import React, { useEffect, useState } from "react";
import { Box, TableCell, TableContainer, TableHead, TableRow, Button, TableBody, Table ,Dialog ,DialogContent ,TextField, } from "@mui/material";
import axios from "axios";
import withAuth from "../../components/withAuth";
import Header from "../../components/Header";
import { tokens } from "../../theme";




const WorkOrderList = () => {

    const [workorder, setWorkOrder] = useState([]);
    const [reworkorder, setReWorkOrder] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:3702/workorder')
            .then(response => {
                setWorkOrder(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handleReClick = (order) =>{
        setReWorkOrder(order);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {

    }


    return (
        <Box m="20px" sx={{
            '& label.Mui-focused': {
                color: '#4cceac'
            }
        }}>
            <Header title="工單管理" />
            <TableContainer m="40px 0 0 0">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>派工單號</TableCell>
                            <TableCell>產品名稱</TableCell>
                            <TableCell>建立日期</TableCell>
                            <TableCell>預計加工量</TableCell>
                            <TableCell>目前狀況</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workorder.map((order) => (
                            <React.Fragment key={order.work_order_id}>
                                <TableRow>
                                    <TableCell>{order.work_order_id}</TableCell>
                                    <TableCell>{order.product_name}</TableCell>
                                    <TableCell>{new Date(order.process_date).toLocaleString()}</TableCell>
                                    <TableCell>{order.tar_process_amount}</TableCell>
                                    <TableCell>{order.work_order_status_name}</TableCell>
                                    <TableCell>
                                        <Button variant="contained"  color="secondary" sx={{ fontSize: '16px', textAlign: "center" }}
                                        onClick={() => handleReClick(order)}>
                                            接單
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

                {reworkorder && (
                    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiTextField-root': { mt: 2,fontSize:'16px'}, 
                    '& label.Mui-focused': {color: '#4cceac'} 
              }} >
                <DialogContent sx={{ml:2}}>
                            <TextField 
                                label="派工單號"
                                value={reworkorder.work_order_id}
                                fullWidth
                                disabled
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                               
                            />
                            <TextField
                                label="建立日期"
                                value={new Date(reworkorder.process_date).toLocaleString()}
                                fullWidth
                                disabled
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="產品名稱"
                                value={reworkorder.product_name}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem'} }}
                                disabled
                            />
                            <TextField
                                label="預計加工量"
                                value={reworkorder.tar_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                disabled
                            />
                            <TextField
                                label="機器編號"
                                type="tel"
                                value={reworkorder.machine_uuid}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setReWorkOrder({
                                        ...reworkorder,
                                        machine_uuid: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="製作人員"
                                type="tel"
                                value={reworkorder.work_order_executor}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setReWorkOrder({
                                        ...reworkorder,
                                        work_order_executor: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="目前狀況"
                                value={reworkorder.work_order_status_name}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setReWorkOrder({
                                        ...reworkorder,
                                        work_order_status_name: event.target.value,
                                    })
                                }
                            />
                            <Button fullWidth  sx={{mt:2}} variant="contained" type="submit" color="info" onClick={() => handleSave(reworkorder)}>
                                儲存
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </TableContainer>
        </Box>
    )
}
export default withAuth(WorkOrderList);