import React, { useState, useEffect } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Autocomplete, Grid,
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const initialValues = {
    orderid: '',
    orderdate: '',
    deliverydate: '',
    customername: '',
    products: [{ productname: '', quty: '', price: '' }],
};


const validationSchema = Yup.object().shape({
    orderid: Yup.string().required('必填'),
    orderdate: Yup.date().max(new Date(), '日期不能晚於今天').required('請輸入建立日期'),
    deliverydate: Yup.date().min(new Date(), '交貨日期必須晚於今天').required('請輸入交貨日期'),
    customername: Yup.string().required('必填'),
    products: Yup.array().of(
        Yup.object().shape({
            productname: Yup.string().required('必填'),
            quty: Yup.number().typeError('必須為數字').min(1, '數量不能為0或負數').required('必填'),
            price: Yup.number().typeError('必須為數字').required('必填'),
        }),
    ),
});



export default function NewOrder() {
    const [open, setopen] = useState(false);

    //客戶名稱
    const [customer, setCustomer] = useState([]);

    //抓客戶名稱資料
    useEffect(() => {
        axios.get('http://127.0.0.1:3702/coustomername')
            .then(response => {
                setCustomer(response.data)
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    const handleClickOpen = () => {
        setopen(true);
    };

    const handleClose = () => {
        setopen(false);
    };

    //onClick sumbit 發送資料
    // const handleSubmit = (values, { setSubmitting }, { resetForm }) => {
    //     // TODO: 使用axios将formData发送到后端API
    //     setSubmitting(false);
    //     console.log(values);
    //     resetForm();
    //     handleClose();
    // };








    return (
        <Box>
            <Box style={{ display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    新增訂單
                </Button>
            </Box>
            <Dialog open={open}
                onClose={handleClose}
                sx={{ '& .MuiTextField-root': { m: 1, mt: 2 }, }}
                maxWidth='lg'

            >
                <DialogTitle>新增/修改訂單</DialogTitle>
                <DialogContent>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            axios.post('http://127.0.0.1:3702/order/create', values)
                                .then((response) => {
                                    console.log(response.data);
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                            console.log(values);
                            setSubmitting(false);
                            resetForm();
                            handleClose();
                        }}>
                        {({ values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
                            <Box component={Form} onSubmit={handleSubmit} >
                                <Grid container spacing={2}>
                                    <Grid item xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="訂單編號:"
                                            name="orderid"
                                            fullWidth
                                            value={values.orderid}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.orderid && Boolean(errors.orderid)}
                                            helperText={touched.orderid && errors.orderid}
                                        />
                                    </Grid>
                                    <Grid item xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="建單日期:"
                                            name="orderdate"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={values.orderdate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.orderdate && Boolean(errors.orderdate)}
                                            helperText={touched.orderdate && errors.orderdate}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs display="flex" justifyContent="start" alignItems="center">
                                        <Autocomplete
                                            sx={{ width: '243.5px' }}
                                            options={customer}
                                            getOptionLabel={(option) => option.customername}
                                            filterOptions={(options, { inputValue }) =>
                                                options.filter((option) =>
                                                    option.customername.toLowerCase().includes(inputValue.toLowerCase())
                                                )
                                            }
                                            onChange={(event, value) => setFieldValue("customername", value?.customername || "")}
                                            value={customer.find((c) => c.customername === values.customername) || null}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="客戶名稱"
                                                    name="customername"
                                                    onBlur={handleBlur}
                                                    error={touched.customername && Boolean(errors.customername)}
                                                    helperText={touched.customername && errors.customername}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="交貨日期:"
                                            name="deliverydate"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={values.deliverydate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.deliverydate && Boolean(errors.deliverydate)}
                                            helperText={touched.deliverydate && errors.deliverydate}
                                        />
                                    </Grid>
                                </Grid>

                                <FieldArray name="products">
                                    {({ push, remove }) => (
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">產品品名</TableCell>
                                                    {/* <TableCell align="center">規格</TableCell> */}
                                                    <TableCell align="center" sx={{ width: "100px" }}>數量</TableCell>
                                                    <TableCell align="center" sx={{ width: "100px" }}>單價</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {values.products.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <TextField
                                                                name={`'productname'${index}`}
                                                                value={row.productname}
                                                                onChange={(e) => {
                                                                    const { value } = e.target;
                                                                    setFieldValue(`products.${index}.productname`, value);
                                                                }}
                                                                error={Boolean(errors.products?.[index]?.productname)}
                                                                helperText={errors.products?.[index]?.productname}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                name={`'quty'${index}`}
                                                                value={row.quty}
                                                                onChange={(e) => {
                                                                    const { value } = e.target;
                                                                    setFieldValue(`products.${index}.quty`, value);
                                                                }}
                                                                error={Boolean(errors.products?.[index]?.quty)}
                                                                helperText={errors.products?.[index]?.quty}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                name={`'price'${index}`}
                                                                value={row.price}
                                                                onChange={(e) => {
                                                                    const { value } = e.target;
                                                                    setFieldValue(`products.${index}.price`, value);
                                                                }}
                                                                error={Boolean(errors.products?.[index]?.price)}
                                                                helperText={errors.products?.[index]?.price}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell colSpan={5}>
                                                        <Button type="button" onClick={() => push({ productname: '', quty: '', price: '' })} color="primary">
                                                            新增
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    )}
                                </FieldArray>

                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">取消</Button>
                                    <Button type="submit" color="primary">儲存</Button>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box >
    )
}