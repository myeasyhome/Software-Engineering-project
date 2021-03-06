$(document).ready(function(){
	$(".remove_profile_btn").click(function(){
		var _id = $(this).parent().siblings(".hidden_profileId").val();
		if(confirm("简历删除后将无法恢复，请确认")){
			$.post('/person/remove_profile', {
				_id: _id,
			}, function(data, status){
				if (status == 'success'){
					if (data.flag == 0){
						alert(JSON.stringify(data.status));
					}else{
						document.location.reload();
					}
				}
			});
		}
	});
	$(".default_select").click(function(){
		if($(this).text() == '否'){
			var _id = $(this).parent().siblings(".hidden_profileId").val();
			$(this).css("background-color", "rgb(0,188,212)").text('是');
			$(this).parent().next().children().css("background-color", "rgb(0,188,212)").text('是');
			$(".default_select").not(this).css("background-color", "#BBBBBB").text('否');
			$(".default_select").not(this).parent().next().children().css("background-color", "#BBBBBB").text('否');
			$.post('/person/modify_default', {_id:_id}, function(data, status){
				if (status == 'success'){
					if (data.flag == 0){
						alert(JSON.stringify(data.status));
					}
				}
			});
		}
	});

	$(".public_select").click(function(){
		if ($(this).parent().prev().children().text() == '是'){
			var _id = $(this).parent().siblings(".hidden_profileId").val();
			if($(this).text() == '是'){
				$(this).css("background-color", "#BBBBBB").text('否');
			}else {
				$(this).css("background-color", "rgb(0,188,212)").text('是');
			}
			$.post('/person/modify_public', {_id:_id}, function(data, status){
				if (status == 'success'){
					if (data.flag == 0){
						alert(JSON.stringify(data.status));
					}
				}
			});
		}
	});
	$(".modify_profile_btn").click(function(){
		window.location.href = "/person/modify_profile?_id="+$(this).parent().siblings(".hidden_profileId").val();
	});
	$(".list_btn").click(function(){
		window.location.href = "/user/create_profile";
	});
});

