import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button, useTheme, Typography } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import withAuth from "../../components/withAuth";

const TotalLeave = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [clickedRow, setClickedRow] = React.useState();
    const onButtonClick = (e, row) => {
        e.stopPropagation();
        setClickedRow(row);
    };

    const data = [
        {
            uid: '1',
            name: '王大明',
            department: '文書',
            leavetype: '公假',
            starttime: '07:30',
            endtime: '17:30',
        },

        {
            uid: '2',
            name: '朱小妹',
            department: '管理',
            leavetype: '病假',
            starttime: '07:30',
            endtime: '17:30',
        },

    ];


    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'uid', //access nested data with dot notation
                header: 'UID',
            },
            {
                accessorKey: 'name',
                header: '員工姓名',
            },
            {
                accessorKey: 'department', //normal accessorKey
                header: '部別',
            },
            {
                accessorKey: 'leavetype',
                header: '假別',
            },
            {
                accessorKey: 'starttime',
                header: '開始時間',
            },
            {
                accessorKey: 'endtime',
                header: '結束時間',
            },
        ],
    );
    return (
        <Box m="20px">
            <Header title="TotalLeave" subtitle="Total_leave" />

            <MaterialReactTable columns={columns} data={data} />;

        </Box>
    )
};

export default withAuth(TotalLeave);
