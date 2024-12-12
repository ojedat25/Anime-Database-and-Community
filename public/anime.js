/*
Clien-side javascript file (anime.js)
Full-Stack Project
Toni Ojeda
*/
$(setUp);
function setUp() {
  // Initial setup function. Calls loadAnimeList to populate the anime list and eventListeners to attach events.
  loadAnimeList();
  eventListeners();
  let currentYear = new Date().getFullYear();
    // Populate the "Year Released" and "Year Finished" dropdowns with years from current year down to 1917
    while (currentYear >= 1917) { 
        // 1917 is the year the first anime was made, so we start from there
        // Append the year option to the "Year Released" dropdown
        $("#year_released").append($(`<option value=${currentYear}>${currentYear}</option>`));
        // Append the year option to the "Year Finished" dropdown
        // Decrease the current year by 1 to continue populating the dropdown
        --currentYear;
    }
}

function loadAnimeList() {
  // Loads the list of anime from the database based on user search and filters.
  sessionStorage.clear(); // Clears any previous session data.
  const $searchInput = $("#searchBar").val(); // Gets the value of the search bar input.
  const $listContainer = $("#listContainer"); // The container to display the list of anime.
  $("#animeInfo").addClass("hidden"); // Hides anime details section.
  $("#listPages").html(""); // Clears any previous page numbers.
  const filters = filterHandler(); // Get the filter conditions.

  
  $.get(`http://augwebapps.com:5805/search?name=${$searchInput}&filters=${filters}`, // Sends a GET request to fetch the list of anime based on search and filters.
    function (res) {
      $listContainer.html(""); // Clears the anime list container before populating it.
      let animes = []; // Array to store anime names for session storage pagination.
      let pageCount = 1; // Page counter to handle pagination.
      res.forEach(function (anime, index) { //Loops through the response array of animes
        if (index < 10) {
          // Displays only the first 10 anime per page.
          let $animeNode = $(`<p>${anime.name}</p>`); // Creates a new element for each anime name.
          $animeNode.addClass("listItem"); // Adds a class to the element.
          $animeNode.click(loadAnimeInfo); // Attaches a click event to load more details about the anime.
          $listContainer.append($animeNode); // Appends the anime element to the list container.
        }

        if (index != 0 && index % 10 == 0) {
          // Every 10 anime, store the page data in sessionStorage and create page buttons.
          sessionStorage.setItem(pageCount, JSON.stringify(animes)); // Save the list of anime names in sessionStorage.
          animes = []; // Reset the anime list for the next page.
          animes.push(anime.name); // Add the current anime to the new page.

          let pageNode = $(`<p>${pageCount}</p>`); // Creates a page number element.
          pageNode.addClass("pageNumbers"); // Adds a class to the page number element.
          pageNode.click(listPageChange); // Attaches a click event to handle page navigation.
          $("#listPages").append(pageNode); // Adds the page number to the anime list pages container.
          pageCount++; // Increment the page count.
        } else {
          animes.push(anime.name); // Add the anime name to the current page's list.
        }
      });

      // Save the last page's anime list to sessionStorage.
      sessionStorage.setItem(pageCount, JSON.stringify(animes));
      let pageNode = $(`<p>${pageCount}</p>`); // Creates the final page number.
      pageNode.addClass("pageNumbers"); // Adds a class to the page number element.
      pageNode.click(listPageChange); // Attaches a click event for page navigation.
      $("#listPages").append(pageNode); // Appends the final page number to the pagination container.

      // Check if no results were returned.
      if ($listContainer.children().length == 0) {
        $listContainer.append($("<h4>No results found</h4>").addClass("noInfo"));
      }
    },
    "json" // Specifies the expected response type.
  ).fail(function (err) {
    // Handle the error in case of failure.
    console.error("An Error occurred while sending GET Request");
  });
}

