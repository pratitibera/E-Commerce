var flag = 0;

function mainServicesPage() {
    var request = new XMLHttpRequest()
    request.open("GET", "http://apis-dev.putatoe.com/v1/api/services", true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O'); 
    request.send(); 
    request.onload = function () {
    var data = JSON.parse(this.response)
    console.log(data);

    var popular_products = document.getElementById("popular_products");
    for (v = 0; v < data['popular_products'].length; v++) {
      flag = 1;
      var prod_image = document.createElement('img');
      prod_image.setAttribute('class', 'img');
      prod_image.setAttribute('src', 'img/prod5.jpg');

      //console.log(data['popular_products'].length);
      var prod_name = document.createElement('h3');
      prod_name.append(data['popular_products'][v]['name']);
      //console.log(data['popular_products'][v]['name']);

      var prod_price = document.createElement('h4');
      prod_price.append("Rs " + data['popular_products'][v]['price']);
      //console.log(data['popular_products'][v]['price']);

      var prod_button = document.createElement('button');
      prod_button.setAttribute('class', 'btn btn-lg');
      prod_button.append("ADD TO CART");

      var prod = document.createElement('div');
      prod.setAttribute('class', 'single-item');
      //prod.setAttribute('style', 'width: 20%; background: #fff; border-radius: 5px; color: #6a6b6d;')
      prod.append(prod_image);
      prod.append(prod_name);
      prod.append(prod_price);
      prod.append(prod_button);

      // var prodSection = document.createElement('div');
      // prodSection.append(prod);
      //console.log(prod);
      popular_products.append(prod);
    }

    if(flag == 1) {
      var flkty = new Flickity( '.popular-carousel', {
        cellAlign: 'right',
        contain: true,
        freeScroll: true,
        autoPlay: true,
        prevNextButtons: false,
        pageDots: true
      });

    }

    var popular_sellers = document.getElementById("popular_sellers");
    for (v = 0; v < data['popular_sellers'].length; v++) {
      flag = 2;
      var prod_image = document.createElement('img');
      prod_image.setAttribute('class', 'img');
      prod_image.setAttribute('src', data['popular_sellers'][v]['logo']);

      var prod_name = document.createElement('h4');
      prod_name.append(data['popular_sellers'][v]['name']);

      var prod_name_div = document.createElement('div');
      prod_name_div.setAttribute('style', 'height: 50px;');
      prod_name_div.append(prod_name);

      var prod_button = document.createElement('button');
      prod_button.setAttribute('class', 'btn btn-lg');
      prod_button.append("EXPLORE");

      var prod = document.createElement('div');
      prod.setAttribute('class', 'single-item');
      prod.append(prod_image);
      prod.append(prod_name_div);
      prod.append(prod_button);
      popular_sellers.append(prod);
    }

    if(flag == 2) {
      var flkty = new Flickity( '.popular-carous', {
        cellAlign: 'right',
        contain: true,
        freeScroll: true,
        autoPlay: true,
        prevNextButtons: false,
        pageDots: true
      });

    }


    //console.log(popular_products);

    var main_services = document.getElementById('main_services');
    for ( i=0; i < 4; i++) {
      //inserting the name of the services_main_list
      var title = document.createElement('h5'); 
      title.setAttribute('class','card-title');
      title.setAttribute('style','color: black; text-transform: uppercase; font-weight: 700;');
      title.append(data['services_main_list'][i]['service']);
      //console.log(data['services_main_list'][i]['service']);

      //inserting the subcategories
      var sub_services = document.createElement('div');
      sub_services.setAttribute('class','list-group list-group-flush');
      
      for (j = 0; j < data['services_main_list'][i]['subcategory'].length; j++) {
        if(j<2){
        var item = document.createElement('p');
        item.setAttribute('class','list');
        item.setAttribute('style','color: black; text-align: center; font-size: 18px;');
        item.textContent = data['services_main_list'][i]['subcategory'][j]['name'];
        sub_services.append(item);
        }
      }

      //inserting a button to explore about that service
      var button = document.createElement('button');
      button.setAttribute('class','btn btn-info');
      button.setAttribute('style','font-size: 16px;');
      var link = document.createElement('a');
      link.setAttribute('id', data['services_list'][i]['id']);
      //var id = (data['services_list'][i]['id']);
      link.onclick = function() {subcategoryServices(this)};
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
      imageOfCard.setAttribute('src',data['services_main_list'][i]['image']);
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
      main_services.append(card1);

    }
  }
    
}

function subcategoryServices(id1) {
    //console.log(id1.id);
    url = "http://apis-dev.putatoe.com/v1/api/service/1" + id1.id;
    fetch(url,{
      method: 'GET',
      headers: {
        'authtoken': '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O',
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
