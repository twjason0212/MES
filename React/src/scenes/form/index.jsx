import { Box, Button, TextField , Autocomplete} from "@mui/material";
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
import chroma from 'chroma-js';
import withAuth from "../../components/withAuth";
import Select, { StylesConfig } from 'react-select';


const EmployeeForm = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    axios.post('http://localhost:3702/employee/create', values)
      .then(response => {
        console.log(response.data);
        setDepts(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  };


  // const department = () => map((dep) => ({ value: dep.name, label: dep.name }), dept);
  const [dept, setDepts] = useState([]);
  useEffect(() => {
    getDepts();
  }, []);

  function getDepts() {
    axios.get('http://127.0.0.1:3702/dept')
      .then(response => {
        console.log(response.data);
        setDepts(response.data)
      })
      .catch(error => {
        console.error(error);
      });

  }

  // 部門
  // const department = () => map((dep) => ({ value: dep.name, label: dep.name }), dept);


  return (
    <Box m="20px">
      <Header title="人資表" subtitle="基本資料" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      // validationSchema={checkoutSchema}
      >
        {({ setFieldValue,handleBlur, handleSubmit, handleChange, values, errors, touched }) => (
          <Box component={Form} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="姓名"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              sx={{ '& label.Mui-focused': { color: '#4cceac' }, gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="帳號"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.account}
              name="account"
              error={!!touched.account && !!errors.account}
              helperText={touched.account && errors.account}
              sx={{ '& label.Mui-focused': { color: '#4cceac' }, gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="密碼"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              sx={{ '& label.Mui-focused': { color: '#4cceac' }, gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="電話"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tel}
              name="tel"
              error={!!touched.tel && !!errors.tel}
              helperText={touched.tel && errors.tel}
              sx={{ '& label.Mui-focused': { color: '#4cceac' }, gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="電子信箱"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ '& label.Mui-focused': { color: '#4cceac' }, gridColumn: "span 2" }}
            />
            <select
              name="dept"
              value={values.color}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ display: "block" }}
            >
              <option value="" label="選擇部門">
                選擇部門{" "}
              </option>
              {dept.map((option) => (
                <option value={option.id} label={option.dept_name}>{option.dept_name}</option>
              ))}
            </select>
            
            {/* <Autocomplete
              sx={{ width: '252px' }}
              options={dept}
              getOptionLabel={(option) => option.dept_name}
              filterOptions={(options, { inputValue }) =>
                options.filter((option) =>
                  option.dept_name.toLowerCase().includes(inputValue.toLowerCase())
                )
              }
              onChange={(event, value) => setFieldValue("dept_name", value?.dept_name || "")}
              value={dept.find((c) => c.dept_name === values.dept_name) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="客戶名稱"
                  name="dept_name"
                  onBlur={handleBlur}
                  error={touched.dept_name && Boolean(errors.dept_name)}
                  helperText={touched.dept_name && errors.dept_name}
                />
              )}
            /> */}
            
            <button type="submit">Submit</button>
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
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  name: "",
  account: "",
  email: "",
  password: "",
  dept: "",
};

export default withAuth(EmployeeForm);
