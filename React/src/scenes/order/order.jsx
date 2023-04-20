import React, { Component } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Ordertable from './ordertable.jsx';
import Pie from './pieproduct';
import Pie2 from './piecustomer';
import Neworder2 from './neworder2.jsx';
class Order extends Component {
    state = {}
    render() {

        return (
            <React.Fragment>
                <Container>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <div>訂單總覽</div>
                        </Grid>
                        <Grid xs={6} height="250px">
                            <div>訂單分布</div>
                            <Pie2 />
                        </Grid>
                        <Grid xs={6} height="250px">
                            <div>產品分布</div>
                            <Pie />
                        </Grid>
                        <Grid xs={12}>
                            <Neworder2 />
                        </Grid>
                        <Grid xs={12}>
                            <Ordertable />
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default Order;