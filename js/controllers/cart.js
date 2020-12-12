// To Update the Cart
var changedProducts = [];

function cartPage(identity) {
      if(identity == 2) {
        document.getElementById("updatebutton").style.display = "none"; 
      }
	  var request = new XMLHttpRequest()
    request.open("GET", "http://apis-dev.putatoe.com/v1/api/show_cart", true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O'); 
    request.send(); 
    request.onload = function () {

    var cartdata = JSON.parse(this.response)
    console.log(cartdata);
    var fprice = 0;

    for ( z=0; z < (cartdata['items_list'].length); z++) {
    	//Inserting image in the card
      var cartImage = document.createElement('img');
      //cartImage.setAttribute('class','col-sm-6 order-sm-last order-first');
      cartImage.setAttribute('src','img/services/9.jpg');
      cartImage.setAttribute('width','85');
      cartImage.setAttribute('height','100');
      //cartImage.setAttribute('style','object-fit: cover; border-radius: .8rem;');

      //inserting the image into a div
      var cartImagePiece = document.createElement('div');
      cartImagePiece.setAttribute('class','col-3 col-sm-3 col-md-3 col-lg-3');
      cartImagePiece.setAttribute('style','padding: 18px;');
      cartImagePiece.append(cartImage);

      var detailsPiece = document.createElement('div');
      detailsPiece.setAttribute('class','col-5 col-sm-6 col-md-6 col-lg-6');
      detailsPiece.setAttribute('style','padding: 18px;');
      var details = document.createElement('p');
      details.setAttribute('style','font-size: 12px; color: black; margin-bottom: 2px; line-height: normal; white-space: pre-line;');
      details.append(cartdata['items_list'][z]['brand']);

      var details2 = document.createElement('p');
      details2.setAttribute('style','font-size: 12px; color: black; margin-bottom: 2px; line-height: normal; white-space: pre-line;');
      details2.append(cartdata['items_list'][z]['product_name'] + '-' + cartdata['items_list'][z]['product_quantity']);

      var details3 = document.createElement('p');
      details3.setAttribute('style','font-size: 12px; color: black; margin-bottom: 2px; line-height: normal; white-space: pre-line;');
      details3.append(cartdata['items_list'][z]['short_description']);

      var details4 = document.createElement('p');
      details4.setAttribute('style','font-size: 12px; color: black; margin-bottom: 2px; line-height: normal; white-space: pre-line;');
      details4.append("Number of items: " + cartdata['items_list'][z]['quantity']);

      var details5 = document.createElement('p');
      details5.setAttribute('style','font-size: 12px; color: black; margin-bottom: 2px; line-height: normal; white-space: pre-line;');
      details5.append("Seller: " + cartdata['items_list'][z]['seller']);

      var details6 = document.createElement('p');
      details6.setAttribute('style', 'font-size: 12px; color: red; margin-bottom: 2px; line-height: normal; white-space: pre-line; text-decoration: line-through;');
      details6.append("Rs " + cartdata['items_list'][z]['actual_price']);

      var details7 = document.createElement('p');
      details7.setAttribute('style', 'font-size: 12px; color: black; margin-bottom: 2px; line-height: normal; white-space: pre-line;');
      details7.append("Discount: " + cartdata['items_list'][z]['discount'] + "%");

      var finalprice = document.createElement('p');
      finalprice.setAttribute('style', 'font-size: 16px; color: red; margin-bottom: 2px; line-height: normal; white-space: pre-line; font-weight: bold');
      finalprice.append("Rs " + cartdata['items_list'][z]['final_price']);
      fprice = fprice + parseInt(cartdata['items_list'][z]['final_price']);

      detailsPiece.append(details);
      detailsPiece.append(details2);
      detailsPiece.append(details3);
      detailsPiece.append(details4);
      detailsPiece.append(details5);
      detailsPiece.append(details6);
      detailsPiece.append(details7);
      detailsPiece.append(finalprice);

      var quantityPiece = document.createElement('div');
      quantityPiece.setAttribute('class','col-4 col-sm-3 col-md-3 col-lg-3');
      quantityPiece.setAttribute('style','padding: 18px;');

      // Decrement button
      var dec = document.createElement('input');
      dec.setAttribute('type', 'button');
      dec.setAttribute('value', '-');
      dec.setAttribute('id', cartdata['items_list'][z]['cart_id']);
      dec.onclick = function() {decrementValue(this), updateQuantity(this)};
      //dec.setAttribute('onclick', 'decrementValue()');
      dec.setAttribute('style', 'height: 24px; border-radius: 3px; border: 1px solid #56CCF2; background-color: #eee; color: #333; padding: 0; text-align: center; font-size: 0.9em; margin-right: 1px; width: 18%;');

      // area for displaying the count
      var cnt = document.createElement('input');
      cnt.setAttribute('type', 'text');
      cnt.setAttribute('class', 'qtycount');
      cnt.setAttribute('name', 'quantity');
      cnt.setAttribute('value', cartdata['items_list'][z]['quantity']);
      cnt.setAttribute('maxlength', '2');
      cnt.setAttribute('max', '10');
      cnt.setAttribute('size', '1');
      cnt.setAttribute('id', cartdata['items_list'][z]['cart_id']+ "item");
      cnt.setAttribute('style', 'height: 24px; border-radius: 3px; border: 1px solid #56CCF2; background-color: #eee; color: #333; padding: 0; text-align: center; font-size: 0.9em; margin-right: 1px; width: 22%;');

      // Increment button
      var inc = document.createElement('input');
      inc.setAttribute('type', 'button');
      inc.setAttribute('value', '+');
      inc.setAttribute('id', cartdata['items_list'][z]['cart_id']);
      inc.onclick = function() {incrementValue(this), updateQuantity(this)};
      inc.setAttribute('style', 'height: 24px; border-radius: 3px; border: 1px solid #56CCF2; background-color: #eee; color: #333; padding: 0; text-align: center; font-size: 0.9em; margin-right: 1px; width: 18%;');
      
      var removebutton = document.createElement('button');
      removebutton.setAttribute('class', 'btn');
      removebutton.setAttribute('style', 'background-color: #D6EFF1; margin-top: 20px; border-radius: 10px;');
      removebutton.setAttribute('id', cartdata['items_list'][z]['cart_id'])
      removebutton.onclick = function() {deleteCart(this)};
      removebutton.append("REMOVE");

      quantityPiece.append(dec);
      quantityPiece.append(cnt);
      quantityPiece.append(inc);
      quantityPiece.append(removebutton);
    
      var cartDiv = document.createElement('div');
      cartDiv.setAttribute('class','row');
      cartDiv.append(cartImagePiece);
      cartDiv.append(detailsPiece);
      cartDiv.append(quantityPiece);

      var cartDivSection = document.createElement('div');
      cartDivSection.setAttribute('class','card');
      cartDivSection.setAttribute('style','margin-bottom: 8px;');
      cartDivSection.append(cartDiv);

      if(identity == 1) {
        var main_pay_cart_item = document.getElementById("main_pay_cart_item");
        main_pay_cart_item.append(cartDivSection);

      }
      if(identity == 2) {
        var main_cart_item = document.getElementById('main_cart_item');
        main_cart_item.append(cartDivSection);
      }
    }

    if(identity == 1) {
    document.getElementById("pay_fprice").append(" " + fprice);
    document.getElementById("pay_payable").append(" " + fprice);
    document.getElementById("pay_final").append(" " + fprice);
    }

    if(identity == 2) {
    document.getElementById("fprice").append(" " + fprice);
    document.getElementById("payable").append(" " + fprice);
    document.getElementById("final").append(" " + fprice);
    }
}


    var request = new XMLHttpRequest()
    request.open("GET", "http://apis-dev.putatoe.com/v1/api/billing_page", true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O'); 
    request.send(); 
    request.onload = function () {
      var billdata = JSON.parse(this.response)
      console.log(billdata);
    }
}

function incrementValue(i) {
  //console.log(i.id);

  var c = document.getElementById(i.id+"item").value
  //console.log(c);
  c++;
  document.getElementById(i.id+"item").value = c;
  document.getElementById("updatebutton").style.display = "block";
}

function decrementValue(i) {
  var c = document.getElementById(i.id+"item").value
  if (c>1) {
    c--;
  document.getElementById(i.id+"item").value = c;
  document.getElementById("updatebutton").style.display = "block";
  }
}

function deleteCart(b) {
  //console.log(b.id);
  var request = new XMLHttpRequest()
  request.open("GET", "http://apis-dev.putatoe.com/v1/api/delete_from_cart/"+ b.id, true)
  request.setRequestHeader('Content-Type', 'application/json');
  //request.setRequestHeader('device', 'android');
  request.send();
  request.onload = function () {
    var data = JSON.parse(this.response)
    console.log(data);
    location.reload();
  }
}

function updateQuantity(y) {
  const product = {
        "cart_id": parseInt(y.id),
        "quantity": parseInt(document.getElementById(y.id+"item").value),
        "status": 1,
        "coupon_id": null
    }
    //console.log(product);
    if (changedProducts.length != 0) {

        let flag = 1;

        for (let n = 0; n < changedProducts.length; n++) {
            if (changedProducts[n]['cart_id'] == y.id) {
                changedProducts[n] = { ...changedProducts[n], "quantity": parseInt(document.getElementById(y.id+"item").value) };
                console.log(changedProducts[n]);
                flag = 2;
            }
        }

        if (flag == 1) {
            changedProducts.push(product);
        }
    }
    else
        changedProducts.push(product);

    console.log("Size - " + changedProducts.length);
    console.log(changedProducts);
    console.log("\n");
}


// Update Cart
function updateCart() {
    console.log(changedProducts);

    var request = new XMLHttpRequest();
    const json = {
        "cart_list": [...changedProducts]
    }
    request.open("POST", "http://apis-dev.putatoe.com/v1/api/update_cart", true);
    request.setRequestHeader('Content-Type', 'application/json');

    // console.log("babel");
    // console.log([...changedProducts]);
    // console.log("babel");

    request.send(JSON.stringify(json));
    request.onload = function () {
        var data = JSON.parse(request.response);
        console.log(data);
    }
    location.reload();
}