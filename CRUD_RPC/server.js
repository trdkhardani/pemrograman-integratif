import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import sql from "./database.js";
import { sqlCreate, sqlRead, sqlUpdate, sqlDelete, sqlReadAll } from "./database.js";

const PROTO_PATH = "./data.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const postData = grpcObject.data.PostData;

const client = new postData("localhost:50051", grpc.credentials.createInsecure());

function createPost(call, callback) {
  const post = call.request;

  sql.query(sqlCreate, post, (err, result) => {
    if (err) throw err;

    post.id = result.insertId;
    callback(null, post);
    console.log("Created post with id: " + post.id)
  });
}

function readPost(call, callback) {
  const id = call.request.id;

  sql.query(sqlRead, id, (err, results) => {
    if (err) throw err;

    const post = results[0];
    callback(null, post);
    console.log("Read post with id: " + post.id)
  });
}

function readAllPost(call, callback) {
  sql.query(sqlReadAll, (err, results) => {
    if (err) throw err;

    const posts = results.map((row) => {
      const post = {
        id: row.id,
        title: row.title,
        category: row.category,
        slug: row.slug,
        body: row.body,
      };
      return post;
    });

    const response = {
      post: posts,
    };

    const listPosts = {
      post: posts,
    };

    callback(null, listPosts);
  });
}

function updatePost(call, callback) {
    const post = call.request;
  
    sql.query(
        sqlUpdate,
      [post.title, post.category, post.slug, post.body, post.id],
      (err, result) => {
        if (err) throw err;
  
        callback(null, post);
      }
    );
  }

function deletePost(call, callback) {
  const id = call.request.id;

  sql.query(sqlDelete, id, (err, result) => {
    if (err) throw err;

    callback(null, "Post deleted successfully");
    console.log("Deleted post with id: " + id)
  });
}

function _grpc() {
  const server = new grpc.Server();
  server.addService(postData.service, {
    CreatePost: createPost,
    ReadPost: readPost,
    ReadAllPost: readAllPost,
    UpdatePost: updatePost,
    DeletePost: deletePost,
  });




  server.bindAsync(
    "localhost:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("Server started on port 50051");
    }
  );
}

_grpc();