function loadAnimeInfo() {
  // Loads the detailed information of the selected anime.
  $(".listItem").each(function (index, listItem) {
    // Removes 'selected' class from all anime items.
    $(listItem).removeClass("selected");
  });
  $(this).addClass("selected"); // Adds 'selected' class to the clicked anime item.

  const $infoContainer = $("#animeInfo"); // The container for displaying the anime details.
  const $nameField = $("#animeName"); // The field for displaying the anime's name.
  const $genre = $("#genre"); // The field for displaying the genre.
  const $rating = $("#rating"); // The field for displaying the rating.
  const $seasons = $("#seasons"); // The field for displaying the number of seasons.
  const $release_finishedField = $("#released_to_finished"); // The field for displaying the release dates.
  const infoQuery = `select name,genre,seasons,year_released,year_finished,CAST(AVG(rating) as DECIMAL(2,1)) as avg_rating from Anime left outer join Ratings on Anime.id = Ratings.anime_id where Anime.name = "${$(
    this
  ).text()}" group by name,genre,seasons,year_released,year_finished`; // SQL query to fetch anime details.

  // Clear any previous comment and rating data.
  $("#comment").val("");
  $("#commentRating").val("");
  $("#userName").val("");

  $.get(
    `http://augwebapps.com:5805/animeInfo?sql=${infoQuery}`, // Sends GET request to retrieve detailed information.
    function (anime) {
      $nameField.text(anime.name); // Sets the anime name.
      $release_finishedField.text(`${anime.year_released} - ${anime.year_finished == null ? "Ongoing" : anime.year_finished}`); // Sets the release year and finished year.
      $genre.text(anime.genre); // Sets the genre.
      $rating.text(anime.avg_rating ? anime.avg_rating : "N/A"); // Sets the rating (if available).
      $seasons.text(anime.seasons); // Sets the number of seasons.
      loadComments(); // Loads the comments for the selected anime.
      $infoContainer.removeClass("hidden"); // Shows the anime details container.
    },
    "json" // Specifies the expected response format.
  ).fail(function (err) {
    // Handle error in case of failure.
    console.error("Request Failed");
  });
}

function loadComments() {
  // Loads the comments for the selected anime.
  const $commentSection = $("#commentSection"); // The section for displaying comments.
  const $animeChoice = $("#animeName").text(); // Gets the selected anime's name.
  const commentQuery = `SELECT comment,user_name FROM Ratings INNER JOIN Anime ON Anime.id = Ratings.anime_id WHERE Anime.name = "${$animeChoice}"`; // SQL query to fetch the comments.

  $commentSection.html($("<h2>Comments</h2>").addClass("titles")); // Adds a title for the comments section.
  $("#commentPages").html(""); // Clears the pagination for the comments.
  $.get(
    `http://augwebapps.com:5805/animeComments?sql=${commentQuery}`, // Sends GET request to fetch the comments.
    function (res) {
      let comments = []; // Array to store comments for pagination.
      let pageCount = 1; // Page counter for comments pagination.
      res.forEach(function (comment, index) {
        if (comment.comment != "NULL") {
          // Ignores comments with 'NULL' value.
          if (index < 5) {
            // Displays only the first 5 comments per page.
            $commentSection.append($(`<p>${comment.comment}<br><span>-<strong>${comment.user_name}</strong></span></p>`).addClass("containers"));
          }

          if (index != 0 && index % 5 == 0) {
            // Every 5 comments, store the comment data in sessionStorage and create pagination buttons.
            sessionStorage.setItem(`commentPage${pageCount}`, JSON.stringify(comments)); // Save the list of comments in sessionStorage.
            comments = []; // Reset the comment list for the next page.
            comments.push(comment); // Add the current comment to the new page.
            let pageNode = $(`<p>${pageCount}</p>`); // Creates a page number element.
            pageNode.addClass("pageNumbers"); // Adds a class to the page number element.
            pageNode.click(commentPageChange); // Attaches a click event for page navigation.
            $("#commentPages").append(pageNode); // Appends the page number to the pagination container.
            pageCount++; // Increment the page count.
          } else {
            comments.push(comment); // Add the comment to the current page's list.
          }
        }
      });

      // Save the last page's comment list to sessionStorage.
      sessionStorage.setItem(`commentPage${pageCount}`, JSON.stringify(comments));
      let pageNode = $(`<p>${pageCount}</p>`); // Creates the final page number for comments.
      pageNode.addClass("pageNumbers"); // Adds a class to the page number element.
      pageNode.click(commentPageChange); // Attaches a click event for page navigation.
      $("#commentPages").append(pageNode); // Appends the final page number to the pagination container.

      // Check if no comments were returned.
      if ($commentSection.children().length <= 1) {
        $commentSection.append($("<h4>No Comments</h4>").addClass("noInfo"));
      }
    },
    "json" // Specifies the expected response format.
  ).fail(function (err) {
    // Handle error in case of failure.
    console.error("An Error Occurred in loadComments");
  });
}

