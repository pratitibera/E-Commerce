function navbar(){
  var customertoken = localStorage.getItem('customertoken');
  console.log(customertoken);
  if(customertoken != null){
    console.log('p');
    document.getElementById("login_btn").setAttribute('style', 'display:none;');
    document.getElementById("header_login").setAttribute('style', 'display:none;');
    document.getElementById("logout_btn").setAttribute('style', 'display:block;');
    document.getElementById("header_logout").setAttribute('style', 'display:block;');
  }
  else{
  	console.log('o');
    document.getElementById("login_btn").setAttribute('style', 'display:block;');
    document.getElementById("header_login").setAttribute('style', 'display:block;');
    document.getElementById("logout_btn").setAttribute('style', 'display:none;');
    document.getElementById("header_logout").setAttribute('style', 'display:none;');
  }
}

function logout(){
    var request = new XMLHttpRequest()
    request.open(urlSet.logoutApi.method, urlSet.logoutApi.url, true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', localStorage.getItem('customertoken')); 
    request.send(); 
    request.onload = function () {

    var data = JSON.parse(this.response)
    console.log(data);
    if (data['status'] == true) {
      localStorage.clear();
      location.reload();
    }

  }
}