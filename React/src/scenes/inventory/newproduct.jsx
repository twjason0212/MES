import React, { useState } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box}from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { tokens } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from '@mui/material/IconButton';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export default function Product({ setShouldUpdate }) {
    const [opennew, setopennew] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [alertOpen, setAlertOpen] = useState(false)

    const handleOpennew = () => {
        setopennew(true);
    }

    const handleClosenew = () => {
        setopennew(false);
    }


    const handleSubmitnew = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('product_name', values.product_name);
        formData.append('photo_url', values.photo_url);
        console.log(values);
        axios.post('http://127.0.0.1:3702/product/create', formData).then((response) => {
            console.log(response.data);
        });
        setSubmitting(false);
        setShouldUpdate(true);
        setAlertOpen(true);
        handleClosenew();
    };


    const handleAlertClose = () => {
        setAlertOpen(false)
      };





    return (
        <Box sx={{ '& .MuiButton-root': { fontSize: '22px', mr: 4 } }}>
            <Button variant="contained" color="secondary" onClick={handleOpennew} startIcon={<AddCircleOutlineIcon style={{ fontSize: 28 }} />}
            >
                新增產品
            </Button>
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
                <Alert onClose={handleAlertClose} icon={false} sx={{ width: '100%', fontSize: 20, color: 'black', backgroundColor: '#4cceac' }}>
                    新增成功!!
                </Alert>
            </Snackbar>
            <Dialog open={opennew} onClose={handleClosenew}
                sx={{
                    '& .MuiTextField-root': { mt: 2 },
                    '& label.Mui-focused': {
                        color: '#4cceac',
                    }, '& .MuiInputLabel-outlined': {
                        color: '#4cceac',
                        fontSize: "24px"
                    }, '& .MuiOutlinedInput-root': {
                        fontSize: '24px'
                    }, '& .MuiButton-root': {
                        fontSize: '24px',

                    }, '& .MuiIconButton': {
                        fontSize: '24px',
                        color: '#4cceac',
                    },
                }}>
                <DialogTitle variant='h3' sx={{ color: colors.greenAccent[500], }}>新增產品資料</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{

                            product_name: '',
                            photo_url: ''
                        }}
                        validationSchema={Yup.object({

                            product_name: Yup.string().required('必填'),
                            photo_url: Yup.mixed().required('必須選擇一個圖片'),
                        })}
                        onSubmit={handleSubmitnew}
                    >
                        {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
                            <Box component={Form} onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid xs={12}>
                                        <TextField
                                            id="product_name"
                                            name="product_name"
                                            label="產品名稱"
                                            fullWidth
                                            value={values.product_name}
                                            onChange={handleChange}
                                            error={touched.product_name && Boolean(errors.product_name)}
                                            helperText={touched.product_name && errors.product_name}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid xs={12}>
                                        <TextField
                                            id="photo_url"
                                            name="photo_url"
                                            label="產品照片"
                                            type="text"
                                            value={values.photo_url ? values.photo_url.name : ''}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            variant="contained"
                                                            component="label"
                                                            disableElevation
                                                        >

                                                            <input
                                                                type="file"
                                                                hidden
                                                                onChange={(event) => {
                                                                    setFieldValue('photo_url', event.currentTarget.files[0]);
                                                                }}
                                                            />
                                                            <AddAPhotoIcon style={{ fontSize: 32, color: '#4cceac' }} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {errors.photo_url && touched.photo_url && <div>{errors.photo_url}</div>}
                                        {values.photo_url && (
                                            <div>
                                                <img src={URL.createObjectURL(values.photo_url)} alt="proudct" />
                                            </div>
                                        )}
                                        {/* <label htmlFor="photo_url" style={{fontSize:'22px'}}>
                                            上傳照片:
                                            <input
                                                id="photo_url"
                                                name="photo_url"
                                                label="產品照片"
                                                type='file'
                                                style={{ display: 'none' }}
                                                onChange={(event) => {
                                                    setFieldValue('photo_url', event.currentTarget.files[0]);
                                                }}
                                            />
                                            <Button type="button" component="span" variant="contained">
                                                選擇檔案
                                            </Button>
                                        </label>

                                        {values.photo_url && (
                                            <div>
                                                <img src={URL.createObjectURL(values.photo_url)} alt="proudct" />
                                            </div>
                                        )} */}
                                    </Grid>
                                </Grid>
                                <DialogActions sx={{ mt: 2 }}>
                                    <Button variant="contained" color="info" type="submit" fullWidth startIcon={<SaveAsIcon style={{ fontSize: 28 }} />}
                                    >儲存</Button>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box >
    )
}