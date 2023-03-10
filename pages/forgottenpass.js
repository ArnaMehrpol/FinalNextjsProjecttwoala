import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import Cookies from "universal-cookie";
const forgatenpass = () => {
  const { restPassword } = useContext(MyContext);
  const cookies = new Cookies()
  const router = useRouter();
  const [url, seturl] = useState("https://dfgsdfgsdfgj32gsdg.mehrpol.com/");
  const [mobile, setmobile] = useState("");
  const [mobileStatus, setmobileStatus] = useState(false);
  const [mins, setmins] = useState(2);
  const [seconds, setseconds] = useState(60);
  const [defaultMins, setdefaultMins] = useState("02:");
  const [defaultSeconds, setdefaultSeconds] = useState("00");
  const [timex, settimex] = useState(0);
  const [disableGettingCode, setdisableGettingCode] = useState(false);
  const [resSendCode, setResSendCode] = useState([])
  const [catchSendCode, setCatchSendCode] = useState([])
  const [resConfirmCode, setResConfirmCode] = useState([])
  const [catchConfirmCode, setCatchConfirmCode] = useState([])
  const [loadingSppinerConfirm, setLoadingSppinerConfirm] = useState(false)
  const [code, setcode] = useState("");
  const [disableBtnTaeed, setdisableBtnTaeed] = useState(true);
  const [loadingSppiner, setLoadingSppiner] = useState(false)
  const [sendCode, setsendCode] = useState("ارسال");
  const [forgetCode, setforgetCode] = useState("");
  const [myTime, setmyTime] = useState(null);
  const [beforeSendCode, setBeforeSendCode] = useState(false)
  
  const regexMobile10 = new RegExp("^(\\+98|0)?9\\d{9}$");
  const regexPassword = new RegExp("^([a-zA-Z0-9.(_!@#$%&-+])*$");

  function startTimer() {
    setmyTime(
      setTimeout(function () {
        seconds--;
        if (mins > 1) {
          seconds = 59;
          mins--;
        }
        if (seconds === 0) {
          seconds = 59;
          mins--;
        }

        if (mins < 10) {
          setdefaultMins("0" + mins + ":");
        }
        if (seconds < 10) {
          setdefaultSeconds("0" + seconds);
        } else {
          setdefaultSeconds(seconds);
        }
        if (!(seconds == 0) & !(mins == -1)) {
          startTimer();
        } else {
          setdefaultMins("02:");
          setdefaultSeconds("00");
          setmobileStatus(false);
          setsendCode("ارسال مجدد");
        }
      }, 1000)
    );
  }

  useEffect(()=>{
    if(beforeSendCode === true){
      setLoadingSppiner(false);
      setBeforeSendCode(false)
    }
  },[beforeSendCode])

  //End Timer
  const mobileHandler = async (e) => {
    e.preventDefault();

    if (!regexMobile10.test(mobile)) {
      toast.error(
        "شماره موبایل باید با 09 شروع شده و بیشتر از 10 رقم یا خالی نباشد"
      );
        setBeforeSendCode(true);
        return false;
      }
    await axios.post(
      url + "api/user/auth/send-reset-password-verify-code",
      
        JSON.stringify({
          mobile: mobile,
        }),{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }},
      
    ).then(res => setResSendCode(res))
    .catch(err => setCatchSendCode(err))
  }

  useEffect(()=>{
    if(resSendCode.status === 200){
      if(resSendCode.data === 201){
        toast.success("کد به موبایل شما ارسال شد!");
        startTimer();
        setmobileStatus(true);
        setdisableBtnTaeed(false);
        setLoadingSppiner(false)
      }else if(resSendCode.data === 200){
        toast.success("کد قبلا به موبایل شما ارسال شده است!");
        setLoadingSppiner(false)
      }
    } else if(catchSendCode.name === "AxiosError"){
      toast.error("ارسال کد با مشکل مواجه شده است و یا شماره موبایل اشتباه است!");
      setLoadingSppiner(false)
    }

  },[resSendCode, catchSendCode])
  //   const resMobile = await fetch(
  //     url + "api/user/auth/send-reset-password-verify-code",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         mobile: mobile,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     }
  //   ); //End Fetch Mobile
  //   if (resMobile.ok) {
  //     toast.success("کد به مویایل شما ارسال شد!");
  //     startTimer();
  //     setmobileStatus(true);
  //     setdisableBtnTaeed(false);
  //   } else {
  //     toast.error("ارسال کد با مشکل مواجه شد. لطفا دوباره سعی نمایید!");
  //   }
  // };
  //ُStarte Fetch Code
  const verifyForgetCodePass = (e) => {
    e.preventDefault();
    axios
      .post(url + "api/user/auth/verify-code", {
        code: forgetCode,
        mobile: mobile,
      },{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }},).then(res => setResConfirmCode(res))
        .catch(err => setCatchConfirmCode(err))
      // .then(function (response) {
      //   if (response.data == 404) {
      //     toast.error("لطفا کد صحیح را ارسال فرمایید!");
      //   } else {
      //     var token = response.data.token;
      //     cookies.set('token', token , { path: '/' }, {maxAge: (60 * 60 * 24 * 30)});
      //     // restPassword({ token });
      //     console.log(token);

      //     toast.success("کد شما تایید گردید!");
      //     router.push("/forgottenpass2");
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    // console.log(token);
  }; //End Fetch Forget Code

  useEffect(()=>{
    if(resConfirmCode.status === 200){
      if(resConfirmCode.data === 404){
        toast.error("لطفا کد صحیح را ارسال فرمایید!");
        setLoadingSppinerConfirm(false)
      }else{
        cookies.set('token', resConfirmCode.data.token , { path: '/' }, {maxAge: (60 * 60 * 24 * 30)});
        setLoadingSppinerConfirm(false)
        toast.success("کد شما تایید گردید!");
        router.push("/forgottenpass2");
      }
    }else if(catchConfirmCode.length){
      toast.error("ارسال کد با مشکل مواجه شده است. لطفا دوباره تلاش کنید.");
      setLoadingSppinerConfirm(false)
    }
  }, [resConfirmCode, catchConfirmCode])

  return (
    <div className="container fotgottenBody shadow-lg">
      <div className="row">
        <div className="col-md-11">
          {/*  Start Logo Part  */}
          <div className="logoAnsFlash">
            <div className="flash emptyBox"></div>
            <div className="forgattenLogo mr-14">
              <Image
                src="/../public/assets/img/logos/mehrpol.jpg"
                width={100}
                height={105}
              />
            </div>
            <div className="emptyBox"></div>
          </div>
          {/* End of Logo Part */}
          <div className="myForgattenForm">
            <form>
              <div className="mb-3">
                <div id="emailHelp" className="form-text IranSanse mb-3">
                  تغییر رمز عبور
                </div>
                <label
                  for="exampleInputEmail1"
                  className="form-label IranSanse"
                >
                  برای تغییر رمز عبور شماره همراه خود را وارد فرمایید
                </label>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="برای مثال: 09121111111"
                    className="form-control IranSanse"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    disabled={mobileStatus}
                    onChange={(e) => {
                      setmobile(e.target.value);
                    }}
                  />
                  <button
                    
                    className={`text-white bg-blue-400  hover:bg-blue-500 rounded-md IranSanse mr-1 w-[130px] height150 ${mobileStatus ? 'bg-slate-400 hover:bg-slate-400' : '' }`}
                    disabled={mobileStatus}
                    onClick={(e)=>{mobileHandler(e)
                      setLoadingSppiner(true)
                    }}
                  >
                    {
                    loadingSppiner === true ? 
                      <div
                        className="spinner-border text-sm"
                        role="status"
                      ><span class="sr-only">Loading...</span></div>
                    : 
                      sendCode
                    }
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label
                  for="exampleInputPassword1"
                  className="form-label IranSanse"
                >
                  کد تایید ارسال شده را وارد فرمایید
                </label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control IranSanse"
                    id="exampleInputPassword1"
                    name="CodeForgetPass"
                    onChange={(e) => setforgetCode(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="text-white bg-blue-400  hover:bg-blue-500 rounded-md IranSanse mr-1 w-[130px] height150"
                    onClick={(e)=>{verifyForgetCodePass(e)
                              setLoadingSppinerConfirm(true)}}
                    
                  >
                    {
                      loadingSppinerConfirm === true ? 
                        <div
                          className="spinner-border text-sm"
                          role="status"
                        ><span class="sr-only">Loading...</span></div>
                      : 
                        'تایید'
                    }
                  </button>
                </div>
                <div className="forgattenTomer IranSanse mt-4 text-center d-flex justify-center">
                  <div className="ml-2">
                    <span id="mins">{defaultMins}</span>
                    <span id="seconds">{defaultSeconds}</span>
                  </div>
                  <div className="IranSanse">مانده تا ارسال مجدد کد</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgatenpass;
