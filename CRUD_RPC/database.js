import mysql from "mysql";

const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "grpc_crud",
});

sql.connect();

const sqlCreate = "INSERT INTO posts SET ?"
const sqlRead = "SELECT * FROM posts WHERE id = ?"
const sqlReadAll = "SELECT * FROM posts"
const sqlUpdate = "UPDATE posts SET title = ?, category = ?, slug = ?, body = ? WHERE id = ?"
const sqlDelete = "DELETE FROM posts WHERE id = ?"

export default sql;
export { sqlCreate, sqlRead, sqlUpdate, sqlDelete, sqlReadAll };
