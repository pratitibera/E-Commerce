function productsPage() {
  var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    console.log(data['id']);

  var request = new XMLHttpRequest()
  request.open("GET", "http://apis-dev.putatoe.com/v1/api/product/"+ data['id'], true)
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('device', 'android');
  request.send();
  request.onload = function () {
    var data = JSON.parse(this.response)
    console.log(data);
    productList(data);
  }
}

function productList(data) {
  var product_display = document.getElementById('product_display');
    for (i = 0; i < (data['sub_service_list'].length); i++) {

      //Inserting image in the card
      var imageOfCard = document.createElement('img');
      imageOfCard.setAttribute('src', 'img/atta.png');
      imageOfCard.setAttribute('width', '150');
      imageOfCard.setAttribute('height', '203');
      imageOfCard.setAttribute('style', 'object-fit: cover; text-align: center;');

      //inserting the image in a div
      var imageDiv = document.createElement('div');
      imageDiv.setAttribute('class', 'col-6');
      imageDiv.setAttribute('style', 'padding: 15px;');
      imageDiv.append(imageOfCard);

      //inserting the brand of product
      var brand = document.createElement('h6');
      brand.setAttribute('style', 'color: red; font-size: 14px; padding-top: 12px; font-weight: bold;')
      brand.append(data['sub_service_list'][i]['brand']);

      //inserting the name of product
      var name = document.createElement('h6');
      name.setAttribute('style', 'font-size: 16px;')
      name.append(data['sub_service_list'][i]['name']);

      //inserting the rating icon of product
      var rateicon = document.createElement('i');
      rateicon.setAttribute('class', 'fa fa-star');
      rateicon.setAttribute('style', 'color: #00838f; font-size: 14px; font-weight: bold; margin-right: 5px;')

      //inserting the rating of product
      var rate = document.createElement('h6');
      rate.setAttribute('style', 'color: #00838f; font-size: 14px; font-weight: bold;')
      rate.append(rateicon);
      rate.append(data['sub_service_list'][i]['rating']);

      //inserting the quantities
      var quantities = document.createElement('select');
      quantities.setAttribute('name', 'quantity');
      quantities.id = "quantity_select" + data['sub_service_list'][i]['id'];
      quantities.setAttribute('style', 'font-size: 12px;');
      quantities.setAttribute('onchange', 'priceChange(this)');
      data['sub_service_list'][i]['available_quantity'].forEach(service => {
        quantities.innerHTML += `<option data-price="${service.selling_price}" value="${service.id}">${service.name}</option>`
      })
      //creating a div to insert the select box
      var selectDiv = document.createElement('div');
      selectDiv.append(quantities);


      //creating a div to insert the select box
      var selectDiv = document.createElement('div');
      selectDiv.append(quantities);

      //inserting the price of product
      var price = document.createElement('h6');
      price.setAttribute('style', 'padding-top: 5px; font-family: sans-serif;');
      price.setAttribute('id', 'indivprice' + data['sub_service_list'][i]['id']);
      price.append("MRP : Rs " + data['sub_service_list'][i]['mrp']);

      // Decrement button
      var dec = document.createElement('input');
      dec.setAttribute('type', 'button');
      dec.setAttribute('value', '-');
      dec.setAttribute('id', data['sub_service_list'][i]['id']);
      dec.onclick = function() {decrementValue(this)};
      //dec.setAttribute('onclick', 'decrementValue()');
      dec.setAttribute('style', 'height: 24px; border-radius: 3px; border: 1px solid #56CCF2; background-color: #eee; color: #333; padding: 0; text-align: center; font-size: 0.9em; margin-right: 1px; width: 18%;');

      // area for displaying the count
      var cnt = document.createElement('input');
      cnt.setAttribute('type', 'text');
      cnt.setAttribute('name', 'quantity');
      cnt.setAttribute('value', '1');
      cnt.setAttribute('maxlength', '2');
      cnt.setAttribute('max', '10');
      cnt.setAttribute('size', '1');
      cnt.setAttribute('id', 'qtty'+ data['sub_service_list'][i]['id']);
      cnt.setAttribute('style', 'height: 24px; border-radius: 3px; border: 1px solid #56CCF2; background-color: #eee; color: #333; padding: 0; text-align: center; font-size: 0.9em; margin-right: 1px; width: 22%;');

      // Increment button
      var inc = document.createElement('input');
      inc.setAttribute('type', 'button');
      inc.setAttribute('value', '+');
      inc.setAttribute('id', data['sub_service_list'][i]['id']);
      inc.onclick = function() {incrementValue(this)};
      inc.setAttribute('style', 'height: 24px; border-radius: 3px; border: 1px solid #56CCF2; background-color: #eee; color: #333; padding: 0; text-align: center; font-size: 0.9em; margin-right: 1px; width: 18%;');

      //Creating a Div to insert the quantity inputs
      var qDiv = document.createElement('div');
      qDiv.setAttribute('class', 'row');
      qDiv.setAttribute('style', 'padding-left: 45px; margin-bottom: 10px;');
      qDiv.append(dec);
      qDiv.append(cnt);
      qDiv.append(inc);

      //add to cart button
      var button = document.createElement('button');
      button.setAttribute('class', 'btn btn-lg');
      button.setAttribute('style', 'background: #00838f; color: white; padding: 10px; font-size: 12px; border-radius: 4px; font-weight: bold;')
      button.setAttribute('id', data['sub_service_list'][i]['id']);
      button.textContent = "ADD TO CART";
      button.setAttribute('onclick', `addToCart(this.id)`);

      //Creating a Div to insert the cart button
      var buttonDiv = document.createElement('div');
      buttonDiv.setAttribute('class', 'product_cart_button');
      buttonDiv.setAttribute('style', 'margin-bottom: 10px;');
      buttonDiv.append(button);

      //Creating a Div to insert the product details
      var detailsDiv = document.createElement('div');
      detailsDiv.setAttribute('class', 'col-6');
      detailsDiv.setAttribute('style', 'text-align: center;');
      detailsDiv.append(brand);
      detailsDiv.append(name);
      detailsDiv.append(rate);
      detailsDiv.append(selectDiv);
      detailsDiv.append(price);
      detailsDiv.append(qDiv);
      detailsDiv.append(buttonDiv);

      //creating a DIV to insert image and details
      var cardDiv = document.createElement('div');
      cardDiv.setAttribute('class', 'row');
      cardDiv.append(imageDiv);
      cardDiv.append(detailsDiv);

      //creating a card
      var productCard = document.createElement('div');
      productCard.setAttribute('class', 'card');
      productCard.setAttribute('style', 'box-shadow: 5px 5px 15px rgba(0,0,0,0.9); margin-bottom: 10px; text-align: center;')
      productCard.append(cardDiv);

      //creating a grid for the card
      var productGrid = document.createElement('div');
      productGrid.setAttribute('class', 'col-xs-12 col-sm-6 col-md-6 col-lg-4');
      productGrid.append(productCard);
      product_display.append(productGrid);
}

}

