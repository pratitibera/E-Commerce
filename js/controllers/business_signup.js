var address_line1 = "";
var address_line2 = "";
var landmark = "";
var district = "";
var town = "";
var state = "";
var country = "";
var latitude = "";
var longitude = "";
var zip = "";

// Function will call at the time of Page Loading
function serviceCategory() {

  var request = new XMLHttpRequest();
  request.open("GET", "http://apis-dev.putatoe.com/v1/api/service_list", true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send();
  request.onload = function() {

    var data = JSON.parse(this.response);
    var category_count = data['services_list'].length;

    var categoryGroup = document.getElementById('service_category_list');

    // select Element
    var select = document.createElement('select');
    select.className= "custom-select rounded py-0";
    select.id = "category_items"

    // First Option Element
    var dummyOption = document.createElement('option');
    dummyOption.value = "0";
    dummyOption.textContent = "- - - Select a Category - - -";
    dummyOption.setAttribute('disabled', 'disabled');
    dummyOption.setAttribute('selected', 'selected');
    select.append(dummyOption);
    
    // Remaining Option Elements via API
    for(let i=0; i<category_count; i++) {
      var option = document.createElement('option');
      option.value = data['services_list'][i]['id'];
      option.textContent = data['services_list'][i]['name'];
      select.append(option);
    }

    categoryGroup.appendChild(select);
  }
}

// Function will call when "SAVE AS" button clicked
function registerSeller() {

  // If Address is not Changed then Further Process will not be execute
  if (document.querySelector('#address').textContent == "Click on (Locate Me / Edit Location)") {
    alert('Address is Required! Click on "LOCATE ME" or "EDIT LOCATION"');
    return false;
  }

  // Business Form Fields
  var business_name = document.querySelector('#business_name').value;
  var service_category = document.querySelector('#category_items').value;
  var mobile_number = "+91" + document.querySelector('#contact_number').value;
  var whatsapp_number = "+91" + document.querySelector('#whatsapp_number').value;
  var email_address = document.querySelector('#email_address').value;
  var service_area = document.querySelector('#service_area').value;
  var service_description = document.querySelector('#service_description').value;
  var discount = document.querySelector('#discount').value;

  var home_delivery_available = 0;
  if (document.querySelector('#home_delivery_yes').checked == true)
    home_delivery_available = 1;

  var business_type = 0;
  if (document.querySelector('#business_type_movable').checked == true)
    business_type = 1;

  var shopVisible = 0;
  if (document.querySelector('#shop_visible_yes').checked == true)
    shopVisible = 1;

  var json = {
    "email": email_address,
    "description": service_description,
    "service_category_id": service_category,
    "name": business_name,
    "mobile": mobile_number,
    "whatsappnumber": whatsapp_number,
    "serviceabledistance": service_area,
    "hasdynamiclocaion": business_type,
    "homedeliveryavailable": home_delivery_available,
    "visible": shopVisible,
    "rating":0,
    "totalrating": 0,
    "totalrating_user":0,
    "multipleoutlet":0,
    "multipleservice":0,
    "popular_serviceprovider":0,
    "discount": discount,
    "image": "435435",
    "address": {
      "address_line1": address_line1,
      "address_line2": address_line2,
      "landmark": landmark,
      "town": town,
      "state": state,
      "country": country,
      "pincode": zip,
      "latitude": latitude,
      "longitude": longitude,
      "district": district
    }
  }

  var token = localStorage.getItem("authusertoken");

  var request = new XMLHttpRequest();
  request.open("POST", "http://apis-dev.putatoe.com/v1/api/registerseller", true);
  request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O');
  // request.setRequestHeader('authtoken', token);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(json));
  request.onload = function () {
    var data = JSON.parse(this.response);
    console.log(json);
    console.log(data);
    if (data['status']==true) {
      localStorage.setItem('sellertoken', 'seller_exists');
      console.log(localStorage.getItem('sellertoken'));
      document.location.href="product_register.html";      
    }
  }
}


// Function call when "LOCATE ME" button clicked
function locateMe() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      const KEY = "QUl6YVN5QTdGTFJaY3Q2U0FuM1BWOTRrUkZPT01oSldOd1hvOHlr";
      var decoded = window.atob(KEY);
      console.log(decoded);
      var lat = parseFloat(latitude);
      var long = parseFloat(longitude);
      console.log(lat);
      console.log(long);
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${decoded}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          var full_address = data.results[0].formatted_address;
          console.log(full_address);
          document.querySelector('#address').textContent = full_address;
          let parts = data.results[1].address_components;
          parts.forEach(part => {
            if (part.types.includes("country")) {
              country = part.long_name;
            }
            if (part.types.includes("administrative_area_level_1")) {
              state = part.long_name;
            }
            if (part.types.includes("administrative_area_level_2")) {
              town = part.long_name;
            }
            if (part.types.includes("street_address")) {
              landmark = part.long_name;
            }
            // district check would be necessary here
            // if(part.types.includes("district")) {
            //   district = part.long_name;
            // }
            if (part.types.includes("sublocality_level_1")) {
              addressLine2 = part.short_name;
            }
            if (part.types.includes("locality")) {
              addressLine1 = part.short_name;
            }
            if (part.types.includes("postal_code")) {
              zip = part.long_name;
            }
          });
          const json = {
            "address_line1": addressLine1,
            "address_line2": addressLine2,
            "landmark": landmark,
            "town": town,
            "state": state,
            "latitude": latitude,
            "country": country,
            "longitude": longitude,
            "pincode": zip,
            "district": district,
            "token": localStorage.getItem('aToken')
          };
          var request = new XMLHttpRequest();
          request.open("POST", "http://dev-apis.putatoe.com/v1/api/userlocation", true)
          request.setRequestHeader('Content-Type', 'application/json');
          request.send(JSON.stringify(json));
          request.onload = function () {
            var data = JSON.parse(this.response);
            console.log(data);
            //console.log(json);
            if ("token" in data) {
              localStorage.setItem('authusertoken', full_address);
            }
            else {
              alert("Could not fetch location. Please enter your pincode");
            }
          }
        })
        .catch(err => console.warn(err.message));
    });
  }
}


