var display_results = functio(results) {

}

var search_talk = function(search_term) {
    return $.ajax({
      method: "GET",
      url: "/search",
      data: { search: search_term}
    })
    .done(function(data) {
        display_results(data)
    })
    .fail(function() {
        console.log("IT FAILED");
    });
}

$("#search_button").on('click', function() {
    var search_value = $("whatever").val();
    search_talk(search_value);
    window.location.assign("/talk");
});
