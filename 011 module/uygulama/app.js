// Storage Controller

const StorageController = (function () {

    return{
        storeProduct:function(prd){
            let products;
            if(localStorage.getItem('products')===null){
                products = [];
                products.push(prd);
                
            }
            else{
                products  = JSON.parse(localStorage.getItem('products'));
                products.push(prd);

            }
            localStorage.setItem('products',JSON.stringify(products));
        },
        getProducts:function(){
            let products;
            if(localStorage.getItem('products')===null){
                products = [];
            }
            else{
                products  = JSON.parse(localStorage.getItem('products'));
            }
            return products;
        },
        updateProduct:function(prd){
            let products = JSON.parse(localStorage.getItem('products'));
            products.forEach(function(product,index){
                if(product.id == prd.id){
                    products.splice(index,1,prd);
                }
                
            })
            localStorage.setItem('products',JSON.stringify(products));
        },
        deleteProduct:function(prd){
            let products = JSON.parse(localStorage.getItem('products'));
            products.forEach(function(product,index){
                if(product.id == prd.id){
                    products.splice(index,1);
                }
                
            })
            localStorage.setItem('products',JSON.stringify(products));
        }
    }

})();


// Product Controller
const ProductController = (function () {

    //private
    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;

    }
    const data = {
        products: StorageController.getProducts(),
        selectedProduct: null,
        totalPrice: 0
    }


    //public
    return {
        getProducts: function () {
            return data.products;
        },
        getData: function () {
            return data;
        },
        addProduct: function (productName, productPrice) {
            let id;
            if (data.products.length > 0) {
                id = data.products[data.products.length - 1].id + 1;
            } else {
                id = 0;
            }
            const newProduct = new Product(id, productName, parseFloat(productPrice));
            data.products.push(newProduct);
            return newProduct;
        },
        getTotal:function(){
            let total = 0;
            data.products.forEach(function(item){
                total+= item.price;
            })
            data.totalPrice = total;
            return data.totalPrice;
        },
        getProductById:function(id){
            let product = null;

            data.products.forEach(function(prd){
                if(prd.id == id){
                    product = prd;
                }
            })
            return product;
        },
        setCurrentProduct:function(product){
            data.selectedProduct = product;
        },
        getCurrentProduct:function(){
            return data.selectedProduct;
        },
        deleteProduct:function(product){
            data.products.forEach(function(prd,index){
                if(prd.id == product.id){
                    data.products.splice(index,1);
                }
            })
        },
        updateProduct:function(productName,productPrice){
            let product = null;

            data.products.forEach(function(prd){
                if(prd.id == data.selectedProduct.id){
                    prd.name = productName;
                    prd.price = parseFloat(productPrice);
                    product = prd;
                }
            })
            return product;
        }
    }


})();

// UI Controller

const UIController = (function (ProductCtrl) {

    const Selectors = {
        productList: "#item-list",
        addButton: "#addBtn",
        saveButton:"#saveBtn",
        deleteButton: "#deleteBtn",
        cancelButton: '#cancelBtn',
        updateButton:'#updateBtn',
        productName: "#productName",
        productPrice: "#productPrice",
        productCard: "#productCard",
        totalTL: "#total-tl",
        totalUSD:"#total-usd",
        productListItems: "#item-list tr"


    }

    return {
        createProductList: function (products) {
            let html = ``;

            products.forEach(prd => {
                html += `
                <tr>
                <td>${prd.id}</td>
                <td>${prd.name}</td>
                <td>${prd.price} </td>
                <td class="text-right">  <button type="submit" data-id="${prd.id}" class="btn btn-outline-success btn-sm edit-product">
                    Edit
                </button></td>
                </tr>
                `;
            });

            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: function () {
            return Selectors;
        },
        addProduct: function (product) {
            document.querySelector(Selectors.productCard).style.display = "block";
            let html = `
                <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price} </td>
                <td class="text-right">  <button type="submit" data-id="${product.id}" class="btn btn-outline-success btn-sm edit-product">
                    Edit
                </button></td>
                </tr>
                `;
            document.querySelector(Selectors.productList).innerHTML += html;
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        clearWarnings:function(){
            const items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning')){
                    item.classList.remove('bg-warning');
                }
            })
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none';

        },
        showTotal:function(total){
            document.querySelector(Selectors.totalUSD).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total*8.5;
        },
        addProductToForm:function(){

            const selectedProduct = ProductCtrl.getCurrentProduct();
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;

        },
        addingState:function(){
            
            document.querySelector(Selectors.addButton).style.display='inline';
            document.querySelector(Selectors.updateButton).style.display='none';
            document.querySelector(Selectors.deleteButton).style.display='none';
            document.querySelector(Selectors.cancelButton).style.display='none';
        },
        editState:function(tr){
            
            tr.classList.add('bg-warning');
            document.querySelector(Selectors.addButton).style.display='none';
            document.querySelector(Selectors.updateButton).style.display='inline';
            document.querySelector(Selectors.deleteButton).style.display='inline';
            document.querySelector(Selectors.cancelButton).style.display='inline';
        },
        updateProduct:function(prd){
            let updatedItem = null;
            let items = document.querySelectorAll(Selectors.productListItems);
            console.log(items);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning')){
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price;
                    updatedItem = item
                }
            })
            /*
            item.children[1].textContent = prd.name;
            item.childrent[2].textContent = floatParse(prd.price);
            updatedItem = item;
            */
                
           

            return updatedItem;
        },
        deleteProduct:function(){
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning')){
                    item.remove();
                }
            })
        }
    }

})(ProductController);


