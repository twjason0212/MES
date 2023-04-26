import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme,InputAdornment } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { tokens } from "../../theme";

export default function Product() {
    const [opennew, setopennew] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
        handleClosenew();
    };





    return (
        <Box sx={{ '& .MuiButton-root': { fontSize: '18px', mr: 4 } }}>
            <Button variant="contained" size='large' color="secondary" onClick={handleOpennew}>
                新增產品資料
            </Button>
            <Dialog open={opennew} onClose={handleClosenew}
                maxWidth='lg'
                sx={{ '& .MuiTextField-root': { m: 1, mt: 2 }, }}>
                <DialogTitle variant='h4' sx={{ color: colors.greenAccent[500], }}>新增產品資料</DialogTitle>
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

                                            InputLabelProps={{
                                                style: { fontSize: 16 }
                                            }}
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
                                            type="text"
                                            
                                            value={values.photo_url ? values.photo_url.name : ''}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Button
                                                            variant="contained"
                                                            component="label"
                                                            disableElevation
                                                        >
                                                            Upload
                                                            <input
                                                                type="file"
                                                                hidden
                                                                onChange={(event) => {
                                                                    setFieldValue('photo_url', event.currentTarget.files[0]);
                                                                }}
                                                            />
                                                        </Button>
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
                                        {/* <label htmlFor="photo_url">

                                            <Button  type="button" herf="photo_url">
                                                選擇檔案
                                            </Button>
                                        </label>
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
                                        {values.photo_url && (
                                            <div>
                                                <img src={URL.createObjectURL(values.photo_url)} alt="proudct" />
                                            </div>
                                        )} */}
                                    </Grid>
                                </Grid>
                                <DialogActions>
                                    <Button onClick={handleClosenew} color="primary">取消</Button>
                                    <Button type="submit">儲存</Button>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box >
    )
}