function paymentPage() {
	var request = new XMLHttpRequest()
    request.open(urlSet.cashOnDeliveryApi.method, urlSet.cashOnDeliveryApi.url, true)
    //request.open("GET", "http://apis-dev.putatoe.com/v1/api/order/cod", true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O'); 
    request.send(); 
    request.onload = function () {
    	var data = JSON.parse(this.response)
        console.log(data);
        var id = data['orderId'];
        console.log(id);
        document.location.href="confirmation.html?id=" + id;
    }
}

function confirmationPage() {
	var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    console.log(data['id']);
    var order_id = document.getElementById("order_id");
    order_id.append(data['id']);

	var request = new XMLHttpRequest()
    request.open(urlSet.confirmOrderApi.method, urlSet.confirmOrderApi.url+data['id'], true)
    //request.open("GET", "http://apis-dev.putatoe.com/v1/api/confirmation/"+data['id'], true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O'); 
    request.send(); 
    request.onload = function () {
    	var data = JSON.parse(this.response)
        console.log(data);

        var delivery_add = document.getElementById("delivery_add");
        if(data['user_address']['address_line1'].length !== 0) {
        	delivery_add.append(data['user_address']['address_line1']);
        }
        if(data['user_address']['address_line2'].length !== 0) {
        	delivery_add.append(',' + data['user_address']['address_line2']);
        }
        if(data['user_address']['landmark'].length !== 0) {
        	delivery_add.append(',' + data['user_address']['landmark']);
        }
        if(data['user_address']['town'].length !== 0) {
        	delivery_add.append(',' + data['user_address']['town']);
        }
        if(data['user_address']['district'].length !== 0) {
        	delivery_add.append(',' + data['user_address']['district']);
        }
        if(data['user_address']['state'].length !== 0) {
        	delivery_add.append(',' + data['user_address']['state']);
        }
        if(data['user_address']['country'].length !== 0) {
        	delivery_add.append(',' + data['user_address']['country']);
        }
        if(data['user_address']['pincode'].length !== 0) {
        	delivery_add.append(',' + data['user_address']['pincode']);
        }
        //delivery_address.append(delivery_add);

        var delivery_mobile = document.getElementById("delivery_mobile");
        delivery_mobile.append("Mobile Number: " + data['user_mobile']);
        var ordered_products = document.getElementById("ordered_products");

        for (i = 0; i < data['product_list'].length; i++){
        	var prod_image = document.createElement('img');
            prod_image.setAttribute('src', 'img/prod5.jpg');
            prod_image.setAttribute('height', '150');
            prod_image.setAttribute('width', '150');

            var prod_image_div = document.createElement('div');
            prod_image_div.setAttribute('class', 'col-md-2');
            prod_image_div.setAttribute('style', 'text-align: center;');
            prod_image_div.append(prod_image);

            var prod_name = document.createElement('h6');
            prod_name.setAttribute('style', 'margin-bottom: 30px; font-size: 16px; font-weight: bold;');
            prod_name.append(data['product_list'][i]['name']);

            var prod_quantity = document.createElement('h6');
            prod_quantity.setAttribute('style', 'font-size: 14px;');
            prod_quantity.append("Quantity: " + data['product_list'][i]['quantity']);

            var prod_number = document.createElement('h6');
            prod_number.setAttribute('style', 'font-size: 14px;');
            prod_number.append("Number of items: " + data['product_list'][i]['no_of_product']);

            var prod_seller = document.createElement('h6');
            prod_seller.setAttribute('style', 'font-size: 14px;');
            prod_seller.append("Seller: " + data['product_list'][i]['service_provider']);

            var prod_price = document.createElement('h6');
            prod_price.setAttribute('style', 'margin-top: 20px; font-size: 16px; font-weight: bold;');
            prod_price.append("Rs " + data['product_list'][i]['price']);

            var prod_return = document.createElement('h6');
            prod_return.setAttribute('style', 'font-size: 12px;');
            prod_return.append("Return policy valid till 15th December");

            var prod_know = document.createElement('h6');
            prod_know.setAttribute('style', 'font-size: 12px;');
            prod_know.append("Know More");

            var prod_know_link = document.createElement('a');
            prod_know_link.setAttribute('href', '#');
            prod_know_link.append(prod_know);

            var prod_info_div = document.createElement('div');
            prod_info_div.setAttribute('class', 'col-md-3');
            //prod_info_div.append(prod_image_div);
            prod_info_div.append(prod_name);
            prod_info_div.append(prod_quantity);
            prod_info_div.append(prod_number);
            prod_info_div.append(prod_seller);
            prod_info_div.append(prod_price);
            prod_info_div.append(prod_return);
            prod_info_div.append(prod_know_link);

            // ORDER STATUS
            var prod_status = document.createElement('h6');
            prod_status.setAttribute('style', 'margin-bottom: 30px; font-size: 16px; font-weight: bold;');
            prod_status.append("Track Order");

            //confirmed
            var confirmed_icon = document.createElement('i');
            confirmed_icon.setAttribute('class', 'fa fa-check');

            var confirmed_icon_span = document.createElement('span');
            confirmed_icon_span.setAttribute('class', 'icon');
            confirmed_icon_span.append(confirmed_icon);

            var confirmed_text = document.createElement('span');
            confirmed_text.setAttribute('class', 'text');
            confirmed_text.append("Confirmed");

            var confirmed_div = document.createElement('div');
            if(data['product_list'][i]['status_id'] < 5) {
            	confirmed_div.setAttribute('class', 'step active');
            }
            else {
            	confirmed_div.setAttribute('class', 'step');
            }
            confirmed_div.append(confirmed_icon_span);
            confirmed_div.append(confirmed_text);

            //shipped
            var shipped_icon = document.createElement('i');
            shipped_icon.setAttribute('class', 'fa fa-user');

            var shipped_icon_span = document.createElement('span');
            shipped_icon_span.setAttribute('class', 'icon');
            shipped_icon_span.append(shipped_icon);

            var shipped_text = document.createElement('span');
            shipped_text.setAttribute('class', 'text');
            shipped_text.append("Shipped");

            var shipped_div = document.createElement('div');
            if(data['product_list'][i]['status_id'] < 5 && data['product_list'][i]['status_id'] > 2) {
            	shipped_div.setAttribute('class', 'step active');
            }
            else {
            	shipped_div.setAttribute('class', 'step');
            }
            shipped_div.append(shipped_icon_span);
            shipped_div.append(shipped_text);

            //ontheway
            var ontheway_icon = document.createElement('i');
            ontheway_icon.setAttribute('class', 'fa fa-truck');

            var ontheway_icon_span = document.createElement('span');
            ontheway_icon_span.setAttribute('class', 'icon');
            ontheway_icon_span.append(ontheway_icon);

            var ontheway_text = document.createElement('span');
            ontheway_text.setAttribute('class', 'text');
            ontheway_text.append("On The Way");

            var ontheway_div = document.createElement('div');
            ontheway_div.setAttribute('class', 'step');
            ontheway_div.append(ontheway_icon_span);
            ontheway_div.append(ontheway_text);

            //delivered
            var delivered_icon = document.createElement('i');
            delivered_icon.setAttribute('class', 'fa fa-gift');

            var delivered_icon_span = document.createElement('span');
            delivered_icon_span.setAttribute('class', 'icon');
            delivered_icon_span.append(delivered_icon);

            var delivered_text = document.createElement('span');
            delivered_text.setAttribute('class', 'text');
            delivered_text.append("Delivered");

            var delivered_div = document.createElement('div');
            delivered_div.setAttribute('class', 'step');
            delivered_div.append(delivered_icon_span);
            delivered_div.append(delivered_text);

            //appending
            var track_div = document.createElement('div');
            track_div.setAttribute('class', 'track');
            track_div.append(confirmed_div);
            track_div.append(shipped_div);
            track_div.append(ontheway_div);
            track_div.append(delivered_div);

             //Date
            var prod_date = document.createElement('h6');
            prod_date.setAttribute('style', 'margin-top: 80px; font-size: 14px;');
            prod_date.append("Your Order has been shipped on : " + data['time_stamp']);

            if(data['payment_mode'] !== 'COD') {
            	var payment_icon = document.createElement('i');
            	payment_icon.setAttribute('class', 'fa fa-check');
            	payment_icon.setAttribute('style', 'color: #00838f;');

            	var payment = document.createElement('h6');
            	payment.setAttribute('style', 'font-size: 14px;');
            	payment.append(payment_icon);
            	payment.append("Payment Approved");
            	prod_date.append(payment);
            }

            var status_div = document.createElement('div');
            status_div.setAttribute('class', 'col-md-4');
            status_div.append(prod_status);
            status_div.append(track_div);
            status_div.append(prod_date);

            //third section
            var delivery_date = document.createElement('h6');
            delivery_date.setAttribute('style', 'margin-bottom: 30px; font-size: 16px; font-weight: bold;');
            delivery_date.append("Expected Delivery: 31st November");

            //rating link
            var rating_icon = document.createElement('i');
            rating_icon.setAttribute('class', 'fa fa-star');
            rating_icon.setAttribute('style', 'margin-right: 5px;');

            var rating_link = document.createElement('a');
            rating_link.setAttribute('href', '#');
            rating_link.setAttribute('style', 'font-size: 14px; color: #00838f; font-weight: bold;');
            rating_link.append(rating_icon);
            rating_link.append("Rate and Review Product");

            var rating = document.createElement('h6');
            rating.append(rating_link);

            //return link
            var return_icon = document.createElement('i');
            return_icon.setAttribute('class', 'fa fa-window-close');
            return_icon.setAttribute('style', 'margin-right: 5px;');

            var return_link = document.createElement('a');
            return_link.setAttribute('href', '#');
            return_link.setAttribute('style', 'font-size: 14px; color: #00838f; font-weight: bold;');
            return_link.append(return_icon);
            return_link.append("Return Product");

            var returnn = document.createElement('h6');
            returnn.append(return_link);

            //help link
            var help_icon = document.createElement('i');
            help_icon.setAttribute('class', 'fa fa-handshake-o');
            help_icon.setAttribute('style', 'margin-right: 5px;');

            var help_link = document.createElement('a');
            help_link.setAttribute('href', '#');
            help_link.setAttribute('style', 'font-size: 14px; color: #00838f; font-weight: bold;');
            help_link.append(help_icon);
            help_link.append("Need Help?");

            var help = document.createElement('h6');
            help.append(help_link);

            //appending
            var link_div = document.createElement('div');
            link_div.setAttribute('class', 'col-md-3');
            link_div.append(delivery_date);
            link_div.append(rating);
            link_div.append(returnn);
            link_div.append(help);

            var prod_row = document.createElement('div');
            prod_row.setAttribute('class', 'row');
            prod_row.setAttribute('style', 'border-bottom: 1px solid grey; margin-bottom: 20px;')
            prod_row.append(prod_image_div);
            prod_row.append(prod_info_div);
            prod_row.append(status_div);
            prod_row.append(link_div);

            ordered_products.append(prod_row);

        }
    }
}

