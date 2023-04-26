import React from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from 'yup';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import withAuth from "../../components/withAuth";



const ReportOrder = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="報工單" subtitle="填寫報工單" />
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
                        machine_uuid: '',
                        tar_process_amount: '',
                        product_name: '',
                        report_order_creator: '',
                        real_process_amount: '',
                        defect_process_amount: '',
                        process_date: '',
                    }}
                    validationSchema={Yup.object({
                        work_order_id: Yup.string().required('請輸入派工單號'),
                        machine_uuid: Yup.string().required('請輸入機器編號'),
                        tar_process_amount: Yup.number().typeError('必須為數字').min(1, '數量不能為0或負數').required('必填'),
                        product_name: Yup.string().required('請輸入產品名稱'),
                        report_order_creator: Yup.string().required('請輸入報工單建立人員'),
                        real_process_amount: Yup.number().typeError('必須為數字').min(1, '數量不能為0或負數').required('必填'),
                        defect_process_amount: Yup.number().typeError('必須為數字').min(0, '數量不能為負數').required('必填'),
                        process_date: Yup.date().max(new Date(), '日期不能晚於今天').required('請輸入建立日期'),

                    })}
                    onSubmit={(values) => {
                        // axios.post('http://127.0.0.1:3702/coustomer/create', values)
                        //     .then((response) => {
                        //         console.log(response.data);
                        //     })
                        //     .catch((error) => {
                        //         console.log(error);
                        //     });
                        console.log(values);
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <Box component={Form} onSubmit={handleSubmit} sx={{
                            '& label.Mui-focused': {
                                color: '#4cceac'
                            }
                        }}>
                            <Grid container spacing={3} p="20px 12px">
                                <Grid xs={6}>
                                    <TextField
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
                                        value={values.work_order_creator}
                                        onChange={handleChange}
                                        error={touched.work_order_creator && Boolean(errors.work_order_creator)}
                                        helperText={touched.work_order_creator && errors.work_order_creator}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} p="20px 12px" >
                                <Grid xs={6}>
                                    <TextField
                                        variant="filled"
                                        id="work_order_executor"
                                        name="work_order_executor"
                                        label="派工單接收人員"
                                        fullWidth
                                        value={values.work_order_executor}
                                        onChange={handleChange}
                                        error={touched.work_order_executor && Boolean(errors.work_order_executor)}
                                        helperText={touched.work_order_executor && errors.work_order_executor}
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <TextField
                                        variant="filled"
                                        id="machine_uuid"
                                        name="machine_uuid"
                                        label="機器編號"
                                        fullWidth
                                        value={values.machine_uuid}
                                        onChange={handleChange}
                                        error={touched.machine_uuid && Boolean(errors.machine_uuid)}
                                        helperText={touched.machine_uuid && errors.machine_uuid}
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
                                        type="date"
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
export default withAuth(ReportOrder);