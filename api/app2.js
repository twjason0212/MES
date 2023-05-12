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

//獲取員工列表
app.get("/employee", function (req, res) {
    connection.query(`SELECT employee_id, employee.employee_account, employee.employee_name, 
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name, employee.employee_status 
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id`, function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data);
    })
})

//獲取單一員工資訊by員工id
app.get("/employee/:id", function (req, res) {
    console.log("/employee/:id", req.params.id);
    connection.query(`SELECT employee_id, employee.employee_account, employee.employee_name, employee_pwd,
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name, startwork_time
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id
      WHERE employee_id = `+ req.params.id, function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data);
    })
})

//模糊查詢員工資訊
app.get("/employee/select/:keyword", function (req, res) {
    console.log("/employee/:keyword", req.params);
    let sqlString = `SELECT employee_id, employee.employee_account, employee.employee_name, 
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name 
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id
    WHERE employee_name like '` + '%' + req.params.keyword + '%' + `'`
    connection.query(sqlString, function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
    })
})

//創建員工資訊
app.post("/employee/create", function (req, res) {
    console.log("req:", req.body.account)
    let sqlString = `SELECT COUNT(1) AS count FROM employee
    WHERE employee_account =? `
    connection.query(sqlString, [req.body.account], function (error, data) {
        // res.send(JSON.stringify(data))
        console.log("data:", JSON.stringify(data))
        console.log("data count:", data[0].count)
        if (data[0].count === 0) {
            connection.query(`insert into employee (employee_account, employee_pwd, employee_name, employee_tel, employee_email, employee_status, department) 
                 values (?,?,?,?,?,1,?)`, [req.body.account, req.body.password, req.body.name, req.body.tel, req.body.email, req.body.dept])
            res.send("新增成功");
            console.log("ans:", "a")
        }
        else {
            res.send("新增失敗,已有重複帳號");
            console.log("ans:", "b")
        }
        console.log("ans:", "c")
    })

})


//修改員工資訊
app.put("/employee/update", function (req, res) {
    console.log("/employee/update");
    console.log(req.body.employee_id);
    console.log(req.body);
    connection.query(`update employee set employee_account = ?, employee_name = ?, employee_tel = ?, employee_email = ?, startwork_time = ? where employee_id = ` + req.body.employee_id,
        [req.body.employee_account, req.body.employee_name, req.body.employee_tel, req.body.employee_email, req.body.startwork_time])
})

//查詢部門表
app.get("/dept", function (req, res) {
    connection.query("SELECT id, dept_name FROM  department ", function (error, data) {
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

app.get("/attdance", function (req, res) {
    connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data)
    })
})

app.get("/coustomer", function (req, res) {
    connection.query("select * from customers", function (error, data) {
        res.send(JSON.stringify(data))
    })
})


