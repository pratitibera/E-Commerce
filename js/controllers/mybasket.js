var authusertoken = localStorage.getItem('authusertoken');
console.log(authusertoken);

function showCartBasket() {
    var request = new XMLHttpRequest()
    request.open(urlSet.showCartApi.method, urlSet.showCartApi.url, true)
    //request.open("GET", "http://apis-dev.putatoe.com/api/show_cart", true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', authusertoken);  
    request.send(); 
    request.onload = function () {

    var cartdata = JSON.parse(this.response)
    console.log(cartdata);
    if(cartdata['full_cart_price'] == 0) {
      document.getElementById('cart_items').style.height = "350px";
      document.getElementById('dropdown-content').style.width = "280%";
      document.getElementById('totprice').style.display = "none";
      document.getElementById('update_btn').style.display = "none";
      document.getElementById('pay_btn').style.display = "none";
      console.log("Empty");
    }
    else {
      document.getElementById('emptycart').style.display = "none";
      var cart_items = document.getElementById('cart_items');

      if(cartdata['items_list'].length == 1) {
        console.log("one only");
        cart_items.setAttribute('style', 'height: 120px;');
      }
      if(cartdata['items_list'].length == 2) {
        console.log("one only");
        cart_items.setAttribute('style', 'height: 250px;');
      }
      if(cartdata['items_list'].length > 2) {
        cart_items.setAttribute('style', 'height: 250px; overflow-y: scroll;');
      }

    for ( z=0; z < (cartdata['items_list'].length); z++) {
        //Inserting image in the card
      var cartImage = document.createElement('img');
      //cartImage.setAttribute('class','col-sm-6 order-sm-last order-first');
      cartImage.setAttribute('src','img/cart.jpg');
      cartImage.setAttribute('width','100');
      cartImage.setAttribute('height','105');
      //cartImage.setAttribute('style','object-fit: cover; border-radius: .8rem;');

      //inserting the image into a div
      var cartImagePiece = document.createElement('div');
      cartImagePiece.setAttribute('class','col-md-3');
      cartImagePiece.append(cartImage);

      var detailsPiece = document.createElement('div');
      detailsPiece.setAttribute('class','col-md-6');
      detailsPiece.setAttribute('style','padding: 8px;');
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

      detailsPiece.append(details);
      detailsPiece.append(details2);
      detailsPiece.append(details3);
      detailsPiece.append(details4);
      detailsPiece.append(details5);

      var pricePiece = document.createElement('div');
      pricePiece.setAttribute('class','col-md-3');
      //detailsPiece.setAttribute('style','padding: 8px;');
      var actualPrice = document.createElement('p');
      actualPrice.setAttribute('style','font-size: 16px; color: black; font-weight: bold; padding-top: 12px; line-height: normal;');
      actualPrice.append("Rs " + cartdata['items_list'][z]['selling_price']);
      var saving = document.createElement('p');
      saving.setAttribute('style','font-size: 12px; color: black; margin-bottom: 2px; line-height: normal;');
      saving.append("Saving " + cartdata['items_list'][z]['discount']+'%');
      pricePiece.append(actualPrice);
      pricePiece.append(saving);

      var cartDiv = document.createElement('div');
      cartDiv.setAttribute('class','row no-gutters');
      cartDiv.append(cartImagePiece);
      cartDiv.append(detailsPiece);
      cartDiv.append(pricePiece);

      var cartDivSection = document.createElement('div');
      cartDivSection.setAttribute('class','card');
      cartDivSection.append(cartDiv);

      cart_items.append(cartDivSection);
    }

    var total_price = document.getElementById('totprice');
    total_price.textContent = "Total : Rs " + cartdata['full_cart_price'];

    }
    }

}