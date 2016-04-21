
data = $.get("http://wangxiaokuai.applinzi.com/", function(data, status){

	console.log(data)
	console.log(data.total_points)
	$("#total_points").text(data.total_points)
})

