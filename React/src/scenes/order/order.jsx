import React, { Component } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Box, useTheme } from '@mui/material';
import Ordertable from './ordertable.jsx';
import Pie from './pieproduct';
import Pie2 from './piecustomer';
import withAuth from "../../components/withAuth";
import Header from "../../components/Header";
import { tokens } from "../../theme";
const Order = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <React.Fragment>
            <Box m="20px">
                <Header title="訂單總覽" />
                <Box m="40px 0 0 0"
                    sx={{
                        "& .green-text": {
                            color: colors.greenAccent[300],
                            fontSize: "24px",
                        },
                        "& .bgColor": {
                            backgroundColor: colors.primary[400]
                        }
                    }}>
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="140px"
                        gap="20px"
                    >
                        <Box gridColumn="span 6"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                            p="30px" className="bgColor">
                            <div className="green-text">訂單分布</div>
                            <Pie2 />
                        </Box>
                        <Box gridColumn="span 6"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                            p="30px" className="bgColor">
                            <div className="green-text">產品分布</div>
                            <Pie />
                        </Box>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <Ordertable />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    );

}

export default withAuth(Order);
