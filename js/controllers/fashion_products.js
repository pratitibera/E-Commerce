// Function Created by Rishi Soni
// To create the Category and Color Fields Dynamically
function categoryColorFilterLayout(data) {

    // Categories
    for (i = 0; i < data['product_masters_list'].length; i++) {
        // var categoriesBox = document.getElementById('categories_box');
        // var categoryOuterDiv = document.createElement('div');
        // var categoryInnerDiv = document.createElement('div');
        // categoryOuterDiv.className = "pl-2";
        // categoryInnerDiv.className = "custom-control custom-checkbox";

        // var inputCheckbox = document.createElement('input');
        // inputCheckbox.type = "checkbox";
        // inputCheckbox.name = "categories";
        // inputCheckbox.value = data['product_masters_list'][i]['name'];
        // inputCheckbox.className = "custom-control-input";
        // inputCheckbox.id = "category-" + data['product_masters_list'][i]['id'];

        // var labelCheckbox = document.createElement('label');
        // labelCheckbox.className = "custom-control-label";
        // const forAttribute = "category-" + data['product_masters_list'][i]['id'];
        // labelCheckbox.setAttribute("for", forAttribute);
        // const label_text = document.createTextNode(data['product_masters_list'][i]['name']);
        // labelCheckbox.appendChild(label_text);

        // categoryInnerDiv.append(inputCheckbox);
        // categoryInnerDiv.append(labelCheckbox);
        // categoryOuterDiv.appendChild(categoryInnerDiv);
        // categoriesBox.append(categoryOuterDiv);

        var categories_box = document.getElementById('categories_box');
        var category_outer_div = document.createElement('div');
        category_outer_div.className = "custom-control custom-checkbox";

        var category_input = document.createElement('input');
        category_input.type = 'checkbox';
        category_input.name = 'categories';
        category_input.value = "Men";
        category_input.className = "custom-control-input";
        category_input.id = "men";

        var category_label = document.createElement('label');
        category_label.className = "custom-control-label text-uppercase";
        category_label.setAttribute('for', `category-${"men"}`);
        category_label.textContent = "Men";

        category_outer_div.append(category_input);
        category_outer_div.append(category_label);

        categories_box.append(category_outer_div);
    }

    // Colors
    for (i = 0; i < data['colors_list'].length; i++) {
        var colorsBox = document.getElementById('colors_box');
        var colorLabel = document.createElement('label');
        var colorInput = document.createElement('input');
        colorLabel.for = "color-" + data['colors_list'][i]['id'];
        colorLabel.className = "btn rounded-circle p-3 my-2 mx-1";
        var colorName = data['colors_list'][i]['name'];
        colorName = colorName.replace(/ /g, "");
        colorLabel.classList.add(colorName.toLowerCase());
        colorInput.id = "color-" + data['colors_list'][i]['id'];
        colorInput.name = "color";
        colorInput.setAttribute("onchange", "changeColor(this)");
        colorInput.type = "checkbox";
        colorInput.color = data['colors_list'][i]['name'].toLowerCase();

        colorLabel.appendChild(colorInput);
        colorsBox.append(colorLabel);

        // It's perfectly alright, No changes are required
    }
}

