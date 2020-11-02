let axios = require("axios");
const { resolve } = require("path");
const { runInContext } = require("vm");

// 设置insertManyPromise函数
function insertMany(collection, arr) {
  return new Promise((resolve, reject) => {
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://localhost:27017";
    MongoClient.connect(
      url,
      { userNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection(collection).insertMany(arr, function (err, res) {
          if (err) reject(err);
          console.log("插入的文档数量为：" + res.insertedCount);
          db.close();
          resolve();
        });
      }
    );
  });
}

function insertOne(collection, obj) {
  return new Promise((resolve, reject) => {
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://localhost:27017";
    MongoClient.connect(
      url,
      { userNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection(collection).insertOne(obj, function (err, res) {
          if (err) reject(err);
          console.log("文档插入成功");
          db.close();
          resolve();
        });
      }
    );
  });
}

// 获取英雄列表
async function getHeroList() {
  let httpUrl =
    "https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js";
  let result = await axios.get(httpUrl);
  console.log(result.data.hero);
  let arr = [];
  for (item of result.data.hero) {
    arr.push(item);
  }
  await insertMany("herolist", result.data.hero);
  return arr;
}

// getHeroList();

// 获取英雄信息内容
async function getHero(heroid) {
  let httpUrl = `https://game.gtimg.cn/images/lol/act/img/js/hero/${heroid}.js`;
  let result = await axios.get(httpUrl);
  await insertOne("heroinfo", result.data.hero);
  return result.data.hero;
}

async function run() {
  let herolist = await getHeroList();
  await herolist.reduce(async (prev, item, i) => {
    await prev;
    return new Promise(async (resolve, reject) => {
      await getHero(item.heroId);
      resolve();
    });
  }, Promise.resolve());
}

run();
