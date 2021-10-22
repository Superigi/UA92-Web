var cart = {
    // (A) PROPERTIES
    hproduct : null, // HTML products list
    hcurrent : null, // HTML current cart
    items : {}, // Current items in cart
    iURL : "img/", // Product image URL folder
  
    save : function () {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    },
  
   //loading from the local storage
    load : function () {
      cart.items = localStorage.getItem("cart");
      if (cart.items == null) { cart.items = {}; }
      else { cart.items = JSON.parse(cart.items); }
    },
  
    // empty of the cart
    del : function () {
      if (confirm("Empty cart?")) {
        cart.items = {};
        localStorage.removeItem("cart");
        cart.list();
      }
    },
  
    // Inisalation
    start : function () {
      // the gathering of the html element
      cart.hproduct = document.getElementById("cart-products");
      cart.hcurrent = document.getElementById("cart-items");
  
      // the drawing of the produuct list
      cart.hproduct.innerHTML = "";
      let p, item, pa;
      for (let id in products) {
        // the wraaping part of the cart
        p = products[id];
        item = document.createElement("div");
        item.className = "p-item";
        cart.hproduct.appendChild(item);
  
        // images of the productss
        pa = document.createElement("img");
        pa.src = cart.iURL + p.img;
        pa.className = "p-img";
        item.appendChild(pa);
  
        // Pnameing of the product
        pa = document.createElement("div");
        pa.innerHTML = p.name;
        pa.className = "p-name";
        item.appendChild(pa);
  
        //desctipion of the product
        pa = document.createElement("div");
        pa.innerHTML = p.desc;
        pa.className = "p-desc";
        item.appendChild(pa);
  
        // Priecing
        pa = document.createElement("div");
        pa.innerHTML = "£" + p.price;
        pa.className = "p-price";
        item.appendChild(pa);
  
        // addition to the cart
        pa = document.createElement("input");
        pa.type = "button";
        pa.value = "Add to Cart";
        pa.className = "cart p-add";
        pa.onclick = cart.add;
        pa.dataset.id = id;
        item.appendChild(pa);
      }
  
      //getting the cart from another session
      cart.load();
  
      // listing current iteams
      cart.list();
    },
  
    // listing current iteams but in html
    list : function () {
      //the reset
      cart.hcurrent.innerHTML = "";
      let item, pa, pdt;
      let empty = true;
      for (let key in cart.items) {
        if(cart.items.hasOwnProperty(key)) { empty = false; break; }
      }
  
      //empty cart
      if (empty) {
        item = document.createElement("div");
        item.innerHTML = "Cart is empty";
        cart.hcurrent.appendChild(item);
      }
  
      //if the cart is not empty list the cart
      else {
        let p, total = 0, subtotal = 0;
        for (let id in cart.items) {
          // product
          p = products[id];
          item = document.createElement("div");
          item.className = "c-item";
          cart.hcurrent.appendChild(item);
  
          // name of prodduct
          pa = document.createElement("div");
          pa.innerHTML = p.name;
          pa.className = "c-name";
          item.appendChild(pa);
  
          // removal of the product
          pa = document.createElement("input");
          pa.type = "button";
          pa.value = "X";
          pa.dataset.id = id;
          pa.className = "c-del cart";
          pa.addEventListener("click", cart.remove);
          item.appendChild(pa);
  
          // ammount of the product
          pa = document.createElement("input");
          pa.type = "number";
          pa.min = 0;
          pa.value = cart.items[id];
          pa.dataset.id = id;
          pa.className = "c-qty";
          pa.addEventListener("change", cart.change);
          item.appendChild(pa);
  
          // sub total of the product
          subtotal = cart.items[id] * p.price;
          total += subtotal;
        }
  
        //fianl ammount of the prdouct
        item = document.createElement("div");
        item.className = "c-total";
        item.id = "c-total";
        item.innerHTML ="TOTAL: $" + total;
        cart.hcurrent.appendChild(item);
  
        // the del button
        item = document.createElement("input");
        item.type = "button";
        item.value = "Empty";
        item.addEventListener("click", cart.del);
        item.className = "c-empty cart";
        cart.hcurrent.appendChild(item);
  
        // the checkout button
        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout";
        item.addEventListener("click", cart.checkout);
        item.className = "c-checkout cart";
        cart.hcurrent.appendChild(item);
      }
    },
  
    // addmin function to the cart
    add : function () {
      if (cart.items[this.dataset.id] == undefined) {
        cart.items[this.dataset.id] = 1;
      } else {
        cart.items[this.dataset.id]++;
      }
      cart.save();
      cart.list();
    },
  
    // change of the ammount
    change : function () {
      // removal ofthe product
      if (this.value <= 0) {
        delete cart.items[this.dataset.id];
        cart.save();
        cart.list();
      }
  
      // only upatde te final total
      else {
        cart.items[this.dataset.id] = this.value;
        var total = 0;
        for (let id in cart.items) {
          total += cart.items[id] * products[id].price;
          document.getElementById("c-total").innerHTML ="TOTAL: Â£" + total;
        }
      }
    },
  
    // remove the product from the cart
    remove : function () {
      delete cart.items[this.dataset.id];
      cart.save();
      cart.list();
    },
  
    // the checkout
    checkout : function () {
    
      alert("TO DO");
    }
  };
  window.addEventListener("DOMContentLoaded", cart.start);