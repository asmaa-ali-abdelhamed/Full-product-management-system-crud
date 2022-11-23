let title = document.getElementById('title');
let price = document.getElementById('price');
let texes = document.getElementById('texes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let helpLet;

// get total

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +texes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#18524a'
    }else{
        total.innerHTML = '';
        total.style.background = '#288579'
    }
}

// create product

let dataProduct;

if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = []
}


submit.onclick = function(){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        texes:texes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    if(title.value != '' && price.value != '' && category.value != '' && newProduct.count < 1000){
        if(mood === 'create'){
            if(newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    dataProduct.push(newProduct);
                }
            }else{
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct[helpLet] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block'
        }
        clearData()
    }


    // save localstorage

    localStorage.setItem('product', JSON.stringify(dataProduct));
    
    showData()
}

// clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showData(){
    getTotal();
    let table = '';
    let btnDelet = document.getElementById('deleteAll')

    for(let i = 0; i < dataProduct.length; i++){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].texes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deletData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    
    if(dataProduct.length > 0){
        btnDelet.innerHTML = `
        <button onclick='deleteAll()'>Delete All(${dataProduct.length})</button>
        `
    }else{
        btnDelet.innerHTML = '';
    }
}

showData()

// delete

function deletData(i){
    dataProduct.splice(i,1);
    localStorage.newProduct = JSON.stringify(dataProduct);
    showData()
}

function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData()
}

// count

// updata

function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    texes.value = dataProduct[i].texes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    helpLet = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// search

let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search')
    if(id == 'seachTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search by'+ ' ' + searchMood
    search.focus();
    search.value = '';
}

function searchData(value){
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        if(searchMood == 'title'){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].texes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
                    </tr>
                    `
                    console.log(i)
            }
        }else{
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].texes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
                    </tr>
                    `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// clean data
