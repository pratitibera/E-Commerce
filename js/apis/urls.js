const baseUrl = "https://putatoeapp-k3snqinenq-uc.a.run.app"
var urlSet = {
   registerApi: {
      url: baseUrl + "/v1/api/register",
      method: "POST"
   },
   registerConfirmApi: {
      url: baseUrl + "/v1/api/registerconfirm",
      method: "POST"
   },
   loginWithSocialMediaApi: {
      url: baseUrl + "/v1/api/o_login",
      method: "POST"
   },
   logoutApi: {
      url:  baseUrl + "/v1/api/logout",
      method: "GET"
   },
   userLocationApi: {
      url:  baseUrl + "/v1/api/userlocation",
      method: "POST"
   },
   mainServicesApi: {
      url: baseUrl + "/v1/api/services",
      method: "GET"
   },
   subServiceApi: {
      url: baseUrl + "/v1/api/service/",
      method: "GET"
   },
   serviceProviderApi: {
      url: baseUrl + "/v1/api/individual_subservice_providers/",
      method: "GET"
   },
   productsApi: {
      url: baseUrl + "/v1/api/product/",
      method: "GET"
   },
   registerSellerApi: {
      url: baseUrl + "/v1/api/registerseller",
      method: "POST"
   },
   serviceListApi: {
      url: baseUrl + "/v1/api/service_list",
      method: "GET"
   },
   addToCartApi: {
      url: baseUrl + "/v1/api/add_to_cart",
      method: "POST"
   },
   showCartApi: {
      url: baseUrl + "/v1/api/show_cart",
      method: "GET"
   },
    registerProductApi: {
      url: baseUrl + "/v1/api/register_product",
      method: "POST"
   },
   registerProductShowContentApi: {
      url: baseUrl + "/v1/api/show_content/",
      method: "GET"
   },
   deleteCartApi: {
      url: baseUrl + " /v1/api/delete_from_cart/",
      method: "POST"
   },
   updateCartApi: {
      url: baseUrl + "/v1/api/update_cart",
      method: "POST"
   },
   billingApi: {
      url: baseUrl + "/v1/api/billing_page",
      method: "GET"
   },
   cashOnDeliveryApi: {
      url: baseUrl + "/v1/api/order/cod",
      method: "GET"
   },
   paytmApi: {
      url: baseUrl + "/v1/api/order/paytm",
      method: "GET"
   },
   confirmOrderApi: {
      url: baseUrl + "/v1/api/confirmation/",
      method: "GET"
   },
   sellerOrdersApi: {
      url: baseUrl + "/v1/api/service_provider_orders/",
      method: "GET"
   },




   // repaymentApi: {
   //    url: baseUrl + "/api/repayment/",
   //    method: "GET"
   // },
   // productFilterApi: {
   //    url: baseUrl + "/api/productfilter",
   //    method: "POST"
   // },
   // productMasterCategoriesApi: {
   //    url: baseUrl + "/api/categories",
   //    method: "GET"
   // }
};
