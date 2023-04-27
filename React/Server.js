// 以 Express 建立 Web 伺服器
var express = require("express");
var cors = require('cors');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var app = express();

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
        cb(null, 'src/media');
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

app.get("/attdance", function (req, res) {
    connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
        res.send(JSON.stringify(data))
        console.log(data)
    })
})

app.put("/attdance", function (req, res) {
    connection.query(
        "update att set starttime = ? , endtime = ? , holiday = ? where id =" + req.body.id,
        [req.body.starttime, req.body.endtime, req.body.holiday]
    );
    res.send("Update Finish");
})

app.get("/coustomer", function (req, res) {
    connection.query("select * from customers", function (error, data) {
        res.send(JSON.stringify(data))
    })
})

app.put("/coustomer", function (req, res) {
    connection.query(
        "update customers set customerphone = ? , customeremail = ? , customeraddress = ? ,customerfax = ? where customerid =" + req.body.customerid,
        [req.body.customerphone, req.body.customeremail, req.body.customeraddress, req.body.customerfax]
    );
    res.send("Update Finish");
})

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
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
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
app.post('/product/create', upload.single('productphoto'), (req, res) => {
    const { productname } = req.body;
    const productphoto = req.file.filename;

    const sql = `INSERT INTO products (productname, productphoto) VALUES (?, ?)`;

    connection.query(sql, [productname, productphoto], (err, result) => {
        if (err) {
            console.error('Error inserting product: ', err);
            res.status(500).send('Error inserting product');
        } else {
            res.status(200).send('Product created successfully');
        }
    });
});

//取得產品(庫存)
app.get("/products", function (req, res) {
    connection.query("select * from products", function (error, data) {
        res.send(JSON.stringify(data))
    })
})

//修改產品(庫存)
app.put("/products", function (req, res) {
    connection.query(
        "update products set stock = ? where productid =" + req.body.productid,
        [req.body.stock]
    );
    res.send("Update Finish");
})


//機器(冠宇)


app.get("/machine_list", function (req, res) {
    connection.query("SELECT `machine_list`.`uuid`,`machine_list`.`brand`,`machine_list`.`status`,`machine_list`.`day_availability`,`work_order`.`tar_process_amount`,`work_order`.`real_process_amount` FROM machine_list RIGHT JOIN work_order ON `machine_list`.`uuid`=`work_order`.`machine_uuid`", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})


//首頁(工單進度)
app.get("/allWorkO", function (req, res) {
    connection.query("SELECT COUNT(*) as totWo FROM work_order where DATE(process_date) = DATE(NOW());", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})
app.get("/todoWorkO", function (req, res) {
    connection.query("SELECT COUNT(*) AS todoWo FROM work_order where work_order_status =0 and DATE(process_date) = DATE(NOW());", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})
//首頁(應到人數)
app.get("/allEmp", function (req, res) {
    connection.query("SELECT COUNT(*) as emp FROM `employee`;", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})
app.get("/punchInEmp", function (req, res) {
    connection.query("SELECT COUNT(start_time) as punchinemp FROM attendance where status = 1 and DATE(start_time) = DATE(NOW());", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

//首頁(安全庫存)
app.get("/allPro", function (req, res) {
    connection.query("SELECT COUNT(*) as proType FROM `product`;", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})
app.get("/proIsSafe", function (req, res) {
    connection.query("SELECT COUNT(*) as proTypeIsSafe FROM `product` where (`product_amount`-`product_safe_amount`>0);", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

//首頁(訂單狀態)
app.get("/allOrder", function (req, res) {
    connection.query("SELECT COUNT(*) as allOrderNum FROM orders;", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})
app.get("/orderFinish", function (req, res) {
    connection.query("SELECT COUNT(*) as orderFinishNum FROM orders WHERE orderstate=3;", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

//首頁(機台狀態)
app.get("/macNum", function (req, res) {
    connection.query("SELECT COUNT(*) as machineNum FROM `machine_list`;", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})
app.get("/macWorkingNum", function (req, res) {
    connection.query("SELECT COUNT(*) as machineWorkingNum FROM `machine_list` where status = 0;", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

//首頁(稼動)
app.get("/machineAvgAva", function (req, res) {
    connection.query("SELECT AVG(day_availability) as avg FROM `machine_list`;", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})