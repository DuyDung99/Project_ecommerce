import React, { useEffect, useState } from "react";
import data from "./CartData";
import "./Cart.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClosingCart from "./ClosingCart";
import style from "./TotalCart.module.css";

function TotalCart() {
  const [newData, setNewData] = useState([]);
  const [listProduct, setListProduct] = React.useState(data.listProduct);
  useEffect(function () {
    setNewData(() => {
      let Obj = {};
      let DATA = [];
      listProduct.map((item) => {
        const newDATA = listProduct.filter((item2) => {
          return item2.productDetailId.productId.shopId.shopName == item.productDetailId.productId.shopId.shopName;
        });
        if (!Obj[item.productDetailId.productId.shopId.shopName]) {
          const Element = {
            checked : false,
            shopName: item.productDetailId.productId.shopId.shopName,
            listProduct: [...newDATA],
          };
          DATA.push(Element);
        }
        Obj[item.productDetailId.productId.shopId.shopName] = Obj[item.productDetailId.productId.shopId.shopName] ? Obj[item.productDetailId.productId.shopId.shopName] : newDATA;
      });
      return DATA;
    });
  }, []);
  console.log(6, newData);

  const [total, setTotal] = React.useState(0);
  const [finalTotal, setFinalTotal] = useState([]);
  console.log(13, finalTotal);
  useEffect(() => {
    let total = 0;
    finalTotal.map((item) => {
      total += item.quantity * item.productDetailId.price;
    });
    setTotal(total);
  }, [finalTotal]);
  useEffect(() => {
    listProduct.map((item) => {
      item.checked = false;
    });
  }, [])


  const onRemove = (e, id, index, index1) => {
     

    setNewData(() => {
      const potitions = finalTotal.findIndex(item=>{
        return item.productDetailId._id === id
      })
      const Quanlity = newData[index].listProduct[index1].quantity
      console.log(77,potitions,Quanlity) 
      const newListData1 = [...newData];


      console.log(68, newListData1, index, index1);
      if (newListData1[index].listProduct[index1].quantity >= 2) {
        setFinalTotal(() => {
          const newFinalTotal = [...finalTotal]
          const exits = newFinalTotal.findIndex(Item =>{
            return Item.productDetailId._id === id
          })
          if(exits>=0){
            newFinalTotal[exits].quantity = newData[index].listProduct[index1].quantity
          }
          return newFinalTotal
        })
        newListData1[index].listProduct[index1].quantity -= 1;
        return newListData1;
      } else {
          setFinalTotal(() => {
            const newFinalTotal = [...finalTotal]
            const exits = newFinalTotal.findIndex(Item =>{
              return Item.productDetailId._id === id
            })
            if(exits>=0){
              newFinalTotal.splice(exits,1)
            }
            return newFinalTotal
          })
          if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            if (newListData1[index].listProduct.length > 1) {
              newListData1[index].listProduct.splice(index1, 1);
 
              if(newListData1[index].listProduct.filter(subItem=>{
             return subItem.checked == false
             }).length==0){
              newListData1[index].checked = true
              }
              return newListData1;
            } else {
              newListData1.splice(index, 1);
              return newListData1;
            }
          
          }else{
            return newListData1
          }
        }
    });

    
  };
  const onAdd = (e, id) => {
    const check = e.target.closest(`.${style.tradingCart}`).querySelector(".checkItem").checked;
    setFinalTotal(() => {
      const newElement = listProduct.filter((item) => {
        return item.productDetailId._id == id;
      });
      console.log(newElement);
      const newFinalTotal = [...finalTotal];
      newFinalTotal.map((item) => {
        if (item.productDetailId._id == id) {
          item.quantity = newElement[0].quantity;
        }
      });

      return newFinalTotal;
    });

    const exist = listProduct.findIndex((item) => item.productDetailId._id === id);
    if (exist >= 0) {
      setListProduct(() => {
        const newListData = [...listProduct];
        newListData[exist].quantity += 1;
        return newListData;
      });
    }
  };

  const onDelete = (id, index, index1) => {
    console.log(120, id, index, index1);
    setNewData(() => {
      const newListData = [...newData];
      console.log(134, newListData);
      if (newListData[index].listProduct.length == 1) {
        newListData.splice(index, 1);
        return newListData;
      } else {
        newListData[index].listProduct.splice(index1, 1);
        if(newListData[index].listProduct.filter(subItem=>{
          return subItem.checked == false
        }).length==0){
          newListData[index].checked = true
        }
        return newListData;
      }
    });
  };
  console.log(119, listProduct);
  const handleCheckItem = (e, index , index1) => {
    if(e.target.checked == true){
      setFinalTotal(()=>{
        const Element = newData[index].listProduct[index1]
        return [...finalTotal,Element]
      })  
    }else{
      setFinalTotal(()=>{
        const Exits = finalTotal.findIndex(item=>{
          return item.productDetailId._id == newData[index].listProduct[index1].productDetailId._id
        })
        const newFinalTotal = [...finalTotal]
        newFinalTotal.splice(Exits,1)
        return newFinalTotal
      })  
    }
    setNewData(()=>{
      const newListData = [...newData]
      newListData[index].listProduct[index1].checked = e.target.checked 
      return newListData
    })
    const ListCheckItem = e.target.closest(`.${style.tradingCart}`).querySelectorAll('.checkItem')
    if([...ListCheckItem].filter(item=>{
      return item.checked == false
    }).length==0){
      setNewData(()=>{
        const ListallCheckItem = document.querySelectorAll('.checkItem')
        if([...ListallCheckItem].filter(item=>{
          return item.checked == false
        }).length == 0){
          document.querySelector(`.${style.TotalCheckItemStore}`).checked = true
        }
        const newListData = [...newData]
        newListData[index].checked = true
        return newListData
      })
    }else{
      setNewData(()=>{
        document.querySelector(`.${style.TotalCheckItemStore}`).checked = false
        const newListData = [...newData]
        newListData[index].checked = false
        return newListData
      })
    }
  };
  console.log(82, finalTotal);
  useEffect(function(){
      const ListallCheckItem = document.querySelectorAll('.checkItem')
      console.log(192,ListallCheckItem)
      if([...ListallCheckItem].filter(item=>{
        return item.checked == false
      }).length == 0){
        document.querySelector(`.${style.TotalCheckItemStore}`).checked = true
      }else{
        document.querySelector(`.${style.TotalCheckItemStore}`).checked = false
      }
      setFinalTotal(()=>{
        const newListFinalTotal = []
        const newListCheked = [...ListallCheckItem]
        newListCheked.map(item=>{
          if(item.checked == true){
            const index = item.getAttribute('index')
            const index1 = item.getAttribute('index1')
            newListFinalTotal.push(newData[index].listProduct[index1])
          }
        })
        return newListFinalTotal
      })
  },[newData])
  const handleCheckStore = (e,index) => {
   
    setNewData(()=>{
      const newListData = [...newData]
      newListData[index].checked = !newListData[index].checked
      newListData[index].listProduct.map(item=>{
        return item.checked = e.target.checked
      })
      return newListData})
    
  };

  const handleTotalCheckItemStore = (e) => {
    if (e.target.checked == true) {
      setNewData(()=>{
        const newListData = [...newData]
        newListData.map(item=>{
          item.checked = true
          item.listProduct.map(subItem=>{
            subItem.checked = true
          })
        })
        return newListData
      })
    } else {
      setNewData(()=>{
        const newListData = [...newData]
        newListData.map(item=>{
          item.checked = false
          item.listProduct.map(subItem=>{
            subItem.checked = false
          })
        })
        return newListData
      })
    }
  };

  const handleRemoveAllCheckItem = () => {
    setNewData(() => {
      const newListProduct = [...newData];
      finalTotal.map((item) => {
        const index = newListProduct.findIndex((item2) => {
          return item2.shopName === item.productDetailId.productId.shopId.shopName;
        });
        console.log(275,index)
        if (newListProduct[index].listProduct.length == 1) {
          newListProduct.splice(index, 1);
        }else{
          const newIndex = newListProduct[index].listProduct.findIndex(subItem=>{
              return subItem.productDetailId._id == item.productDetailId._id
          })
          newListProduct[index].listProduct.splice(newIndex,1)
        }
      });
      return newListProduct;
    });
    setFinalTotal([]);
  };

  return (
    <div className="totalcart-container">
      <div className="totalcart-right">
        <div className="total-cart">
          <label>
            <input type="checkbox" onChange={handleTotalCheckItemStore} className={style.TotalCheckItemStore} /> <span className="checkboxStore"></span>{" "}
            <span>Tất cả({newData.length} sản phẩm)</span>
          </label>
          <span>Đơn giá</span>
          <span>Số lượng</span>
          <span>Thành tiền</span>
          <span className="remove-all" onClick={handleRemoveAllCheckItem}>
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </span>
        </div>
        <div className="TradingCart">
          {newData.map((item1, index) => {
            return (
              <div className={style.tradingCart}>
                <div className={style.tradingCart_header}>
                  <input type="checkbox" checked={item1.checked} onChange={(e)=>handleCheckStore(e,index)} className={style.storeCart} />
                  <div className={style.tradingCart_shopName}>{item1.shopName}</div>
                </div>

                {item1.listProduct.map((item, index1) => {
                  return (
                    <div className={style.tradingCart_container}>
                      <div className={style.col_1}>
                        {" "}
                        <input
                          checked={item.checked}
                          type="checkbox"
                          className="checkItem"
                          ItemKey={item.productDetailId._id}
                          index={index}
                          index1={index1}
                          onChange={(e) => handleCheckItem(e, index, index1)}
                        />
                        <div className={style.tradingCart_img}>
                          <img
                            src="https://images.unsplash.com/photo-1659385631755-37e381232c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                            alt=""
                          />
                        </div>
                        <div className={style.tradingCart_content}>
                          <a>{item.productDetailId.productId.productName}</a>
                        </div>
                      </div>
                      <div className={style.tradingCart_price}>{item.productDetailId.price.toLocaleString()}</div>
                      <div className={style.tradingCart_qty}>
                        <button className={style.decrease} onClick={(e) => onRemove(e, item.productDetailId._id, index, index1)}>
                          -
                        </button>
                        <input type="tel" value={item.quantity} index={item.productDetailId._id} className={style.qty_input} />
                        <button className={style.increase} onClick={(e) => onAdd(e, item.productDetailId._id)}>
                          +
                        </button>
                      </div>
                      <div className={style.tradingCart_finalPrice} index={item.productDetailId._id}>
                        {(item.productDetailId.price * item.quantity).toLocaleString()}
                      </div>
                      <div className={style.tradingCart_delete} onClick={() => onDelete(item.productDetailId._id, index, index1)}>
                        <DeleteOutlineIcon />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="totalcart-left">
        <ClosingCart listProduct={listProduct} total={total} finalTotal={finalTotal} />
      </div>
    </div>
  );
}

export default TotalCart;
