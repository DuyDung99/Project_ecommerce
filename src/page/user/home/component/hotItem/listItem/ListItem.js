import React from 'react'
import style from '../hotitem.module.css'

function ListItem() {
  const data=[
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/category/1e/8c/08/d8b02f8a0d958c74539316e8cd437cbd.png.webp',
        title:'NGON'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/0c/b8/11/6c14b804e2649e1f7162f4aef27d1648.jpg.webp',
        title:'Giày thể thao nam'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/ad/50/99/93c55f64df94b3809e13e0648eec55f2.jpg.webp',
        title:'Balo'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg.webp',
        title:'Sách tư duy-kĩ năng sống'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/35/6c/4b/709aef22ee52628dcdbdc857ba1bc46c.jpg.webp',
        title:'Điện thoại Smartphone'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/79/78/7e/a70f1b4320b7d2fd31897a7c4efc2f34.jpg.webp',
        title:'Truyện tranh,manga,comic'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/e7/37/58/0ddcb4044c51e371aa54ac0d0bd00729.jpg.webp',
        title:'Bàn ghế làm việc'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg.webp',
        title:'Tiểu Thuyết'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/7c/e8/34/4d3636aadb471cad0bf2f45d681e4f23.jpg.webp',
        title:'Truyện ngắn'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/c3/0c/4a/263d041ad1099b75fe603397cb31c3ff.jpg.webp',
        title:'Tủ'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/dc/14/f1/32d400ab6b71d8cef6938b9a36baf53a.jpg.webp',
        title:'Cây Cảnh'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/4e/18/1e/aa90c76a8066d751b77deb17422ba1e0.jpg.webp',
        title:'Khác'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/27/02/b7/49104866e1a499616f0efffe65dad186.png.webp',
        title:'Kệ & tủ'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/25/8c/35/d9081d7f2905df3cf4d1700f180b85a3.jpg.webp',
        title:'Phụ kiện nhà bếp khác'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/e1/04/31/7763d9035552760f627c34acfec0e12f.jpg.webp',
        title:'Sách học tiếng Anh'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/31/fa/63/724419b2364c2ca2bce4adcd36d962df.jpg.webp',
        title:'Gối các loại'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/f2/a8/11/7e2c276f336602d9561164540fffaa29.jpg.webp',
        title:'Đầm dáng xoè'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/f8/25/5e/c8a3be17caf96ec781f96ff7a475b398.jpg.webp',
        title:'Gìay thể thao nam cổ thấp'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/96/46/60/096b3ef6d9265138abb024dd0a51ff15.jpg.webp',
        title:'Kem và sữa dưỡng da'
    },
    {
        img:'https://salt.tikicdn.com/cache/w100/ts/product/52/6b/e8/10826a772c52062a5a23471c37914432.jpg.webp',
        title:'Balo Nữ'
    },
    
  ]
  return (
    <div className={style.ListItem}>
        {data.map(function(item){
            return(
                <div className={style.ListItem_item}>
                    <img src={item.img} />
                    <h4>{item.title}</h4>
                </div>
            )
        })}
    </div>
  )
}

export default ListItem