function incrementValue(d) {
  var c = document.getElementById("qtty"+d.id).value
  document.getElementById("qtty"+d.id).value = ++c;
}

function decrementValue(d) {
  var c = document.getElementById("qtty"+d.id).value
  if (c>1) {
  document.getElementById("qtty"+d.id).value = --c;
  }
}

function priceChange(sel) {
  var str = sel.id;
  var matches = str.match(/(\d+)/); 
  if (matches) {
    var id_val = matches[0]; 
  } 
  //console.log(id_val);
  var opt = sel.options[sel.selectedIndex];
  var price = opt.dataset.price
  document.getElementById("indivprice"+id_val).innerHTML = "MRP : Rs " + price;
}

function addToCart(k) {
  var quantity_id = document.getElementById('quantity_select' + k).value;
  var quantity = parseInt(document.getElementById("qtty"+k).value);

  var request = new XMLHttpRequest();
  request.open("POST", "http://apis-dev.putatoe.com/v1/api/add_to_cart", true);
  request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O');
  request.setRequestHeader('Content-Type', 'application/json');

  const json = {
    "product_id": parseInt(k),
    "quantity_id": parseInt(quantity_id),
    "coupon_id": "",
    "quantity": quantity
  }

  console.log(json);

  request.send(JSON.stringify(json));
  request.onload = function () {

    var data = JSON.parse(this.response);
    console.log(data);
    location.reload();
  }
}


function sellerproductsPage() {
  var request = new XMLHttpRequest()
  request.open("GET", "http://apis-dev.putatoe.com/v1/api/product/4", true)
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('device', 'android');
  request.send();
  request.onload = function () {
    var data = JSON.parse(this.response)
    console.log(data);
    productList(data);
  }

}
