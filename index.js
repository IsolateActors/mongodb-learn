var MongoClient = require("mongodb");

var url = "mongodb://localhost:27017";

//插入一条
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = {
      name: "老周",
      type: "帅",
      link: ["唱", "跳", "开车", "搞前端"]
    };
    dbo.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("文档插入成功");
      db.close();
    });
  }
);

// -----------------------------------
//插入多条
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = [
      {
        name: "老周",
        type: "帅",
        link: ["唱", "跳", "开车", "搞前端"]
      },
      {
        name: "老周2",
        type: "帅2",
        link: ["唱", "跳", "开车", "搞前端"]
      },
      {
        name: "老周3",
        type: "帅3",
        link: ["唱", "跳", "开车", "搞前端"]
      }
    ];
    dbo.collection("users").insertMany(myobj, function (err, res) {
      if (err) throw err;
      console.log("文档插入成功数" + res.insertedCount);
      db.close();
    });
  }
);

// -----------------------------------
// 查询
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo
      .collection("users")
      .find({})
      .toArray(function (err, res) {
        if (err) throw err;
        console.log(res);
        db.close();
      });
  }
);

// -----------------------------------
//多条件等
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    // var whereStr = { name: "老周" }; //查询条件
    var whereStr = {
      name: {
        $in: ["老周3", "老周2"]
      }
    };
    dbo
      .collection("users")
      .find(whereStr)
      .toArray(function (err, res) {
        if (err) throw err;
        console.log(res);
        db.close();
      });
  }
);

// -----------------------------------
// 更新
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = { name: "老周" }; //查询条件
    var updateStr = {
      $set: {
        type: "超级帅"
      }
    };
    dbo.collection("users").updateOne(whereStr, updateStr, function (err, res) {
      if (err) throw err;
      console.log("文档更新成功");
      db.close();
    });
  }
);

// -----------------------------------
// 多更新
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = { name: "老周" }; //查询条件
    var updateStr = {
      $set: {
        type: "胸怀天下"
      }
    };
    dbo
      .collection("users")
      .updateMany(whereStr, updateStr, function (err, res) {
        if (err) throw err;
        console.log(res.result.nModified + "条文档更新成功");
        db.close();
      });
  }
);

// -----------------------------------
// 排序
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = { username: "马云" }; //查询条件
    var mysort = { age: 1 }; //排序条件
    dbo
      .collection("users")
      .find(whereStr)
      .sort(mysort)
      .skip(1) //跳过一条数
      .limit(3) //限制3条数据
      .toArray(function (err, res) {
        if (err) throw err;
        console.log(res);
        db.close();
      });
  }
);

// -----------------------------------
// 删除
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = { username: "马云" }; //查询条件
    dbo.collection("users").deleteOne(whereStr, function (err, res) {
      if (err) throw err;
      console.log("文档删除成功");
      db.close();
    });
  }
);

// -----------------------------------
// 多删除
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = { username: "马云" }; //查询条件
    dbo.collection("users").deleteMany(whereStr, function (err, res) {
      if (err) throw err;
      console.log(res.result.n + "条文档删除成功");
      db.close();
    });
  }
);

// -----------------------------------联结查询;
// //插入一条
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = {
      _id: 1,
      product_id: 154,
      status: 1
    };
    dbo.collection("orders").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("文档插入成功");
      db.close();
    });
  }
);

//插入多条
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = [
      {
        _id: 154,
        name: "笔记本电脑"
      },
      {
        _id: 155,
        name: "耳机"
      },
      {
        _id: 156,
        name: "手机"
      }
    ];
    dbo.collection("products").insertMany(myobj, function (err, res) {
      if (err) throw err;
      console.log("文档插入成功数" + res.insertedCount);
      db.close();
    });
  }
);

//联结查询
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo
      .collection("orders")
      .aggregate([
        {
          $lookup: {
            from: "products", //右集合
            localField: "product_id", //左集合的join字段
            foreignField: "_id", //右集合的join字段
            as: "orderdetails"
          }
        }
      ])
      .toArray(function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        db.close();
      });
  }
);
