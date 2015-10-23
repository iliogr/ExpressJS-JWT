function register(email, username, password){
	$.ajax({
	  type: 'POST',
	  url: '/api/register',
	  data: {"email": email, "username": username, "password": password},
	  success: function(response) {
           console.log(response);
           if(response.success == 'false'){
           	$("#error").html('error registering, please try again');
           }
           else
           	window.location.replace("/index.html");
        },
	  dataType: 'json'
	});
}