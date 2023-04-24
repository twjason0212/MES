import {
    useTheme, Box, Grid, Typography, CardMedia,
    CardContent, Card, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Newproduct from './newproduct';
import Header from "../../components/Header";
import { tokens } from "../../theme";






export default function GridCard() {
    const [cardData, setCardData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        axios.get('http://127.0.0.1:3702/product')
            .then(response => {
                setCardData(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    //詳細資料
    const [open, setOpen] = useState(false);
    const [datas, setDatas] = useState(null);

    const handleClickOpen = (card) => {
        setDatas(card);
        setOpen(true);
    };

    const handleClose = () => {
        setDatas(null);
        setOpen(false);
    };

    const handleSave = (newData) => {
        axios.put(`http://127.0.0.1:3702/product`, newData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });


        const updatedRows = cardData.map(row =>
            row.productid === datas.productid ? datas : row
        );
        setCardData(updatedRows);
        setOpen(false);

    }




    //搜索
    const [filter, setFilter] = useState({ productname: '' })
    const handleFilter = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    }
    const filteredCard = cardData?.filter((card) => {
        const { productname } = filter;
        return (
            card.productname.toLowerCase().includes(productname.toLowerCase())
        );
    })

    return (
        <Box m="20px">
            <Header title="產品總覽" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ width: '30%', backgroundColor: colors.primary[400], ml: 3, mb: 3 }}>
                    <TextField sx={{ width: '92%', m: 2 }}
                        name="productname"
                        label="產品名稱"
                        value={filter.productname}
                        onChange={handleFilter}
                    />
                </Box>
                <Newproduct />
            </Box>
            <Box sx={{ml:3}}> 
                <Grid container spacing={2} >
                    {filteredCard.map((card) => (
                        <Grid item xs={6} md={3} key={card.product_id} onClick={() => handleClickOpen(card)}>
                            <Card sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h6">
                                            {card.product_name}
                                        </Typography>
                                        <Typography variant="產品編號" color="text.secondary" component="div" mt="20px">
                                            {card.product_id}
                                        </Typography>
                                        <Typography variant="庫存數量" color="text.secondary" component="div" mt="20px">
                                            數量:{card.product_amount}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        <Button variant="contained" size='large' color="secondary" onClick={() => handleClickOpen(card)}>
                                            編輯
                                        </Button>
                                    </Box>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151, height: 245 }}
                                    //image={`../../public/media/${card.productphoto}`}
                                    // image={require(`${card.productphoto}`).default}

                                    alt="Prod"
                                />
                            </Card>
                        </Grid>
                    ))}
                    {datas && (
                        <Dialog open={open} onClose={handleClose} >
                            <DialogTitle sx={{color: colors.greenAccent[500],
                    fontSize: "22px"}}>修改產品資訊</DialogTitle>
                            <DialogContent>
                                <TextField sx={{ mt: 3 }}
                                    label="產品名稱"
                                    value={datas.product_name}
                                    fullWidth

                                    disabled
                                />
                                <TextField sx={{ mt: 5 }}
                                    label="產品編號"
                                    value={datas.product_id}
                                    fullWidth

                                    disabled
                                />
                                <TextField sx={{ mt: 5 }}
                                    label="庫存數量"
                                    value={datas.product_amount}
                                    fullWidth
                                    onChange={(event) =>
                                        setDatas({
                                            ...datas,
                                            product_amount: event.target.value,
                                        })}

                                />
                            </DialogContent>
                            <DialogActions sx={{mr:1, mb:1}}>
                                <Button onClick={handleClose} variant="contained" color="error">取消</Button>
                                <Button onClick={() => handleSave(datas)} variant="contained" type="submit" color="info">儲存</Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}






