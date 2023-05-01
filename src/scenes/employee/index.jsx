import { Box, Button, TextField } from "@mui/material";
import {
<<<<<<< HEAD
    Field,elect,
=======
    Field, elect,
>>>>>>> 980fe97e2675804e4aea33ddbdc43e54c2b7fa75
    FieldProps,
    Form,
    Formik,
    FormikErrors,
    FormikProps
} from 'formik';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect, Component } from "react";
import { map, find, propEq, forEach, isNil } from 'ramda';
import axios from "axios";
<<<<<<< HEAD
import Select, { StylesConfig } from 'react-select';

=======
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
>>>>>>> 980fe97e2675804e4aea33ddbdc43e54c2b7fa75

const MyCard = () => {

    const [email, setEmail] = useState([]);
<<<<<<< HEAD
    const [dept, setDepts] = useState([]);
    const department = () => map((dep) => ({ value: dep.dept_name, label: dep.dept_name }), dept);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getDepts();

    }, []);

    const [userIsLogin, setUserIsLogin] = useState(false)
    useEffect(() => {
=======
    const [depts, setDepts] = useState([]);
    // const department = () => map((dep) => ({ value: dep.dept_name, label: dep.dept_name }), depts);
    const [users, setUsers] = useState([]);

    const [userIsLogin, setUserIsLogin] = useState(false)
    useEffect(() => {
        getDepts();
>>>>>>> 980fe97e2675804e4aea33ddbdc43e54c2b7fa75
        console.log("session", sessionStorage.getItem('userConfig'))
        if (sessionStorage.getItem('isLogin')) {
            setUserIsLogin(true)
        }
        getUser(sessionStorage.getItem('userConfig'))
    }, [])

    //表單按下單比修改後觸發
    const getUser = (id) => {
        console.log("id", id);
<<<<<<< HEAD
        //請求後端查詢該筆員工id的員工資訊
        axios.get('http://localhost:3702/employee/' + id)
            .then(response => {
                console.log("data:npm", response.data);
                setUsers(response.data);
=======
        console.log("userdata1111", users);
        //請求後端查詢該筆員工id的員工資訊
        axios.get('http://localhost:3702/employee/' + id)
            .then(response => {
                setUsers(response.data);
                console.log("data:npm", response.data);
>>>>>>> 980fe97e2675804e4aea33ddbdc43e54c2b7fa75
            })
            .catch(error => {
                console.error(error);
            });
<<<<<<< HEAD
        console.log(users);
=======
        console.log("userdata", users);

>>>>>>> 980fe97e2675804e4aea33ddbdc43e54c2b7fa75
    };

    function getDepts() {
        axios.get('http://localhost:3702/dept')
            .then(response => {
<<<<<<< HEAD
                console.log(response.data);
=======
>>>>>>> 980fe97e2675804e4aea33ddbdc43e54c2b7fa75
                setDepts(response.data)
            })
            .catch(error => {
                console.error(error);
            });

    }

    const handleFormSubmit = (values, { resetForm }) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        axios.post('http://localhost:3702/employee/create', values)
            .then(response => {
                console.log(response.data);
                // setDepts(response.data)
            })
            .catch(error => {
                console.error(error);
            });

        getDepts();
        resetForm();
    };


<<<<<<< HEAD
    // 部門
    // const department = () => map((dep) => ({ value: dep.name, label: dep.name }), dept);
    // const withFormik = Formik({
    //   mapPropsToValues: () => ({ color: "" }),
    //   handleSubmit: (values, { setSubmitting }) => {
    //     setTimeout(() => {
    //       alert(JSON.stringify(values, null, 2));
    //       setSubmitting(false);
    //     }, 1000);
    //   },
    //   displayName: "BasicForm" // helps with React DevTools
    // });
    const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#4cceac',
        justifyContent: 'space-between',
    };
    const groupBadgeStyles = {
        backgroundColor: '#4cceac',
        borderRadius: '2em',
        color: '#4cceac',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center',
    };
    const formatGroupLabel = (data) => (
        <div style={groupStyles}>
            <span>{data.label}</span>
            <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
    );
=======
>>>>>>> 980fe97e2675804e4aea33ddbdc43e54c2b7fa75

    return (
        <Box m="20px">
            <Header title="人資表" subtitle="基本資料" />

<<<<<<< HEAD
            {/* <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}> */}
            <TextField
                name="Employee Name"
                label="員工姓名"
                value={users.employee_name}
                // onChange={handleChange}
                sx={{
                    width: '100%',
                    m: 1,
                    '& label.Mui-focused': { color: '#4cceac', },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                    '& .MuiOutlinedInput-root': { fontSize: '22px' },
                }}
            />
            <TextField
                InputProps={{
                    readOnly: true,
                }}
                name="startwork"
                label="報到日期"
                type="month"
                InputLabelProps={{ shrink: true }}
                value={users.startwork}
                // onChange={handleChange}
                sx={{
                    width: '100%',
                    m: 1,
                    '& label.Mui-focused': { color: '#4cceac', },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                    '& .MuiOutlinedInput-root': { fontSize: '22px' },
                }}
            />
            <TextField
                // fullWidth
                // variant="filled"
                type="text"
                label="帳號"
                // onBlur={handleBlur}
                // onChange={handleChange}
                value={users.employee_account}
                name="account"
                // error={!!touched.account && !!errors.account}
                // helperText={touched.account && errors.account}
                sx={{
                    width: '100%',
                    m: 1,
                    '& label.Mui-focused': { color: '#4cceac', },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                    '& .MuiOutlinedInput-root': { fontSize: '22px' },
                }}
            />
            <TextField
                // fullWidth
                // variant="filled"
                type="password"
                label="密碼"
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.password}
                name="password"
                // error={!!touched.password && !!errors.password}
                // helperText={touched.password && errors.password}
                sx={{
                    width: '100%',
                    m: 1,
                    '& label.Mui-focused': { color: '#4cceac', },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                    '& .MuiOutlinedInput-root': { fontSize: '22px' },
                }}
            />

            <TextField
                // fullWidth
                // variant="filled"
                type="text"
                label="電話"
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.tel}
                name="tel"
                // error={!!touched.tel && !!errors.tel}
                // helperText={touched.tel && errors.tel}
                sx={{
                    width: '100%',
                    m: 1,
                    '& label.Mui-focused': { color: '#4cceac', },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                    '& .MuiOutlinedInput-root': { fontSize: '22px' },
                }}
            />
            <TextField
                // fullWidth
                // variant="filled"
                type="text"
                label="電子信箱"
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.email}
                name="email"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{
                    width: '100%',
                    m: 1,
                    '& label.Mui-focused': { color: '#4cceac', },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                    '& .MuiOutlinedInput-root': { fontSize: '22px' },
                }}
            />

            <Select
                name="dept"
                options={department()}
                defaultValue="選擇部門"
                formatGroupLabel={formatGroupLabel}
                sx={{
                    width: '100%',
                    m: 1,
                    '& label.Mui-focused': { color: '#4cceac', },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                    '& .MuiOutlinedInput-root': { fontSize: '22px' },
                    gridColumn: "span 2",
                }}
            />
            {/* <TextField sx={{ width: '100%', m: 1 }}
            name="Department"
            label="部門"
            value={filter.EmployeeName}
            onChange={inputHandler}
          /> */}
            {/* </div> */}
