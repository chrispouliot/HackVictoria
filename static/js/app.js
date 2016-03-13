function toggle() {
    if($("#result_page").is(":visible")) {
        $("#tweet_list").empty();
    }
    $("#search_page").toggle()
    $("#result_page").toggle()
}

var create_list_item = function(result_item) {
    // Shitty way to build the list. Need to use a real framework next time
    var $li = $(document.createElement('li'));
    var $p_text = $(document.createElement('p'));
    var $h3_title = $(document.createElement('h3'));
    var $h4_created = $(document.createElement('h4'));

    $p_text.text(result_item.text);
    $h3_title.text(result_item.screen_name);
    $h4_created.text(result_item.created);

    $li.append($h3_title);
    $li.append($p_text);
    $li.append($h4_created);
    return $li;
}

var display_results = function(results) {
    console.log("Display results");
    console.log(results);
    for(var i = 0; i < results.tweets.length; i++){
        var $li = create_list_item(results.tweets[i]);
        console.log($li);
        $("#tweet_list").append($li);
    }
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
    .always(function () {
        toggle();
        $("#search_term").text(search_term)
    });
}

$("#search").on('click', function() {
    var search_value = $("#searchbox").val();
    search_talk(search_value);
});

$("#search_term").on('click', function() {
    toggle();
});