function paywithPaytm() {
    var request = new XMLHttpRequest()
    request.open(urlSet.paytmApi.method, urlSet.paytmApi.url, true)
    //request.open("GET", "http://apis-dev.putatoe.com/v1/api/order/paytm", true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O'); 
    request.send(); 
    request.onload = function () {
        var data = JSON.parse(this.response)
        console.log(data);
         console.log(data['url']);
        // console.log(data['m_id']);
        // console.log(data['order_id']);
        // console.log(data['token']);

        if ("token" in data) {
            document.location.href="paytm.html";
        }   
    }
}

function makePayment() {
    var request = new XMLHttpRequest()
    request.open(urlSet.paytmApi.method, urlSet.paytmApi.url, true)
    //request.open("GET", "http://apis-dev.putatoe.com/v1/api/order/paytm", true)
    request.setRequestHeader('Content-Type', 'application/json'); 
    request.setRequestHeader('authtoken', '5KWAWV4RT9EW7VBF5QTTCD2BL51HP4F5A36AUD26FDURULDP7O'); 
    request.send(); 
    request.onload = function () {
        var data = JSON.parse(this.response)
        console.log(data);

        var form = document.getElementById("paytm");
        form.setAttribute('action', data['url']);

        //console.log(data['url']);

        var input1 = document.getElementById('mid');
        input1.value = data['m_id'];

        var input2 = document.getElementById('orderId');
        input2.value = data['order_id'];
        //console.log(input2.value);

        var input3 = document.getElementById('txnToken');
        input3.value = data['token'];

        document.getElementById("paybtn").click();

    }
    
}