//Creates the Grid Layout for products(featured,new_arrivals,product_master)
function ProductsGridLayout(data, i, ptype) {
    if (ptype == 'product_filters')
        var products = data['products'];
    else if (ptype == 'products')
        var products = data['products'];
    else if (ptype == 'product_masters')
        var products = data;

    if (ptype == 'product_filters')
        var OuterRowDiv = document.getElementById('products-filter-outer-row');
    else
        var OuterRowDiv = document.getElementById('products-outer-row');

    if (products.length != 0) {
        const InnerColDiv = document.createElement('div');
        InnerColDiv.className = 'col-6 col-md-6 col-lg-4 mb-3 product-col-div';
        InnerColDiv.id = 'pid-' + products[i]['id'];
        InnerColDiv.setAttribute("onclick", "productDetails(this.id)")

        const InnerCardDiv = document.createElement('div');
        InnerCardDiv.className = 'card h-100 border-0 product-grid';

        const CardImgDiv = document.createElement('div');
        CardImgDiv.className = 'card-img-top product-images';
        for (var j = 0; j < products[i]['images'].length; j++) {
            var img = document.createElement('img');
            img.src = products[i]['images'][j]['url'];
            img.setAttribute('ImgId', 'img-' + products[i]['images'][j]['id']);
            img.className = 'mx-auto pic-' + (j + 1).toString();

            // If Image is only One then This Image will always be shown
            if (products[i]['images'].length == 1)
                img.style.opacity = 1;
            CardImgDiv.append(img)
        }

        const CardBodyDiv = document.createElement('div');
        CardBodyDiv.className = 'card-body px-xl-4 py-xl-3 px-md-4 py-md-3 p-sm-3 p-2';

        var ProductNameElement = document.createElement('h5');
        ProductNameElement.className = 'card-title';

        // var LabelSpan = document.createElement('span');
        // var badge = products[i]['badge'];
        // if (badge['status'] == true) {
        //     var labelText = badge['name'].toLowerCase();
        //     LabelSpan.className = 'product-' + labelText + '-label';
        //     LabelSpan.innerText = labelText;
        //     CardBodyDiv.append(LabelSpan);
        // }

        // var SaleLabelSpan = document.createElement('span');
        // var off = products[i]['off'];

        // if (off['status'] == true) {
        //     SaleLabelSpan.className = 'product-discount-label';
        //     SaleLabelSpan.innerText = off['discount'];
        //     CardBodyDiv.append(SaleLabelSpan);
        // }

        var ProductNameSpan = document.createElement('span');
        ProductNameSpan.className = 'font-weight-bold text-dark text-uppercase small'

        var ProductNameNode = document.createTextNode(products[i]['name']);
        ProductNameSpan.append(ProductNameNode);
        ProductNameElement.append(ProductNameSpan);

        var ProductPriceElement = document.createElement('h5');
        ProductPriceElement.className = 'card-price';

        var ProductPriceIcon = document.createElement('i');
        ProductPriceIcon.className = 'fa fa-inr';

        var priceOuterDiv = document.createElement('div');
        priceOuterDiv.className = 'price-outer-div';

        var productFPriceDiv = document.createElement('div');
        productFPriceDiv.className = 'final-price';
        productFPriceDiv.id = 'final-price';

        var ProductFinalPrice = document.createTextNode(products[i]['fprice'])
        productFPriceDiv.append(ProductPriceIcon, ProductFinalPrice);

        //when there is no discount on the product
        if (products[i]['price'] == products[i]['fprice']) {
            priceOuterDiv.append(productFPriceDiv);
        }
        else {
            var ProductPriceIcon = document.createElement('i');
            ProductPriceIcon.className = 'fa fa-inr';

            var productPriceDiv = document.createElement('div');
            productPriceDiv.className = 'price';
            productPriceDiv.id = 'price';

            var ProductStrikeElement = document.createElement('s');
            ProductStrikeElement.className = 'price';

            var ProductPrice = document.createTextNode(products[i]['price']);
            ProductStrikeElement.append(ProductPriceIcon, ProductPrice);
            productPriceDiv.append(ProductStrikeElement);

            priceOuterDiv.append(productFPriceDiv, productPriceDiv);
        }
        const ratingValue = products[i]['rating'];
        const starTotal = 5;
        const starPercentage = ratingValue / starTotal * 100;
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

        if (starPercentage == 0) {
            CardBodyDiv.append(ProductNameElement, priceOuterDiv);
        }
        else {
            const RatingsMainDiv = document.createElement('div');
            RatingsMainDiv.className = 'ratings-main-div';
            RatingsMainDiv.style.clear = 'both';
            RatingsMainDiv.style.marginTop = '-10px';
            RatingsMainDiv.style.marginBottom = '-10px';

            const ratingOuterDiv = document.createElement('div');
            ratingOuterDiv.className = 'stars-outer mr-2';

            const ratingInnerDiv = document.createElement('div');
            ratingInnerDiv.className = 'stars-inner';
            ratingInnerDiv.style.width = starPercentageRounded;

            ratingOuterDiv.append(ratingInnerDiv);


            const totalRatingElement = document.createElement('p');
            totalRatingElement.className = 'product-total-reviews';

            var totalReviews = document.createTextNode(products[i]['total_rating']);
            RatingsMainDiv.append(ratingOuterDiv, totalRatingElement)
            totalRatingElement.appendChild(totalReviews);
            CardBodyDiv.append(ProductNameElement, RatingsMainDiv, priceOuterDiv);
        }
        InnerCardDiv.append(CardImgDiv, CardBodyDiv);
        InnerColDiv.append(InnerCardDiv);
        OuterRowDiv.append(InnerColDiv);
    }
}

