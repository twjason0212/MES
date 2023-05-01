// 以 Express 建立 Web 伺服器
var express = require("express");
var cors = require("cors");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var app = express();

var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var config = require("./config");

app.use(cors());
// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Web 伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));

// 以 express-session 管理狀態資訊
var session = require("express-session");
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);

// 指定 esj 為 Express 的畫面處理引擎
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/view");

// 一切就緒，開始接受用戶端連線
app.listen(3702);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");

var mysql = require("mysql");
const { Update } = require("@mui/icons-material");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: "3306",
  database: "eip",
});

var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: "3306",
  database: "eip",
});

//定義storage是存在public/media/資料夾中
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/media");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });
connection.connect(function (error) {
  if (error) {
    console.log(error.message);
  } else {
    console.log("連線成功");
  }
});

app.get("/attdance", function (req, res) {
  connection.query(
    "select attendance.id,employee.employee_account,employee_name,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,att_status_name from attendance JOIN employee ON attendance.employee_account = employee.employee_account JOIN att_status_type ON attendance.status = att_status_type.id; ",
    function (error, data) {
      res.send(JSON.stringify(data));
      console.log(data);
    }
  );
});
app.put("/attdance", function (req, res) {
  connection.query(
    "update attendance set starttime = ? , endtime = ? where id =" +
    req.body.id,
    [req.body.starttime, req.body.endtime]
  );
  res.send("Update Finish");
});

//登入相關

//設定token加密
app.set("secret", config.secret);
// 實做 api route
var api = express.Router();

app.use("/api", api);

// API 根目錄，不須 middleware驗證token
api.get("/", (req, res) => {
  res.json({
    success: true,
    message: "This is API Route ...",
  });
});

// 使用者登入，傳送前端驗證Token , 不須 middleware驗證token
api.post("/login", (req, res) => {
  console.log(req.body);
  // Mysql 找尋使用者

  connection.query(
    "select * from employee join department on  employee.department = department.id where employee_account = ?",
    [req.body.username],
    (error, result) => {
      console.log(result[0].employee_pwd);
      const paswod = bcrypt.compareSync(
        req.body.password,
        result[0].employee_pwd
      );
      console.log(paswod);
      //
      if (error) {
        res.json({
          success: false,
          error: error,
          message: "資料庫錯誤",
        });
      }

      //
      if (!result) {
        res.json({
          success: false,
          login_check: false,
          password_check: false,
          message: "Login User 帳密不存在，請建立新使用者",
        });
      }

      if (!paswod) {
        res.json({
          success: false,
          login_check: true,
          password_check: false,
          message: "Login User 帳密驗證錯誤",
          token: "",
        });
      } else {
        let setToken = {
          login: result.employee_account,
          name: result.employee_name,
          email: result.employee_email,
        };

        let token = jwt.sign(
          JSON.parse(JSON.stringify(setToken)),
          app.get("secret"),
          { expiresIn: 60 * 60 * 24 }
        );

        res.json({
          success: true,
          login_check: true,
          password_check: true,
          message: "認證成功...",
          token: token,
          login: result[0].employee_account,
          name: result[0].employee_name,
          email: result[0].employee_email,
          department: result[0].dept_name,
        });
      }
    }
  );
});

