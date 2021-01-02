var authusertoken = localStorage.getItem('authusertoken');
//console.log(authusertoken);

function mainServicesPage() {
    var request = new XMLHttpRequest()
    request.open(urlSet.mainServicesApi.method, urlSet.mainServicesApi.url, true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', authusertoken); 
    request.send(); 
    request.onload = function () {
    var data = JSON.parse(this.response)
    //console.log(data);

    // Appending popular products
    var popular_products = document.getElementById("popular_products");
    for (v = 0; v < data['popular_products'].length; v++) { // 'v' is a counter for the loop
      var product_image = document.createElement('img');
      product_image.setAttribute('src', 'img/prod5.jpg');

      var product_image_div = document.createElement('div');
      product_image_div.setAttribute('class', 'img');
      product_image_div.append(product_image);

      var product_name = document.createElement('h3');
      product_name.append(data['popular_products'][v]['name']);

      var product_price = document.createElement('h4');
      product_price.append("Rs " + data['popular_products'][v]['price']);

      var product_brand = document.createElement('h5');
      product_brand.append("Electronic Appliances");

      var product_info = document.createElement('div');
      product_info.setAttribute('class', 'info');
      product_info.append(product_name);
      product_info.append(product_price);
      product_info.append(product_brand);

      var product_div = document.createElement('div');
      product_div.setAttribute('class', 'single-item');
      product_div.append(product_image_div);
      product_div.append(product_info);

      popular_products.append(product_div);
    }

    // image slider function for popular products and service providers
    var flkty = new Flickity( '.popular_products', {
        cellAlign: 'right',
        contain: true,
        freeScroll: true,
        autoPlay: true,
        prevNextButtons: false,
        pageDots: false
      });

    // Appending popular sellers
    var popular_sellers = document.getElementById("popular_sellers");
    for (v = 0; v < data['popular_sellers'].length; v++) {
      var product_image = document.createElement('img');
      product_image.setAttribute('src', 'img/prod5.jpg');

      var product_image_div = document.createElement('div');
      product_image_div.setAttribute('class', 'img');
      product_image_div.append(product_image);

      var product_name = document.createElement('h3');
      product_name.append(data['popular_sellers'][v]['name']);

      var product_button = document.createElement('button');
      product_button.setAttribute('class', 'btn btn-lg');
      product_button.append("EXPLORE");

      var product_info = document.createElement('div');
      product_info.setAttribute('class', 'info');
      product_info.append(product_name);
      product_info.append(product_button);

      var product_div = document.createElement('div');
      product_div.setAttribute('class', 'single-item');
      product_div.append(product_image_div);
      product_div.append(product_info);

      popular_sellers.append(product_div);
    }

    var flkty = new Flickity( '.popular_sellers', {
        cellAlign: 'right',
        contain: true,
        freeScroll: true,
        autoPlay: true,
        prevNextButtons: false,
        pageDots: false
      });

    // Appending main services
    var main_services = document.getElementById('main_services');
    for ( i = 0; i < data['services_main_list'].length; i++) {
      //inserting the name of the services_main_list
      var service_title = document.createElement('b');
      service_title.append(data['services_main_list'][i]['service']);

      var title = document.createElement('h5'); 
      title.setAttribute('class','service_card_body_head');
      title.append(service_title);
      
      var service_card_body = document.createElement('div');
      service_card_body.setAttribute('class', 'card-body service_card_body');
      service_card_body.append(title);

      //inserting the subcategories
      for (j = 0; j < data['services_main_list'][i]['subcategory'].length; j++){
        var service_card_body_subhead = document.createElement('h6');
        service_card_body_subhead.append(data['services_main_list'][i]['subcategory'][j]['name']);
        service_card_body.append(service_card_body_subhead);
      }

      var service_button = document.createElement('button');
      service_button.setAttribute('type', 'button');
      service_button.setAttribute('class', 'btn btn-info');
      service_button.append("EXPLORE");

      var service_button_link = document.createElement('a');
      service_button_link.setAttribute('id', data['services_list'][i]['id']);
      service_button_link.onclick = function() {subcategoryServices(this)};
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
      service_image.setAttribute('src', data['services_main_list'][i]['image']);

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

      main_services.append(service_grid);
    }
  }
    
}

function subcategoryServices(id1) {
    //console.log(id1.id);
    url = urlSet.subServiceApi.url + id1.id;
    fetch(url,{
      method: 'GET',
      headers: {
        'authtoken': authusertoken,
      },
    })
    .then(response => response.json())
    .then(data => {
      document.location.href="subcategory_services.html?id=" + id1.id;
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
