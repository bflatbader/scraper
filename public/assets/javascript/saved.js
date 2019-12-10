// FUNCTIONS
function saveUnsaveArticle (id, status) {
    // POST saved status
    $.ajax({
        method: "POST",
        url: "/save/" + id,
        data: {
            saved: status
        }
    });

}

// VARIABLES
var thisId;
var status;


// On click broken heart icon
$(document).on("click", "#fav-btn", function() {
    // Grab the id and value associated with the article from the heart button
    thisId = $(this).attr("data-id");
    status = $(this).attr("value");

    // Hide card when un-saved
    $(".card[data-id=" + thisId + "]").hide();

    // Set opposite saved status and value
    if (status === 'true') {
        status = false;
        $(this).attr("value", "false");
        $(this).html('<i class="far fa-heart"></i>');
        saveUnsaveArticle(thisId, status);
    } else {
        status = true;
        $(this).attr("value", "true");
        $(this).html('<i class="fas fa-heart"></i>');
        saveUnsaveArticle(thisId, status);
    }
});

// On click note icon
$(document).on("click", "#note-btn", function() {
    // Grab the id associated with the article
    thisId = $(this).attr("data-id");
    
    $(".modal-title").text("Notes for Article: " + thisId);
    $('#notes-modal').show();
});