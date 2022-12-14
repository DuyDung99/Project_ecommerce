import React from "react";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import "antd/dist/antd.css";
import { Select } from "antd";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Link, useNavigate } from "react-router-dom";
import { postAPI, getAPI } from "../../../config/api";
import { useDispatch, useSelector } from "react-redux";

import { userLogin } from "../../../redux/userSlice";

import "./StyleIn.css";

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


function SignIn({setUsers}) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const { Option } = Select;
    const nav = useNavigate()
    
    
    function checkMail() {
        const warmail = document.querySelector('#warmail')
        warmail.style.display = 'none'
    }
    function checkPass() {
        const warpass = document.querySelector('#warpass')
        warpass.style.display = 'none'
    }
    function GotoHome(){
        nav('/')
    }
    
    async function handleSignIn() {
        try {
           
            const password = document.querySelector('#password').value
            const email = document.querySelector('#email').value
          
            
            const warmail = document.querySelector('#warmail')
            const warpass = document.querySelector('#warpass')
            // const check = setUsers(email,password)
            
            var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (email.trim() === '') {
                warmail.innerHTML = "Vui l??ng nh???p email";
            }
            else if (!mailformat.test(email)) {
                warpass.style.display = 'block'
                warmail.innerHTML = "email kh??ng h???p l???";
            }
            else if (password.trim() === '') {
                warpass.innerHTML = "Vui l??ng nh???p m???t kh???u"
            } else if (password.length < 6) {
                warpass.style.display = 'block'

                warpass.innerHTML = "M???t kh???u ph???i c?? ??t nh???t 6 k?? t???"
            } 
             else {
               

                var resp = await postAPI('/auth/login', { email, password}) 
                setCookie('tiki-user', resp.data.token,30);
                const res = await getAPI('/auth/me');
                const action = userLogin(res.data);
                dispatch(action);
                window.localStorage.setItem('tiki-user',JSON.stringify(res.data))       
                  nav('/')

             }

           
               
            }
        
        catch (error) {
            console.log('loi',error)
            alert(error.response.data.message)
        }

    }
    
    return (

        <div className='box_container'>
            <div className="menu">
                <div className="menu-left">
                    <div>
                        <img onClick={GotoHome} src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png" alt='tiki-logo' />
                    </div>
                </div>

                <div className="menu-right">
                    <a href="#team">
                        <Select defaultValue="Ti???ng Vi???t" style={{ width: 120 }} >
                            <Option value="jack">Ti???ng Vi???t</Option>
                            <Option value="lucy">Ti???ng Anh</Option>
                        </Select>
                    </a>

                </div>
            </div>
            <div className='box'>
                <div className='box_background'>
                </div>
                <div className="container">
                    <div className="title"><h1>????ng nh???p</h1></div>
                    <div className="inputGroup">
                    <div>
                            Nh???p Email
                        </div>

                        <Space direction="vertical">

                            <Input
                                className="form-control email"
                                placeholder="Nh???p email"
                                id='email'
                                type='email'
                                name='email'
                               
                                onChange={checkMail}
                           
                            />
                            <span className="warning" id='warmail'></span>
                            
                        </Space>

                        <div>
                            Nh???p m???t kh???u
                        </div>

                        <Space direction="vertical">

                            <Input.Password
                                id="password"
                                className="form-control "
                                placeholder="Nh???p m???t kh???u"
                                type='password'
                                name='password'
                                onChange={checkPass}

                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            <span className="warning" id='warpass'></span>
                          
                        </Space>
                    </div>
                    <div>


                        <div className="textGroup">
                            <p> <a href="">Qu??n m???t kh???u</a></p>

                            <p>
                                <div>B???n ch??a c?? t??i kho???n?</div>

                                <Link to='/sign-up'><i><a href="">????ng k??</a></i></Link>

                            </p>
                        </div>
                    </div>
                    <div className="buttonGroup">
                        <button className="login" onClick={handleSignIn}>????ng nh???p</button>

                    </div>
                    <div className="line"></div>


                    <div className="buttonGroup1">
                        <button href="#" className="field facebook">
                            <FacebookOutlinedIcon className=' facebook iconface' />
                            <span>????ng nh???p v???i Facebook</span>
                        </button>
                    </div>

                    <div className="buttonGroup1">
                        <button href="#" className="field google">

                            <img src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1" alt="" className="google-img" />
                            <span>????ng nh???p v???i Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
