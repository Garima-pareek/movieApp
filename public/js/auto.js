$(function(){
    $('#item').autocomplete({
appendTo:  ".dropdown",
        source: function( request, response ) {
            $.ajax( {
                url: 'http://www.omdbapi.com?s='+ request.term +'&apikey=daee70b3',
                dataType: 'json',
                data: {
                    movie:request.term
                },
                success: function( data ) {
                    var movies = [];
                    jQuery.each(data.Search, function(index, item) {
                        var imdb = item.imdbID;
                        $.ajax({
                            url: 'http://www.omdbapi.com?i='+ imdb +'&apikey=daee70b3',
                            dataType: 'json',
                            data: {
                                movieDetail:imdb
                            },
                            success: function (data) {
                                movies.push(data);
                                response(movies.slice(0, 3),function(item){
                                    return item.Title;
                                });
                            }
                        });
                    });
                }
            });
        },

        open: function(event,ui){

            var len = $('.ui-autocomplete > li').length;

        },



        });
    $( "#item" ).autocomplete({
  select: function( event, ui ) {
document.getElementById("item").value = ui.item.Title;
    return false;


 }

});

    $('#item').data('ui-autocomplete')._renderItem = function( ul, item ){

        var re = new RegExp("^" + this.term, "gi");
        var t = item.Title.replace(re,"<span style='font-weight: bold;text-decoration: underline;text-transform: capitalize;'>" + this.term + "</span>");



        var $li = $('<li>');

        $li.html(
            '<span class="username">' + t + '</span>' +
            '<div class="autodiv" style="clear:both;" ></div>'
        );

        return $li.appendTo(ul);
    };
});

$('#item').autocomplete({

  position:
    absolute,



   });
