
let carts = document.querySelectorAll('.add-cart');

// get item details
let products =[
{
	name: 'CROSSFIT BURN',
	tag: 'BURN',
	price: 9970,
	inCart: 0
},
{
	name: 'Alfa',
	tag: 'Alfa',
	price: 12880,
	inCart: 0
},
{
	name: 'Pink',
	tag: 'Pink',
	price: 4590,
	inCart: 0
},
{
	name: 'BIC',
	tag: 'bic',
	price: 8990,
	inCart: 0
},
{
	name: 'LOFI',
	tag: 'lofi',
	price: 17990,
	inCart: 0
},
];


for(let i = 0;i < carts.length; i++)
{
	carts[i].addEventListener('click', ()=>{
		//console.log("add to cart");
		cartNumber(products[i]);
		totalCost(products[i]);
	})
}

function onloadcartNumber() {
	// body...
	let productNumbers = localStorage.getItem("cartNumber");
	if (productNumbers) {
	  document.querySelector('.mycart').textContent = productNumbers ;

	}
}

function cartNumber(product){
	//console.log("inside cartNumber");

		let productNumbers = localStorage.getItem("cartNumber");
		productNumbers = parseInt(productNumbers);
		// check what is local storage
		//console.log(productNumbers);
		//console.log(typeof productNumbers);
	//add to local storage
	if(productNumbers){
		localStorage.setItem('cartNumber', productNumbers + 1);
		document.querySelector('.mycart').textContent = productNumbers + 1;
		
	}else{

		localStorage.setItem('cartNumber', 1);
		document.querySelector('.mycart').textContent = 1;
		
	}

	setItems(product);
	

}

function setItems(product) {
	// body...
	//console.log('in setitems');\
	// products that are in cart
let cartItems = localStorage.getItem('productInCart');
	cartItems = JSON.parse(cartItems);
	//console.log("my item cart :", cartItems); 

	if(cartItems != null){
		if(cartItems[product.tag] == undefined){
			cartItems = {
				...cartItems,
			[product.tag]: product
			}
			
		}
		cartItems[product.tag].inCart += 1;
	}else {
		product.inCart = 1;
	    cartItems = {
		    [product.tag]: product
	    }
	}
	
	localStorage.setItem("productInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
	// body...
	

	let cartCost = localStorage.getItem('totalCost');
	
	console.log('product price is', cartCost);
	console.log(typeof cartCost);

	if(cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	}else{

	localStorage.setItem("totalCost", product.price);
    
        document.querySelector('.checkout-order__price').textContent = cartCost;
}
}

function displaycart() {
	// body...
	let cartItems = localStorage.getItem("productInCart");
	cartItems = JSON.parse(cartItems);
	//console.log(cartItems);

	let productContainer = document.querySelector('.products');
	let cartCost = localStorage.getItem('totalCost');

	if(cartItems && productContainer){
		//console.log("available");
		
		Object.values(cartItems).map(item =>{
			productContainer.innerHTML += `
            <div class="product">
		 	<img src="./assets/products/${item.tag}.png" width="100px">
		 	</div>
		 	<div class="price">
		 	<span>${item.price} руб.</span>
		 	</div>
		 	<div class="quantity">
		 	<span>${item.inCart}</span>
		 	</div>
		 	<div class="total">
		 	<span>${item.inCart * item.price} руб.</span>
		 	</div>
		 	
			`;
		});

		productContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class"basketTotalTitle">
					Итого : 
				<h4>
				<h4 class"basketTotal">
					${cartCost} руб.
				<h4>
			</div>
		`;


		productContainer.innerHTML += `
			<div class="basketButtonPurchase">
				<button class="basketButton">Отменить заказ</button>
			</div>
		`;
	}
}

// clear localstorage on purchase
function cartItemDelete(product) {
	// body...

let btndelete = document.querySelector('.basketButton');

if(btndelete != null){
  
  btndelete.addEventListener('click', ()=>{

  	alert("Ваш заказ отменен");
  	localStorage.clear();
  	location.reload();

  });
  }

}


const buttonElem = document.getElementById('myBtn');

let onButtonClick = function() {
    alert("Ваш заказ оформлен");
}

buttonElem.addEventListener('click', onButtonClick);




// hold cart number
onloadcartNumber();
displaycart();
cartItemDelete();
