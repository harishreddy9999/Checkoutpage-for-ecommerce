// Assuming this be global cartdata which has been fetched from server using ajax
var cartdata = [{
        name: "item1 has a very good name",
        price: 1000,
        qty: 1,
        imgurl: "item-1.png",
        id: "xa"
    },
    {
        name: "item2 has a good name and a big name",
        price: 2000,
        qty: 2,
        imgurl: "item-2.png",
        id: "xb"
    },
    {
        name: "item3 has a good name and a big big name but i dont think it wont be a problem..yes,it is not!",
        price: 3000,
        qty: 1,
        imgurl: "item-3.png",
        id: "xc"
    }
];


function fillcartcheckoutpage(cartdata) {

    var subtotalprice = 0;
    var noofitems = 0;
    var productslisthtml = '<br>';
    var productspricelisthtml = '';
    
    // js builtin map function and latest es6 arrow function
    cartdata.map((product) => {
        
        // using es6 template literals to build htmlstrings
        
        // building each product info
        var eachproductinfo = `<div class="checkout-item"><div class="col-md-3 product-list-item" ><img class="img-responsive" src="${product.imgurl}" alt="not found"></div><div class="col-md-3 product-list-item"> <div class="product-name">${product.name}</div><div keyid="${product.id}" class="delete-item" onclick="removeitem(this)">Delete</div></div><div class="col-md-3 product-list-item" > <div class="item-block" ><span><strong>Qty : </strong></span><span ><input class="qtychange" onchange="updatequantity(this)" keyid="${product.id}" style="width:50px" type="number" value=${product.qty} max=100 min=1 ></span></div></div><div class="col-md-3 product-list-item"> <div class="item-block" ><span><strong>INR</strong> ${product.price}</span></div></div></div><hr >`;

        productslisthtml += eachproductinfo;
        
        // building each product and its totalprice info
        var eachproductpriceinfo = `<dl class="dl-horizontal"> <dt class=="p-name" style="text-align:left">${product.name}</dt> <dd class=="p-price">INR ${product.price*product.qty}</dd><dl>`;

        productspricelisthtml += eachproductpriceinfo;
       
        //counting no of items in cart
        noofitems += 1;
        
        //getting total price of cart items
        subtotalprice += product.price * product.qty;

    })
    
    //left side box
    document.getElementById('checkout-items-list').innerHTML = productslisthtml;
    
    //right side box
    var subtotal = `<span><strong>SUBTOTAL : </strong>INR ${subtotalprice}</span>`;
    document.getElementById('products-count').innerHTML = `<h3>${cartdata.length} ITEMS</h3>`;
    document.getElementById('product-name-price').innerHTML = productspricelisthtml;
    document.getElementById('sub-total').innerHTML = subtotal;
}

//initializingcart
fillcartcheckoutpage(cartdata);

function removeitem(e) {
    
    var key=e.getAttribute('keyid');
    
    // using js builtin filter function and latest es6 arrow function
    var updatedcartdata = cartdata.filter((product) => {
        if (product.id !== key) {
            return product;
        }
    });
    cartdata = updatedcartdata
    fillcartcheckoutpage(cartdata);

}

function updatequantity(e) {
    
    var key=e.getAttribute('keyid');
    cartdata.map((product, index) => {
        if (product.id == key) {
            cartdata[index].qty = e.value
        }
    })
    fillcartcheckoutpage(cartdata);
}

