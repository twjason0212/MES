import React from 'react';
import { Box, useTheme, TextField, Button, useMediaQuery } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import withAuth from "../../components/withAuth";



const WorkOrder = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const work_creator = window.sessionStorage.getItem('name');

    return (
        <Box m="20px">
            <Header title="派工單" subtitle="新增派工單" />
            <Box>
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
                    onSubmit={(values,{resetForm}) => {
                        axios.post('http://127.0.0.1:3702/workorder', values)
                            .then((response) => {
                                console.log(response.data);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        alert('新增成功')
                        resetForm();
                        
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <Box component={Form} onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    '& label.Mui-focused': {
                                        color: '#4cceac',
                                    }, '& .MuiInputLabel-filled': {
                                        color: '#4cceac',
                                        fontSize: "22px"
                                    }, '& .MuiFilledInput-root': {
                                        fontSize: '22px'
                                    }, "& > div": {
                                        gridColumn: isNonMobile ? undefined : "span 4"
                                    },
                                }}>
                                <TextField sx={{ gridColumn: "span 2" }}
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

                                <TextField sx={{ gridColumn: "span 2" }}
                                    variant="filled"
                                    id="work_order_creator"
                                    name="work_order_creator"
                                    label="派工單建立人員"
                                    fullWidth
                                    value={values.work_order_creator}
                                    disabled
                                    onChange={handleChange}
                                    error={touched.work_order_creator && Boolean(errors.work_order_creator)}
                                    helperText={touched.work_order_creator && errors.work_order_creator}

                                />

                                <TextField sx={{ gridColumn: "span 2" }}
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

                                <TextField sx={{ gridColumn: "span 2" }}
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

                                <TextField sx={{ gridColumn: "span 2" }}
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
                            </Box>

                            <Box style={{ display: 'flex', justifyContent: 'right' }} sx={{ '& .MuiButton-root': { fontSize: '22px', m: 3 } }}>
                                <Button type="submit" color="secondary" variant="contained">儲存</Button>
                            </Box>

                        </Box>
                    )}
                </Formik>
            </Box >
        </Box >
    )

}

export default withAuth(WorkOrder);