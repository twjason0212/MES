import {
    Box, Container, Grid, Typography, CardMedia,
    CardContent, Card, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Newproduct from './newproduct';








export default function GridCard() {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:3702/products')
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
        axios.put(`http://127.0.0.1:3702/products`, newData)
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
    const filteredCard = cardData.filter((card) => {
        const { productname } = filter;
        return (
            card.productname.toLowerCase().includes(productname.toLowerCase())
        );
    })

    return (
        <Box>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Newproduct />
                </Box>
                <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="productname"
                        label="產品名稱"
                        value={filter.productname}
                        onChange={handleFilter}
                    />
                </div>
                <Grid container spacing={3}>
                    {filteredCard.map((card) => (
                        <Grid item xs={6} md={3} key={card.productid} onClick={() => handleClickOpen(card)}>
                            <Card sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h6">
                                            {card.productname}
                                        </Typography>
                                        <Typography variant="產品編號" color="text.secondary" component="div" mt="20px">
                                            {card.productid}
                                        </Typography>
                                        <Typography variant="庫存數量" color="text.secondary" component="div" mt="20px">
                                            數量:{card.stock}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        <Button variant="contained" onClick={() => handleClickOpen(card)}>
                                            編輯
                                        </Button>
                                    </Box>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151, height: 245 }}
                                    //image={`../../public/media/${card.productphoto}`}
                                    image={require(`../media/${card.productphoto}`).default}

                                    alt="Prod"
                                />
                                <Box></Box>
                            </Card>
                        </Grid>
                    ))}
                    {datas && (
                        <Dialog open={open} onClose={handleClose} >
                            <DialogTitle>產品資訊</DialogTitle>
                            <DialogContent>
                                <TextField sx={{ mt: 3 }}
                                    label="產品名稱"
                                    value={datas.productname}
                                    fullWidth

                                    disabled
                                />
                                <TextField sx={{ mt: 5 }}
                                    label="產品編號"
                                    value={datas.productid}
                                    fullWidth

                                    disabled
                                />
                                <TextField sx={{ mt: 5 }}
                                    label="庫存數量"
                                    value={datas.stock}
                                    fullWidth
                                    onChange={(event) =>
                                        setDatas({
                                            ...datas,
                                            stock: event.target.value,
                                        })}

                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>取消</Button>
                                <Button onClick={() => handleSave(datas)}>儲存</Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}






