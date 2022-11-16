import React, { useState } from 'react'
import { GlobalStyles } from '../../GlobalStyles/index.js'
import { Select, Checkbox  } from 'antd'
import ListData from '../../listData/ListData.jsx'
import { listproduct } from '../../listproduct.js'

import Headerr from '.././oederheader/Headerr'
import { UserOutlined, WechatOutlined, PrinterOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { blue } from '@mui/material/colors'
import { useEffect } from 'react'
import { getAPI, patchAPI } from '../../../../../config/api.js'
import data from '../../../../user/profile/UserInfo_data/data.js'
import styles from '../OrderContainer.module.css'
const { Option } = Select

function PendingOder({listOder,count,setcount}) {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      }
      const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };
    function ChangeOrderStatus(id,status){
       
        if(status == 'pending'){
            setcount(count+1)
            patchAPI('/order/shop-update-order-status/'+id,{"status": "shipping"});
        } 
        if(status == 'shipping'){
            setcount(count+1)
            patchAPI('/order/shop-update-order-status/'+id,{"status": "complete"});
        }    
    } 
    return (
        <div className={styles.order_Container}>
        <Headerr/>
        <div className={styles.order}>
        <div className={styles.order_header}>
        <p>Sản phẩm</p>
        <p>Tổng cộng</p>
        <p>Giao hàng</p>
        <p>Trạng thái</p>
        <p>Thao tác</p>
        </div>
        {console.log(36,listOder)}
        <ul className= {styles.order_list}>
          {listOder.length>0 && listOder.map(Value => {
            return (
              <li key={Value.id} className= {styles.order_item}>
                <div className= {styles.order_item_header}>
                    <div className= {styles.order_item_header_box}>
                        <div className= {styles.order_item_left}>
                            <Checkbox onChange={onChange} style={{marginRight:20}}></Checkbox>
                            <Avatar size="small" icon={<UserOutlined />}/>
                            <span className={styles.order_item_name}>{Value.userID}</span>
                            <WechatOutlined  style={{color:'rgb(107, 107, 248)', marginRight:10}}/>
                            <span>(1 sản phẩm)</span>
                        </div>
                        <div className={styles.order_item_right}>
                            <p className={styles.order_item_sdh}>Số đơn hàng: <span>{Value.listProducts.length}</span></p>
                            <span>
                                Thời gian tạo: 08 Jul 2022 10:18
                            </span>
                        </div>
                    </div>
                </div>
                
               {Value.listProducts.map(value=>{
                return(
                    <div className= {styles.order_item_middle}>
                    <div className= {styles.order_info_product}>
                            <Checkbox onChange={onChange} style={{marginTop:20}}></Checkbox>
                            <img src={value.image} alt='' className={styles.order_info_img}/>
                        <div className= {styles.order_info}>
                            <p className={styles.order_info_title}>{value.title}</p>
                            <span>Nhóm màu: {value.color}</span>
                            <p>Mã SKU NBH: {value.code}</p>
                        </div>
                    </div>
                    <div className= {styles.order_info_price_box}>
                        <p className= {styles.order_info_price}><span>đ</span> {value.price}</p>
                        <span className={styles.order_info_price_amount}>{value.amout}</span>
                    </div>
                    <div className={styles.order_info_new}>
                        <p><span>đ</span> {value.total}</p>
                        <span className={styles.order_info_delivery}>{value.delivery}</span>
                    </div>
                    <p className={styles.order_info_standard}>Tiêu chuẩn</p>
                    <div>
                        {
                            Value.status == 'pending' ? <p className={styles.order_info_standard}>Chờ xử lí</p> : null
                        }
                        {
                            Value.status == 'shipping' ? <p className={styles.order_info_standard}>Đang vận chuyển</p> : null
                        }
                        {
                            Value.status == 'cancel' ? <p className={styles.order_info_standard}>Đơn thất bại</p> : null
                        }
                        {
                            Value.status == 'complete' ? <p className={styles.order_info_standard}>Đã hoàn thành</p> : null
                        }
                        <p className={styles.order_info_hrs}>80.5 hrs</p>
                        <div>
                            <span><PrinterOutlined style={{marginRight:7}}/>Mã đơn hàng</span>
                            <span style={{marginLeft:10}}><PrinterOutlined style={{marginRight:7}}/>Hóa đơn</span>
                            <p><PrinterOutlined style={{marginRight:7}}/>Danh sách chọn</p>
        
                        </div>
                    </div>
                    <div>
                       
                        {
                            Value.status == 'pending' ? <button className={styles.order_info_btn} onClick ={()=> {ChangeOrderStatus(Value.id,Value.status)}}> Giao hàng</button> : null
                        }
                        {
                            Value.status == 'shipping' ? <button className={styles.order_info_btn} onClick ={()=> {ChangeOrderStatus(Value.id,Value.status)}}> Giao thành công</button> : null
                        }
                        {
                            Value.status == 'cancel' ? <button className={styles.order_info_btn} onClick ={()=> {ChangeOrderStatus(Value.id,Value.status)}}> Giao thất bại</button> : null
                        }
                        {
                            Value.status == 'complete' ? <button className={styles.order_info_btn} onClick ={()=> {ChangeOrderStatus(Value.id,Value.status)}}>  Đã hoàn thành</button> : null
                        }
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: 150,color: 'blue'
                            }}
                            onChange={handleChange}
                            >
                            <Option value="lucy">export</Option>
                        </Select>
                    </div>
                </div>
                )
               })}
              </li>
            )
          })}
          <ListData  data= {listproduct}/>
        </ul>
        </div>
        </div>
      )
}

export default PendingOder