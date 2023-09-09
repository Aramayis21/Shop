let products = await fetch('https://dummyjson.com/products?limit=32').then((resp)=> resp.json()).then((res)=>[...res.products])
const prodDiv = document.getElementById('products')
const popUp = document.getElementById('popUp')
const popImg = popUp.firstElementChild.firstElementChild
const btnLeft = document.getElementsByClassName('bi-chevron-left')[0]
const btnRight = document.getElementsByClassName('bi-chevron-right')[0]
const shopBag = document.getElementById('shopBag')
const shopWraper = document.getElementsByClassName('shopWraper')[0]

// if (localStorage.getItem('products')) {
//     products = JSON.parse(localStorage.getItem('products'))
//     console.log(1)
// }else{
//     localStorage.setItem('products', JSON.stringify(products))
//     console.log(2)
// }

let dataId = -1
console.log(products)

/**
 * 
 * images
 * title
 * brand
 * description
 * price
 * rating
 * stock
 * <i class="bi bi-cart-check"></i>
 */

function drowCard(prod) {
    const card = document.createElement('div')
    const image = document.createElement('img')
    const headers = document.createElement('div')
    const title = document.createElement('h2')
    const brand = document.createElement('h3')
    const description = document.createElement('p')
    const divInfo = document.createElement('div')
    const price = document.createElement('strong')
    const rating = document.createElement('strong')
    const stock = document.createElement('i')
    const addCart = document.createElement('i')
    
    addCart.dataset.id = prod.id
    addCart.className = "bi bi-cart-check"
    card.classList.add('card')
    headers.classList.add('headers')
    divInfo.classList.add('info')
   
    image.setAttribute('src',prod.images[0])
    image.dataset.id = prod.id
    title.textContent = prod.title
    brand.textContent = prod.brand
    description.textContent = prod.description
    price.textContent = prod.price + ' $'
    rating.textContent = prod.rating
    stock.textContent = prod.stock
    
    
    
    card.append(image)
    card.append(headers)
    headers.append(title)
    headers.append(brand)
    card.append(description)
    card.append(divInfo)
    divInfo.append(price)
    divInfo.append(rating)
    divInfo.append(stock)
    divInfo.append(addCart)
    
    return card
}

function addToCard(item) {
    const itemDiv = document.createElement('div')
    const itemimg = document.createElement('img')
    const iteminfo = document.createElement('div')
    const infoDescrption = document.createElement('p')
    const infoPrice = document.createElement('b')
    const itemRemove = document.createElement('span')
    const count = document.createElement('em')

    count.textContent = 1+ 'x'
    
    let desc = item.description.split(' ')
    desc.length = 5

    itemDiv.dataset.itemId = item.id
    itemDiv.classList.add('itemOnBag')
    itemRemove.className = "bi bi-x"
    itemimg.setAttribute('src',item.images[0])
    infoDescrption.textContent = desc.join(' ') + ' ...'
    infoPrice.textContent =  item.price + ' $'



    itemDiv.append(itemimg)
    itemDiv.append(iteminfo)
    iteminfo.append(infoDescrption)
    iteminfo.append(infoPrice)
    iteminfo.append(count)
    infoDescrption.append(itemRemove)

    return itemDiv
}

products.forEach((elm)=>{
    prodDiv.append(drowCard(elm))
})

prodDiv.addEventListener('click', (e)=>{
    if (e.target.localName == 'img') {
        popImg.src = e.target.src
        dataId = e.target.dataset.id
        popUp.style.visibility = 'visible'
        document.body.style.overflow = 'hidden'
    }
    if (e.target.className == "bi bi-cart-check") {
        let item = products.find(elm => elm.id == e.target.dataset.id)
        let card = [...document.querySelectorAll('.itemOnBag')]


        if (!card.some(elm => elm.dataset.itemId == item.id.toString())) {
            shopWraper.firstElementChild.append(addToCard(item))
        }else if(card.some(elm => elm.dataset.itemId == item.id.toString())){



            let count = card.find((elm)=>elm.dataset.itemId == item.id.toString()).querySelector('em')
            count.textContent = parseInt(count.textContent) + 1 + 'x'

            let priceGroup = card.find((elm)=>elm.dataset.itemId == item.id.toString()).querySelector('b')
            let priceOne = products.find(elm => elm.id == e.target.dataset.id).price
            priceGroup.textContent = priceOne + parseInt(priceGroup.textContent) + '$'
            console.log(priceGroup.textContent)
        }
    }
})

popUp.addEventListener('click',(e)=>{
    if (e.target == e.currentTarget) {
        popUp.style.visibility = 'hidden'
        document.body.style.overflow = 'auto'
    }
})
let counter = 0


btnLeft.addEventListener('click',()=>{
    let item = products.find(elm => elm.id == dataId).images
    if(item.length <= 1){
        counter =0
    }else if (counter == 0) {
        counter = item.length - 1
    }
    popImg.src = item[counter]
    counter--
})

btnRight.addEventListener('click',()=>{
    let item = products.find(elm => elm.id == dataId).images
    if(item.length <= 1){
        counter = 0
    }else if (counter == item.length) {
        counter = 0
    }
    popImg.src = item[counter]
    counter++
})

shopBag.addEventListener('click',()=>{
    shopWraper.classList.add("shopActive")
})

shopWraper.addEventListener('click',(e)=>{
    if (e.target.localName == 'i') {
        shopWraper.classList.remove('shopActive')
    }
    if (e.target == e.currentTarget) {
        shopWraper.classList.remove('shopActive')
    }
    if (e.target.localName == 'span') {
        e.target.closest('.itemOnBag').remove()
    }
})
