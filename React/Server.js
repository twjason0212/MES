// 以 Express 建立 Web 伺服器
var express = require("express");
var cors = require('cors');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var app = express();

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('./config');

app.use(cors());
// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Web 伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));


// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));


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
    port: '3306',
    database: 'eip'

})

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'eip'

})

//定義storage是存在public/media/資料夾中
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/media');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({ storage: storage })
connection.connect(function (error) {
    if (error) {
        console.log(error.message)
    } else {
        console.log('連線成功')
    }
})

//登入相關

//設定token加密
app.set('secret', config.secret);
// 實做 api route
var api = express.Router()

app.use('/api', api)

// API 根目錄，不須 middleware驗證token
api.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'This is API Route ...'
    })
});

// 使用者登入，傳送前端驗證Token , 不須 middleware驗證token
api.post('/login', (req, res) => {
    console.log(req.body);
    // Mysql 找尋使用者

    connection.query("select * from employee join department on  employee.department = department.id where employee_account = ?", [req.body.username], (error, result) => {
        console.log(result[0].employee_pwd);
        const paswod = bcrypt.compareSync(req.body.password, result[0].employee_pwd)
        console.log(paswod);
        //
        if (error) {
            res.json({
                success: false,
                error: error,
                message: '資料庫錯誤'
            })
        }

        //
        if (!result) {
            res.json({
                success: false,
                login_check: false,
                password_check: false,
                message: 'Login User 帳密不存在，請建立新使用者'
            })
        }

        if (!paswod) {
            res.json({
                success: false,
                login_check: true,
                password_check: false,
                message: 'Login User 帳密驗證錯誤',
                token: ""
            })

        } else {
            let setToken = {
                login: result.employee_account,
                name: result.employee_name,
                email: result.employee_email

            }

            let token = jwt.sign(
                JSON.parse(JSON.stringify(setToken)),
                app.get('secret'),
                { expiresIn: 60 * 60 * 24 }
            )

            res.json({
                success: true,
                login_check: true,
                password_check: true,
                message: '認證成功...',
                token: token,
                login: result[0].employee_account,
                name: result[0].employee_name,
                email: result[0].employee_email,
                department: result[0].dept_name
            })
        }
    });
})


//打卡
app.post("/attendance/checkin", function (req, res) {
    console.log(req.body.starttime)
    if (req.body.starttime != " ") {
        // 上班
        connection.query("SELECT * FROM attendance WHERE employee_account = ? AND DATE(starttime) = CURDATE()", [req.body.employee_account], function (error, results, fields) {
            if (error) {
                console.log("Error occurred: " + error.message);
                res.status(500).send("Error occurred: " + error.message);
            } else if (results.length > 0) {
                // 已经有上班记录了
                res.status(400).send("You have already checked in");
            } else {
                connection.query("INSERT INTO attendance SET employee_account = ?, starttime = ?, status = ?", [req.body.employee_account, req.body.starttime, 1], function (error, results, fields) {
                    if (error) {
                        console.log("Error occurred: " + error.message);
                        res.status(500).send("Error occurred: " + error.message);
                    } else {
                        res.send("Attendance record inserted successfully");
                    }
                });
            }
        });
    } else if (req.body.endtime != " ") {
        // 下班
        connection.query("SELECT * FROM attendance WHERE employee_account = ? AND DATE(starttime) = CURDATE()", [req.body.employee_account], function (error, results, fields) {
            if (error) {
                console.log("Error occurred: " + error.message);
                res.status(500).send("Error occurred: " + error.message);
            } else if (results.length === 0) {
                // 没有上班记录
                res.status(400).send("You haven't checked in yet");
            } else if (results[0].endtime !== null) {
                // 已经有下班记录了
                res.status(400).send("You have already checked out");
            } else {
                connection.query("UPDATE attendance SET endtime = ? WHERE employee_account = ? AND DATE(starttime) = CURDATE()", [req.body.endtime, req.body.employee_account], function (error, results, fields) {
                    if (error) {
                        console.log("Error occurred: " + error.message);
                        res.status(500).send("Error occurred: " + error.message);
                    } else {
                        res.send("Attendance record updated successfully");
                    }
                });
            }
        });
    } else {
        res.status(400).send("Invalid request body");
    }
});

