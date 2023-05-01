import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  // Typography,
  // Link,
} from "@mui/material";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import PersonPin from "@mui/icons-material/PersonPin";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
// import { margin } from "@mui/system";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = (props) => {
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "30px 0" };
  const history = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      // .email("please enter valid email")
      .required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values, props) => {
    if (values.username === '') {
      alert('請輸入帳號')
      return false
    } else if (values.password === '') {
      alert('請輸入密碼')
      return false
    } else {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:3702/api/login',
        data: {
          username: values.username,
          password: values.password
        }
      }
      ).then((response) => {
        console.log(response.data);
        console.log(response.data.success);
        if (response.data.success === true) {
          window.sessionStorage.setItem('name', response.data.name)
          window.sessionStorage.setItem('token', response.data.token)
          window.sessionStorage.setItem('user', response.data.login)
          window.sessionStorage.setItem('email', response.data.email)
          window.sessionStorage.setItem('res', response.data.success)
          window.sessionStorage.setItem('dept', response.data.department)
          history('/checkin');
          // 跳轉

          alert('登入成功')
          // window.location.href = `${window.location.origin}`
        }
        if (response.data.success === false) {
          alert('帳號或密碼有誤')
          return false
        }
        if (response.data.login_check === false) {
          alert('帳號有誤')
          return false
        }
        if (response.data.password_check === false) {
          alert('密碼有誤')
          return false
        }
      })
    }

    console.log(values);
    // const isLoggedIn = true;
    // props.setIsLoggedIn(isLoggedIn);
    // setTimeout(() => {
    //   props.resetForm();
    //   props.setSubmitting(false);
    // }, 2000);
  };
  return (
    <Box>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <PersonPin />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  label="Username"
                  name="username"
                  placeholder="Enter username"
                  fullWidth
                  required
                  helperText={<ErrorMessage name="username" />}
                />
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                  helperText={<ErrorMessage name="password" />}
                />
                {/* <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"

                  style={btnstyle}
                  fullWidth
                >
                  登入
                </Button>
              </Form>
            )}
          </Formik>
          {/* <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography> */}
        </Paper>
      </Grid>
    </Box>
  );
};

export default Login;
