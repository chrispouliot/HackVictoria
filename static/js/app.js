var display_results = function(results) {
    console.log("Display results");
    console.log(results);
    alert(results)
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
    })
    .always(function() {
        window.location.assign("/talk");
    });
}

$("#search").on('click', function() {
    var search_value = $("#searchbox").val();
    search_talk(search_value);
});
