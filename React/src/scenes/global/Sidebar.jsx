import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import FactoryIcon from '@mui/icons-material/Factory';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import StarBorder from '@mui/icons-material/StarBorder';
import { Style } from "@mui/icons-material";

import withAuth from "../../components/withAuth";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");

  //部門控制

  const department = window.sessionStorage.getItem('dept');


  // 控制選單開合
  const [EmployeeSystemopen, setEmployeeSystemopen] = React.useState(true);
  const [EmployeeManageopen, setEmployeeManageopen] = React.useState(true);
  const [HRPersonalopen, setHRPersonalopen] = React.useState(true);
  const [HRManageopen, setHRManageopen] = React.useState(true);
  const [BusinessPersonalopen, setBusinessPersonalopen] = React.useState(true);
  const [BusinessManageopen, setBusinessManageopen] = React.useState(true);
  const [ManagerPersonalopen, setManagerPersonalopen] = React.useState(true);
  const [Companyopen, setCompanyopen] = React.useState(true);
  const history = useNavigate();

  const EmployeePersonalhandleClick = () => {
    setEmployeeSystemopen(!EmployeeSystemopen);
  };
  const EmployeeManagehandleClick = () => {
    setEmployeeManageopen(!EmployeeManageopen);
  };
  const HRPersonalhandleClick = () => {
    setHRPersonalopen(!HRPersonalopen);
  };
  const HRManagehandleClick = () => {
    setHRManageopen(!HRManageopen);
  };
  const BusinessPersonalhandleClick = () => {
    setBusinessPersonalopen(!BusinessPersonalopen);
  };
  const BusinessManagehandleClick = () => {
    setBusinessManageopen(!BusinessManageopen);
  };
  const ManagerPersonalhandleClick = () => {
    setManagerPersonalopen(!ManagerPersonalopen);
  };
  const CompanyhandleClick = () => {
    setCompanyopen(!Companyopen);
  };

  //登出
  const logout = () => {
    window.sessionStorage.clear();
    history('/');
  }


  const name = window.sessionStorage.getItem('name');
  const dept = window.sessionStorage.getItem('dept');

  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          position: "fixed",

          height: "100%",
          left: "0"
        },
        "& .pro-sidebar-inner": {
          background: `${colors.blueAccent[800]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                sx={{ '& .MuiButton-root': { fontSize: '18px' } }}
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Dashboard
                </Typography>
                <Button onClick={logout} variant="contained" size="small" color="error">
                  登出
                </Button>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center" >
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 10px 0" }}
                >
                  {name}
                </Typography>
                <Typography variant="h4" color={colors.greenAccent[400]}>
                  {dept}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <List component="div" disablePadding >
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{ fontSize: '20px' }}
                />
                <Link to="/"></Link>
              </ListItemButton>
            </List>
            {/* <ListItemButton>
            <ListItemIcon>
                      <HomeOutlinedIcon />
                    </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: '22px' }}
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 0px" }}

              >
                Home
              </ListItemText>
              <Link to="/"></Link>
            </ListItemButton> */}
            {/* <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* 全部測試*/}

            {department.includes("生產2部") && (
              <>

                言
                <>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <PeopleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="員工基本資料"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      {/* <Link to="/team"></Link> */}
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <PeopleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="所有員工資料" />
                      <Link to="/team"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="新增員工" />
                      <Link to="/form"></Link>
                    </ListItemButton>
                  </List>
                </>

                佩
                <>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="請假單申請"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/leave"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="加班單申請"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/overtime"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <ChecklistIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="出缺勤狀況 1"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/total_leave"></Link>
                    </ListItemButton>
                  </List>
                </>

                冠
                <>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="監控面板"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/dashboard"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="機台總攬" />
                      <Link to="/factory"></Link>
                    </ListItemButton>
                  </List>
                </>

                峰
                <>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="新增派工單"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/workorder"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="派工單列表"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/workorderlist"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="個人待辦工單"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/pendingwork"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="個人待辦工單-主管"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/pendingworkLeader"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="產品管理"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/inventory"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="訂單管理"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/order"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="客戶管理"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/customers"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="出缺勤狀況 2"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/attendance"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="員工打卡"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/checkin"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="員工個人出缺勤"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/attdatetime"></Link>
                    </ListItemButton>
                  </List>
                </>

              </>
            )}


            {/* 員工 */}

            {department.includes("工程部") && (
              <>
                <ListItemButton onClick={EmployeePersonalhandleClick}>
                  <ListItemText
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                    primaryTypographyProps={{ fontSize: '22px' }} >
                    個人系統
                  </ListItemText>
                  {/* 折疊menu */}
                  {EmployeeSystemopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={EmployeeSystemopen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <PeopleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="基本資料"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to="/employee"></Link>
                    </ListItemButton>
                  </List>
                  {/* <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="請假單申請" />
                      <Link to="/leave"></Link>
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="加班單申請" />
                      <Link to="/overtime"></Link>
                    </ListItemButton>
                  </List> */}
                  {/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單查詢" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單查詢" />
                  </ListItemButton>
                </List> */}

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <ChecklistIcon />
                      </ListItemIcon>
                      <ListItemText primary="打卡"
                        primaryTypographyProps={{ fontSize: '20px' }}
                      />
                      <Link to="/checkin"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <ChecklistIcon />
                      </ListItemIcon>
                      <ListItemText primary="出缺勤狀況"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to="/attdatetime"></Link>
                    </ListItemButton>
                  </List>
                </Collapse>

                <ListItemButton onClick={EmployeeManagehandleClick}>
                  <ListItemText
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 0px" }}
                    primaryTypographyProps={{
                      fontSize: '22px',
                      fontWeight: 'medium',
                      color: '#4cceac'
                    }}
                  >
                    生產管理
                  </ListItemText>
                  {/* 折疊menu */}
                  {EmployeeManageopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={EmployeeManageopen} timeout="auto" unmountOnExit>

                  {department === "生產部主管" && (
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <FeedRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="新增派工單"
                          primaryTypographyProps={{ fontSize: '20px' }} />
                        <Link to="/workorder"></Link>
                      </ListItemButton>
                    </List>
                  )}

                  {department === "生產部員工" && (
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <FeedRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="派工單"
                          primaryTypographyProps={{ fontSize: '20px' }} />
                        <Link to="/workorderlist"></Link>
                      </ListItemButton>
                    </List>
                  )}

                  {department === "生產部員工" && (
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <FeedRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="待辦工單"
                          primaryTypographyProps={{ fontSize: '20px' }} />
                        <Link to="/pendingwork"></Link>
                      </ListItemButton>
                    </List>
                  )}

                  {department === "生產部主管" && (
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <FeedRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="待辦工單"
                          primaryTypographyProps={{ fontSize: '20px' }} />
                        <Link to="/pendingworkLeader"></Link>
                      </ListItemButton>
                    </List>
                  )}

                  {department === "生產部主管" && (
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <FeedRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="已完成工單列表"
                          primaryTypographyProps={{ fontSize: '20px' }} />
                        <Link to="/worlorderall"></Link>
                      </ListItemButton>
                    </List>
                  )}

                  {department === "生產部主管" && (
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <FactoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="機台資訊"
                          primaryTypographyProps={{ fontSize: '20px' }} />
                        <Link to="/factory"></Link>
                      </ListItemButton>
                    </List>
                  )}
                  {/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <ImportContactsSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="知識庫" />
                  </ListItemButton>
                </List> */}
                </Collapse>
              </>
            )}
            {/* 人事 */}
            {department.includes("人事部") && (
              <>

                {/* <Typography
                  variant="h3"
                  color={colors.greenAccent[300]}
                  sx={{ m: "15px 0 5px 0px" }}
                >
                  人事
                </Typography> */}
                <ListItemButton onClick={HRPersonalhandleClick} >
                  <ListItemText
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 0px" }}
                    primaryTypographyProps={{
                      fontSize: 22,
                      fontWeight: 'medium',
                      color: '#4cceac'
                    }}
                  >
                    個人系統
                  </ListItemText>
                  {/* 折疊menu */}
                  {HRPersonalopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={HRPersonalopen} timeout="auto" unmountOnExit>

                  <List component="div" disablePadding >
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <PeopleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 20 }}
                        primary="基本資料" />
                      <Link to="/employee"></Link>
                    </ListItemButton>
                  </List>

                  {/* <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="請假單申請" />
                      <Link to="/leave"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="加班單申請" />
                      <Link to="/overtime"></Link>
                    </ListItemButton>
                  </List> */}

                  {/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單查詢" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單查詢" />
                  </ListItemButton>
                </List> */}

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <ChecklistIcon />
                      </ListItemIcon>
                      <ListItemText primary="打卡"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to="/checkin"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <ChecklistIcon />
                      </ListItemIcon>
                      <ListItemText primary="出缺勤狀況"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to="/attdatetime"></Link>
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={HRManagehandleClick}>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: '22px',
                      fontWeight: 'medium',
                      color: '#4cceac'
                    }}
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 0px" }}

                  >
                    人事管理
                  </ListItemText>
                  {/* 折疊menu */}
                  {HRManageopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={HRManageopen} timeout="auto" unmountOnExit>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="新增員工資料"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to='/form'></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="員工資料管理"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to='/team'></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="員工出缺勤資料"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to='/attendance'></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="請假單申請"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to="/leave"></Link>
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="加班單申請"
                        primaryTypographyProps={{ fontSize: '20px' }} />
                      <Link to="/overtime"></Link>
                    </ListItemButton>
                  </List>

                </Collapse>
              </>
            )}
            {/* 業務 */}
            {
              department.includes("業務部") && (
                <>
                  <ListItemButton onClick={BusinessPersonalhandleClick}>
                    <ListItemText

                      color={colors.grey[300]}
                      sx={{ m: "15px 0 5px 0px" }}
                      primaryTypographyProps={{
                        fontSize: '22px',
                        fontWeight: 'medium',
                        color: '#4cceac'
                      }}

                    >
                      個人系統
                    </ListItemText>
                    {/* 折疊menu */}
                    {BusinessPersonalopen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={BusinessPersonalopen} timeout="auto" unmountOnExit>

                    <List component="div" disablePadding >
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <PeopleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ fontSize: '20px' }}
                          primary="基本資料" />
                        <Link to="/form"></Link>
                      </ListItemButton>
                    </List>

                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <ChecklistIcon />
                        </ListItemIcon>
                        <ListItemText 
                        primary="打卡"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                        <Link to="/checkin"></Link>
                      </ListItemButton >
                    </List >

  <List component="div" disablePadding>
    <ListItemButton sx={{ pl: 2 }}>
      <ListItemIcon>
        <ChecklistIcon />
      </ListItemIcon>
                        <ListItemText 
                        primary="出缺勤狀況" 
                        primaryTypographyProps={{ fontSize: '22px' }}/>
                        <Link to="/attdatetime"></Link>
                      </ListItemButton >
                    </List >
{/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單申請" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單申請" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單查詢" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單查詢" />
                  </ListItemButton>
                </List> */}

                  </Collapse >
                  <ListItemButton onClick={BusinessManagehandleClick}>
                    <ListItemText
                      color={colors.grey[300]}
                      sx={{ m: "15px 0 5px 20px" }}
                      primaryTypographyProps={{ fontSize: '22px' }}

                    >
                      業務管理
                    </ListItemText>
                    {/* 折疊menu */}
                    {BusinessManageopen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton >
                  <Collapse in={BusinessManageopen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                          <FeedRoundedIcon />
                        </ListItemIcon>
                        <ListItemText 
                        primary="客戶管理"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                        <Link to="/customers"></Link>
                      </ListItemButton >
                    </List >
  <List component="div" disablePadding>
    <ListItemButton sx={{ pl: 2 }}>
      <ListItemIcon>
        <FeedRoundedIcon />
      </ListItemIcon>
                        <ListItemText 
                        primary="訂單總攬"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                        <Link to="/order"></Link>
                      </ListItemButton >
                    </List >
  <List component="div" disablePadding>
    <ListItemButton sx={{ pl: 2 }}>
      <ListItemIcon>
        <FactoryIcon />
      </ListItemIcon>
                        <ListItemText 
                        primary="產品管理"
                        primaryTypographyProps={{ fontSize: '22px' }} />
                        <Link to="/inventory"></Link>
                      </ListItemButton >
                    </List >
                  </Collapse >
{/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 0px" }}
            >
              業務管理
            </Typography>
            <Item
              title="訂單總攬"
              to="/form"
              icon={<FeedRoundedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="庫存總攬"
              to="/form"
              icon={<FactoryIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
                </>
              )}
{/* 管理者 */ }
{
  department.includes("管理部") && (
    <>
      <ListItemButton onClick={ManagerPersonalhandleClick}>
        <ListItemText
          color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                    primaryTypographyProps={{ fontSize: '22px' }}

        >
          個人系統
        </ListItemText>
        {/* 折疊menu */}
        {ManagerPersonalopen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={ManagerPersonalopen} timeout="auto" unmountOnExit>

        <List component="div" disablePadding >
          <ListItemButton sx={{ pl: 2 }}>
            <ListItemIcon>
              <PeopleOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: 20, }}
              primary="基本資料" />
            <Link to="/form"></Link>
          </ListItemButton>
        </List>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2 }}>
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
                      <ListItemText 
                      primary="打卡" 
                      primaryTypographyProps={{ fontSize: '22px' }}/>
                      <Link to="/checkin"></Link>
                    </ListItemButton >
                  </List >

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 2 }}>
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
                      <ListItemText 
                      primary="出缺勤狀況" 
                      primaryTypographyProps={{ fontSize: '22px' }}/>
                      <Link to="/attdatetime"></Link>
                    </ListItemButton >
                  </List >
  {/* <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="請假單申請" />
                </ListItemButton>
              </List>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="加班單申請" />
                </ListItemButton>
              </List>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="請假單查詢" />
                </ListItemButton>
              </List>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="加班單查詢" />
                </ListItemButton>
              </List> */}

                </Collapse >
                <ListItemButton onClick={CompanyhandleClick}>
                  <ListItemText
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                    primaryTypographyProps={{ fontSize: '22px' }}

                  >
                    公司管理
                  </ListItemText>
                  {/* 折疊menu */}
                  {Companyopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={Companyopen} timeout="auto" unmountOnExit>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <FeedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText 
                      primary="數據面板"
                      primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/dashboard"></Link>
                    </ListItemButton >
                  </List >

    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>
        <FeedRoundedIcon />
      </ListItemIcon>
      <ListItemText
        primary="客戶管理"
        primaryTypographyProps={{ fontSize: '22px' }} />
      <Link to="/customers"></Link>
    </ListItemButton>
  </List>

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <FeedRoundedIcon />
        </ListItemIcon>
        <ListItemText
          primary="訂單總攬"
          primaryTypographyProps={{ fontSize: '22px' }} />
        <Link to="/order"></Link>
      </ListItemButton>
    </List>

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <FactoryIcon />
        </ListItemIcon>
        <ListItemText
          primary="產品管理"
          primaryTypographyProps={{ fontSize: '22px' }} />
        <Link to="/inventory"></Link>
      </ListItemButton>
    </List>

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText
          primary="新增員工資料"
          primaryTypographyProps={{ fontSize: '22px' }} />
        <Link to='/form'></Link>
      </ListItemButton>
    </List>

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 2 }}>
        <ListItemIcon>
          <FeedRoundedIcon />
        </ListItemIcon>
                      <ListItemText 
                      primary="員工資料管理" 
                      primaryTypographyProps={{ fontSize: '22px' }}/>
                      <Link to='/team'></Link>
                    </ListItemButton >
                  </List >

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 2 }}>
        <ListItemIcon>
          <FeedRoundedIcon />
        </ListItemIcon>
                      <ListItemText 
                      primary="員工出缺勤資料"
                      primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to='/attendance'></Link>
                    </ListItemButton >
                  </List >

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 2 }}>
        <ListItemIcon>
          <FeedRoundedIcon />
        </ListItemIcon>
                      <ListItemText 
                      primary="請假單申請" 
                      primaryTypographyProps={{ fontSize: '22px' }}/>
                      <Link to="/leave"></Link>
                    </ListItemButton >
                  </List >

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 2 }}>
        <ListItemIcon>
          <FactoryIcon />
        </ListItemIcon>
                      <ListItemText 
                      primary="加班單申請"
                      primaryTypographyProps={{ fontSize: '22px' }} />
                      <Link to="/overtime"></Link>
                    </ListItemButton >
                  </List >

                </Collapse >
              </>
            )
}
          </Box >
        </Menu >
      </ProSidebar >
    </Box >
  );
};

export default withAuth(Sidebar);
// export default Sidebar;