//個人版出缺勤
app.get("/attendance/emp", function (req, res) {
    connection.query("select starttime, endtime from attendance  where employee_account = ?", [req.query.user], function (error, data) {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }

        const newData = data.map((item) => {
            const start = new Date(item.starttime);
            const end = new Date(item.endtime);
            const startWithOffset = new Date(start.getTime() - (start.getTimezoneOffset() * 60000));
            const endWithOffset = new Date(end.getTime() - (end.getTimezoneOffset() * 60000));

            return {
                starttime: startWithOffset,
                endtime: endWithOffset,
            };
        });

        res.send(newData);
        console.log(newData);
    });
})


//人事版出缺勤
app.get("/attendance", function (req, res) {
    connection.query("select id, employee.employee_name, employee.employee_id ,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime from attendance join employee on employee.employee_account = attendance.employee_account;", function (error, data) {
        res.send(JSON.stringify(data))
        // console.log(data)
    })
})

//人事版出缺勤修改
app.put("/attendance", function (req, res) {
    connection.query(
        "update attendance set starttime = ? , endtime = ? , status = ? where id =" + req.body.id,
        [req.body.starttime, req.body.endtime, req.body.status]
    );
    res.send("Update Finish");
})

//客戶資料取得
app.get("/coustomer", function (req, res) {
    connection.query("select * from customers", function (error, data) {
        res.send(JSON.stringify(data))
    })
})

//客戶資料修改
app.put("/coustomer", function (req, res) {
    connection.query(
        "update customers set customerphone = ? , customeremail = ? , customeraddress = ? ,customerfax = ? where customerid =" + req.body.customerid,
        [req.body.customerphone, req.body.customeremail, req.body.customeraddress, req.body.customerfax]
    );
    res.send("Update Finish");
})

//新增客戶資料
app.post("/coustomer/create", function (req, res) {
    connection.query("insert into customers set customername = ?, customerphone = ? , customeremail = ?, customeraddress = ?, customerfax = ?",
        [req.body.customername, req.body.customerphone, req.body.customeremail, req.body.customeraddress, req.body.customerfax]);
    res.send("新增成功")
})


//新增訂單下拉式選單(客戶)
app.get("/coustomername", function (req, res) {
    connection.query("select customername from customers", function (error, data) {
        res.send(JSON.stringify(data))
    })
})

//新增訂單
app.post("/order/create", function (req, res) {
    const order = req.body;

    // start a MySQL transaction
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.beginTransaction((err) => {
            if (err) throw err;

            // insert data into orders table
            const orderData = {
                orderid: order.orderid,
                customername: order.customername,
                orderdate: order.orderdate,
                deliverydate: order.deliverydate
            };

            connection.query('insert into orders set ?', orderData, (err, result) => {
                if (err) {
                    connection.rollback(() => {
                        throw err;
                    });
                }

                const norderid = result.insertId;

                // insert data into orderitems table
                const orderitemData = order.products.map((product) => {
                    return [
                        norderid,
                        product.productname,
                        product.quty,
                        product.price
                    ];
                });

                connection.query('INSERT INTO orderitems (id, productname, quty, price) VALUES ?', [orderitemData], (err, result) => {
                    if (err) {
                        connection.rollback(() => {
                            throw err;
                        });
                    }

                    // commit the transaction
                    connection.commit((err) => {
                        if (err) {
                            connection.rollback(() => {
                                throw err;
                            });
                        }
                        console.log('訂單儲存成功');
                        res.send('訂單儲存成功');
                    });
                });
            });
        });
    });
})

