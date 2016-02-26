
$(document).ready(function(){
	
	/* 默认选中Blog页面 */


	$(".nav-item").click(function(){
	    $(this).siblings().removeClass("nav-active");
		
		$(this).addClass("nav-active");
	})

})