// Function uses to open the Edit Address Modal using jQuery
function openEditAddressModal() {
  // Targetting the Modal using function because backdrop was still remaining
  // When we were targetting using data-target
  $('#editLocationModal').modal('show');
}


// Function call when "SAVE ADDRESS" button clicked in Edit Address Form
function editAddress() {

  address_line1 = document.querySelector('#inputAddress1').value.trim();
  address_line2 = document.querySelector('#inputAddress2').value.trim();
  country = document.querySelector('#inputCountry').value.trim();
  landmark = document.querySelector('#inputLandmark').value.trim();
  state = document.querySelector('#inputState').value.trim();
  town = document.querySelector('#inputTown').value.trim();
  district = document.querySelector('#inputDistrict').value.trim();
  zip = document.querySelector('#inputZip').value.trim();

  // If user trying to pass the address manually so don't need to have lat. and long.
  latitude = "";
  longitude = "";

  if (address_line1 != '' && country != '' && state != '' && town != '' && district != '' && zip != '') {
    $('#editLocationModal').modal('hide');

    var complete_address = document.querySelector('#address');
    complete_address.textContent = `${address_line2} ${address_line1}, ${town} District ${district} ${state}, ${country} ${zip}`;
  }
  else {
    alert('Please fill the Required (*) Fields');
  }
  // $('.modal-backdrop').remove();
}

// Function will call when checkbox is changed
function sameAsMobileNumber() {
  
  if(document.querySelector('#wp_number').checked == true) 
    document.querySelector('#whatsapp_number').value = document.querySelector('#contact_number').value;
  else 
    document.querySelector('#whatsapp_number').value = "";
}