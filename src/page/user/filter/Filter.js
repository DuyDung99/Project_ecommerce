import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import Breadcrumb from './Breadcrumb'
import styles from './Filter.module.css'
import Container from './Container'
import { getAPI } from '../../../config/api'
import { useSearchParams } from 'react-router-dom';

const Filter = ({setId}) => {
  // const [inp, setInp] = useState([])
  const [price750, setPrice750] = useState([])
  const [data1, setData] = useState([])
 const [listProducts,setListProducts]= useState([])
  const [query] = useSearchParams()
  const search = query.get('search')

  function removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }

  useEffect(() => {
    getAPI("/product/get-all-products")
    .then((data)=> {
      setListProducts(() => {
        setData([])
        const newData = []
        for(let value of data.data.listProduct) {
          if(search){
            if(value.price){
              if(value.categoryId){
                const newName = value.categoryId.categoryName.toLowerCase()
                if(search){
                  if(newName.includes(search.toLowerCase())){
                    newData.push(value)
                  }else {
                    if(removeAccents(newName).includes(search.toLowerCase())){
                      newData.push(value)
                    }
                  }
                }
              }
              // else {
              //   newData.push(value)
              // }
            }
          }else {
            if(value.price) {
              newData.push(value)
            }
          }
        }

        return newData
      })
    })
    .catch((error) => {
      console.log(error)
    }) 
  },[search])


  return (
    <div className='App'>
        <div  className = {styles.slider}>
            <Breadcrumb />
            <div className = {styles.container}>
                <div className = {styles.container_box} >
                    <SideBar setData= {setData} listProducts = {listProducts} />
                </div>
                <Container data1={data1} listProducts = {listProducts} setId = {setId}/>
            </div>
        </div>
    </div>
  )
}

export default Filter