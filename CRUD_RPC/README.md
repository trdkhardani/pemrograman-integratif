# Tugas Implementasi CRUD gRPC dan protobuf dengan Node.js

## Teknologi:
* Node.js
* MySQL

### database.js :
```.js
import mysql from  "mysql";

  

const sql = mysql.createConnection({

host:  "localhost",

user:  "root",

password:  "",

database:  "grpc_crud",

});

  

sql.connect();

  

const sqlCreate = "INSERT INTO posts SET ?"

const sqlRead = "SELECT *  FROM posts WHERE id = ?"

const sqlUpdate = "UPDATE posts SET title = ?, category = ?, slug = ?, body = ? WHERE id = ?"

const sqlDelete = "DELETE FROM posts WHERE id = ?"

  

export  default sql;

export  {  sqlCreate,  sqlRead,  sqlUpdate,  sqlDelete  };
```

### server.js :
```.js
import grpc from  "@grpc/grpc-js";

import protoLoader from  "@grpc/proto-loader";

import mysql from  "mysql";

import sql from  "./database.js";

import  {  sqlCreate,  sqlRead,  sqlUpdate,  sqlDelete  }  from  "./database.js";

  

const PROTO_PATH =  "./data.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);

const grpcObject = grpc.loadPackageDefinition(packageDefinition);

const postData = grpcObject.data.PostData;

  

function  createPost(call,  callback)  {

const  post  =  call.request;

  

sql.query(sqlCreate,  post,  (err,  result)  =>  {

if (err) throw  err;

  

post.id  =  result.insertId;

callback(null,  post);

console.log("Created post with id: "  +  post.id)

});

}

  

function  readPost(call,  callback)  {

const  id  =  call.request.id;

  

sql.query(sqlRead,  id,  (err,  results)  =>  {

if (err) throw  err;

  

const  post  =  results[0];

callback(null,  post);

console.log("Read post with id: "  +  post.id)

});

}

  

function  updatePost(call,  callback)  {

const  post  =  call.request;

sql.query(

sqlUpdate,

[post.title,  post.category,  post.slug,  post.body,  post.id],

(err,  result)  =>  {

if (err) throw  err;

callback(null,  post);

}

);

}

  

function  deletePost(call,  callback)  {

const  id  =  call.request.id;

  

sql.query(sqlDelete,  id,  (err,  result)  =>  {

if (err) throw  err;

  

callback(null,  "Post deleted successfully");

console.log("Deleted post with id: "  +  id)

});

}

  

function  _grpc()  {

const  server  =  new  grpc.Server();

server.addService(postData.service,  {

CreatePost:  createPost,

ReadPost:  readPost,

UpdatePost:  updatePost,

DeletePost:  deletePost,

});

  
  
  
  

server.bindAsync(

"localhost:50051",

grpc.ServerCredentials.createInsecure(),

()  =>  {

server.start();

console.log("Server started on port 50051");

}

);

}

  

_grpc();

```

## Testing
* Create User
[![grpc_create.png](https://i.ibb.co/HznRPLV/Screenshot-2023-04-03-233747.png)](https://i.ibb.co/HznRPLV/Screenshot-2023-04-03-233747.png)
* Read User
[![grpc_read.png](https://i.ibb.co/SJ5nxVd/Screenshot-2023-04-03-234239.png)]
* Update User
[![grpc_update.png](https://i.ibb.co/tpQ8FzS/Screenshot-2023-04-03-234615.png)]
* Delete User
[![grpc_delete.png](https://i.ibb.co/Q9XscGy/Screenshot-2023-04-03-234807.png)]