//打卡
app.post("/attendance/checkin", function (req, res) {
  console.log(req.body.starttime);
  if (req.body.starttime != " ") {
    // 上班
    connection.query(
      "SELECT * FROM attendance WHERE employee_account = ? AND DATE(starttime) = CURDATE()",
      [req.body.employee_account],
      function (error, results, fields) {
        if (error) {
          console.log("Error occurred: " + error.message);
          res.status(500).send("Error occurred: " + error.message);
        } else if (results.length > 0) {
          // 已经有上班记录了
          res.status(400).send("You have already checked in");
        } else {
          connection.query(
            "INSERT INTO attendance SET employee_account = ?, starttime = ?, status = ?",
            [req.body.employee_account, req.body.starttime, 1],
            function (error, results, fields) {
              if (error) {
                console.log("Error occurred: " + error.message);
                res.status(500).send("Error occurred: " + error.message);
              } else {
                res.send("Attendance record inserted successfully");
              }
            }
          );
        }
      }
    );
  } else if (req.body.endtime != " ") {
    // 下班
    connection.query(
      "SELECT * FROM attendance WHERE employee_account = ? AND DATE(starttime) = CURDATE()",
      [req.body.employee_account],
      function (error, results, fields) {
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
          connection.query(
            "UPDATE attendance SET endtime = ? WHERE employee_account = ? AND DATE(starttime) = CURDATE()",
            [req.body.endtime, req.body.employee_account],
            function (error, results, fields) {
              if (error) {
                console.log("Error occurred: " + error.message);
                res.status(500).send("Error occurred: " + error.message);
              } else {
                res.send("Attendance record updated successfully");
              }
            }
          );
        }
      }
    );
  } else {
    res.status(400).send("Invalid request body");
  }
});

//獲取員工列表
app.get("/employee", function (req, res) {
  connection.query(
    `SELECT employee_id, employee.employee_account, employee.employee_name, 
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name, employee.employee_status 
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id`,
    function (error, data) {
      // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
      res.send(JSON.stringify(data));
      console.log(data);
    }
  );
});

//獲取單一員工資訊by員工id
app.get("/employee/:id", function (req, res) {
  console.log("/employee/:id", req.params.id);
  connection.query(
    `SELECT employee_id, employee.employee_account, employee.employee_name, employee_pwd,
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name, startwork_time
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id
      WHERE employee_id = ` + req.params.id,
    function (error, data) {
      // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
      res.send(JSON.stringify(data));
      console.log(data);
    }
  );
});


