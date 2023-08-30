import { menuArray } from './data.js'

let orderList = [];
let totalPrice = 0;
const basket = document.getElementById('basket')



document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddItemBtnClick(e.target.dataset.add)
    } 
    else if(e.target.dataset.remove){
        handleRemoveBtnClick(e.target.dataset.remove)
    }
    else if(e.target.id === 'complete-btn'){
        handleCompleteOrderClick()
    }
})

document.getElementById('payment-form').addEventListener('submit', function(e){
    e.preventDefault()
    document.getElementById('pop-up').style.display = 'none';

    orderList = [];
    totalPrice = 0;

    const paymentFormData = new FormData(document.getElementById('payment-form'))

    renderThankYou(paymentFormData.get('cardName'));
})


function handleAddItemBtnClick(productId){
    const productObj = menuArray.filter(function(menu){
        return menu.id.toString() === productId
    })[0]
    
    orderList.push(productObj)
    totalPrice += productObj.price 
    render()
}

function handleRemoveBtnClick(productId){
    let index = orderList.findIndex(function(menu){
        return menu.id.toString() === productId
    });

    orderList.splice(index, 1)

    let productObj = menuArray.filter(function(menu){
        return menu.id.toString() === productId
    })[0]

    totalPrice -= productObj.price 
    render()
}

function handleCompleteOrderClick(){
    if(totalPrice > 0){
         document.getElementById('pop-up').style.display = 'block'
    }
}

function getThankYouHtml(name) {
    let thankYouHtml = '';
    thankYouHtml = `
    <div class="msg-container">
        <h2 class="msg-thanks">Thanks, ${name}! Your order is on its way!</h2>
    </div>`;

    return thankYouHtml;
};

function renderThankYou(name) {
    basket.innerHTML = getThankYouHtml(name);
};


function getMenuHtml(){
    let menuHtml = ``
    
    menuArray.forEach(function(menu){
        menuHtml += `
        <div class="menu-item">
            <p class="item-icon">${menu.emoji}</p>
                <div class="menu-info">
                    <h2 class="item-name">${menu.name}</h2>
                    <p class="item-detail">${menu.ingredients}</p>
                    <p class="item-price">$${menu.price}</p> 
                </div>
            <button class="addItem-btn" data-add="${menu.id}">+</button>
        </div>
        `
    })
    return menuHtml
}

function getBasketHtml(){
    let basketHtml = `<h2 class="order-list-title">Your order</h2>`
    orderList.forEach(function(menu){
        basketHtml += `
        <div class="order-item">
            <h2 class="order-item-name">${menu.name}</h2>
            <button class="remove-btn" data-remove="${menu.id}">remove</button>
            <p class="order-item-price">$${menu.price}</p>
        </div>    
        `
    })
        
    basketHtml += `
    <div class="order-total">
        <h2 class="order-total-text">Total price:</h2>
        <p class="order-total-price">$${totalPrice}<p>
    </div>
    <div class="complete-btn-div">
        <button class="complete-btn" id="complete-btn">Complete order</button>
    </div>
    `

    return basketHtml
}

function render(){
    document.getElementById('menu').innerHTML =  getMenuHtml()
    document.getElementById('basket').innerHTML =  getBasketHtml()
}

render()