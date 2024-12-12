/*
Server-side javascript file (server.js)
Full-Stack Project
Toni Ojeda
*/
// Initialize express module
let express = require("express");
// Create express application object
let app = express(); 
// Serve static files from the "public" folder
app.use(express.static("public")); 
// Log that the server has started
console.log("Server Started");

// MySQL module for interacting with the database
var mysql = require("mysql2");

// Define the different routes that the server will handle
app.get("/search", searchSelect); // Route for searching anime
app.get("/insertAnime", insertAnime); // Route for inserting anime
app.get("/animeInfo", getAnimeInfo); // Route for fetching anime info
app.get("/animeComments", getComments); // Route for fetching anime comments
app.get("/addComment", addComment); // Route for adding comments to anime

// Function to search for anime based on the given filters and search data
function searchSelect(req, res) {
  const searchData = req.query.name; // Search data provided by the client
  const filters = req.query.filters; // Filters applied for the search

  // SQL query to search for anime by name and apply filters
  const sql = `SELECT * FROM Anime WHERE ${filters} name LIKE '${searchData}%' ORDER BY name`;
  console.log(`SQL query: ${sql}`);

  // Set up MySQL connection
  let conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "ojedat",
    password: "$311to546",
    database: "ojedaAnime",
  });

  // Connect to MySQL database
  conn.connect(function (err) {
    if (err) {
      console.log("Connection was unsuccessful");
    } else {
      console.log("Connection was successful");
    }
  });

  // Execute the search query and send the result to the client
  conn.query(sql, function (err, rows) {
    if (err) {
      console.log("Query was not successful");
    } else {
      console.log("Query was successful");
      res.send(JSON.stringify(rows)); // Send the results as a JSON string
    }
  });

  conn.end(); // Disconnect from the MySQL database
}

// Function to insert a new anime into the database
function insertAnime(req, res) {
  const sql = req.query.insertQuery; // SQL insert query sent from client
  console.log(`sql query: ${sql}`);

  // Set up MySQL connection
  let conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "ojedat",
    password: "$311to546",
    database: "ojedaAnime",
  });

  // Connect to MySQL database
  conn.connect(function (err) {
    if (err) {
      console.log("Connection was unsuccessful");
    } else {
      console.log("Connection was successful");
    }
  });

  // Execute the insert query and confirm success
  conn.query(sql, function (err, rows) {
    if (err) {
      console.log("Query was not successful");
    } else {
      console.log("Data was inserted");
      res.send("Successfully added"); // Send success response to the client
    }
  });

  conn.end(); // Disconnect from the MySQL database
}

// Function to get detailed information about a specific anime
function getAnimeInfo(req, res) {
  let sql = req.query.sql; // SQL query for getting anime information
  let conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "ojedat",
    password: "$311to546",
    database: "ojedaAnime",
  });

  console.log("sql Query: " + sql);

  // Connect to MySQL database
  conn.connect(function (err) {
    if (err) {
      console.log("Connection was unsuccessful");
    } else {
      console.log("Connection was successful");
    }
  });

  // Execute the query and send the first result (anime info) to the client
  conn.query(sql, function (err, rows) {
    if (err) {
      console.log("Query was not successful");
    } else {
      console.log("Query was successful");
      res.send(JSON.stringify(rows[0])); // Send the first row as JSON (anime info)
    }
  });

  conn.end(); // Disconnect from the MySQL database
}

// Function to get comments for a specific anime
function getComments(req, res) {
  let sql = req.query.sql; // SQL query for getting comments
  console.log("sql Query: " + sql);

  let conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "ojedat",
    password: "$311to546",
    database: "ojedaAnime",
  });

  // Connect to MySQL database
  conn.connect(function (err) {
    if (err) {
      console.log("Connection was unsuccessful");
    } else {
      console.log("Connection was successful");
    }
  });

  // Execute the query and send the comments to the client
  conn.query(sql, function (err, rows) {
    if (err) {
      console.log("Query was not successful");
    } else {
      console.log("Query was successful");
      res.send(JSON.stringify(rows)); // Send the comments as JSON
    }
  });

  conn.end(); // Disconnect from the MySQL database
}

// Function to add a comment to a specific anime
function addComment(req, res) {
  let sql = req.query.sql; // SQL query for adding a comment
  console.log("sql Query: " + sql);

  let conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "ojedat",
    password: "$311to546",
    database: "ojedaAnime",
  });

  // Connect to MySQL database
  conn.connect(function (err) {
    if (err) {
      console.log("Connection was unsuccessful");
    } else {
      console.log("Connection was successful");
    }
  });

  // Execute the query and confirm the comment was inserted
  conn.query(sql, function (err, rows) {
    if (err) {
      console.log("Query was not successful");
    } else {
      console.log("Query was successful");
      res.send("Comment was inserted"); // Send success message to the client
    }
  });

  conn.end(); // Disconnect from the MySQL database
}

// Start the server on port 5805
app.listen(5805);