//獲取單一員工資訊by員工id
app.get("/employee/:account", function (req, res) {
  console.log("/employee/:account", req.params.account);
  connection.query(`SELECT employee_id, employee.employee_account, employee.employee_name, employee_pwd,
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name, startwork_time
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id
      WHERE employee_account = '`+ req.params.account + `'`, function (error, data) {
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
    WHERE employee_name like '` + '%' + req.params.keyword + `%'`
  connection.query(sqlString, function (error, data) {
    // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
    res.send(JSON.stringify(data));
    console.log("JSON.stringify(data)", JSON.stringify(data));
  })
})

//模糊查詢員工資訊
app.get("/employee/account/:account", function (req, res) {
  console.log("/employee/account/:account", req.params);
  let sqlString =
    `SELECT employee_id, employee.employee_account, employee.employee_name, department.id,
    department.dept_name, employee.employee_tel, employee.employee_email, role.role_name, employee.startwork_time 
    FROM employee
    LEFT JOIN role ON employee.employee_role = role.id 
    LEFT JOIN department ON employee.department = department.id
    WHERE employee_account = '` + req.params.account + `'`;
  connection.query(sqlString, function (error, data) {
    // connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function (error, data) {
    res.send(JSON.stringify(data));
  });
});

//創建員工資訊
app.post("/employee/create", function (req, res) {
  console.log("req:", req.body.account);
  const paswod = bcrypt.hashSync(req.body.password, 10);
  let sqlString = `SELECT COUNT(1) AS count FROM employee
    WHERE employee_account =? `;
  connection.query(sqlString, [req.body.account], function (error, data) {
    // res.send(JSON.stringify(data))
    console.log("data:", JSON.stringify(data));
    console.log("data count:", data[0].count);
    if (data[0].count === 0) {
      connection.query(
        `insert into employee (employee_account, employee_pwd, employee_name, employee_tel, employee_email, employee_status, department) 
                 values (?,?,?,?,?,1,?)`,
        [
          req.body.account,
          paswod,
          req.body.name,
          req.body.tel,
          req.body.email,
          req.body.dept,
        ]
      );
      res.send("新增成功");
      console.log("ans:", "a");
    } else {
      res.send("新增失敗,已有重複帳號");
      console.log("ans:", "b");
    }
    console.log("ans:", "c");
  });
});

//修改員工資訊
app.put("/employee/update", function (req, res) {
  console.log("/employee/update");
  console.log(req.body.employee_id);
  console.log(req.body);
  connection.query(
    `update employee set employee_account = ?, employee_name = ?, employee_tel = ?, employee_email = ?, startwork_time = ? where employee_id = ` +
    req.body.employee_id,
    [
      req.body.employee_account,
      req.body.employee_name,
      req.body.employee_tel,
      req.body.employee_email,
      req.body.startwork_time,
    ]
  );
});

//查詢部門表
app.get("/dept", function (req, res) {
  connection.query(
    "SELECT id, dept_name FROM  department ",
    function (error, data) {
      res.send(JSON.stringify(data));
      console.log(data);
    }
  );
});

//個人版出缺勤
app.get("/attendance/emp", function (req, res) {
  connection.query(
    "select starttime, endtime from attendance  where employee_account = ?",
    [req.query.user],
    function (error, data) {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      const newData = data.map((item) => {
        const start = new Date(item.starttime);
        const end = new Date(item.endtime);
        const startWithOffset = new Date(
          start.getTime() - start.getTimezoneOffset() * 60000
        );
        const endWithOffset = new Date(
          end.getTime() - end.getTimezoneOffset() * 60000
        );

        return {
          starttime: startWithOffset,
          endtime: endWithOffset,
        };
      });

      res.send(newData);
      console.log(newData);
    }
  );
});

//客戶資料取得
app.get("/coustomer", function (req, res) {
  connection.query("select * from customers", function (error, data) {
    res.send(JSON.stringify(data));
  });
});

//客戶資料修改
app.put("/coustomer", function (req, res) {
  connection.query(
    "update customers set customerphone = ? , customeremail = ? , customeraddress = ? ,customerfax = ? where customerid =" +
    req.body.customerid,
    [
      req.body.customerphone,
      req.body.customeremail,
      req.body.customeraddress,
      req.body.customerfax,
    ]
  );
  res.send("Update Finish");
});

//新增客戶資料
app.post("/coustomer/create", function (req, res) {
  connection.query(
    "insert into customers set customername = ?, customerphone = ? , customeremail = ?, customeraddress = ?, customerfax = ?",
    [
      req.body.customername,
      req.body.customerphone,
      req.body.customeremail,
      req.body.customeraddress,
      req.body.customerfax,
    ]
  );
  res.send("新增成功");
});

//新增訂單下拉式選單(客戶)
app.get("/coustomername", function (req, res) {
  connection.query(
    "select customername from customers",
    function (error, data) {
      res.send(JSON.stringify(data));
    }
  );
});

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
        deliverydate: order.deliverydate,
        orderstate: 1,
      };

      connection.query("insert into orders set ?", orderData, (err, result) => {
        if (err) {
          connection.rollback(() => {
            throw err;
          });
        }

        const norderid = result.insertId;

        // insert data into orderitems table
        const orderitemData = order.products.map((product) => {
          return [norderid, product.productname, product.quty, product.price];
        });

        connection.query(
          "INSERT INTO orderitems (id, productname, quty, price) VALUES ?",
          [orderitemData],
          (err, result) => {
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
              console.log("訂單儲存成功");
              res.send("訂單儲存成功");
            });
          }
        );
      });
    });
  });
});

//取得訂單資料
app.get("/order", function (req, res) {
  connection.query(
    "select o.id ,o.orderid, o.orderdate, o.deliverydate,o.orderstate, os.orderstate_name, o.changdate, c.customername, oi.productname, oi.quty, oi.price , c.customerphone, c.customeremail, c.customeraddress, c.customerfax from orders o join orderitems oi on o.id = oi.id join customers c on o.customername = c.customername join orderstate os on os.id = o.orderstate",
    function (error, data) {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.toLocaleDateString("zh-TW").split("/")[0];
        const month = date
          .toLocaleDateString("zh-TW")
          .split("/")[1]
          .padStart(2, "0");
        const day = date
          .toLocaleDateString("zh-TW")
          .split("/")[2]
          .padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
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
        } else {
          // 否則建立一個新的物件並加入到 acc 中
          acc[curr.orderid] = {
            id: curr.id,
            orderid: curr.orderid,
            orderdate: formatDate(curr.orderdate),
            deliverydate: formatDate(curr.deliverydate),
            changdate: formatDate(curr.changdate),
            orderstate: curr.orderstate,
            orderstate_name: curr.orderstate_name,
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
      res.send(JSON.stringify(finalResult));
    }
  );
});

//修改訂單資料
app.put("/order/edit", function (req, res) {
  connection.query(
    "update orders set deliverydate = ? , orderstate = ? ,changdate = ? where orderid = " +
    req.body.orderid,
    [req.body.deliverydate, req.body.orderstate, req.body.changdate]
  );
  res.send("修改成功");
});

//訂單產品分布pie
app.get("/order/productpie", function (req, res) {
  connection.query(
    "select orderitems.productname, sum(orderitems.quty) as total_sales from orders inner join orderitems on orders.id = orderitems.id where year(orders.orderdate) = 2023 group by orderitems.productname;",
    function (error, data) {
      const result = data?.map((item) => {
        return {
          id: item.productname,
          label: item.productname,
          value: item.total_sales,
        };
      });
      res.json(result);
    }
  );
});

//訂單客戶分布pie
app.get("/order/customerpie", function (req, res) {
  connection.query(
    "select case when month(orderdate) in (1, 2, 3) then 'Q1' when month(orderdate) in (4, 5, 6) then 'Q2' when month(orderdate) in (7, 8, 9) then 'Q3' when month(orderdate) in (10, 11, 12) then 'Q4' end as quarte, count(distinct orders.id) as order_count from orders join orderitems on orders.id = orderitems.id where year(orderdate) = 2023 group by quarte;",
    function (error, data) {
      const result = data?.map((item) => {
        return {
          id: item.quarte,
          label: item.quarte,
          value: item.order_count,
        };
      });
      res.json(result);
    }
  );
});

//機器(冠宇)//row1
app.get("/machine_list", function (req, res) {
  connection.query(
    "SELECT `machine_list`.`uuid`,`machine_list`.`brand`,`machine_list`.`status`,`machine_list`.`day_availability`,`work_order`.`tar_process_amount`,`work_order`.`real_process_amount` FROM machine_list LEFT JOIN work_order ON `machine_list`.`uuid`=`work_order`.`machine_uuid`",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});

//首頁(工單進度)
app.get("/allWorkO", function (req, res) {
  connection.query(
    "SELECT COUNT(*) as totWo FROM work_order where DATE(process_date) = DATE(NOW());",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});
app.get("/todoWorkO", function (req, res) {
  connection.query(
    "SELECT COUNT(*) AS todoWo FROM work_order where work_order_status =0 and DATE(process_date) = DATE(NOW());",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});
//首頁(應到人數)
app.get("/allEmp", function (req, res) {
  connection.query(
    "SELECT COUNT(*) as emp FROM `employee`;",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});
app.get("/punchInEmp", function (req, res) {
  connection.query(
    "SELECT COUNT(start_time) as punchinemp FROM attendance where status = 1 and DATE(start_time) = DATE(NOW());",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});

//首頁(安全庫存)
app.get("/allPro", function (req, res) {
  connection.query(
    "SELECT COUNT(*) as proType FROM `product`;",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});
app.get("/proIsSafe", function (req, res) {
  connection.query(
    "SELECT COUNT(*) as proTypeIsSafe FROM `product` where (`product_amount`-`product_safe_amount`>0);",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});

//首頁(訂單狀態)
app.get("/allOrder", function (req, res) {
  connection.query(
    "SELECT COUNT(*) as allOrderNum FROM orders;",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});
app.get("/orderFinish", function (req, res) {
  connection.query(
    "SELECT COUNT(*) as orderFinishNum FROM orders WHERE orderstate=3;",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});

//首頁(稼動) row2
app.get("/machineAvgAva", function (req, res) {
  connection.query(
    "SELECT AVG(day_availability) as avg FROM `machine_list`;",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});

// 首頁(機台整體狀況)todo
app.get("/macStatus", function (req, res) {
  connection.query(
    "SELECT COUNT(CASE WHEN status = 0 THEN 1 END) AS runningValue, COUNT(CASE WHEN status = 1 THEN 1 END) AS standbyValue, COUNT(CASE WHEN status = 2 THEN 1 END) AS errorValue FROM machine_list;",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});

// 首頁(生產良率)
app.get("/yieldRate", function (req, res) {
  connection.query(
    "SELECT  ROUND(sum(real_process_amount) / sum(tar_process_amount),2) as yieldRateDB FROM `work_order` WHERE work_order_status=0;",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});

//首頁(折線圖)
app.get("/qOrdNum", function (req, res) {
  connection.query(
    "SELECT QUARTER(orderdate) AS x, COUNT(*) AS y FROM orders WHERE YEAR(orderdate) = YEAR(NOW()) GROUP BY x;",
    [],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});
// connection.query("select * from products", function (error, data) {
//   res.send(JSON.stringify(data))
// })

//新增產品(庫存)
app.post("/product/create", upload.single("photo_url"), (req, res) => {
  const { product_name } = req.body;
  const photo_url = req.file.filename;
  console.log(req.body);

  const sql = `INSERT INTO product (product_name, photo_url) VALUES (?, ?)`;

  connection.query(sql, [product_name, photo_url], (err, result) => {
    if (err) {
      console.error("Error inserting product: ", err);
      res.status(500).send("Error inserting product");
    } else {
      res.status(200).send("Product created successfully");
    }
  });
});

//取得產品(庫存)
app.get("/product", function (req, res) {
  connection.query("select * from product", function (error, data) {
    res.send(JSON.stringify(data));
  });
});

//修改產品(庫存)
app.put("/product", function (req, res) {
  connection.query(
    "update products set product_amount	 = ? where product_id =" +
    req.body.product_id,
    [req.body.product_amount]
  );
  res.send("Update Finish");
});

//工單列表
app.get("/workorder", function (req, res) {
  connection.query(
    "select * ,work_order.id from work_order join work_order_status on work_order.work_order_status = work_order_status.id where work_order_status = 1",
    function (error, data) {
      res.send(JSON.stringify(data));
      console.log(data);
    }
  );
});

//工單列表-接單
app.put("/workorderlist", function (req, res) {
  console.log(req.body);
  connection.query(
    "update work_order set machine_uuid = ? ,work_order_executor = ?, work_order_status = ? where id = " +
    req.body.id,
    [req.body.machine_uuid, req.body.work_order_executor, 2]
  );
  res.send("接單完成");
});

//新增報工單
app.post("/workorder", function (req, res) {
  const workerorder = req.body;
  const workdata = {
    work_order_id: workerorder.work_order_id,
    work_order_creator: workerorder.work_order_creator,
    product_name: workerorder.product_name,
    tar_process_amount: workerorder.tar_process_amount,
    process_date: workerorder.process_date,
    work_order_status: 1,
  };
  connection.query(
    "insert into work_order set ? ",
    workdata,
    function (error, result) {
      if (error) {
        console.error("錯誤: ", error);
        res.status(500).send("派工單 新增失敗");
      } else {
        res.status(200).send("派工單 新增成功");
      }
    }
  );
});

//待辦工單(接單人 與 狀態2)
app.get("/workorder/:id", function (req, res) {
  connection.query(
    "select * , work_order.id from work_order join work_order_status on work_order.work_order_status = work_order_status.id where work_order_executor = ? and work_order_status = 2 ",
    [req.params.id],
    function (error, data) {
      if (error) throw error;
      res.send(JSON.stringify(data));
      console.log(data);
    }
  );
});

//待辦工單(建單人 與 狀態3)
app.get("/workorderl/:id", function (req, res) {
  connection.query(
    "select * , work_order.id ,report_order.process_date from work_order join work_order_status on work_order.work_order_status = work_order_status.id join report_order on report_order.work_order_id = work_order.work_order_id where work_order_creator = ? and work_order_status = 3 ",
    [req.params.id],
    function (error, data) {
      if (error) throw error;
      res.send(JSON.stringify(data));
      console.log(data);
    }
  );
});

//待辦工單(更新報工單)
app.post("/reportorder", function (req, res) {
  const data = req.body;
  const reportdata = {
    work_order_id: data.work_order_id,
    report_order_creator: data.work_order_executor,
    machine_uuid: data.machine_uuid,
    real_process_amount: data.real_process_amount,
    defect_process_amount: data.defect_process_amount,
    process_date: data.finish_date,
  };
  connection.query("insert into report_order set ?", [reportdata]);

  res.send("報工完成");
});
//待辦工單(更新派工單狀態)
app.put("/reportorder", function (req, res) {
  console.log(req.body);
  connection.query(
    "update work_order set work_order_status = ? where id =" + req.body.id,
    [3]
  );
  res.send("狀態更新");
});
//待辦工單(更新報工單狀態-主管)
app.put("/reportorderl", function (req, res) {
  connection.query(
    "update report_order join work_order on work_order.work_order_id = report_order.work_order_id set report_order.real_process_amount = ? , report_order.defect_process_amount = ?, work_order.work_order_status = ?  where work_order.id = ?",
    [
      req.body.real_process_amount,
      req.body.defect_process_amount,
      4,
      req.body.id,
    ]
  );
  res.send("審核通過");
});

//工單管理
app.get("/workorderall", function (req, res) {
  connection.query(
    "select *, work_order.work_order_id , ro.real_process_amount, ro.process_date from work_order join report_order ro on ro.work_order_id = work_order.work_order_id join work_order_status on work_order.work_order_status = work_order_status.id",
    function (error, data) {
      if (error) throw error;
      res.send(data);
      console.log(data);
    }
  );
});

//請假單申請
app.post("/leave", (req, res) => {
  connection.query(
    "insert into attendance set employee_account = ? , status = ?, starttime = ?, endtime=?,cause_img=?",
    [
      req.body.employee_account,
      req.body.status,
      req.body.start_time,
      req.body.end_time,
      req.body.cause_img,
    ]
  );
  res.send("新增成功");
});
//加班單申請
app.post("/overtime", (req, res) => {
  connection.query(
    "insert into attendance set employee_account = ? ,  starttime = ?, endtime=?,cause=?,status=?",
    [
      req.body.employee_account,
      req.body.start_time,
      req.body.end_time,
      req.body.cause,
      5,
    ]
  );
  res.send("新增成功");
});

// const query = `INSERT INTO leave_form ( employee_account, department, leave_type,DATE_FORMAT(start_time, '%Y-%m-%d %H:%i') as start_time,DATE_FORMAT(end_time, '%Y-%m-%d %H:%i') as end_time,cause_img) VALUES (?, ?, ?, ?, ?, ?)`;
// connection.query(query, [ employee_account, department, leave_type,start_time,end_time,cause_img], (error, results) => {
//   if (error) {
//     console.error(error);
//     res.status(500).send('Error submitting form data');
//   } else {
//     res.status(200).send('Form data submitted successfully');
//   }
// });
