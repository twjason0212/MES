import { Box, Button, TextField } from "@mui/material";
import {
    Field, elect,
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import withAuth from "../../components/withAuth";

const MyCard = () => {

    const [email, setEmail] = useState([]);
    const [depts, setDepts] = useState([]);
    // const department = () => map((dep) => ({ value: dep.dept_name, label: dep.dept_name }), depts);
    const [users, setUsers] = useState([]);

    const [userIsLogin, setUserIsLogin] = useState(false)
    useEffect(() => {
        // getDepts();
        console.log("session", sessionStorage.getItem('user'))
        if (sessionStorage.getItem('isLogin')) {
            setUserIsLogin(true)
        }
        getUser(sessionStorage.getItem('user'))
    }, [])

    // //初始觸發
    // useEffect(() => {
    //     //獲取後端員工清單
    //     getUsers();
    // }, []);



    //表單按下單比修改後觸發
    const getUser = (account) => {
        console.log("account", account);
        console.log("userdata1111", users);
        //請求後端查詢該筆員工id的員工資訊
        axios.get('http://localhost:3702/employee/account/' + account)
            .then(response => {
                setUsers(response.data[0]);
                console.log("data:npm", response.data[0]);
            })
            .catch(error => {
                console.error(error);
            });
        console.log("userdata", users);

    };

    function getDepts() {
        axios.get('http://localhost:3702/dept')
            .then(response => {
                setDepts(response.data)
            })
            .catch(error => {
                console.error(error);
            });

    }

    const handleFormSubmit = (values, { resetForm }) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        axios.post('http://localhost:3702/employee/update', values)
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



    return (
        <Box m="20px">
            <Header title="人資表" subtitle="基本資料" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={iniValues}
                validationSchema={yup.object({
                    email: yup.string().email('請輸入正確的電子郵件格式'),
                    tel: yup.string().max(15)
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
                        {/* <TextField
                            // fullWidth
                            // variant="filled"
                            type="password"
                            label="密碼"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={users.employee_pwd}
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
                        /> */}

                        <TextField
                            // fullWidth
                            // variant="filled"
                            type="text"
                            label="電話"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={users.employee_tel}
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
                            value={users.employee_email}
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
                            disabled
                            InputProps={{
                                readOnly: true,
                            }}
                            name="startwork"
                            label="報到日期"
                            value={users.startwork_time}
                            // onChange={handleChange}
                            sx={{
                                width: '100%',
                                m: 1,
                                '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiOutlinedInput-root': { fontSize: '22px' },
                            }}
                        />
                        {/* <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={users.dept_name}
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
                        </FormControl> */}
                        <TextField
                            // fullWidth
                            // variant="filled"
                            type="text"
                            label="部門"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={users.dept_name}
                            name="dept"
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

export default withAuth(MyCard);
