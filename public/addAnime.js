/*
Client-side javascript file (addAnime.js)
Full-Stack Project
Toni Ojeda
*/
// Initialize the setup function when the page loads
$(setUp);

// Function that sets up event handlers and populates the year dropdowns
function setUp() {
    // Bind the submit event of the anime form to the addAnime function
    $("#animeForm").submit(addAnime);

    // Get the current year
    let currentYear = new Date().getFullYear();
    console.log(currentYear);

    // Populate the "Year Released" and "Year Finished" dropdowns with years from current year down to 1917
    while (currentYear >= 1917) { 
        // 1917 is the year the first anime was made, so we start from there
        // Append the year option to the "Year Released" dropdown
        $("#year_released").append($(`<option value=${currentYear}>${currentYear}</option>`));
        // Append the year option to the "Year Finished" dropdown
        $("#year_finished").append($(`<option value=${currentYear}>${currentYear}</option>`));
        
        // Decrease the current year by 1 to continue populating the dropdown
        --currentYear;
    }
}

// Function to handle the form submission and add the anime
function addAnime(event) {
    // Prevent the default form submission behavior (so the page doesn't reload)
    event.preventDefault();

    // Get the values of the form inputs
    const $name = $("#name");
    const $seasons = $("#seasons");
    const $genre = $("#genre");
    const $year_released = $("#year_released");
    const $year_finished = $("#year_finished");
    $name.removeClass("error")
    // Creating the SQL query to insert the anime data into the database
    const insertQuery = `insert into Anime (name,seasons,genre,year_released,year_finished) values ("${$name.val()}",${$seasons.val()},"${$genre.val()}",${$year_released.val()},${$year_finished.val()})`;
    let searchRes;
    $.get(`http://augwebapps.com:5805/search?name=${$name.val()}&filters=`, function (res) {
        searchRes = res;
        console.log(searchRes);
        
    // Check if the anime is not in the database
    if (!searchRes) {
        // If the anime is not in database, send a GET request to insert the data
        $.get(`http://augwebapps.com:5805/insertAnime?insertQuery=${insertQuery}`, function (res) {
            console.log("Insert Request Done");

            // After successful insertion, clear the form fields
            $name.val('');
            $seasons.val('');
            $genre.val('');
            $year_finished.val('');
            $year_released.val('');
        }).fail(function (err) {
            // If the request fails, log an error message
            console.log("An Error Occurred");
        });
    } else {
        // If anime is in database, highlight name field and show error message
        $name.addClass("error");
        $("#errorMessage").removeClass("hidden");
    }
    }, 'json').fail(function (err) {
        console.log("An error Occurred")
    });
}
