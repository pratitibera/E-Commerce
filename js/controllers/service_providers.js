var authusertoken = localStorage.getItem('authusertoken');
//console.log(authusertoken);

function SellersPage()  {
  var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    //console.log(data['id']);

    var request = new XMLHttpRequest()
    request.open(urlSet.serviceProviderApi.method, urlSet.serviceProviderApi.url+ data['id'], true)
  request.setRequestHeader('Content-Type', 'application/json'); 
  request.send(); 
  request.onload = function () {
  	var data = JSON.parse(this.response)
    //console.log(data);

    var service_providers = document.getElementById('service_providers');
    for ( i=0; i < (data['service_provider'].length); i++) {
      var service_title = document.createElement('b');
      service_title.append(data['service_provider'][i]['provider']);

      var title = document.createElement('h5'); 
      title.setAttribute('class','service_card_body_head');
      title.append(service_title);
      
      var service_card_body = document.createElement('div');
      service_card_body.setAttribute('class', 'card-body service_card_body');
      service_card_body.append(title);

      //inserting the subcategories
      // for (j = 0; j < data['service_provider'][i]['available'].length; j++){
      //   var service_card_body_subhead = document.createElement('h6');
      //   service_card_body_subhead.append(data['service_provider'][i]['available'][j]['name']);
      //   service_card_body.append(service_card_body_subhead);
      // }

      var service_button = document.createElement('button');
      service_button.setAttribute('type', 'button');
      service_button.setAttribute('class', 'btn btn-info');
      service_button.append("EXPLORE");

      var service_button_link = document.createElement('a');
      service_button_link.setAttribute('id', data['service_provider'][i]['id']);
      service_button_link.onclick = function() {Product(this.id)};
      service_button_link.append(service_button);

      var service_button_div = document.createElement('div');
      service_button_div.setAttribute('class', 'service_card_body_button');
      service_button_div.append(service_button_link);
      service_card_body.append(service_button_div);

      var service_details = document.createElement('div');
      service_details.setAttribute('class', 'col-6 col-xs-6 col-sm-12 col-md-6 col-lg-6');
      service_details.append(service_card_body);

      var service_image = document.createElement('img');
      service_image.setAttribute('class', 'card-img');
      service_image.setAttribute('src', data['service_provider'][i]['logo']);

      var service_image_div = document.createElement('div');
      service_image_div.setAttribute('class', 'col-6 col-xs-6 col-sm-12 col-md-6 col-lg-6 order-md-last order-first service_card_image');
      service_image_div.append(service_image);

      var service_section = document.createElement('div');
      service_section.setAttribute('class', 'row');
      service_section.append(service_details);
      service_section.append(service_image_div);

      var service_card = document.createElement('div');
      service_card.setAttribute('class', 'card service_card');
      service_card.append(service_section);

      var service_grid = document.createElement('div');
      service_grid.setAttribute('class', 'col-12 col-sm-4 col-md-6 col-lg-4 wow fadeInLeft animated');
      service_grid.setAttribute('data-wow-delay','0.2s');
      service_grid.append(service_card);

      service_providers.append(service_grid);
    }

  }
}

function Product(id1){
  //console.log(id1);
  //console.log(id2);
  //request.open(urlSet.serviceProviderApi.method, urlSet.serviceProviderApi.url+ data['id'], true)
  url = urlSet.productsApi.url +id1;
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
