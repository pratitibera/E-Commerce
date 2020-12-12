function SellersPage()  {
  var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    console.log(data['id']);

    var request = new XMLHttpRequest()
  request.open("GET", "http://apis-dev.putatoe.com/v1/api/individual_service_providers/" + data['id'], true)
  
  request.setRequestHeader('Content-Type', 'application/json'); 
  request.send(); 
  request.onload = function () {
  	var data = JSON.parse(this.response)
    console.log(data);

    var service_providers = document.getElementById('service_providers');
    for ( i=0; i < (data['service_provider'].length); i++) {
      //inserting the name of the services_main_list
      var title = document.createElement('h5'); 
      title.setAttribute('class','card-title');
      title.setAttribute('style','color: black; text-transform: uppercase; font-weight: 700;');
      title.append(data['service_provider'][i]['provider']);

      //inserting the subcategories
      var sub_services = document.createElement('div');
      sub_services.setAttribute('class','list-group list-group-flush');
      
      //for (j = 0; j < data['services_main_list'][i]['subcategory'].length; j++) {
       // if(j<3){
       // var item = document.createElement('p');
       // item.setAttribute('class','list');
       // item.setAttribute('style','color: black; text-align: center; font-size: 18px;');
        //item.textContent = data['service_provider'][i]['available'][j]['name'];
        //sub_services.append(item);
        //}
      //}

      //inserting a button to explore about that service
      var button = document.createElement('button');
      button.setAttribute('class','btn btn-info');
      button.setAttribute('style','font-size: 16px;');
      var link = document.createElement('a');
      link.setAttribute('id', data['service_provider'][i]['id']);
      link.onclick = function() {Product(this.id)};
      link.textContent = "Know more";
      link.setAttribute('style','text-decoration: none; color: white; cursor: pointer;');
      button.append(link);
      sub_services.append(button);

      //concatenating name of service and subcategories
      var cardDivBody = document.createElement('div');
      cardDivBody.setAttribute('class','card-body');
      cardDivBody.setAttribute('style','text-align: center;');

      //concatenating entire cardDivBody into a section
      var cardSection = document.createElement('div');
      cardSection.setAttribute('class','col-sm-6');

      //Inserting image in the card
      var imageOfCard = document.createElement('img');
      imageOfCard.setAttribute('class','col-sm-6 order-sm-last order-first');
      imageOfCard.setAttribute('src',data['service_provider'][i]['logo']);
      imageOfCard.setAttribute('width','200');
      imageOfCard.setAttribute('height','230');
      imageOfCard.setAttribute('style','object-fit: cover; border-radius: .8rem;');

      //concatenating that section and image
      var cardPiece = document.createElement('div');
      cardPiece.setAttribute('class','row no-gutters');

      //concatenating entire cardPiece into a cardDiv
      var cardDiv = document.createElement('div');
      cardDiv.setAttribute('class','card');
      cardDiv.setAttribute('style','max-width: 480px; background-color: #e6f3ff; box-shadow: 0 1.4rem 8rem rgba(0,0,0,.5); border-radius: .8rem; margin-top: 12px;');
  
      // storing the ready card into a div
      var card1 = document.createElement('div');
      card1.setAttribute('class','col-xs-12 col-sm-6 col-md-6 col-lg-4 wow fadeInLeft animated');
      card1.setAttribute('data-wow-delay','1.0s');

      cardDivBody.append(title);
      cardDivBody.append(sub_services);
      cardSection.append(cardDivBody);
      cardPiece.append(cardSection);
      cardPiece.append(imageOfCard);
      cardDiv.append(cardPiece);
      card1.append(cardDiv);
      service_providers.append(card1);

    }

  }
}

function Product(id1){
  //console.log(id1);
  //console.log(id2);
  url = "http://apis-dev.putatoe.com/v1/api/product/"+id1;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      document.location.href="products.html?id=" + id1;
    })
    .catch(err => {
      //document.location.href="error.html";
       swal({
      title: 'Oops !!!',
      text: 'Something went wrong. Please try again later.',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/putatoeapp/o/Tshirt%2F1231601715117658?alt=media&token=4f3ed340-9128-4b40-89bd-f0336876b52b',
      imageSize: '200x200',
      //imageSize: " 200 × 200 ",
      imageAlt: 'custom image',
      confirmButtonText: 'OK',
      confirmButtonColor: "#009699",
    })
    });
}
