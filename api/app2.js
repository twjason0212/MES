// 以 Express 建立 Web 伺服器
var express = require("express");
var app = express();
// app.use(cors());
var cors = require('cors');
app.use(cors());
// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Web 伺服器的靜態檔案置於 public 資料夾
// app.use(express.static("public"));

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// app.use((req, res, next) => {
//     req.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
app.listen(3702);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");



var mysql = require('mysql');
const { Update } = require("@mui/icons-material");
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    post: '3306',
    database: 'eip'
    // database: 'react_crud'

})

connection.connect(function (error) {
    if (error) {
        console.log(error.message)
    } else {
        console.log('連線成功')
    }
})

app.get("/employee", function (req, res) {
    connection.query(`SELECT employee_id, employee.employee_account, employee.employee_name, 
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name 
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id`, function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data);
    })
})

app.get("/employee/:keyword", function (req, res) {
    console.log("/employee?keyword=?ok~");
    let sqlString = `SELECT employee_id, employee.employee_account, employee.employee_name, 
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name 
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id
    WHERE employee_name like '` + '%' + req.params.keyword + '%' + `'`
    connection.query(sqlString, function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(req.params.keyword);
        console.log(sqlString);
        console.log(data);
    })
})

app.post("/employee/create", function (req, res) {
    console.log("post start");
    console.log(req.body.EmployeeID);
    connection.query(`insert into employee (employee_account, employee_pwd, employee_name, employee_tel, employee_email, employee_status, department) 
                 values (?,?,?,?,?,1,?)`, [req.body.account, req.body.password, req.body.name, req.body.tel, req.body.email, req.body.dept])
})

app.delete("/employee/del/:id", function (req, res) {
    console.log("sssssssss", req.params.id, req.body, "~~~~");
    connection.query(
        "delete from employee  where employee_id =" + req.params.id,
        []
    );
    res.send("Delete Finish");
})

app.get("/dept", function (req, res) {
    connection.query("SELECT id, dept_name FROM  department ", function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data)
    })
})

app.get("/auth", function (req, res) {
    connection.query(`SELECT employee_role.role_id, role.role_name,title,url FROM employee_role left join role on employee_role.role_id = role.id`, function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data);
    })
})