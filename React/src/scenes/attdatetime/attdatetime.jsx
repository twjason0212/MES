import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './style.css';
import { Box, styled } from '@mui/material';
import Header from "../../components/Header";
import withAuth from "../../components/withAuth";
import axios from 'axios';

function Attdatetime() {


    const [events, setEvents] = useState([{
        title: '打卡',
        start: '2023-04-28T07:59:20',

    }]);
    const amm = window.sessionStorage.getItem('user');
    useEffect(() => {
        axios.get('http://127.0.0.1:3702/attendance/emp', {
            params: {
                user: amm
            }
        })
            .then(response => {

                const data = response.data.flatMap((att) => [
                    {
                        title: '上班',
                        start: att.starttime
                    },
                    {
                        title: '下班',
                        start: att.endtime
                    }
                ]);
console.log(data)
                setEvents(data);
            })
            .catch(error => {
                console.error(error);
            })

    }, [])


    return (
        <Box m="20px">
            <Header title="出缺勤紀錄" />
            <Box className="container" sx={{fontSize:'22px'}}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="zh-tw"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek',
                    }}

                    buttonText={{
                        prev: '上個月',
                        next: '下個月',
                        today: '今天',
                        month: '月',
                        week: '週',
                    }}
                    events={events}
                />
            </Box>
        </Box>
    );
}

export default withAuth(Attdatetime);
