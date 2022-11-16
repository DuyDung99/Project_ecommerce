import React, { useState } from 'react'
import { Select } from 'antd'
import { useEffect } from 'react'
import { getAPI } from '../../../../config/api.js'
import { Tabs } from 'antd';
import PendingOder from './taboderStatus/PendingOder.js'
import styles from './OrderContainer.module.css'
const OrderContainer = () => {

  const [listOder, setLisOder] = useState([])
  const [listOderPending, setLisOderPending] = useState([])
  const [listOderShipping, setLisOderShipping] = useState([])
  const [listOdercancel, setLisOdercancel] = useState([])
  const [listOdercomplete, setLisOdercomplete] = useState([])
  const [count, setcount] = useState(0)
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  useEffect(() => {
    ShopgetListOrder()

  }, [count])
  async function ShopgetListOrder() {
    try {
      let Shopid = await getAPI('/shop/get-loged-in-shop')

      let dataOrder = await getAPI(`/order/get-orders-by-shop/` + Shopid.data.shop._id)
      console.log(26, dataOrder)
      const newData = dataOrder.data.listOrder
      const daTa = []
      newData.map((value) => {
        const Obj = {
          total: value.total,
          userID: value.userId,
          delivery: 'COD',
          id: value._id,
          status: value.status,
          listProducts: []
        }
        const listProducts = []
        value.product.map((subvalue, index) => {
          listProducts.push({
            id: value._id,
            image: value.product[index].productId.thump[0],
            title: value.product[index].productId.productName,
            color: 'Blue',
            code: value._id,
            amout: value.product[index].quantity,
            price: value.product[index].productId.price,
            delivery: 'COD',
            sdh: value.phone,
            total: value.total,
            userID: value.userId
          })
        })
        value.listProduct.map((subvalue, index) => {
          listProducts.push({
            id: subvalue._id,
            image: subvalue.productDetailId.productId.thump[0],
            title: subvalue.productDetailId.productId.productName,
            color: 'Blue',
            code: subvalue._id,
            amout: subvalue.quantity,
            price: subvalue.productDetailId.price,
            delivery: 'COD',
            sdh: value.phone,
            total: value.total,

          })
        })
        Obj.listProducts = listProducts
        daTa.push(Obj)
        setLisOder(daTa)
        setLisOderPending(daTa.filter(value => value.status == 'pending'))
        setLisOderShipping(daTa.filter(value => value.status == 'shipping'))
        setLisOdercancel(daTa.filter(value => value.status == 'canceled'))
        setLisOdercomplete(daTa.filter(value => value.status == 'complete'))
      })

    }
    catch (err) {
      console.log(err);
    }
  }
  return (
   <div className={styles.Oder}>
       <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Tất cả đơn" key="1">
        <PendingOder listOder={listOder} count={count} setcount={setcount} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Chờ xử lí" key="2">
        <PendingOder listOder={listOderPending} count={count} setcount={setcount} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đang Vận Chuyển" key="3">
        <PendingOder listOder={listOderShipping} count={count} setcount={setcount} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đơn Thành Công" key="4">
        <PendingOder listOder={listOdercomplete} count={count} setcount={setcount} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đơn Thất Bại" key="5">
        <PendingOder listOder={listOdercancel} count={count} setcount={setcount} />
      </Tabs.TabPane>
    </Tabs>
   </div>
  )

}

export default OrderContainer