const http = require("http");

let todos = []; 

const server = http.createServer((req, res) => {


  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  
  if (req.url === "/todos" && req.method === "GET") {
    return res.end(JSON.stringify(todos));
  }


  if (req.url === "/todos" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newTodo = JSON.parse(body);
      todos.push(newTodo);
      res.end(JSON.stringify({ message: "Todo added" }));
    });
    return;
  }


  if (req.url.startsWith("/todos/") && req.method === "DELETE") {
    const index = parseInt(req.url.split("/")[2]);
    todos.splice(index, 1);
    return res.end(JSON.stringify({ message: "Todo deleted" }));
  }


  if (req.url === "/todos" && req.method === "DELETE") {
    todos = [];
    return res.end(JSON.stringify({ message: "All cleared" }));
  }


  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not found" }));
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = server;