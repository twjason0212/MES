import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme,  Snackbar, Alert} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { tokens } from "../../theme";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import SaveAsIcon from '@mui/icons-material/SaveAs';


export default function NewCustomers({ handleAdd }) {
    const [open, setopen] = useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [alertOpen, setAlertOpen] = useState(false)
    

    const handleOpen = () => {
        setopen(true);
    }

    const handleClose = () => {
        setopen(false);
    }

    const handleAlertClose = () => {
        setAlertOpen(false)
      };

      


    return (
        <Box sx={{ '& .MuiButton-root': { fontSize: '24px', mr: 2 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="secondary" onClick={handleOpen} startIcon={<DomainAddIcon style={{ fontSize: 32 }} />}>
                    新增客戶
                </Button>
            </Box>

            <Snackbar open={alertOpen} autoHideDuration={1500} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
                <Alert onClose={handleAlertClose} icon={false} sx={{ width: '100%', fontSize: 20, color: 'black', backgroundColor: '#4cceac' }}>
                    新增成功!!
                </Alert>
            </Snackbar>
            <Dialog open={open} onClose={handleClose}
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    "& .titlegreen-text": { color: colors.greenAccent[500], fontSize: "24px", },
                    '& label.Mui-focused': { color: '#4cceac' },
                    '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "24px" },
                    '& .MuiOutlinedInput-root': { fontSize: '24px' },
                    '& .MuiButton-root': { fontSize: '24px' },
                }}>
                <DialogTitle className="titlegreen-text">新增客戶資料</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            customername: '',
                            customerphone: '',
                            customeremail: '',
                            customeraddress: '',
                            customerfax: ''
                        }}
                        validationSchema={Yup.object({
                            customername: Yup.string().required('必填'),
                            customerphone: Yup.string().max(15).required('必填'),
                            customeremail: Yup.string().email('請輸入正確的電子郵件格式'),
                            customeraddress: Yup.string().required('必填'),
                            customerfax: Yup.string().max(15)
                        })}
                        onSubmit={(values) => {
                            axios.post('http://127.0.0.1:3702/coustomer/create', values)
                                .then((response) => {
                                    console.log(response.data);
                                    setAlertOpen(true);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            handleAdd();
                            handleClose();
                            
                        }}
                    >
                        {({ handleSubmit, handleChange, values, errors, touched }) => (
                            <Box component={Form} onSubmit={handleSubmit} sx={{
                                '& label.Mui-focused': {
                                    color: '#4cceac'
                                }
                            }}>
                                <Grid container spacing={3}>
                                    <Grid xs={6}>
                                        <TextField
                                            id="customername"
                                            name="customername"
                                            label="客戶名稱"
                                            fullWidth
                                            value={values.customername}
                                            onChange={handleChange}
                                            error={touched.customername && Boolean(errors.customername)}
                                            helperText={touched.customername && errors.customername}
                                        />
                                    </Grid>
                                    <Grid xs={6}>
                                        <TextField
                                            id="customerphone"
                                            name="customerphone"
                                            label="客戶電話"
                                            fullWidth
                                            value={values.customerphone}
                                            onChange={handleChange}
                                            error={touched.customerphone && Boolean(errors.customerphone)}
                                            helperText={touched.customerphone && errors.customerphone}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid xs={6}>
                                        <TextField
                                            id="customeremail"
                                            name="customeremail"
                                            label="客戶email"
                                            type="email"
                                            fullWidth
                                            value={values.customeremail}
                                            onChange={handleChange}
                                            error={touched.customeremail && Boolean(errors.customeremail)}
                                            helperText={touched.customeremail && errors.customeremail}
                                        />
                                    </Grid>
                                    <Grid xs={6}>
                                        <TextField
                                            id="customerfax"
                                            name="customerfax"
                                            label="客戶傳真"
                                            fullWidth
                                            value={values.customerfax}
                                            onChange={handleChange}
                                            error={touched.customerfax && Boolean(errors.customerfax)}
                                            helperText={touched.customerfax && errors.customerfax}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid xs={12}>
                                        <TextField
                                            id="customeraddress"
                                            name="customeraddress"
                                            label="客戶地址"
                                            fullWidth
                                            value={values.customeraddress}
                                            onChange={handleChange}
                                            error={touched.customeraddress && Boolean(errors.customeraddress)}
                                            helperText={touched.customeraddress && errors.customeraddress}
                                        />
                                    </Grid>
                                </Grid>
                                <DialogActions sx={{ mt: 2, ml: 1 }}>
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