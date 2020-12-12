var productid;
var quantityid;

let c = 0;

var imageDetail = [];
function DisplayName(data) {
    imageDetail[c++] = data;
}

window.onload = function () {
    var request = new XMLHttpRequest()
    request.open("GET", "http://apis-dev.putatoe.com/v1/api/show_content/1", true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.send(); 
    request.onload = function () {
    var data = JSON.parse(this.response)
    console.log(data);

    var categoryGroup = document.getElementById('product_category_list');
    // select Element
    var select = document.createElement('select');
    select.className = "custom-select rounded form-control py-0 product_category_options";
    select.id = "product_category";
    select.onchange = function() {Productsubcategory(data)};

    var option = document.createElement('option');
    option.value = "0";
    option.textContent = "- - - Select a Category - - -";
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('selected', 'selected');
    select.append(option);

    for (let i = 0; i < data['servicelist'].length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.append(data['servicelist'][i]['service']);
        select.append(option);
    }
    
    categoryGroup.appendChild(select);
}
}

function Productsubcategory(data) {
  var x = document.getElementById("product_category").value;
  document.getElementById('product_subcategory_list').innerHTML = "";
  var subcategoryGroup = document.getElementById('product_subcategory_list');
  // select Element
    var select = document.createElement('select');
    select.className = "custom-select rounded form-control py-0 product_category_options";
    select.id = "product_subcategory";
    select.onchange = function() {ProductName(data, x)};

    var option = document.createElement('option');
    option.value = "0";
    option.textContent = "- - - Select a Sub-category - - -";
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('selected', 'selected');
    select.append(option);
  for (let i = 0; i < data['servicelist'][x]['subcategory'].length; i++) {
    var option = document.createElement('option');
        option.value = i;
        option.append(data['servicelist'][x]['subcategory'][i]['subservice']);
        select.append(option);
    }
    subcategoryGroup.appendChild(select);
}

function ProductName(data, x) {
    var y = document.getElementById("product_subcategory").value;
    document.getElementById('product_name_list').innerHTML = "";
    var nameGroup = document.getElementById('product_name_list');
    // select Element
    var select = document.createElement('select');
    select.className = "custom-select rounded form-control py-0 product_category_options";
    select.setAttribute('name', 'daily_need_product_id');
    select.id = "product_name";
    //productid = data['servicelist'][x]['subcategory'][y]['products'][i]['id'];
    select.onchange = function() {ProductBrand(data, x, y)};

    var option = document.createElement('option');
    option.value = "0";
    option.textContent = "- - - Select Product Name - - -";
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('selected', 'selected');
    select.append(option);

  for (let i = 0; i < data['servicelist'][x]['subcategory'][y]['products'].length; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.append(data['servicelist'][x]['subcategory'][y]['products'][i]['product']);
    select.append(option);
    }
    nameGroup.appendChild(select);
}

function ProductBrand(data, x, y) {
    var z = document.getElementById("product_name").value;
    document.getElementById('product_brand_list').innerHTML = "";
    var brandGroup = document.getElementById('product_brand_list');
    // select Element
    var select = document.createElement('select');
    select.className = "custom-select rounded form-control py-0 product_category_options";
    select.id = "product_brand";
    productid = data['servicelist'][x]['subcategory'][y]['products'][z]['id'];
    select.onchange = function() {ProductQuantity(data, x, y, z)};

    var option = document.createElement('option');
    option.value = "0";
    option.textContent = "- - - Select Brand Name - - -";
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('selected', 'selected');
    select.append(option);

  for (let i = 0; i < data['servicelist'][x]['subcategory'][y]['products'][z]['brand'].length; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.append(data['servicelist'][x]['subcategory'][y]['products'][z]['brand'][i]['name']);
    select.append(option);
    }
    brandGroup.appendChild(select);
}

function ProductQuantity(data, x, y, z) {
    var k = document.getElementById("product_brand").value;
    document.getElementById('product_quantity_list').innerHTML = "";
    var quantityGroup = document.getElementById('product_quantity_list');
    // select Element
    var select = document.createElement('select');
    select.className = "custom-select rounded form-control py-0 product_category_options";
    select.setAttribute('name', 'quantity_id');
    select.id = "product_quantity";
    select.onchange = function() {GetProductQuantity(data, x, y, z, k)};

    var option = document.createElement('option');
    option.value = "0";
    option.textContent = "- - - Select Quantity- - -";
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('selected', 'selected');
    select.append(option);

  for (let i = 0; i < data['servicelist'][x]['subcategory'][y]['products'][z]['brand'][k]['quantity'].length; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.append(data['servicelist'][x]['subcategory'][y]['products'][z]['brand'][k]['quantity'][i]['quantity']);
    select.append(option);
    }
    quantityGroup.appendChild(select);
}
function GetProductQuantity(data, x, y, z, k) {
    var l = document.getElementById("product_quantity").value;
    quantityid = data['servicelist'][x]['subcategory'][y]['products'][z]['brand'][k]['quantity'][l]['id'];
}

formElem.onsubmit = async (e) => {
    e.preventDefault();

    // var url = document.location.href,
    //     params = url.split('?')[1].split('&'),
    //     data = {}, tmp;
    // for (var i = 0, l = params.length; i < l; i++) {
    //      tmp = params[i].split('=');
    //      data[tmp[0]] = tmp[1];
    // }
    // console.log(data['id']);

    let formData = new FormData();
    var description = document.getElementById("description").value;
    var actual_price = document.getElementById("actual_price").value;
    var product_quantity = document.getElementById("product_quantity").value;
    var discount = document.getElementById("discount").value;

    formData.append("daily_need_product_id", productid);
    formData.append("service_provider_id", "1");
    formData.append("description", description);
    formData.append("actual_price", actual_price);
    formData.append("product_quantity", product_quantity);
    formData.append("quantity_id", quantityid);
    formData.append("discount", discount);
    formData.append("files", imageDetail);

    let response = await fetch('http://apis-dev.putatoe.com/v1/api/register_product', {
      method: 'POST',
      body: formData
    });

    let result = await response.json();

    console.log(result);
    if(result['status']==true) {
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
            function(isConfirm) {
                if (isConfirm) {
                    location.reload();
                }
            });

        }, 1000);

    }
    else {
        setTimeout(function () {
            swal({
              title: 'OOPS!!!',
              text: 'This product has already been registered',
              imageUrl: 'https://firebasestorage.googleapis.com/v0/b/putatoeapp/o/Tshirt%2F1231601715117658?alt=media&token=4f3ed340-9128-4b40-89bd-f0336876b52b',
              imageSize: '200x200',
              imageAlt: 'custom image',
              confirmButtonText: 'OK',
                confirmButtonColor: "#009699",
            },
            function(isConfirm) {
                if (isConfirm) {
                    location.reload();
                }
            });

        }, 1000);


    }
}