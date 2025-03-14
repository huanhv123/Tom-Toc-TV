const express = require("express");
const app = express();
const body = require("body-parser");
const cors = require("cors");

app.use(body.urlencoded({ extended: false }));
const Database = require("./database");
const db = new Database();
app.use(body.json());
app.use(cors());

app.get("/category", async function (request, response) {
  try {
    let result = await db.getCategory();
    response.send(result);
  } catch (error) {
    response.send(error.toString());
  }
});
// api lấy  thông tin cá nhân của người dùng
app.get('/api/:id', async function (request, response) {
  let docId = request.params.docId;
  try {
    let result = await db.getItemid();
    response.send(result);
  } catch (error) {
    response.send({
      error: error.toString(),
    });
  }
});
//API chỉnh sửa thông tin người dùng theo UserID
app.post("/editUserInfo", async function (req, res) {
  try {
    let body = req.body;
    await db.editUserInfo(body);
    res.send("cập nhật thông tin thành công");
  } catch (error) {
    res.send(error.toString());
  }
});

// Lấy dữ liệu người dùng vào TrangProfile thông qua firebase authentication
// và API get UserInfo
app.get("/getUserInfo/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let result = await db.getUserInfo(id);
    res.send(result);
  } catch (error) {
    res.send(error.toString());
  }
});


// API tạo người dùng. Không tạo mới nếu người dùng tồn tại trong hệ thống
app.post("/createUser", async (req, res) => {
  try {
    let body = req.body;
    let result=await db.createStream(body);
    res.send(result);
  } catch (error) {
    res.send(error.toString());
  }
});

// API lấy ra danh sách streamer mà người dùng theo dõi
app.get("/getStreamer", async function (req, res) {
  try{
  let body = req.body;
  let result=await db.getStream(body);
  res.send(result);
  }catch(err){
    res.send(err.toString());
  }
});

// API tạo stream. Sau khi tạo cập nhật biến IsStreaming=true của người dùng có Id trùng với hostID
app.post("/createStream", async (req, res) => {
  try {
    let body = req.body;
    let result = await db.createStream(body.data).then((data) => {
      res.send(data)
    });

  } catch (error) {
    res.send(error.toString());
  }
});

// API tắt stream. Xóa document , cập nhật biên IsStreaming=false của người dùng có Id trùng với hostID
app.delete("/endStream", async (req, res) => {
  try {
    let body = req.body;
    await db.endStream(body.data);
    res.send("Tắt stream thành công");
  } catch (error) {
    res.send(error.toString());
  }
});

app.post("/addChat", async (req, res) => {
  try {
    let body = req.body;
    let result = await db.addChat(body.data);
    res.send("Chat thành công");
  } catch (err) {
    res.send(error.toString());
  }
})


// API Subcribe.
app.post("/createSubcribe", async (req, res) => {
  try {
    let body = req.body;
    await db.createSubcribe(body);
    res.send("theo dõi thành công");
  } catch (error) {
    res.send(error.toString());
  }
});

app.get("/getCategory", async (req, res) => {
  try {
    let result = await db.getCategory();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
})
// API UnSubcribe
app.delete("/deleteSubcribe", async (req, res) => {
  try {
    let body = req.body;
    await db.deleteSubcribe(body);
    res.send("hủy theo dõi thành công");
  } catch (error) {
    res.send(error.toString());
  }
});

// API like
app.put("/like", async (req, res) => {
  try {
    let body = req.body;
    await db.like(body);
    res.send("like");
  } catch (error) {
    res.send(error.toString());
  }
});

//API dislike
app.put("/dislike", async (req, res) => {
  try {
    let body = req.body;
    await db.disLike(body);
    res.send("dislike");
  } catch (error) {
    res.send(error.toString());
  }
});


// API thêm danh mục
app.post("/addCategorie", async (req, res) => {
  try {
    let body = req.body
    await db.addCategorie(body);
    res.send("thêm danh mục mới");
  } catch (error) {
    res.send(error.toString());
  }
});

//API thêm thành phần trong danh mục
app.post("/addElementCategorie", async (req, res) => {
  try {
    let body = req.body
    await db.addElementCategorie(body)
    res.send("thêm thành công");
  } catch (error) {
    res.send(error.toString());
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on http://127.0.0.1:3000/");
});
