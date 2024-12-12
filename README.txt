Anime Database and Community

Purpose:
-This website allows users to search for anime, view their information, and interact with the community by leaving comments and ratings.
-Users can filter the anime list by genre, release year, and status (ongoing or finished).

Files in the Application:
- public/ (folder): Contains the frontend files (HTML, CSS, JavaScript)
- server.js: The backend server written in Node.js, handles requests to interact with the MySQL database.
- MySQL Database: Stores anime data, ratings, and comments.

Features:
- Search: Search for anime by name.
- Filters: Filter anime by genre, release year, and status (ongoing or finished).
- Details: View anime information including genre, seasons, and ratings.
- Comments & Ratings: Users can leave comments and ratings for anime.
- Pagination: Anime and comments are paginated for better navigation.

How to Run:
-Install dependencies: npm install express (and mysql2)
Start the server: node server.js
Set up the MySQL database with tables for anime and ratings.