// Function Created by Rishi Soni
function applyFilter(data) {

    // Initial Products will be invisible if filter products are going to be show
    document.getElementById('products-outer-row').style.display = "none";

    // Will Start the Loader for Filter (waiting for filter products)
    document.getElementById('filter_loader').style.display = "block";

    // Will redirect at the top of screen to wait for products
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    /* Categories Filter */
    var valid_categories = data['product_masters_list'];

    var checked_categories = valid_categories.filter((categoriees, i) => {
        console.log(categoriees);
        return document.getElementById('category-' + categoriees['id']).checked == true;
    });
    console.log(checked_categories);

    /* Min-Max Price Filter */
    let min_price = document.querySelector('#price-min-control').value;
    let max_price = document.querySelector('#price-max-control').value;

    /* Color Filter */
    var valid_colors = data['colors_list'];
    var checked_colors = valid_colors.filter((colors, i) => {
        return document.getElementById('color-' + colors['id']).checked == true;
    });

    /* Discount Filter */
    // 5% or more, 10% or more, 20% or more, 30% or more
    var valid_discount = [false, false, false, false];
    for (i = 0; i < valid_discount.length; i++) {
        if (document.querySelector('#filter-discount-' + (i + 1)).checked) {
            valid_discount[i] = true;
        }
    }

    /* Ratings Filter */
    // 4 Star, 3 Star, 2 Star, 1 Star
    var valid_rating = [false, false, false, false];
    for (i = 0; i < valid_rating.length; i++) {
        if (document.querySelector('#customer-rating-' + (valid_rating.length - i)).checked)
            valid_rating[i] = true;
    }

    var request = new XMLHttpRequest();
    const json = {
        "categories": [...checked_categories],
        "price": {
            "min_price": min_price,
            "max_price": max_price
        },
        "discount": {
            "30 percent off": valid_discount[3],
            "20 percent off": valid_discount[2],
            "10 percent off": valid_discount[1],
            "5 percent off": valid_discount[0]
        },
        "rating": {
            "1 & up": valid_rating[3],
            "2 & up": valid_rating[2],
            "3 & up": valid_rating[1],
            "4 & up": valid_rating[0]
        },
        "colors": [...checked_colors]
    };

    request.open(urlSet.productFilterApi.method, urlSet.productFilterApi.url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(json));
    request.onload = function () {
        var data = JSON.parse(request.response);

        stopFilterLoading();
        var products = data['products'];
        console.log(json);
        console.log(data);
        // console.log(products.length);
        document.getElementById('products-filter-outer-row').innerHTML = "";

        for (i = 0; i < products.length; i++) {
            ProductsGridLayout(data, i, 'product_filters');
        }
    }
}

// Color Checkboxes in Filter
function changeColor(currentCheckbox) {

    if (currentCheckbox.checked) {
        currentCheckbox.parentElement.style.boxShadow = "0px 0px 8px #1976d2";
        currentCheckbox.parentElement.style.border = "0.3px solid #42a5f5";
    }
    else {
        currentCheckbox.parentElement.style.boxShadow = "none";
        currentCheckbox.parentElement.style.border = "0.3px solid grey";
    }
}

// Function Created by Rishi Soni
// This function will stop the Loading of Filter Loader
function stopFilterLoading() {
    document.getElementById('filter_loader').style.display = "none";
}