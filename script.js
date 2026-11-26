// COVE store settings — edit these values before publishing.
const STORE = {
  whatsappNumber: "8801XXXXXXXXX", // Replace with your WhatsApp number, country code included, no + sign.
  currency: "৳",
  products: [
    {id:1,name:"COVE Essential Drop Shoulder",category:"tshirt",price:350,tag:"BESTSELLER",color:"BLACK",sizes:["S","M","L","XL"],mark:"COVE"},
    {id:2,name:"Classic Oversized Tee",category:"tshirt",price:400,tag:"NEW",color:"WHITE",sizes:["S","M","L","XL"],mark:"FORM"},
    {id:3,name:"Core Street Hoodie",category:"hoodie",price:850,tag:"COMING SOON",color:"BLACK",sizes:["M","L","XL"],mark:"C."},
    {id:4,name:"Relaxed Fit Street Pants",category:"pants",price:750,tag:"NEW",color:"CHARCOAL",sizes:["M","L","XL"],mark:"COVE"},
    {id:5,name:"Everyday Boxy Tee",category:"tshirt",price:380,tag:"COVE PICK",color:"GREY",sizes:["S","M","L","XL"],mark:"COVE"},
    {id:6,name:"Minimal Pullover Hoodie",category:"hoodie",price:900,tag:"ESSENTIAL",color:"GREY",sizes:["M","L","XL"],mark:"DAILY"}
  ]
};
let cart = [];
const $ = (s)=>document.querySelector(s);
const money = n => STORE.currency + Number(n).toLocaleString("en-BD");
function renderProducts(filter="all"){
  const list=STORE.products.filter(p=>filter==="all"||p.category===filter);
  $("#products").innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-image"><span class="product-tag">${p.tag}</span><span class="placeholder">${p.mark}</span></div>
      <div class="product-info"><div><h3>${p.name}</h3><p>${p.color} · ${p.sizes.join(" / ")}</p></div><span class="price">${money(p.price)}</span></div>
      <button class="add-button" data-add="${p.id}">ADD TO BAG +</button>
    </article>`).join("");
}
function updateCart(){
  $("#cart-count").textContent=cart.reduce((a,x)=>a+x.qty,0);
  $("#drawer-count").textContent=`(${cart.reduce((a,x)=>a+x.qty,0)})`;
  $("#cart-total").textContent=money(cart.reduce((a,x)=>a+x.product.price*x.qty,0));
  $("#cart-items").innerHTML=cart.length?cart.map(x=>`
    <div class="cart-row">
      <div><strong>${x.product.name}</strong><small>${x.product.color} · Size ${x.size} · ${money(x.product.price)}</small></div>
      <div class="qty-controls"><button data-dec="${x.key}">−</button><span>${x.qty}</span><button data-inc="${x.key}">+</button></div>
    </div>`).join(""):`<p class="empty-cart">Your bag is empty.</p>`;
}
function openCart(open){$("#cart-drawer").classList.toggle("open",open);$("#overlay").classList.toggle("open",open);$("#cart-drawer").setAttribute("aria-hidden",String(!open));}
function whatsappLink(message){return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;}
$("#products").addEventListener("click",e=>{
  const btn=e.target.closest("[data-add]"); if(!btn)return;
  const p=STORE.products.find(x=>x.id===Number(btn.dataset.add));
  const size=prompt(`Choose size for ${p.name}: ${p.sizes.join(", ")}`,p.sizes[1]||p.sizes[0]);
  if(!size)return;
  const chosen=size.trim().toUpperCase();
  if(!p.sizes.includes(chosen)){alert("Please choose: "+p.sizes.join(", "));return;}
  const key=`${p.id}-${chosen}`;const found=cart.find(x=>x.key===key);
  if(found)found.qty++;else cart.push({key,product:p,size:chosen,qty:1});
  updateCart();openCart(true);
});
$("#cart-items").addEventListener("click",e=>{
  const inc=e.target.closest("[data-inc]"),dec=e.target.closest("[data-dec]");
  if(inc){const x=cart.find(i=>i.key===inc.dataset.inc);if(x)x.qty++;}
  if(dec){const x=cart.find(i=>i.key===dec.dataset.dec);if(x){x.qty--;if(x.qty<=0)cart=cart.filter(i=>i.key!==x.key);}}
  updateCart();
});
$("#cart-open").addEventListener("click",()=>openCart(true));
$("#cart-close").addEventListener("click",()=>openCart(false));
$("#overlay").addEventListener("click",()=>openCart(false));
$("#checkout").addEventListener("click",()=>{
  if(!cart.length){alert("Your bag is empty. Add a product first.");return;}
  if(STORE.whatsappNumber.includes("X")){alert("Store owner: add your WhatsApp number in script.js first.");return;}
  const lines=cart.map(x=>`${x.product.name} | Size: ${x.size} | Qty: ${x.qty} | ${money(x.product.price*x.qty)}`);
  const total=cart.reduce((a,x)=>a+x.product.price*x.qty,0);
  const message=`Hello COVE! I want to place an order:\n\n${lines.join("\n")}\n\nSubtotal: ${money(total)}\n\nName:\nAddress:\nPhone:\n`;
  window.open(whatsappLink(message),"_blank","noopener");
});
$("#filters").addEventListener("click",e=>{
  const b=e.target.closest("[data-filter]");if(!b)return;
  document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));
  renderProducts(b.dataset.filter);
});
$("#menu-toggle").addEventListener("click",()=>$("#nav").classList.toggle("show"));
$("#nav").addEventListener("click",e=>{if(e.target.tagName==="A")$("#nav").classList.remove("show");});
$("#contact-whatsapp").href=STORE.whatsappNumber.includes("X")?"#":`https://wa.me/${STORE.whatsappNumber}`;
$("#year").textContent=new Date().getFullYear();
renderProducts();updateCart();
