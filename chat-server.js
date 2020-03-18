// 실시간 채팅 웹소켓 서버 구현
// 1. 웹 소켓 서버 생성
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const portNo = 3001;
server.listen(portNo, () => {
  console.log("서버 스타트", "http://localhost:" + portNo);
});

app.use("/public", express.static("./public"));
app.get("/", (req, res) => {
  res.redirect(302, "/public");
});
// 2.웹소켓 서버 실행
const socketio = require("socket.io");
const io = socketio.listen(server);

// 3. 클라이언트 접속시
io.on("connection", socket => {
  console.log("사용자 접속", socket.client.id);
  // 4. 클라이언트한테 메세지를 받을 시 행동
  // 주의! socket.on("첫 번째 매개변수 메세지")
  // 첫 번째 매개변수 메세지는 스트링이지만
  // 채팅 컴포넌트에서 socket.emit으로 보내는 메세지랑 같아야 한다
  // 클라이언트 socket.emit("send")면 여기서는 socket.on("send")
  socket.on("send message", msg => {
    io.emit("update message", msg);
    // 5. 받은 메세지 모든 클라이언트한테 전송
    console.log("receive message", msg);
  });
});
