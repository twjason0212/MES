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
import chroma from 'chroma-js';

import Select, { StylesConfig } from 'react-select';


const EmployeeForm = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    axios.post('http://localhost:3702/employee', values)
      .then(response => {
        console.log(response.data);
        setDepts(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  };

  // const [dept, setDepts] = useState([]);
  // useEffect(() => {
  //   getDepts();
  // }, []);


  // function getDepts() {
  //   console.log("axios go ~~~~~");
  //   axios.get('http://localhost:3702/dept')
  //     .then(response => {
  //       // console.log(response.data);
  //       setDepts(response.data)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });

  // }

  // const department = () => map((dep) => ({ value: dep.name, label: dep.name }), dept);
  const [dept, setDepts] = useState([]);
  useEffect(() => {
    getDepts();
  }, []);

  function getDepts() {
    console.log("axios go ~~~~~");
    axios.get('http://localhost:3702/dept')
      .then(response => {
        console.log(response.data);
        setDepts(response.data)
      })
      .catch(error => {
        console.error(error);
      });

  }

  // 部門
  const department = () => map((dep) => ({ value: dep.name, label: dep.name }), dept);

  return (
    <Box m="20px">
      <Header title="人資表" subtitle="基本資料" />


      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      // validationSchema={checkoutSchema}
      >

        <Form>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

            <Field
              render={({ field, form }: FieldProps<IMyFormValues>) => (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="帳號"
                  error={Boolean(
                    form.errors.account && form.touched.account
                  )}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  name="account"
                  helperText={
                    form.errors.account &&
                    form.touched.account &&
                    String(form.errors.account)
                  }
                />
              )}
            />
            <Field
              render={({ field, form }: FieldProps<IMyFormValues>) => (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="密碼"
                  error={Boolean(
                    form.errors.password && form.touched.password
                  )}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  name="password"
                  helperText={
                    form.errors.password &&
                    form.touched.password &&
                    String(form.errors.password)
                  }
                />
              )}
            />
            <Field
              render={({ field, form }: FieldProps<IMyFormValues>) => (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="姓名"
                  error={Boolean(
                    form.errors.name && form.touched.name
                  )}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  name="name"
                  helperText={
                    form.errors.name &&
                    form.touched.name &&
                    String(form.errors.name)
                  }
                />
              )}
            />
            <Field
              render={({ field, form }: FieldProps<IMyFormValues>) => (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="電話"
                  error={Boolean(
                    form.errors.tel && form.touched.tel
                  )}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  name="tel"
                  helperText={
                    form.errors.tel &&
                    form.touched.tel &&
                    String(form.errors.tel)
                  }
                />
              )}
            />
            <Field
              render={({ field, form }: FieldProps<IMyFormValues>) => (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="信箱"
                  error={Boolean(
                    form.errors.email && form.touched.email
                  )}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  name="email"
                  helperText={
                    form.errors.email &&
                    form.touched.email &&
                    String(form.errors.email)
                  }
                />
              )}
            />
            <Field
              render={({ field, form }: FieldProps<IMyFormValues>) => (
                <Select>
                  options={department()}
                </Select>
              )}
            />
            {/* <Field
              name="firstName"
              render={({ field, form }: FieldProps<IMyFormValues>) => (
                <TextField
                  error={Boolean(
                    form.errors.EmployeeID && form.touched.EmployeeID
                  )}

                  helperText={
                    form.errors.EmployeeID &&
                    form.touched.EmployeeID &&
                    String(form.errors.EmployeeID)
                  }
                />
              )}
            /> */}
            {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="員工編號"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.EmployeeID}
                name="EmployeeID"
                error={!!touched.EmployeeID && !!errors.EmployeeID}
                helperText={touched.EmployeeID && errors.EmployeeID}
                sx={{ gridColumn: "span 2" }}
            /> */}

            {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="年齡"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="姓名"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="帳號"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="電話"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              /> */}

          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <button type="submit">  Create New User</button>
          </Box>
        </Form>

      </Formik>
    </Box>
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
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  // address1: "",
  // address2: "",
};

export default EmployeeForm;
