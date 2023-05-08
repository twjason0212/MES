import { Box, Button, TextField } from "@mui/material";
import {
  Field,
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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import withAuth from "../../components/withAuth";

const EmployeeForm = () => {

  const [depts, setDepts] = useState([]);

  useEffect(() => {
    getDepts();
  }, []);


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
    console.log("CLICK", values);
    // const result = "失敗"
    axios.post('http://localhost:3702/employee/create', values)
      .then(response => {
        // result = response.data;
        console.log("resp", response.data);
        alert(response.data[0]);
        // setDepts(response.data)
      })
      .catch(error => {
        console.error(error);
      });
    // console.log("alert", res.data);
    // alert(result);
    getDepts();
    resetForm();
  };




  return (
    <Box m="40px">
      <Header title="建立人資表" subtitle="基本資料" />

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
              value={values.name}
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
              type="text"
              label="帳號"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.account}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">選擇部門</InputLabel>
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
              新增資料
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
export default EmployeeForm;
// export default withAuth(EmployeeForm);