// App Controller

const App = (function (ProductCtrl, UICtrl,LSCtrl) {

    const UISelectors = UICtrl.getSelectors();

    // Load Event Listeners

    const loadEventListeners = function () {
        //add product event

        document.querySelector(UISelectors.addButton).addEventListener("click", productAddSubmit);

        //edit product

        document.querySelector(UISelectors.productList).addEventListener("click",productEditClick);
        
        //edit product submit
        document.querySelector(UISelectors.updateButton).addEventListener('click',editProductSubmit);

        //cancel button click

        document.querySelector(UISelectors.cancelButton).addEventListener('click',cancelUpdate);

        //delete button click

        document.querySelector(UISelectors.deleteButton).addEventListener('click',deleteProductSubmit);

    }
    const productAddSubmit = function (e) {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // add product
            const newProduct = ProductCtrl.addProduct(productName, productPrice);

            // add item to list
            UICtrl.addProduct(newProduct);

            //add product to LS

            LSCtrl.storeProduct(newProduct);

            //get total
            const total = ProductCtrl.getTotal();

            //show total ui
            UICtrl.showTotal(total);

            //clear ui inputs
            UICtrl.clearInputs();
        }
        e.preventDefault();
    }
    const editProductSubmit = function(e){
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;
        
        
        if(productName!=='' && productPrice!==''){
            //update Product
            const updatedProduct = ProductCtrl.updateProduct(productName,productPrice);

            let item = UICtrl.updateProduct(updatedProduct);

            //get total
            const total = ProductCtrl.getTotal();

            //show total ui
            UICtrl.showTotal(total);

            //update Storage

            LSCtrl.updateProduct(updatedProduct);

            //clear
            UICtrl.clearInputs();
            UICtrl.clearWarnings();

            //adding state
            UICtrl.addingState();

            


        }

        e.preventDefault();
    }
    const deleteProductSubmit = function(e){

        //get selected product

        const selectedProduct = ProductCtrl.getCurrentProduct();

        // delete Product

        ProductCtrl.deleteProduct(selectedProduct);

        //delete ls

        LSCtrl.deleteProduct(selectedProduct);

        //delet eui

        UICtrl.deleteProduct();

        // clear
        UICtrl.clearInputs();
        
        //adding state

        UICtrl.addingState();

        //get total

        const total = ProductCtrl.getTotal();

        UICtrl.showTotal(total);
        
        if(total == 0){
            UICtrl.hideCard();
        }

        e.preventDefault();
    }
    const cancelUpdate = function(e){
        
        UICtrl.clearInputs();
        UICtrl.clearWarnings();

        UICtrl.addingState();
        
        e.preventDefault();
    }
    const productEditClick = function(e){
        if(e.target.classList.contains("edit-product")){
            
            const id = e.target.getAttribute("data-id");

            //get selected product

            const product = ProductCtrl.getProductById(id);
            
            // set current product

            ProductCtrl.setCurrentProduct(product);

            //add product to ui
            UICtrl.addProductToForm();
            
            
            UICtrl.clearWarnings();

            UICtrl.editState(e.target.parentNode.parentNode);

            
        }

        e.preventDefault();
    }

    return {
        init: function () {
            console.log("starting app...");
            UICtrl.clearInputs();
            UICtrl.clearWarnings();
            UICtrl.addingState();
            const products = ProductCtrl.getProducts();

            if (products.length == 0) {
                UICtrl.hideCard();
            } else {
                const total = ProductCtrl.getTotal();

                UICtrl.showTotal(total);
                UICtrl.createProductList(products);
            }


            loadEventListeners();
        }
    }


})(ProductController, UIController,StorageController);



App.init();