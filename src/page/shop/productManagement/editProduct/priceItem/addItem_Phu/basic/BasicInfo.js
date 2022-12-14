import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import style from './basicInfo.module.css'
import { Input } from 'antd'
import { Cascader } from 'antd';
import './basicInfor.css'
import { getAPI } from '../../../../../../../config/api';
import { useSelector,useDispatch } from 'react-redux'
import { ChangeProductName,ChangeCatagoryName } from '../../../EditProductSlice';
import { loadDeleteImg, loadImages } from './ImageSliceReducer';
import useItems from 'antd/lib/menu/hooks/useItems';


const getBase64 = (file) => {
  
  return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => resolve(reader.result);
        
        reader.onerror = (error) => reject(error);
      })
    };
    function BasicInfo() {
      const dispatch = useDispatch()
    const newData = useSelector(state=>{
      return state.eidtProduct
    })
    console.log(31,newData.thump)
    const [listCatagory,setListCatagory] = useState([])
    useEffect(function(){
      getAPI('/category/get-all-categories')
        .then(data=>{
          const catagory = data.data.listCategories
          setListCatagory(()=>{
            return catagory.map(item=>{
              return {
                Name:item.categoryName,
                id: item._id
              }
            })
          })
        })
        .catch(error=>{ 
          console.log(error)
        })
    },[])
    const options = listCatagory.map(item=>{
      return {
        value : item.Name,
        label: item.Name,
        id:item.id
      }
    })
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])

    useEffect(function(){
        if(newData.thump&&newData.thump.length>0){
          const listOldImg = newData.thump.map(item=>{
            if(item.startsWith('http')){
              return {
                thumbUrl:item,
                url:item
              }
            }else{
              return {
                thumbUrl:`https://tiki.thaihm.site/${item}`,
                url:`https://tiki.thaihm.site/${item}`
              }
            }
          })
        setFileList(listOldImg)
        }
    },[newData])
   
    const handleCancel = () => setPreviewVisible(false);
    const { TextArea } = Input;
    console.log(64,fileList)
    const onChange = (e) => {
      dispatch(ChangeProductName(e.target.value))
    };
      
  const onChange1 = (value,label) => {
    console.log(67,label)
    dispatch(ChangeCatagoryName({
      category: value[0],
      id: label[0].id
    }))
  };
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const [listDelImage,setListDelImage] = useState([])
  const handleRemove = (file)=>{
    console.log(102,file)
    if(file.thumbUrl.startsWith('http')){
      setListDelImage(()=>{
        return [...listDelImage,file.thumbUrl]
      })
    }
  }
  useEffect(function(){
    dispatch(loadDeleteImg(listDelImage))
  },[listDelImage])
  console.log(110,listDelImage)
    const handleChange = ({ fileList: newFileList }) => {
      let newData = new FormData();
      newFileList.map(item=>{
        if(item.originFileObj){
          newData.append('thump', item.originFileObj)
        }
      })
      dispatch(loadImages(newData))
      return setFileList(newFileList)
    };
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );
  return (
    <div className={style.BasicInfo} id='Basic_infomation'>
        <h2 className={style.title}>
            Th??ng tin c?? b???n
        </h2>
        <p className={style.subTitle}>
            ???nh s???n ph???m
        </p>
        <p className={style.des}>
            ????y l?? h??nh ???nh ch??nh tr??n trang s???n ph???m. B???n c?? th??? up nhi???u h??nh ???nh c??ng l??c v?? t???i ??a c?? th??? c?? 8 h??nh. H??nh ???nh c???n c?? k??ch th?????c t??? 330x300 px ?????n 5000x5000px v?? kh??ng d?????c ph??p ch???a n???i dung nh???y c???m. K??ch th?????c t???i ??a: 3 MB
        </p>
        <div className={style.upload}>
            <div>
                <form id='thump-form'>
                  <Upload
                      name='thump'
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      onRemove={handleRemove}
                  >
                      {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                </form>
                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                    />
                </Modal>
            </div>
            <div className={style.lable}>
                <a>????ng t???i</a>
                |
                <a>Th?? vi???n ??a ph????ng ti???n</a>
            </div>
        </div>
        <div className={style.info}>
            <label>
                <span className={style.star}>*</span> T??n S???n Ph???m:
                <div className={style.Input}>
                    <>
                        <Input showCount maxLength={255} onChange={onChange}
                        placeholder='Ex. Nikon Coolpix A300 M??y ???nh K?? Thu???t S???'
                        className='input_additem' value={newData.productName}
                        />
                        
                    </>
                    <a>Add multi-languages</a>
                </div>
            </label>
        </div>
        <div className={style.info}>
            <label>
                <span className={style.star}>*</span> Danh M???c Ng??nh H??ng:
                <div className={style.Input}>
                    <Cascader options={options} onChange={onChange1} placeholder="L???a ch???ng ngh??nh h??ng" className='selected_product' 
                    value={newData.categoryId?newData.categoryId.categoryName:''}
                    />
                </div>
            </label>
        </div>
    </div>
  )
}

export default BasicInfo