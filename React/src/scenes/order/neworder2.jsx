import React, { useState, useEffect } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Autocomplete, Grid,
    Table, TableBody, TableCell, TableHead, TableRow, useTheme, Snackbar, Alert
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { tokens } from "../../theme";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddBoxIcon from '@mui/icons-material/AddBox';






function NewOrder({ setShouldUpdate }) {
    const [open, setopen] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //客戶名稱
    const [customer, setCustomer] = useState([]);
    //自動訂單編號
    const [orderid, setOrderId] = useState([]);
    const [change, setChange] = useState(true);
    //產品名稱
    const [product, setProduct] = useState([]);

    const [alertOpen, setAlertOpen] = useState(false)

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

    //抓產品資料
    useEffect(() => {
        axios.get('http://127.0.0.1:3702/productname')
            .then(response => {
                setProduct(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    useEffect(() => {
        if (change) {
            axios.get('http://127.0.0.1:3702/orderid')
                .then(response => {
                    setOrderId(response.data)
                })
                .catch(error => {
                    console.error(error);
                })
            setChange(false);
        }

    }, [change])

    //驗證
    const initialValues = {
        orderid: orderid,
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


    const handleClickOpen = () => {
        setopen(true);
    };

    const handleClose = () => {
        setopen(false);
    };

    const handleAlertClose = () => {
        setAlertOpen(false)
      };





    return (
        <Box>
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
                <Alert onClose={handleAlertClose} icon={false} sx={{ width: '100%', fontSize: 20, color: 'black', backgroundColor: '#4cceac' }}>
                    新增成功!
                </Alert>
            </Snackbar>
            <Box style={{ display: 'flex', justifyContent: 'right' }} sx={{ '& .MuiButton-root': { fontSize: '24px', mr: 4 } }}>
                <Button variant="contained" color="secondary" onClick={handleClickOpen} startIcon={<NoteAddIcon style={{ fontSize: 28 }} />}>
                    新增訂單
                </Button>
            </Box>
            <Dialog open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiTextField-root': { m: 1, mt: 2 },
                    '& .MuiTableCell-root': { "borderBottom": "1px solid #696969;" },
                    "& .green-text": {
                        color: colors.greenAccent[200],
                        fontSize: "24px",
                    },
                    "& .titlegreen-text": {
                        color: colors.greenAccent[500],
                        fontSize: "24px",
                    },
                    '& label.Mui-focused': {
                        color: '#4cceac'
                    }, '& .MuiInputLabel-outlined': {
                        color: '#4cceac',
                        fontSize: "24px"
                    }, '& .MuiOutlinedInput-root': {
                        fontSize: '24px'
                    }, '& .MuiButton-root': {
                        fontSize: '24px'
                    }, 

                }}
                fullWidth
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title" className="titlegreen-text">新增/修改訂單</DialogTitle>
                <DialogContent id="dialog-description">
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            axios.post('http://127.0.0.1:3702/order/create', values)
                                .then((response) => {
                                    console.log(response.data);
                                    setAlertOpen(true);
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                            console.log(values);
                            setSubmitting(false);
                            setShouldUpdate(true);
                            setChange(true);
                            
                            resetForm();
                            handleClose();
                        }}>
                        {({ values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
                            <Box component={Form} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="訂單編號:"
                                            name="orderid"
                                            fullWidth
                                            disabled
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
                                            sx={{ width: '252px' }}
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
                                            renderOption={(props, option) => (
                                                <li {...props} style={{ fontSize: 24 }}>
                                                    {option.customername}
                                                </li>
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
                                                    <TableCell align="center" className="green-text">產品品名</TableCell>
                                                    {/* <TableCell align="center">規格</TableCell> */}
                                                    <TableCell align="center" className="green-text" sx={{ width: "150px" }}>數量</TableCell>
                                                    <TableCell align="center" className="green-text" sx={{ width: "150px" }}>單價</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {values.products.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="center">
                                                            {/* <TextField
                                                                name={`'productname'${index}`}
                                                                fullWidth
                                                                value={row.productname}
                                                                onChange={(e) => {
                                                                    const { value } = e.target;
                                                                    setFieldValue(`products.${index}.productname`, value);
                                                                }}
                                                                error={Boolean(errors.products?.[index]?.productname)}
                                                                helperText={errors.products?.[index]?.productname}
                                                            /> */}

                                                            <Autocomplete
                                                                sx={{ width: '252px' }}
                                                                options={product}
                                                                getOptionLabel={(option) => option.product_name}
                                                                filterOptions={(options, { inputValue }) =>
                                                                    options.filter((option) =>
                                                                        option.product_name.toLowerCase().includes(inputValue.toLowerCase())
                                                                    )
                                                                }
                                                                onChange={(event, value) => setFieldValue(`products.${index}.productname`, value?.product_name || "")}
                                                                value={product.find((c) => c.product_name === row.productname) || null}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="產品名稱"
                                                                        name={`'productname'${index}`}
                                                                        onBlur={handleBlur}
                                                                        error={Boolean(errors.products?.[index]?.productname)}
                                                                        helperText={errors.products?.[index]?.productname}
                                                                    />
                                                                )}
                                                                renderOption={(props, option) => (
                                                                    <li {...props} style={{ fontSize: 24 }}>
                                                                        {option.product_name}
                                                                    </li>
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
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
                                                        <TableCell align="center">
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
                                                        <Button fullWidth type="button" onClick={() => push({ productname: '', quty: '', price: '' })} variant="contained" color="secondary"
                                                            startIcon={<AddBoxIcon style={{ fontSize: 28 }} />}>
                                                            新增
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    )}
                                </FieldArray>

                                <DialogActions sx={{ mt: 2 }}>

                                    <Button variant="contained" type="submit" color="info" startIcon={<SaveAsIcon style={{ fontSize: 28 }} />}>儲存</Button>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box >
    )
}
export default NewOrder;
