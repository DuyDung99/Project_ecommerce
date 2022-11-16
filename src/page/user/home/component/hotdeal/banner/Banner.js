import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
import style from './banner.module.css'
import { Pagination, Navigation } from "swiper";
import Item from "./item/Item";
function Banner() {
    const data=[
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/13/12/f7/31d2e3eaad76fbdfeccdc0d2561eed62.jpg.webp',
            price: 3000,
            discount: 81,
            sold: 90,
            total: 100
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/ad/10/15/baab21ff6db0319e2e811a5dfab1b9b1.jpg.webp',
            price: 376000,
            discount: 18,
            sold: 0,
            total: 100
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/8c/ac/f8/4a75f1af576c06767b1e00ae7259080a.jpg.webp',
            price: 35000,
            discount: 40,
            sold: 7,
            total: 20
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/c6/ed/93/dd370372b983eedac7a49012c03d35f7.png.webp',
            price: 159000,
            discount: 27,
            sold: 7,
            total: 20
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/f3/2b/f7/8ed26331ae5328a9cabe862c29c65315.png.webp',
            price: 1190000,
            discount: 40,
            sold: 0,
            total: 100
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/2f/7a/13/4012891e72fe296e9718e1bbc4672830.jpg.webp',
            price: 135000,
            discount: 16,
            sold: 2,
            total: 8
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/b0/62/1d/5df2cc5fe7f36a1074c463b48ae1b3b6.jpg.webp',
            price: 1335000,
            discount: 19,
            sold: 0,
            total: 100
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/df/50/69/d70477f2b8130a84a42ff62c9fc84611.jpg.webp',
            price: 35000,
            discount: 45,
            sold: 0,
            total: 100
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/52/f1/30/2095020cb4f2e6d6d466a25d98904267.jpg.webp',
            price: 611000,
            discount: 53,
            sold: 0,
            total: 100
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/b3/05/7b/a9a21c92ae8e267bd5a5f1f366d77a1a.png.webp',
            price: 354000,
            discount: 21,
            sold: 0,
            total: 100
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/ts/product/e3/4b/11/2f610a4107ea9743f3f6c02d8e49d1ce.jpg.webp',
            price: 99000,
            discount: 60,
            sold: 0,
            total: 100
        },
        {
            img:'https://salt.tikicdn.com/cache/200x200/media/catalog/producttmp/e6/74/62/d6ca16e4c6e3b890256ea9bed9641309.jpg.webp',
            price: 119000,
            discount: 19,
            sold: 0,
            total: 100
        },
      ]
  return (
    <div className={style.silder}>
        <Swiper
        hideOnClick={true}
        slidesPerView={5}
        spaceBetween={30}
        slidesPerGroup={5}
        loop={false}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper4"
      >
        {
            data.map(function(item){
                return(
                    <SwiperSlide id="list__item_header">
                        <Item 
                              img={item.img} 
                              price={item.price} 
                              discount={item.discount}
                              sold={item.sold}
                              total={item.total}
                        />
                    </SwiperSlide>
                )
            })
        }
      </Swiper>
    </div>
  )
}

export default Banner