function filterHandler() {
  // Retrieves information from the filter fields.
  const $genreFilter = $("#genreFilter").val() ? `genre = '${$("#genreFilter").val()}' AND ` : ""; // Gets the genre filter value.
  const $year_released = $("#year_released").val() ? `year_released = ${$("#year_released").val()} AND ` : ""; // Gets the release year filter value.
  const $status = $("#status").val() ? ($("#status").val() == "Ongoing" ? "year_finished IS NULL AND " : "year_finished != '' AND ") : ""; // Gets the status filter (ongoing or finished).
  return $genreFilter + $year_released + $status; // Returns the filter query string.
}

function eventListeners() {
  // Attaches event listeners to elements for interaction.
  $("#searchBar").on("input", loadAnimeList); // Listens for input changes in the search bar.
  $("#commentForm").submit(addComment); // Listens for form submission for adding comments.
  $("#filterForm select").on("input", loadAnimeList); // Listens for changes in filter selections.
}

function addComment(event) {
  // Adds a comment for the selected anime.
  event.preventDefault(); // Prevents form submission.

  const $comment = $("#comment"); // Gets the comment input value.
  const $rating = $("#commentRating"); // Gets the rating input value.
  const $userName = $("#userName"); // Gets the username input value.
  const $animeChoice = $("#animeName").text(); // Gets the selected anime's name.

  let sql = `INSERT INTO Ratings(anime_id,rating,comment,user_name) SELECT id,${$rating.val()},"${$comment.val() ? $comment.val() : "NULL"}","${
    $userName.val() ? $userName.val() : "Anonymous"
  }" FROM Anime WHERE Anime.name = "${$animeChoice}"`; // SQL query to insert the comment into the database.

  $.get(`http://augwebapps.com:5805/addComment?sql=${sql}`, function (res) {
    loadComments(); // Reloads the anime info with the new comment.
    $comment.val(""); // Clears the comment input field.
    $rating.val(""); // Clears the rating input field.
    $userName.val(""); // Clears the username input field.
  }).fail(function (err) {
    // Handle error in case of failure.
    console.error("An Error Occurred in addComments");
  });
}

function listPageChange() {
  // Changes the page for the anime list.
  $("#listContainer").html(""); // Clears the anime list container.
  $(".pageNumbers").removeClass("selected"); // Removes the 'selected' class from all page numbers.
  let pageNumber = $(this); // Gets the clicked page number.
  pageNumber.addClass("selected"); // Adds the 'selected' class to the clicked page number.
  const animeList = JSON.parse(sessionStorage.getItem(pageNumber.text())); // Retrieves the anime list for the selected page from sessionStorage.
  animeList.forEach(function (anime) {
    let $animeNode = $(`<p>${anime}</p>`); // Creates a new element for each anime.
    $animeNode.addClass("listItem"); // Adds a class to the anime element.
    $animeNode.click(loadAnimeInfo); // Attaches a click event to load anime info.
    $("#listContainer").append($animeNode); // Appends the anime element to the list container.
  });
}

function commentPageChange() {
  // Changes the page for the comments section.
  $("#commentSection").html($("<h2>Comments</h2>").addClass("titles")); // Adds a title for the comments section.
  $(".pageNumbers").removeClass("selected"); // Removes the 'selected' class from all page numbers.
  let pageNumber = $(this); // Gets the clicked page number.
  pageNumber.addClass("selected"); // Adds the 'selected' class to the clicked page number.
  const comments = JSON.parse(sessionStorage.getItem(`commentPage${pageNumber.text()}`)); // Retrieves the comments for the selected page from sessionStorage.
  comments.forEach(function (comment) {
    $("#commentSection").append($(`<p>${comment.comment}<br><span>-<strong>${comment.user_name}</strong></span></p>`).addClass("containers")); // Appends each comment to the comments section.
  });
}
