import React, { useEffect, useState } from "react";
import { Box, TableCell, TableContainer, TableHead, TableRow, Collapse, TableBody, Table, AccordionSummary, Typography, AccordionDetails, useTheme, } from "@mui/material";
import axios from "axios";
import withAuth from "../../components/withAuth";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Grid from '@mui/material/Unstable_Grid2';



const WorkOrderAll = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [workorder, setWorkOrder] = useState([]);
    

    useEffect(() => {
        axios.get('http://127.0.0.1:3702/workorderall')
            .then(response => {
                setWorkOrder(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])


    //手風琴
    const [collopen, setCollopen] = useState([]);

    const handleCollClick = (rowId) => {
        if (collopen.includes(rowId)) {
            setCollopen(collopen.filter(work_order_id => work_order_id !== rowId));
        } else {
            setCollopen([...collopen, rowId]);
        }
    };

    return (
        <Box m="20px" sx={{
            '& label.Mui-focused': {
                color: '#4cceac'
            }
        }}>
            <Header title="報工單列表" subtitle="已完成之報工單" />
            <TableContainer m="40px 0 0 0">
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[700], mt: 2, '& .MuiTableCell-root': { fontSize: '24px', textAlign: "center" }
                    }}>
                        <TableRow>
                            <TableCell>派工單號</TableCell>
                            <TableCell>產品名稱</TableCell>
                            <TableCell>完成日期</TableCell>
                            <TableCell>完成加工量</TableCell>
                            <TableCell>目前狀況</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workorder.map((order) => (
                            <React.Fragment key={order.work_order_id}>
                                <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '24px', textAlign: "center" } }}>
                                    <TableCell onClick={() => handleCollClick(order.work_order_id)}>{order.work_order_id}</TableCell>
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
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                        <Collapse in={collopen.includes(order.work_order_id)} timeout="auto" unmountOnExit>
                                            <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
                                                <Typography variant="h3" sx={{ mt: 1, p: 1, backgroundColor: colors.blueAccent[700] }}>報工單資料</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container spacing={3} sx={{ ml: 3 }}>
                                                    <Grid xs={6}>
                                                        <Typography variant='h3'>製作人員:{order.work_order_executor}</Typography>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <Typography variant='h3'>製作機器編號:{order.machine_uuid}</Typography>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <Typography variant='h3'>成品數量:{order.real_process_amount}</Typography>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <Typography variant='h3'>不良品數量: {order.defect_process_amount}</Typography>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <Typography variant='h3'>不良率:{order.defect_process_amount / order.real_process_amount}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </AccordionDetails>
                                        </Collapse>
                                    </TableCell>
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