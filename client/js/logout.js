function logout(){
   localStorage.removeItem("token");
   window.location.replace("/index.html");
}