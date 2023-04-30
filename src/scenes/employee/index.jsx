import { Box, Button, TextField } from "@mui/material";
import {
    Field,elect,
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
import Select, { StylesConfig } from 'react-select';


const MyCard = () => {

    const [email, setEmail] = useState([]);
    const [dept, setDepts] = useState([]);
    const department = () => map((dep) => ({ value: dep.dept_name, label: dep.dept_name }), dept);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getDepts();

    }, []);

    const [userIsLogin, setUserIsLogin] = useState(false)
    useEffect(() => {
        console.log("session", sessionStorage.getItem('userConfig'))
        if (sessionStorage.getItem('isLogin')) {
            setUserIsLogin(true)
        }
        getUser(sessionStorage.getItem('userConfig'))
    }, [])

    //表單按下單比修改後觸發
    const getUser = (id) => {
        console.log("id", id);
        //請求後端查詢該筆員工id的員工資訊
        axios.get('http://localhost:3702/employee/' + id)
            .then(response => {
                console.log("data:npm", response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        console.log(users);
    };

    function getDepts() {
        axios.get('http://localhost:3702/dept')
            .then(response => {
                console.log(response.data);
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

    return (
        <Box m="20px">
            <Header title="人資表" subtitle="基本資料" />

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
