import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
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
  const [selected, setSelected] = useState("Dashboard");

  // 控制選單開合
  const [EmployeeSystemopen, setEmployeeSystemopen] = React.useState(true);
  const [EmployeeManageopen, setEmployeeManageopen] = React.useState(true);
  const [HRPersonalopen, setHRPersonalopen] = React.useState(true);
  const [HRManageopen, setHRManageopen] = React.useState(true);
  const [BusinessPersonalopen, setBusinessPersonalopen] = React.useState(true);
  const [BusinessManageopen, setBusinessManageopen] = React.useState(true);
  const [ManagerPersonalopen, setManagerPersonalopen] = React.useState(true);
  const [Companyopen, setCompanyopen] = React.useState(true);

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
            onClick={() => setIsCollapsed(!isCollapsed)}
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
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Dashboard
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/mafioso.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  ADMIN
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                  Dashboard Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* 員工 */}
            <>
              <Typography
                variant="h3"
                color={colors.greenAccent[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                員工
              </Typography>


              <ListItemButton onClick={EmployeePersonalhandleClick}>
                <ListItemText
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}

                >
                  個人系統
                </ListItemText>
                {/* 折疊menu */}
                {EmployeeSystemopen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={EmployeeSystemopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PeopleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="基本資料" />
                    <Link to="team"></Link>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單申請" />
                    <Link to="/leave"></Link>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單申請" />
                    <Link to="/overtime"></Link>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單查詢" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單查詢" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <ChecklistIcon />
                    </ListItemIcon>
                    <ListItemText primary="出缺勤狀況" />
                    <Link to="/total_leave"></Link>
                  </ListItemButton>
                </List>
              </Collapse>


              <ListItemButton onClick={EmployeeManagehandleClick}>
                <ListItemText
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}

                >
                  生產管理
                </ListItemText>
                {/* 折疊menu */}
                {EmployeeManageopen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={EmployeeManageopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="報工" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FactoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="機台資訊" />
                    <Link to="/factory"></Link>
                  </ListItemButton>
                </List>
                {/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <ImportContactsSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="知識庫" />
                  </ListItemButton>
                </List> */}
              </Collapse>
            </>
            {/* 人事 */}
            <>

              <Typography
                variant="h3"
                color={colors.greenAccent[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                人事
              </Typography>
              <ListItemButton onClick={HRPersonalhandleClick}>
                <ListItemText
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}

                >
                  個人系統
                </ListItemText>
                {/* 折疊menu */}
                {HRPersonalopen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={HRPersonalopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PeopleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="基本資料" />
                    <Link to="team"></Link>
                  </ListItemButton>
                </List>
                {/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單申請" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單申請" />
                  </ListItemButton>
                </List> */}
                {/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單查詢" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單查詢" />
                  </ListItemButton>
                </List> */}
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <ChecklistIcon />
                    </ListItemIcon>
                    <ListItemText primary="出缺勤狀況" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={HRManagehandleClick}>
                <ListItemText
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}

                >
                  人事管理
                </ListItemText>
                {/* 折疊menu */}
                {HRManageopen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={HRManageopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="員工出缺勤資料" />
                    <Link to='attendance'></Link>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="員工資料管理" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="新增員工資料" />
                    <Link to='form'></Link>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單申請" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單申請" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
            {/* 業務 */}
            <>
              <Typography
                variant="h3"
                color={colors.greenAccent[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                業務
              </Typography>
              <ListItemButton onClick={BusinessPersonalhandleClick}>
                <ListItemText
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}

                >
                  個人系統
                </ListItemText>
                {/* 折疊menu */}
                {BusinessPersonalopen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={BusinessPersonalopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PeopleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="基本資料" />
                    <Link to="team"></Link>
                  </ListItemButton>
                </List>
                {/* <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單申請" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單申請" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="請假單查詢" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="加班單查詢" />
                  </ListItemButton>
                </List> */}
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <ChecklistIcon />
                    </ListItemIcon>
                    <ListItemText primary="出缺勤狀況" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={BusinessManagehandleClick}>
                <ListItemText
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}

                >
                  業務管理
                </ListItemText>
                {/* 折疊menu */}
                {BusinessManageopen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={BusinessManageopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="客戶管理" />
                    <Link to="customers"></Link>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FeedRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="訂單總攬" />
                    <Link to="order"></Link>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FactoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="庫存總攬" />
                    <Link to="inventory"></Link>
                  </ListItemButton>
                </List>
              </Collapse>
              {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
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
            {/* 管理者 */}
            <>
            <Typography
              variant="h3"
              color={colors.greenAccent[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              管理者
            </Typography>
            <ListItemButton onClick={ManagerPersonalhandleClick}>
              <ListItemText
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}

              >
                個人系統
              </ListItemText>
              {/* 折疊menu */}
              {ManagerPersonalopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={ManagerPersonalopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PeopleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="基本資料" />
                  <Link to="team"></Link>
                </ListItemButton>
              </List>
              {/* <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="請假單申請" />
                </ListItemButton>
              </List>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="加班單申請" />
                </ListItemButton>
              </List>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="請假單查詢" />
                </ListItemButton>
              </List>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="加班單查詢" />
                </ListItemButton>
              </List> */}
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChecklistIcon />
                  </ListItemIcon>
                  <ListItemText primary="出缺勤狀況" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={CompanyhandleClick}>
              <ListItemText
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}

              >
                公司管理
              </ListItemText>
              {/* 折疊menu */}
              {Companyopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={Companyopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FeedRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="數據面板" />
                  <Link to="/"></Link>
                </ListItemButton>
              </List>
            </Collapse>
            </>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
