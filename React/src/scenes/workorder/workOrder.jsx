import React from 'react';
import { Box, useTheme, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import withAuth from "../../components/withAuth";
import makeStyles from '@mui/material';
import { fontSize } from '@mui/system';

const WorkOrder = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const work_creator = window.sessionStorage.getItem('name');

    return (
        <Box m="20px">
            <Header title="派工單" subtitle="新增派工單" />
            <Box sx={{
                // backgroundColor: colors.primary[400],
                "& .green-text": {
                    color: colors.greenAccent[300],
                    fontSize: "22px",
                    p: 3,
                },
            }} >
                {/* <div className="green-text">填寫派工單</div> */}
                <Formik
                    initialValues={{
                        work_order_id: '',
                        work_order_creator: work_creator,
                        product_name: '',
                        process_date: '',
                        tar_process_amount: '',
                    }}
                    validationSchema={Yup.object({
                        work_order_id: Yup.string().required('請輸入派工單號'),
                        work_order_creator: Yup.string().required('請輸入派工單建立人員'),
                        product_name: Yup.string().required('請輸入產品名稱'),
                        process_date: Yup.date().max(new Date(), '日期不能晚於今天').required('請輸入建立日期'),
                        tar_process_amount: Yup.number().typeError('必須為數字').min(1, '數量不能為0或負數').required('必填'),
                    })}
                    onSubmit={(values) => {
                        axios.post('http://127.0.0.1:3702/workorder', values)
                            .then((response) => {
                                console.log(response.data);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        // console.log(values);
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <Box component={Form} onSubmit={handleSubmit} sx={{
                            '& label.Mui-focused': {
                                color: '#4cceac',
                                fontSize:"22px"
                            },'& .MuiInputLabel-filled': {
                                color: '#4cceac',
                                fontSize:"22px"
                            }
                        }}>
                            <Grid container spacing={3} p="20px 12px">
                                <Grid xs={6}>
                                    <span style={{fontSize:'24px'}}>a</span><TextField sx={{'& .MuiFilledInput-root':{fontSize:'32px'}}}
                                        variant="filled"
                                        id="work_order_id"
                                        name="work_order_id"
                                        label="派工單號"
                                        fullWidth
                                        value={values.work_order_id}
                                        onChange={handleChange}
                                        error={touched.work_order_id && Boolean(errors.work_order_id)}
                                        helperText={touched.work_order_id && errors.work_order_id}
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <TextField
                                        variant="filled"
                                        id="work_order_creator"
                                        name="work_order_creator"
                                        label="派工單建立人員"
                                        fullWidth
                                        value={work_creator}
                                        disabled
                                        onChange={handleChange}
                                        error={touched.work_order_creator && Boolean(errors.work_order_creator)}
                                        helperText={touched.work_order_creator && errors.work_order_creator}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} p="20px 12px">
                                <Grid xs={6}>
                                    <TextField
                                        variant="filled"
                                        id="product_name"
                                        name="product_name"
                                        label="產品名稱"
                                        fullWidth
                                        value={values.product_name}
                                        onChange={handleChange}
                                        error={touched.product_name && Boolean(errors.product_name)}
                                        helperText={touched.product_name && errors.product_name}
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <TextField
                                        variant="filled"
                                        id="process_date"
                                        name="process_date"
                                        label="建立日期"
                                        type="datetime-local"
                                        InputLabelProps={{
                                            shrink: true, classes: {
                                                focused: colors.primary[400],
                                            },
                                        }}
                                        fullWidth
                                        value={values.process_date}
                                        onChange={handleChange}
                                        error={touched.process_date && Boolean(errors.process_date)}
                                        helperText={touched.process_date && errors.process_date}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} p="20px 12px">
                                <Grid xs={6}>
                                    <TextField
                                        variant="filled"
                                        id="tar_process_amount"
                                        name="tar_process_amount"
                                        label="預計加工量"
                                        fullWidth
                                        value={values.tar_process_amount}
                                        onChange={handleChange}
                                        error={touched.tar_process_amount && Boolean(errors.tar_process_amount)}
                                        helperText={touched.tar_process_amount && errors.tar_process_amount}
                                    />
                                </Grid>
                            </Grid>
                            <Box style={{ display: 'flex', justifyContent: 'right' }} sx={{ '& .MuiButton-root': { fontSize: '18px', m: 3 } }}>
                                <Button type="submit" color="secondary" variant="contained">儲存</Button>
                            </Box>

                        </Box>
                    )}
                </Formik>
            </Box>
        </Box >
    )

}

export default withAuth(WorkOrder);