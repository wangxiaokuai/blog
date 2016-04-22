$(document).ready(function(){
	var page_id = $("#page_id").text()

	if (page_id) {
		url = "http://wangxiaokuai.applinzi.com" + "?key=" + page_id
		console.log(url)

		var data = $.get(url, function(data, status){

			console.log(data)
			console.log(data.total_points)
			$("#read_times").text(data.total_points)
		})
	}

});	// end of $.ready()