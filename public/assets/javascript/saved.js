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
var noteText;
var noteId;
var listItem;


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
    // Empty the list-group and note-text textarea
    $('.list-group').empty();
    $('#note-text').val('');
    
    // Grab the id associated with the article
    thisId = $(this).attr("data-id");
    
    $('.modal-title').html('Notes for Article: <span id="id-span">' + thisId + '</span');
    $('#notes-modal').show();

    // TODO: Get notes from MongoDB notes collection, display in modal
    $.ajax({
        method: "GET",
        url: "/notes/" + thisId
    }).then(function(response){
        // Get the IDs and text for all notes
        for (i in response) {
            noteText = response[i].noteText;
            noteId = response[i]._id;
            
            listItem = `<li class="list-group-item">${noteText} <button id="trash-btn" data-id="${noteId}" class="btn btn-sm float-right"><i class="fas fa-trash-alt"></i></button></li>`
            $('.list-group').append(listItem);
        
        }
    });
});

// On click save notes button
$(document).on("click", "#save-btn", function() {
    // Grab the id associated with the article and the text in the text area
    thisId = $('#id-span').text();
    noteText = $('#note-text').val();

    // TODO: Save note to DB, add note to list above
    $.ajax({
        method: "POST",
        url: "/addnote",
        data: {
            _headlineId: thisId,
            noteText: noteText
        }
    });
});