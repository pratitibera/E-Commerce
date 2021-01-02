// window.onload = function () {
//   var add = localStorage.getItem('authusertoken');
//   console.log(add);
//   if(add != null) {
//     //For wide screen
//     document.getElementById("addree").innerHTML = localStorage.getItem('authusertoken');  
//     document.getElementById("continue").setAttribute('onclick', 'servicesPage()');
//     document.getElementById("change").innerHTML = "Change location";
//     document.getElementById("change").setAttribute('style', 'height: 42px; padding: 12px; width: 130px; background-color: #e9fbfa; color: black; font-size: 14px; cursor: pointer; border-radius: 6%; margin-left: 220px;');
//     document.getElementById("change").setAttribute('onclick', 'changeLoca()');
//     document.getElementById("pin").setAttribute('style', 'display:none;');
//     document.getElementById("pincode").setAttribute('style', 'display:none;');
//     //For Humberger
//     document.getElementById("hum_addree").innerHTML = localStorage.getItem('authusertoken');  
//     document.getElementById("hum_continue").setAttribute('onclick', 'servicesPage()');
//     document.getElementById("hum_change").innerHTML = "Change location";
//     document.getElementById("hum_change").setAttribute('style', 'height: 42px; padding: 12px; width: 130px; background-color: #00838f; color: white; font-size: 14px; cursor: pointer; border-radius: 6%; margin-left: 20px;');
//     document.getElementById("hum_change").setAttribute('onclick', 'changeLoca()');
//     document.getElementById("hum_pin").setAttribute('style', 'display:none;');
//     document.getElementById("hum_pincode").setAttribute('style', 'display:none;');
//   }
//   if(add == null) {
//   document.getElementById("addree").setAttribute('style', 'display:none;');
//   document.getElementById("continue").setAttribute('style', 'display:none;');
//   document.getElementById("hum_addree").setAttribute('style', 'display:none;');
//   document.getElementById("hum_continue").setAttribute('style', 'display:none;');
//   var latitude = "";
//   var longitude = "";
//   if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
//     const KEY = "QUl6YVN5QTdGTFJaY3Q2U0FuM1BWOTRrUkZPT01oSldOd1hvOHlr";   
//     var decoded = window.atob(KEY);
//     console.log(decoded);        
//     var lat =  parseFloat(latitude);
//     var long = parseFloat(longitude);
//     console.log(lat);
//     console.log(long);
//     let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${'AIzaSyA7FLRZct6SAn3PV94kRFOOMhJWNwXo8yk'}`;         
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//     console.log(data);
//     var full_address = data.results[0].formatted_address;
//     //console.log(full_address);
//     //alert(data.results[0].formatted_address);
//     let parts = data.results[1].address_components;
//     var country = "";
//     var addressLine1 = "";
//     var addressLine2 = "";
//     var landmark = "";
//     var town= "";
//     var state = "";
//     var pincode = "";
//     parts.forEach(part => {
//       if (part.types.includes("country")) {
//         country = part.long_name;
//       }
//       if (part.types.includes("administrative_area_level_1")) {
//         state = part.long_name;
//       }
//       if (part.types.includes("administrative_area_level_2")) {
//         town = part.long_name;
//       }
//       if (part.types.includes("street_address")) {
//         landmark = part.long_name;
//       }
//       if (part.types.includes("sublocality_level_1")) {
//         addressLine2 = part.short_name;
//       }
//       if (part.types.includes("locality")) {
//         addressLine1  = part.short_name;
//       }
//       if (part.types.includes("postal_code")) {
//         pincode  = part.long_name;
//       }
//     });
//           const json = {
//             "address_line1": addressLine1,
//             "address_line2": addressLine2,
//             "landmark": landmark,
//             "town": town,
//             "state": state,
//             "latitude": latitude,
//             "country": country,
//             "longitude": longitude,
//             "pincode": pincode,
//             "district" : town
            
