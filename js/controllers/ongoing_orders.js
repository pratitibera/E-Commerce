function ongoingOrders() {
    var request = new XMLHttpRequest();
    request.open("GET", 'http://apis-dev.putatoe.com/v1/api/service_provider_orders/2', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
    request.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data);

        var ongoing_orders = document.getElementById("ongoing_orders");
        for (i = 0; i < data['ongoing_orders'].length; i++) {
            var order_number_span = document.createElement('span');
            order_number_span.append(data['ongoing_orders'][i]['order_id']);

            var order_number = document.createElement('h6');
            order_number.setAttribute('class', 'orders_table_head')
            order_number.append("ORDER NUMBER : ");
            order_number.append(order_number_span);

            var order_table = document.createElement('table');
            order_table.setAttribute('class', 'table table-borderless orders_table');

            for (j = 0; j < data['ongoing_orders'][i]['items'].length; j++) {
                var orders_table_row = document.createElement('tr');

                var serial_number = document.createElement('td');
                serial_number.append(j+1);

                var item_name = document.createElement('td');
                item_name.append(data['ongoing_orders'][i]['items'][j]['brand'] + "," + data['ongoing_orders'][i]['items'][j]['name'] + "," + data['ongoing_orders'][i]['items'][j]['qty']);

                var item_count = document.createElement('td');
                item_count.append(data['ongoing_orders'][i]['items'][j]['pcs']+ " Pcs");

                var item_price = document.createElement('td');
                item_price.append("Rs "+ data['ongoing_orders'][i]['items'][j]['price']);

                orders_table_row.append(serial_number);
                orders_table_row.append(item_name);
                orders_table_row.append(item_count);
                orders_table_row.append(item_price);

                order_table.append(orders_table_row);
            }

            var table_grid1 = document.createElement('div');
            table_grid1.setAttribute('class', 'col-md-8 p-0 table_grid1');
            table_grid1.append(order_number);
            table_grid1.append(order_table); //This is the left section

            var order_address_span = document.createElement('span');
            order_address_span.append(data['ongoing_orders'][i]['amt']);

            var order_address = document.createElement('h6');
            order_address.setAttribute('class', 'orders_table_head')
            order_address.append("TOTAL AMOUNT : ");
            order_address.append(order_address_span);

            var address_section = document.createElement('ul');
            address_section.setAttribute('class', 'p-3 order_address');
            if(data['ongoing_orders'][i]['address']['address_line1'].length !== 0) {
                var add1 = document.createElement('li');
                add1.append(data['ongoing_orders'][i]['address']['address_line1']);
                address_section.append(add1);
            }
            if(data['ongoing_orders'][i]['address']['address_line2'].length !== 0) {
                var add2 = document.createElement('li');
                add2.append(data['ongoing_orders'][i]['address']['address_line2']);
                address_section.append(add2);
            }
            if(data['ongoing_orders'][i]['address']['landmark'].length !== 0) {
                var add3 = document.createElement('li');
                add3.append(data['ongoing_orders'][i]['address']['landmark']);
                address_section.append(add3);
            }
            if(data['ongoing_orders'][i]['address']['town'].length !== 0) {
                var add4 = document.createElement('li');
                add4.append(data['ongoing_orders'][i]['address']['town']);
                address_section.append(add4);
            }
            if(data['ongoing_orders'][i]['address']['district'].length !== 0) {
                var add5 = document.createElement('li');
                add5.append(data['ongoing_orders'][i]['address']['district']);
                address_section.append(add5);
            }
            if(data['ongoing_orders'][i]['address']['state'].length !== 0) {
                var add6 = document.createElement('li');
                add6.append(data['ongoing_orders'][i]['address']['state']);
                address_section.append(add6);
            }
            if(data['ongoing_orders'][i]['address']['country'].length !== 0) {
                var add7 = document.createElement('li');
                add7.append(data['ongoing_orders'][i]['address']['country']);
                address_section.append(add7);
            }
            if(data['ongoing_orders'][i]['address']['pincode'].length !== 0) {
                var add8 = document.createElement('li');
                add8.append(data['ongoing_orders'][i]['address']['pincode']);
                address_section.append(add8);
            }

            var table_grid2 = document.createElement('div');
            table_grid2.setAttribute('class', 'col-md-4 p-0 table_grid2');
            table_grid2.append(order_address);
            table_grid2.append(address_section); //This is the right section

            var table_grid = document.createElement('div');
            table_grid.setAttribute('class', 'row mt-4 px-1');
            table_grid.append(table_grid1);
            table_grid.append(table_grid2);

            ongoing_orders.append(table_grid);

        }
    }   
}

