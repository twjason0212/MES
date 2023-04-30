import {
    useTheme, Box, Typography, CardMedia,
    CardContent, Card, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Newproduct from './newproduct';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import withAuth from "../../components/withAuth";
import Grid from '@mui/material/Unstable_Grid2';




const GridCard = () => {
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
            row.product_id === datas.product_id ? datas : row
        );
        setCardData(updatedRows);
        setOpen(false);

    }




    //搜索
    const [filter, setFilter] = useState({ product_name: '' })
    const handleFilter = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    }
    const filteredCard = cardData?.filter((card) => {
        const { product_name } = filter;
        return (
            card.product_name.toLowerCase().includes(product_name.toLowerCase())
        );
    })

    return (
        <Box m="20px">
            <Header title="產品總覽" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ width: '30%', backgroundColor: colors.primary[400], ml: 3, mb: 3 
            ,'& .MuiTextField-root': { mt: 2},
            '& label.Mui-focused': {color: '#4cceac'}, 
            '& .MuiInputLabel-outlined': {color: '#4cceac',fontSize: "22px"}, 
            '& .MuiOutlinedInput-root': {fontSize: '22px'}, }}>
                    <TextField sx={{ width: '92%', m: 2 }}
                        name="product_name"
                        label="產品名稱"
                        value={filter.product_name}
                        onChange={handleFilter}
                    />
                </Box>
                <Newproduct />
            </Box>
            <Box sx={{ ml: 3 }}>
                <Grid container spacing={2} >
                    {filteredCard.map((card) => (
                        <Grid  md={3} key={card.product_id} >
                            <Card sx={{  height: 245 ,'& .MuiButton-root': {
                        fontSize: '20px'
                    },}}>
                                <Grid container spacing={2}>
                                    <Grid xs={5}>
                                        <CardContent>
                                            <Typography component="div" variant="h4">
                                                {card.product_name}
                                            </Typography>
                                            <Typography  color="text.secondary" component="div" mt="30px" variant="h4">
                                                編號:{card.product_id}
                                            </Typography>
                                            <Typography  color="text.secondary" component="div" mt="30px" variant="h4">
                                                數量:{card.product_amount}
                                            </Typography>
                                        </CardContent>

                                        <Box sx={{  ml: 2 ,mt:1}}>
                                            <Button variant="contained" color="secondary" fullWidth onClick={() => handleClickOpen(card)}>
                                                編輯
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid xs={7}>
                                        <CardMedia
                                            component="img"
                                            sx={{  height: 245 }}
                                            image={`${process.env.PUBLIC_URL}/media/${card.photo_url}`}
                                            // image={require(`${card.productphoto}`).default}

                                            alt="Prod"
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                    {datas && (
                        <Dialog open={open} onClose={handleClose} sx={{'& .MuiTextField-root': { mt: 2 },
                        '& label.Mui-focused': {
                            color: '#4cceac',
                        }, '& .MuiInputLabel-outlined': {
                            color: '#4cceac',
                            fontSize: "22px"
                        }, '& .MuiOutlinedInput-root': {
                            fontSize: '22px'
                        }, '& .MuiButton-root': {
                            fontSize: '22px',mb:1
                        },}}>
                            <DialogTitle sx={{
                                color: colors.greenAccent[500],
                                fontSize: "22px"
                            }}>修改產品資訊</DialogTitle>
                            <DialogContent>
                                <TextField 
                                    label="產品名稱"
                                    value={datas.product_name}
                                    fullWidth

                                    disabled
                                />
                                <TextField 
                                    label="產品編號"
                                    value={datas.product_id}
                                    fullWidth

                                    disabled
                                />
                                <TextField 
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
                            <DialogActions sx={{ mr: 2,}}>
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

export default withAuth(GridCard);






