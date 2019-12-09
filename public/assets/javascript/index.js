$(document).on("click", "#fav-btn", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    console.log(thisId);
});