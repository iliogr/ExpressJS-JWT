$( document ).ready(function() {
	var token = localStorage.getItem("token");
	$.ajax({
	  type: 'GET',
	  url: '/me',
	  beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', token);},
	  success: function(response) {
           if(response.success == false){
           		window.location.replace("/index.html");
           }
           else
           	$("#name").html('Welcome '+response.message[0].username);
      },
      error: function(error){
      		window.location.replace("/index.html");
      },
	  dataType: 'json'
	});
});