//取得訂單資料
app.get("/order", function (req, res) {
    connection.query("select o.orderid, o.orderdate, o.deliverydate, o.orderstate, o.changdate, c.customername, oi.productname, oi.quty, oi.price , c.customerphone, c.customeremail, c.customeraddress, c.customerfax from orders o join orderitems oi on o.id = oi.id join customers c on o.customername = c.customername", function (error, data) {
        // const formatDate = (dateString) => {
        //     const date = new Date(dateString);
        //     const year = date.getFullYear();
        //     const month = String(date.getMonth() + 1).padStart(2, '0');
        //     const day = String(date.getDate()).padStart(2, '0');
        //     return `${year}-${month}-${day}`;
        // };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
        };


        const result = data.reduce((acc, curr) => {
            // 如果 acc 中已經存在該 orderid 的物件，則將產品資訊加入其 product 陣列中
            if (acc[curr.orderid]) {
                acc[curr.orderid].product.push({
                    productname: curr.productname,
                    quty: curr.quty,
                    price: curr.price,
                });
            } else { // 否則建立一個新的物件並加入到 acc 中
                acc[curr.orderid] = {
                    orderid: curr.orderid,
                    orderdate: formatDate(curr.orderdate),
                    deliverydate: formatDate(curr.deliverydate),
                    changdate: curr.changdate,
                    orderstate: curr.orderstate,
                    customername: curr.customername,
                    customerphone: curr.customerphone,
                    customeremail: curr.customeremail,
                    customeraddress: curr.customeraddress,
                    customerfax: curr.customerfax,
                    product: [
                        {
                            productname: curr.productname,
                            quty: curr.quty,
                            price: curr.price,
                        },
                    ],
                };
            }
            return acc;
        }, {});
        const finalResult = Object.values(result);
        res.send(JSON.stringify(finalResult))
    })
})


//修改訂單資料
app.put("/order/edit", function (req, res) {
    connection.query("update orders set deliverydate = ? ,orderstate = ? ,changdate = ? where orderid = " + req.body.orderid,
        [req.body.deliverydate, req.body.orderstate, req.body.changdate])
    res.send("修改成功")
})

//訂單產品分布pie
app.get("/order/productpie", function (req, res) {
    connection.query("select orderitems.productname, sum(orderitems.quty) as total_sales from orders inner join orderitems on orders.id = orderitems.id where year(orders.orderdate) = 2023 group by orderitems.productname;", function (error, data) {
        const result = data?.map(item => {
            return {
                id: item.productname,
                label: item.productname,
                value: item.total_sales
            }
        });
        res.json(result)
    })

})

//訂單客戶分布pie
app.get("/order/customerpie", function (req, res) {
    connection.query("select case when month(orderdate) in (1, 2, 3) then 'Q1' when month(orderdate) in (4, 5, 6) then 'Q2' when month(orderdate) in (7, 8, 9) then 'Q3' when month(orderdate) in (10, 11, 12) then 'Q4' end as quarte, count(distinct orders.id) as order_count from orders join orderitems on orders.id = orderitems.id where year(orderdate) = 2023 group by quarte;"
        , function (error, data) {
            const result = data?.map(item => {
                return {
                    id: item.quarte,
                    label: item.quarte,
                    value: item.order_count
                }
            });
            res.json(result)
        })
})




//新增產品(庫存)
app.post('/product/create', upload.single('photo_url'), (req, res) => {
    const { product_name } = req.body;
    const photo_url = req.file.filename;
    console.log(req.body);

    const sql = `INSERT INTO product (product_name, photo_url) VALUES (?, ?)`;

    connection.query(sql, [product_name, photo_url], (err, result) => {
        if (err) {
            console.error('Error inserting product: ', err);
            res.status(500).send('Error inserting product');
        } else {
            res.status(200).send('Product created successfully');
        }
    });
});

//取得產品(庫存)
app.get("/product", function (req, res) {
    connection.query("select * from product", function (error, data) {
        res.send(JSON.stringify(data))
    })
})

