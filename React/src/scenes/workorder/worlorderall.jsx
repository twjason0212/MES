import React, { useEffect, useState } from "react";
import { Box, TableCell, TableContainer, TableHead, TableRow, Button, TableBody, Table, Dialog, DialogContent, TextField, useTheme, } from "@mui/material";
import axios from "axios";
import withAuth from "../../components/withAuth";
import Header from "../../components/Header";
import { tokens } from "../../theme";




const WorkOrderAll = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [workorder, setWorkOrder] = useState([]);
    const [reworkorder, setReWorkOrder] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:3702/workorderall')
            .then(response => {
                setWorkOrder(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handleReClick = (order) => {
        setReWorkOrder(order);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box m="20px" sx={{
            '& label.Mui-focused': {
                color: '#4cceac'
            }
        }}>
            <Header title="工單管理" subtitle="" />
            <TableContainer m="40px 0 0 0">
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[700], mt: 2, '& .MuiTableCell-root': { fontSize: '22px', textAlign: "center" }
                    }}>
                        <TableRow>
                            <TableCell>派工單號</TableCell>
                            <TableCell>產品名稱</TableCell>
                            <TableCell>建立日期</TableCell>
                            <TableCell>完成加工量</TableCell>
                            <TableCell>目前狀況</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workorder.map((order) => (
                            <React.Fragment key={order.work_order_id}>
                                <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '20px', textAlign: "center" } }}>
                                    <TableCell>{order.work_order_id}</TableCell>
                                    <TableCell>{order.product_name}</TableCell>
                                    <TableCell>{new Date(order.process_date).toLocaleString('zh-TW', {
                                        hour12: false,
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}</TableCell>
                                    <TableCell>{order.real_process_amount}</TableCell>
                                    <TableCell>{order.work_order_status_name}</TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default withAuth(WorkOrderAll);