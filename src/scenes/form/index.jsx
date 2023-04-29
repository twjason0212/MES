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
import Select, { StylesConfig } from 'react-select';


const EmployeeForm = () => {

  const [email, setEmail] = useState([]);
  const [dept, setDepts] = useState([]);
  const department = () => map((dep) => ({ value: dep.dept_name, label: dep.dept_name }), dept);

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
    <Box m="40px">
      <Header title="建立人資表" subtitle="基本資料" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={iniValues}
        validationSchema={checkoutSchema}
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
            {/* <select
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
            </select> */}
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


            <button type="submit" onClick={handleReset} >建立</button>

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