function pastOrders() {
    var request = new XMLHttpRequest();
    request.open("GET", 'http://apis-dev.putatoe.com/v1/api/service_provider_orders/2', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
    request.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data);

        var completed_orders = document.getElementById("completed_orders");
        for (i = 0; i < data['completed_orders'].length; i++) {
            var order_number_span = document.createElement('span');
            order_number_span.append(data['completed_orders'][i]['order_id']);

            var order_number = document.createElement('h6');
            order_number.setAttribute('class', 'orders_table_head')
            order_number.append("ORDER NUMBER : ");
            order_number.append(order_number_span);

            var order_table = document.createElement('table');
            order_table.setAttribute('class', 'table table-borderless orders_table');

            for (j = 0; j < data['completed_orders'][i]['items'].length; j++) {
                var orders_table_row = document.createElement('tr');

                var serial_number = document.createElement('td');
                serial_number.append(j+1);

                var item_name = document.createElement('td');
                item_name.append(data['completed_orders'][i]['items'][j]['brand'] + "," + data['completed_orders'][i]['items'][j]['name'] + "," + data['completed_orders'][i]['items'][j]['qty']);

                var item_count = document.createElement('td');
                item_count.append(data['completed_orders'][i]['items'][j]['pcs']+ " Pcs");

                var item_price = document.createElement('td');
                item_price.append("Rs "+ data['completed_orders'][i]['items'][j]['price']);

                orders_table_row.append(serial_number);
                orders_table_row.append(item_name);
                orders_table_row.append(item_count);
                orders_table_row.append(item_price);

                order_table.append(orders_table_row);
            }

            var table_grid1 = document.createElement('div');
            table_grid1.setAttribute('class', 'col-md-8 p-0 table_grid1');
            table_grid1.append(order_number);
            table_grid1.append(order_table); //This is the left section

            var order_address_span = document.createElement('span');
            order_address_span.append(data['completed_orders'][i]['amt']);

            var order_address = document.createElement('h6');
            order_address.setAttribute('class', 'orders_table_head')
            order_address.append("TOTAL AMOUNT : ");
            order_address.append(order_address_span);

            var address_section = document.createElement('ul');
            address_section.setAttribute('class', 'p-3 order_address');
            if(data['completed_orders'][i]['address']['address_line1'].length !== 0) {
                var add1 = document.createElement('li');
                add1.append(data['completed_orders'][i]['address']['address_line1']);
                address_section.append(add1);
            }
            if(data['completed_orders'][i]['address']['address_line2'].length !== 0) {
                var add2 = document.createElement('li');
                add2.append(data['completed_orders'][i]['address']['address_line2']);
                address_section.append(add2);
            }
            if(data['completed_orders'][i]['address']['landmark'].length !== 0) {
                var add3 = document.createElement('li');
                add3.append(data['completed_orders'][i]['address']['landmark']);
                address_section.append(add3);
            }
            if(data['completed_orders'][i]['address']['town'].length !== 0) {
                var add4 = document.createElement('li');
                add4.append(data['completed_orders'][i]['address']['town']);
                address_section.append(add4);
            }
            if(data['completed_orders'][i]['address']['district'].length !== 0) {
                var add5 = document.createElement('li');
                add5.append(data['completed_orders'][i]['address']['district']);
                address_section.append(add5);
            }
            if(data['completed_orders'][i]['address']['state'].length !== 0) {
                var add6 = document.createElement('li');
                add6.append(data['completed_orders'][i]['address']['state']);
                address_section.append(add6);
            }
            if(data['completed_orders'][i]['address']['country'].length !== 0) {
                var add7 = document.createElement('li');
                add7.append(data['completed_orders'][i]['address']['country']);
                address_section.append(add7);
            }
            if(data['completed_orders'][i]['address']['pincode'].length !== 0) {
                var add8 = document.createElement('li');
                add8.append(data['completed_orders'][i]['address']['pincode']);
                address_section.append(add8);
            }

            var table_grid2 = document.createElement('div');
            table_grid2.setAttribute('class', 'col-md-4 p-0 table_grid2');
            table_grid2.append(order_address);
            table_grid2.append(address_section); //This is the right section

            var table_grid = document.createElement('div');
            table_grid.setAttribute('class', 'row mt-4 px-1');
            table_grid.append(table_grid1);
            table_grid.append(table_grid2);

            completed_orders.append(table_grid);

        }
    }   
}