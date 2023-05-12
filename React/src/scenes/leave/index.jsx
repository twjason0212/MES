import React, { useState } from 'react';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Box } from '@mui/material';
import axios from 'axios';
import withAuth from "../../components/withAuth";



const LeaveFormik = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // // state = {}
    // const [overtime_type, setType] = React.useState('');
    const valuesSchema = Yup.object().shape({
        employee_account: Yup.string().required("請輸入員工編號"),
        department: Yup.string().required("請輸入申請部門"),
        status: Yup.string().required("請輸入請假類型"),
        start_time: Yup.string().required("請輸入開始時間"),
        end_time: Yup.string().required("請輸入結束時間"),
        // total_time: Yup.string().required("請輸入加班總時數"),
        cause_img: Yup.string().required("請輸入加班事由")
    })
    const initialValues = {
        employee_account: "",
        department: 1,
        status: 2,
        start_date: "",
        start_time: "",
        end_time: "",
        // total_time: "",
        cause_img: ""

    }


    const handleFormSubmit = async (values) => {
        console.log(values);
        // 連接資料庫
        // const formData = { employee_account, department, type, start_time, end_time, cause};
        // const formDataJson = JSON.stringify(formData);
        // console.log(formDataJson);

        try {
            await axios.post('http://localhost:3702/leave', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('新增成功');
            // alert(formDataJson)

        } catch (error) {
            console.error(error.data);
            console.log(error.response, '-------')
            alert('Error submitting form data');
        }
    }


    // function handleChange(event) {
    //     setType(event.target.value);
    // }


    return (
        <Box m="20px">
            <Header title="請假單申請" />

            <Formik
                initialValues={initialValues}
                validationSchema={valuesSchema}
                onSubmit={handleFormSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (


                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="employee_account"
                                label="員工工號"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.employee_account}
                                error={!!touched.employee_account && !!errors.employee_account}
                                helperText={touched.employee_account && errors.employee_account}
                                sx={{
                                    gridColumn: "span 2", '& label.Mui-focused': { color: '#4cceac', },
                                    '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                    '& .MuiFilledInput-root': { fontSize: '22px' }, '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" }, '& .MuiFilledInput-root': { fontSize: '22px' }
                                }}
                            />
                            {touched.employee_account && errors.employee_account ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.employee_account}</ErrorMessage>
                            ) : null}


                            {/* <Select
                            fullWidth
                            variant="filled"
                            name="department"
                            label="申請部門"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.department}
                            error={!!touched.department && !!errors.department}
                            helperText={touched.department && errors.department}

                        >
                            <MenuItem value={1}><em>人事部</em></MenuItem>
                            <MenuItem value={2}>生產部</MenuItem>
                            <MenuItem value={3}>業務部</MenuItem>
                            <MenuItem value={4}>管理部</MenuItem>
                        </Select><p /> */}



                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                name="status"
                                label="請假類型"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}
                                error={!!touched.status && !!errors.status}
                                helperText={touched.status && errors.status}
                                sx={{
                                    gridColumn: "span 2", '& label.Mui-focused': { color: '#4cceac', },
                                    '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                    '& .MuiFilledInput-root': { fontSize: '22px' }, '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" }, '& .MuiFilledInput-root': { fontSize: '22px' }
                                }}
                            >
                                <MenuItem value={2}><em>病假</em></MenuItem>
                                <MenuItem value={3}>事假</MenuItem>
                                <MenuItem value={4}>特休</MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="datetime-local"
                                name="start_time"
                                label="開始時間"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.start_time}
                                error={touched.start_time && errors.start_time}
                                helperText={touched.start_time && errors.start_time}
                                sx={{
                                    gridColumn: "span 2", '& label.Mui-focused': { color: '#4cceac', },
                                    '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                    '& .MuiFilledInput-root': { fontSize: '22px' }, '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" }, '& .MuiFilledInput-root': { fontSize: '22px' }
                                }}
                            />
                            {touched.start_time && errors.start_time ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.start_time}</ErrorMessage>
                            ) : null}


                            <TextField
                                fullWidth
                                variant="filled"
                                type="datetime-local"
                                name="end_time"
                                label="結束時間"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.end_time}
                                error={touched.end_time && errors.end_time}
                                helperText={touched.end_time && errors.end_time}
                                sx={{
                                    gridColumn: "span 2", '& label.Mui-focused': { color: '#4cceac', },
                                    '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                    '& .MuiFilledInput-root': { fontSize: '22px' }, '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" }, '& .MuiFilledInput-root': { fontSize: '22px' }
                                }}
                            />
                            {touched.end_time && errors.end_time ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.end_time}</ErrorMessage>
                            ) : null}

                            {/* <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            name="total_time"
                            label="加班時數"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.total_time}
                            error={touched.total_time && errors.total_time}
                            helperText={touched.total_time && errors.total_time}
                            sx={{ gridColumn: "span 2" }}
                        />
                        {touched.total_time && errors.total_time ? (
                            <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.total_time}</ErrorMessage>
                        ) : null}
                        <p /> */}
                            <Button
                                sx={{ fontSize: "22px" }}
                                color="secondary"
                                variant="contained"
                                component="label">上傳請假證明
                                <input
                                    hidden
                                    fullWidth
                                    variant="filled"
                                    name="cause_img"
                                    type="file"
                                    label="請假事由"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.cause_img}
                                    error={touched.cause_img && errors.cause_img}
                                    helperText={touched.cause_img && errors.cause_img}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Button>
                            {touched.cause_img && errors.cause_img ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.cause_img}</ErrorMessage>
                            ) : null}
                            <p />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained" sx={{ fontSize: "22px" }}>
                                新增請假單
                            </Button>
                        </Box>

                    </form >

                )
                }
            </Formik >
        </Box>
    );

}
export default withAuth(LeaveFormik);
