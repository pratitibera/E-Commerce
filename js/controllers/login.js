var val;
window.onload = function () {
  document.getElementById("verify_otp").setAttribute('style', 'display: none;');
  document.getElementById("loginbox").setAttribute('style', 'display: block;');
}
function shownumber(v) {
  val = v;

  var mobnum = Mobnumber.value;
  console.log(mobnum);
  const json = {
            "mobile": mobnum
        };
  var request = new XMLHttpRequest();
    request.open("POST","http://apis-dev.putatoe.com/v1/api/register", true)
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(json));
    request.onload = function () {
      var data = JSON.parse(this.response);
        console.log(data);
         if ("token" in data) {
            //localStorage.setItem('authusertoken', full_address);
            showOTP(data["token"]);
        }
        else {
          swal({
      title: 'Oops !!!',
      text: 'The mobile number you entered is invalid. Check that you entered +91 before your number',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/putatoeapp/o/Tshirt%2F1231601715117658?alt=media&token=4f3ed340-9128-4b40-89bd-f0336876b52b',
      imageSize: '200x200',
      //imageSize: " 200 × 200 ",
      imageAlt: 'custom image',
      confirmButtonText: 'OK',
      confirmButtonColor: "#009699",
    })
    }
     var timeleft = 59;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("timer_para").innerHTML = "<a href='login.html'>Resend OTP</a>";
        document.getElementById("timer_para").setAttribute("onclick", "unhideOTPform()" );

    } else {
        if(timeleft>9){
            document.getElementById("timer").innerHTML = timeleft ;
        }
        else{
            document.getElementById("timer").innerHTML = "0"+timeleft;
        }
       
    }
     timeleft -= 1;
    }, 1000);
    }
}

function showOTP(tok) {
  console.log(tok);
  var mobnum = Mobnumber.value;
  //console.log(mobnum);
  document.getElementById("invalid").setAttribute('style', 'display: none;');
  document.getElementById("re_enter").setAttribute('style', 'display: none;');
  document.getElementById("entered_mob_no").innerHTML = mobnum;
  document.getElementById("loginbox").setAttribute('style', 'display: none;');
  document.getElementById("verify_otp").setAttribute('style', 'display: block;');
    document.getElementById("verify").onclick = function() {register(tok)};
    //document.getElementById("verify").setAttribute('onclick', 'register(otp_values, tok)'); 
}

function register(tok) {
  document.getElementById("loginbox").setAttribute('style', 'display: none;');
  document.getElementById("verify_otp").setAttribute('style', 'display: block;');
  var opt_v1 = document.getElementById('otp_val1').value;
    var opt_v2 = document.getElementById('otp_val2').value;
    var opt_v3 = document.getElementById('otp_val3').value;
    var opt_v4 = document.getElementById('otp_val4').value;
    var otp_values = opt_v1 + opt_v2 + opt_v3 + opt_v4;
    console.log(otp_values);
  console.log(tok);
  if (opt_v1 == "" || opt_v2 == "" || opt_v3 == "" || opt_v4 == "") {
      alert("Enter OTP");
    }
    else {
      const json = {
        "otp": otp_values,
        "authtoken": tok
      };
      var request = new XMLHttpRequest();
      request.open("POST","http://apis-dev.putatoe.com/v1/api/registerconfirm", true)
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(json));
      request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
         if ("token" in data) {
          setTimeout(function () { 
            swal({
              title: 'Hurray!!!',
              text: 'You have successfully registered',
              imageUrl: 'https://firebasestorage.googleapis.com/v0/b/putatoeapp/o/Tshirt%2F1231602131548784?alt=media&token=8332eb34-a209-4aba-a6da-3051c57c9c8e',
              imageSize: '200x200',
              imageAlt: 'custom image',
              confirmButtonText: 'OK',
                confirmButtonColor: "#009699",
            },
            function(isConfirm){
              if (isConfirm) {
                if(val == 0){
                  window.location.href = "index.html";
                }
                if(val == 1){
                  var seller = localStorage.getItem('sellertoken');
                  console.log(seller);
                  if(seller==null) {
                    console.log("empty");
                    window.location.href = "business_signup.html";
                  }
                  else {
                    console.log("not empty");
                    window.location.href = "product_register.html";
                  }
                  
                }
              }
            }); }, 1000);

          localStorage.setItem('customertoken', data['token']);
         }
        else {
             invalidotp();
        }// else ends
        } // request ends
    }// else ends
}// function ends

function invalidotp() {
  document.getElementById("invalid").setAttribute('style', 'display: block;');
    document.getElementById("re_enter").setAttribute('style', 'display: block;');
    document.getElementById("veri").setAttribute('style', 'display: none;');
    document.getElementById("sent").setAttribute('style', 'display: none;');
    document.getElementById("timer_para").innerHTML = "<a href='new_login.html'>Resend OTP</a>";
}

window.fbAsyncInit = function() {
    FB.init({
      appId      : '3362240463838395',
      cookie     : true,
      xfbml      : true,
      version    : 'v7.0'
    });
      
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          getFbUserData();
        }
      });
    // FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

function fbLogin() {
        FB.login(function (response) {
        if (response.authResponse) {
            getFbUserData();
        } else {
            alert('You did not authorize completely. ')
        }
        }, { scope: 'email' });
    }

    function getFbUserData() {
        FB.api('/me', { locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture' },
          function (response) {
            var account = "facebook";
            var account_id = response.id;
            var email = response.email;
            var name = response.first_name + " " + response.last_name;
            loginWithSocialMedia(account, account_id, email, name);
          });
       
       }

       function loginWithSocialMedia(account, account_id, email, name) {
        var request = new XMLHttpRequest()
        request.open(urlSet.loginWithSocialMediaApi.method, urlSet.loginWithSocialMediaApi.url, true)
        const json = {
          "account": account,
          "account_id": account_id,
          "email": email,
          "name": name
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(json));
        request.onload = function () {
          var data = JSON.parse(this.response)
          console.log("confirm: ", data);
         localStorage.setItem("cUser", data["email"]);
          localStorage.setItem("aToken", data["token"]);
          
        }
      }

function onSignInGmail(googleUser) {
    // get user profile information
  //  console.log(JSON.stringify(googleUser.getBasicProfile()));
    var profile = googleUser.getBasicProfile();
  
    var account = "google";
    var account_id = profile.getId();
    var email = profile.getEmail();
    var name = profile.getName();
    loginWithSocialMedia(account, account_id, email, name);
  }