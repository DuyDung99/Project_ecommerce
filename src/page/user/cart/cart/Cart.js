import React from "react";
import TotalCart from "./TotalCart";
import "./Cart.css";

function Cart() {
  return (
    <div>
      <div className="main-title">
        <h4>GIỎ HÀNG</h4>
        <div class="main-title-sub">
          <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/tikingon-link.svg" alt="tikingon" width="15" height="15" />
          NGON
        </div>
      </div>
      <TotalCart></TotalCart>
    </div>
  );
}

export default Cart;
