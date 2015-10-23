function login(username, password){
	$.ajax({
	  type: 'POST',
	  url: '/api/login',
	  data: {"username": username, "password": password},
	  success: function(response) {
           localStorage.setItem("token", response.token);
           window.location.replace("/profile.html");
        },
	  dataType: 'json'
	});
}