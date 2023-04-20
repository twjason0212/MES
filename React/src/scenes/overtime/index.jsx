import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Typography, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";


export default function OvertimeFormik() {
    const isNonMobile = useMediaQuery("(min-width:600px)");


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
        overtime_type: "week",
        start_date: "",
        start_time: "",
        end_time: "",
        total_time: "",
        cause: ""

    }
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    // const [overtime_type, setType] = React.useState(overtime_type);
    // console.log(useState);

    // const handleTypeChange = (event) => {
    //     setType(event.target.value);
    //   };

    // state = {  } 

    return (
        <Box m="20px">
            <Header title="OVERTIME" subtitle="over time" />

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
                            {/* <Typography variant="h3" align="left">加班申請----FORMIK</Typography> */}


                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="uid"
                                label="員工編號"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                label="申請部門"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.department}
                                name="department"
                                error={!!touched.department && !!errors.department}
                                helperText={touched.department && errors.department}
                                sx={{ gridColumn: "span 2" }}
                            />
                            {touched.department && errors.department ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.department}</ErrorMessage>
                            ) : null}

                            <Select
                                fullWidth
                                variant="filled"
                                type='text'
                                name="overtime_type"
                                label="加班類型"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.overtime_type}
                                error={!!touched.overtime_type && !!errors.overtime_type}
                                helperText={touched.overtime_type && errors.overtime_type}
                                sx={{ gridColumn: "span 2" }}

                            >
                                <MenuItem value="week"><em>平日加班</em></MenuItem>
                                <MenuItem value="weekend">假日加班</MenuItem>
                            </Select><p />

                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                            >
                                <DatePicker
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    name="start_date"
                                    label="加班日期"
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
                                sx={{ gridColumn: "span 2" }}
                            />
                            {touched.start_time && errors.start_time ? (
                                <ErrorMessage className="error-text" style={{ color: 'red' }}>{errors.start_time}</ErrorMessage>
                            ) : null}


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
                            <TextField
                                fullWidth
                                variant="filled"
                                name="cause"
                                multiline
                                rows={4}
                                label="加班事由"
                                //    cols="30" 
                                //    rows="10"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.cause}
                                error={touched.cause && errors.cause}
                                helperText={touched.cause && errors.cause}
                                sx={{ gridColumn: "span 2" }}>
                            </TextField>
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
                    </form>

                )
                }
            </Formik >
        </Box>
    );
}