//修改產品(庫存)
app.put("/product", function (req, res) {
    connection.query(
        "update products set product_amount	 = ? where product_id =" + req.body.product_id,
        [req.body.product_amount]
    );
    res.send("Update Finish");
})


//工單列表
app.get('/workorder', function (req, res) {
    connection.query("select * from work_order join work_order_status on work_order.work_order_status = work_order_status.id where work_order_status = 1", function (error, data) {

        res.send(JSON.stringify(data));
        console.log(data);
    });
})

//工單列表-接單
app.put('/workorderlist', function (req, res) {
    console.log(req.body)
    connection.query(
        'update work_order set machine_uuid = ? ,work_order_executor = ?, work_order_status = ? where id = ' + req.body.id, [req.body.machine_uuid, req.body.work_order_executor, 2])
    res.send("接單完成");
})

//新增報工單
app.post('/workorder', function (req, res) {
    const workerorder = req.body;
    const workdata = {
        work_order_id: workerorder.work_order_id,
        work_order_creator: workerorder.work_order_creator,
        product_name: workerorder.product_name,
        tar_process_amount: workerorder.tar_process_amount,
        process_date: workerorder.process_date,
        work_order_status: 1
    }
    connection.query("insert into work_order set ? ", workdata, function (error, result) {
        if (error) {
            console.error('錯誤: ', error);
            res.status(500).send('派工單 新增失敗');
        } else {
            res.status(200).send('派工單 新增成功');
        }
    })
})

//待辦工單(接單人 與 狀態2)
app.get('/workorder/:id', function (req, res) {
    connection.query("select * from work_order join work_order_status on work_order.work_order_status = work_order_status.id where work_order_executor = ? and work_order_status = 2 ", [req.params.id], function (error, data) {
        if (error) throw error;
        res.send(JSON.stringify(data));
        console.log(data);
    });
})

//待辦工單(報工)
app.post('/reportorder' , function (req, res) {
    const data = req.body;
    const reportdata = {
        work_order_id: data.work_order_id,
        report_order_creator:data.work_order_executor,
        machine_uuid:data.machine_uuid,
        real_process_amount:data.real_process_amount,
        defect_process_amount:data.defect_process_amount,
        process_date:data.finish_date
    }
    connection.query('insert into report_order set ?', [reportdata])

    res.send('報工完成')
})

app.put('/reportorder', function (req, res) {
    connection.query('update work_order set work_order_status = ?'+ req.body.id, [3])
    res.send("狀態更新");
})




//機器(冠宇)


app.get("/todo/machine", function (req, res) {
    connection.query("select * from machinetable", [], function (err, rows) {
        res.send(JSON.stringify(rows));
    });
});



// 言

app.get("/employee", function (req, res) {
    connection.query("SELECT employee.Id,employee.EmployeeId,employee.Name,department.name as Dept,employeeinfo.Year,employee.Address,employee.Phone,employee.Email FROM employee department ON employeeinfo.Dept = department.dept", function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data);
    })
})
// 新增員工 言
app.post("/employee/create", function (req, res) {
    console.log("post start");
    console.log(req.body.EmployeeID);
    const paswod = bcrypt.hashSync(req.body.password, 10)
    connection.query(`insert into employee (employee_account, employee_pwd, employee_name, employee_tel, employee_email, employee_status, department) 
                 values (?,?,?,?,?,1,?)`, [req.body.account, paswod, req.body.name, req.body.tel, req.body.email, req.body.dept])
})


app.put("/employee", function (req, res) {
    connection.query(
        "update att set starttime = ? , endtime = ? , holiday = ? where id =" + req.body.id,
        [req.body.starttime, req.body.endtime, req.body.holiday]
    );
    res.send("Update Finish");
})

//部門選擇 言
app.get("/dept", function (req, res) {
    connection.query("SELECT * FROM  department ", function (error, data) {
        // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data)
    })
})