=======
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={iniValues}
                validationSchema={yup.object({
                    name: yup.string().required('必填'),
                    account: yup.string().max(15).required('必填'),
                    email: yup.string().email('請輸入正確的電子郵件格式'),
                    password: yup.string().required('必填'),
                    tel: yup.string().max(15),
                    dept: yup.string().required('必填')
                })}
            >
                {({ handleBlur, handleSubmit, handleChange, handleReset, values, errors, touched }) => (
                    <Box component={Form} onSubmit={handleSubmit}>
                        <TextField
                            // fullWidth
                            // variant="filled"
                            type="text"
                            label="姓名"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={users.employee_name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            sx={{
                                width: '100%',
                                m: 1,
                                '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiOutlinedInput-root': { fontSize: '22px' },
                                gridColumn: "span 2",
                            }}
                        />
                        <TextField
                            // fullWidth
                            // variant="filled"
                            disabled
                            type="text"
                            label="帳號"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={users.employee_account}
                            name="account"
                            error={!!touched.account && !!errors.account}
                            helperText={touched.account && errors.account}
                            sx={{
                                width: '100%',
                                m: 1,
                                '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiOutlinedInput-root': { fontSize: '22px' },
                                gridColumn: "span 2",
                            }}
                        />
                        <TextField
                            // fullWidth
                            // variant="filled"
                            type="password"
                            label="密碼"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{
                                width: '100%',
                                m: 1,
                                '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiOutlinedInput-root': { fontSize: '22px' },
                                gridColumn: "span 2",
                            }}
                        />

                        <TextField
                            // fullWidth
                            // variant="filled"
                            type="text"
                            label="電話"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.tel}
                            name="tel"
                            error={!!touched.tel && !!errors.tel}
                            helperText={touched.tel && errors.tel}
                            sx={{
                                width: '100%',
                                m: 1,
                                '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiOutlinedInput-root': { fontSize: '22px' },
                                gridColumn: "span 2",
                            }}
                        />
                        <TextField
                            // fullWidth
                            // variant="filled"
                            type="text"
                            label="電子信箱"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            sx={{
                                width: '100%',
                                m: 1,
                                '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiOutlinedInput-root': { fontSize: '22px' },
                                gridColumn: "span 2",
                            }}
                        />
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            name="startwork"
                            label="報到日期"
                            type="month"
                            InputLabelProps={{ shrink: true }}
                            value={users.startwork}
                            // onChange={handleChange}
                            sx={{
                                width: '100%',
                                m: 1,
                                '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiOutlinedInput-root': { fontSize: '22px' },
                            }}
                        />
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.dept}
                                label="選擇部門"
                                name="dept"
                                onChange={handleChange}
                                sx={{
                                    width: '100%',
                                    m: 1,
                                    '& .MuiInputBase-input': { fontSize: 22, },
                                    '& .MuiInputBase-outlined': { color: '#00FFD5', fontSize: "22px" },
                                    '& .MuiInputBase-root': { fontSize: '22px' },
                                    gridColumn: "span 2",
                                }}
                            >
                                {depts.map((dep, index) => (
                                    <MenuItem key={index} value={dep.id}>
                                        {dep.dept_name}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>

                        {/* <Button type="submit" onClick={handleReset} >建立</Button> */}
                        <Button variant='contained' type="submit" color='primary'
                            style={{ fontSize: '22px', backgroundColor: "#21b6ae" }}
                            sx={{
                                width: '100%',
                                m: 1,
                                '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiOutlinedInput-root': { fontSize: '22px' },
                                gridColumn: "span 2",
                            }}>
                            確認資料
                        </Button>
                    </Box>

                )
                }
            </Formik >

>>>>>>> 980fe97e2675804e4aea33ddbdc43e54c2b7fa75
        </Box >
    );
};




const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    account: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    dept: yup.string().required("required"),
    password: yup.string().required("required"),
});
const iniValues = {
    name: "",
    account: "",
    email: "",
    tel: "",
    password: "",
    dept: "選擇部門",
};

export default MyCard;
