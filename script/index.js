
$(document).ready(function(){
	url = "http://wangxiaokuai.applinzi.com?key=wangxiaokuai.github.io"

	var data = $.get(url, function(data, status){

		$("#total_points").text(data.total_points)
	})

});	// end of $.ready()