//         };
//         var request = new XMLHttpRequest();
//         request.open("POST","http://dev-apis.putatoe.com/v1/api/userlocation", true)
//         request.setRequestHeader('Content-Type', 'application/json');
//         request.send(JSON.stringify(json));
//         request.onload = function () {
//           var data = JSON.parse(this.response);
//           console.log(data);
//           //console.log(json);
//           if ("token" in data) {
//             localStorage.setItem('authusertoken', full_address);
//             location.reload();
//         }
//         else{
//           alert("Could not fetch location. Please enter your pincode");
//           location.reload();
//         }
//         }
//         })
//         .catch(err => console.warn(err.message));          
//             });
//         }
  
//   }
// }
//   function servicesPage() {
//     url = "http://apis-dev.putatoe.com/v1/api/services";
//     fetch(url, {
//     	method: 'GET',
//     	headers: {
//     		'authtoken': 'X5IUV482KC32TFSHPVV339KVHLLVPJ1AC9M4GI689GSIXYRCEL',
//     	},
//     })
//     .then(response => response.json())
//     .then(data => {
//       document.location.href="main.html";
//     })
//     .catch(err => {
//       //document.location.href="error.html";
//        swal({
//       title: 'Oops !!!',
//       text: 'Something went wrong. Please try again later.',
//       imageUrl: 'https://firebasestorage.googleapis.com/v0/b/putatoeapp/o/Tshirt%2F1231601715117658?alt=media&token=4f3ed340-9128-4b40-89bd-f0336876b52b',
//       imageSize: '200x200',
//       //imageSize: " 200 × 200 ",
//       imageAlt: 'custom image',
//       confirmButtonText: 'OK',
//       confirmButtonColor: "#009699",
//     })
//     });
//   }
//   function changeLoca() {
//   document.getElementById("addree").innerHTML = " ";  
//   document.getElementById("hum_addree").innerHTML = " ";  
//   localStorage.clear();
//   location.reload();
//   }
//   function code() {
//     var value = pin.value;
//     pincode(value);
//   }
//   function humcode() {
//     var value = hum_pin.value;
//     pincode(value);
//   }
//   function pincode(value) {
//     const KEY = "QUl6YVN5QTdGTFJaY3Q2U0FuM1BWOTRrUkZPT01oSldOd1hvOHlr";   
//     var decoded = window.atob(KEY);
//     console.log(decoded);
//     let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${decoded}`;
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       var full_address = data.results[0].formatted_address;
//       document.getElementById("pin").setAttribute('style', 'display:none;');
//       document.getElementById("pincode").setAttribute('style', 'display:none;');
//       document.getElementById("hum_pin").setAttribute('style', 'display:none;');
//       document.getElementById("hum_pincode").setAttribute('style', 'display:none;');

//       console.log(full_address);
//       let parts = data.results[0].address_components;
//             var country = "";
//             var addressLine1 = "";
//             var addressLine2 = "";
//             var landmark = "";
//             var town= "";
//             var state = "";
//             var pincode = "";
//             var latitude = "";
//             var longitude = "";
//             parts.forEach(part => {
//       if (part.types.includes("country")) {
//         country = part.long_name;
//       }
//       if (part.types.includes("administrative_area_level_1")) {
//         state = part.long_name;
//       }
//       if (part.types.includes("administrative_area_level_2")) {
//         town = part.long_name;
//       }
//       if (part.types.includes("street_address")) {
//         landmark = part.long_name;
//       }
//       if (part.types.includes("sublocality_level_1")) {
//         addressLine2 = part.short_name;
//       }
//       if (part.types.includes("locality")) {
//         addressLine1  = part.long_name;
//       }
//       if (part.types.includes("postal_code")) {
//         pincode  = part.long_name;
//       }
//       latitude = data.results[0].geometry.location.lat;
//       longitude = data.results[0].geometry.location.lng;
//     });
//             const json = {
//             "address_line1": addressLine1,
//             "address_line2": addressLine2,
//             "landmark": landmark,
//             "town": town,
//             "state": state,
//             "latitude": latitude,
//             "country": country,
//             "longitude": longitude,
//             "pincode": pincode,
//             "district": town   
//         };
//         var request = new XMLHttpRequest();
//         request.open("POST","http://dev-apis.putatoe.com/v1/api/userlocation", true)
//         request.setRequestHeader('Content-Type', 'application/json');
//         request.send(JSON.stringify(json));
//         request.onload = function () {
//           var data = JSON.parse(this.response);
//             console.log(data);
//             console.log(json);
//             if ("token" in data) {
//             localStorage.setItem('authusertoken', full_address);
//             location.reload();
//         }
//         else{
//           alert("Could not fetch location. Please allow us to track your location");
//           location.reload();
//         }
//         }

