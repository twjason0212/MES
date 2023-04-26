import React from 'react';
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
import withAuth from "../../components/withAuth";



 const LeaveFormik = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // // state = {}
    // const [overtime_type, setType] = React.useState('');
    const valuesSchema = Yup.object().shape({
        uid: Yup.number().required("請輸入員工編號").positive().integer(),
        department: Yup.string().required("請輸入申請部門"),
        start_time: Yup.string().required("請輸入開始時間"),
        end_time: Yup.string().required("請輸入結束時間"),
        total_time: Yup.string().required("請輸入加班總時數"),
        cause: Yup.string().required("請輸入加班事由")
    })
    const initialValues = {
        uid: 1,
        department: "",
        leave_type: 1,
        start_date: "",
        start_time: "",
        end_time: "",
        total_time: "",
        cause: ""

    }
    const handleFormSubmit = (values) => {
        console.log(values);
    };


    // function handleChange(event) {
    //     setType(event.target.value);
    // }


    return (
        <Box m="20px">
            <Header title="Leave" subtitle="Leave" />

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


                    <form onSubmit={handleSubmit}>
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
                                type="number"
                                name="uid"
                                label="員工編號"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.uid}
                                error={!!touched.uid && !!errors.uid}
                                helperText={touched.uid && errors.uid}
                                sx={{ gridColumn: "span 2" }}
                            />
                            {touched.uid && errors.uid ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.uid}</ErrorMessage>
                            ) : null}

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="department"
                                label="申請部門"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.department}
                                error={touched.department && errors.department}
                                helperText={touched.department && errors.department}
                                sx={{ gridColumn: "span 2" }}
                            />
                            {touched.department && errors.department ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.department}</ErrorMessage>
                            ) : null}

                            <Select
                                fullWidth
                                variant="filled"
                                name="leave_type"
                                label="請假類型"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.leave_type}
                                error={!!touched.leave_type && !!errors.leave_type}
                                helperText={touched.leave_type && errors.leave_type}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value={1}><em>病假</em></MenuItem>
                                <MenuItem value={2}>事假</MenuItem>
                                <MenuItem value={3}>公假</MenuItem>
                                <MenuItem value={4}>喪假</MenuItem>
                                <MenuItem value={5}>生理假</MenuItem>
                            </Select><p />


                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    name="start_date"
                                    label="開始日期"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.start_date}
                                    error={!!touched.start_date && !!errors.start_date}
                                    helperText={touched.start_date && errors.start_date}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </LocalizationProvider>


                            <TextField
                                fullWidth
                                variant="filled"
                                type="time"
                                name="start_time"
                                label="開始時間"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.start_time}
                                error={touched.start_time && errors.start_time}
                                helperText={touched.start_time && errors.start_time}
                            />
                            {touched.start_time && errors.start_time ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.start_time}</ErrorMessage>
                            ) : null}

                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    fullWidth
                                    variant="filled"
                                    name="end_date"
                                    label="結束日期"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.end_date}
                                    error={touched.end_date && errors.end_date}
                                    helperText={touched.end_date && errors.end_date}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </LocalizationProvider>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="time"
                                name="end_time"
                                label="結束時間"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.end_time}
                                error={touched.end_time && errors.end_time}
                                helperText={touched.end_time && errors.end_time}
                                sx={{ gridColumn: "span 2" }}
                            />
                            {touched.end_time && errors.end_time ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.end_time}</ErrorMessage>
                            ) : null}

                            <TextField
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
                            <p />


                            <input
                                fullWidth
                                variant="filled"
                                name="cause"
                                type="file"
                                label="加班事由"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.cause}
                                error={touched.cause && errors.cause}
                                helperText={touched.cause && errors.cause}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {touched.cause && errors.cause ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.cause}</ErrorMessage>
                            ) : null}
                            <p />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create the form
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