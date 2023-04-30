import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import withAuth from '../../components/withAuth';
import axios from 'axios';

const CheckIn = () => {
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);

    const [events, setEvents] = useState([]);


    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            setYear(now.getFullYear());
            setMonth(now.getMonth() + 1);
            setDay(now.getDate());
            setTime(now.toLocaleTimeString());
        }, 1000);
    }, []);

    const handleDateSelect = (type) => {
        const date = new Date();
        const start = type === 'up' ? date.toISOString() : " ";
        const end = type === 'down' ? date.toISOString() : " ";
        
        const eventData = {
            employee_account: window.sessionStorage.getItem('user'),
            starttime: start,
            endtime: end,
        }

        axios.post('http://127.0.0.1:3702/attendance/checkin', eventData)
            .then((response) => {
                console.log(response.data);
                setEvents([...events, eventData]);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data) {
                    alert(error.response.data);
                }
            })


        console.log(events)
    }





    return (
        <Box>
            <Box style={{ width: '100%', 'textAlign': 'center' }}>
                <Box style={{ 'textAlign': 'center', 'fontSize': '25px', 'color': '#fff', 'fontWeight': '700', 'margin': '10px', paddingTop: '20vh' }}>
                    <Typography sx={{ 'fontSize': '48px', 'color': '#fff', 'fontWeight': '700', 'margin': '30px' }}  >{year}年{month}月{day}日</Typography>
                    <Typography sx={{'fontSize': '48px', 'color': '#fff', 'fontWeight': '700', 'margin': '30px'}}>{time}</Typography>
                    <Box>
                        <button type="submit" onClick={() => handleDateSelect('up')}
                            style={{ 'fontSize': '36px', color: '#fff', 'fontWeight': 700, margin: '30px', 'backgroundColor': 'orange' , width:'200px' ,height:'100px'}}
                        >上班</button>
                        <button type="submit" onClick={() => handleDateSelect('down')}
                            style={{ 'fontSize': '36px', color: '#fff', 'fontWeight': 700, margin: '30px', 'backgroundColor': 'orange' , width:'200px' ,height:'100px'}}
                        >下班</button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default withAuth(CheckIn);