//     })
//   }

window.onload = function () {
  document.getElementById("addree").setAttribute('style', 'display:none;');
  document.getElementById("continue").setAttribute('style', 'display:none;');
  document.getElementById("hum_addree").setAttribute('style', 'display:none;');
  document.getElementById("hum_continue").setAttribute('style', 'display:none;');
  var customertoken = localStorage.getItem('customertoken');
  console.log(customertoken);
  if( customertoken != null){
    console.log('p');
    document.getElementById("login_btn").setAttribute('style', 'display:none;');
    document.getElementById("header_login").setAttribute('style', 'display:none;');
    document.getElementById("logout_btn").setAttribute('style', 'display:block;');
    document.getElementById("header_logout").setAttribute('style', 'display:block;');
    const json = {
            "address_line1" : "kathyatbara",
    "address_line2" : "surajkund",
    "landmark" : "PG college gate",
    "town" : "Bageshwar",
    "state" : "Uttarakhand",
    "latitude" : "44",
    "district":"Bageshwar",
    "country": "India",
    "longitude": "233",
    "pincode": "263642",
    "token": customertoken
        };

        var request = new XMLHttpRequest();
   request.open(urlSet.userLocationApi.method, urlSet.userLocationApi.url, true)
   request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify(json));
   request.onload = function () {
    var data = JSON.parse(this.response);
    console.log(data);
    if ("token" in data) {
      localStorage.setItem('authusertoken', data['token']);
      console.log(localStorage.getItem('authusertoken'));
    }
  }
  }
  else{
    console.log('o');
    document.getElementById("login_btn").setAttribute('style', 'display:block;');
    document.getElementById("header_login").setAttribute('style', 'display:block;');
    document.getElementById("logout_btn").setAttribute('style', 'display:none;');
    document.getElementById("header_logout").setAttribute('style', 'display:none;');
    const json = {
            "address_line1" : "kathyatbara",
    "address_line2" : "surajkund",
    "landmark" : "PG college gate",
    "town" : "Bageshwar",
    "state" : "Uttarakhand",
    "latitude" : "44",
    "district":"Bageshwar",
    "country": "India",
    "longitude": "233",
    "pincode": "263642"
        };

        var request = new XMLHttpRequest();
   request.open(urlSet.userLocationApi.method, urlSet.userLocationApi.url, true)
   request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify(json));
   request.onload = function () {
    var data = JSON.parse(this.response);
    console.log(data);
    if ("token" in data) {
      localStorage.setItem('authusertoken', data['token']);
      console.log(localStorage.getItem('authusertoken'));
    }
  }
  }

}

function humcode() {
    var val = document.getElementById("hum_pincode").value;
    console.log(val.length);
    if(val.length == 6) {
      document.location.href="main.html";
    }
    else {
      alert("Please enter a valid PINCODE");
      location.reload();
    }
  }

  function code() {
    var value = document.getElementById("pin").value;
    if(value.length == 6) {
      document.location.href="main.html";
    }
    else {
      alert("Please enter a valid PINCODE");
      location.reload();
    }
  }