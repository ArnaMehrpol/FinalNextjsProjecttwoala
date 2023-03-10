import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { HandleSubmitSocial } from "./social";
import Modal from "../../../components/Modal";
import MarketingInfoHeader from "../../../components/marketing/marketingHeader/MarketingInfoHeader";
import MarketingInfoSide from "../../../components/marketing/layout/MarketingInfoSide";

const cookies = new Cookies();

const social = () => {
  const [url, seturl] = useState("https://dfgsdfgsdfgj32gsdg.mehrpol.com/");

  const [whatsappLink, setWhatsappLink] = useState("");

  const [instagramLink, setInstagramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [telegramId, setTelegramId] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [facebook, setFacebook] = useState("");
  const [aparat, setAparat] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [skype, setSkype] = useState("");
  const [link, setLink] = useState("");
  const [allSocials, setAllSocials] = useState([]);
  const [socialId, setSocialId] = useState(null);

  const [newNetwork, setNewNetwork] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [type, setType] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  //Social Networks

  const handelNewNetwork = (e) => {
    setType(newNetwork);
    console.log(newNetwork);
  };

  //submit
  const handleSubmitSocial = (e) => {
    setLoading(true);
    e.preventDefault();
    setType("");
    axios
      .post(
        url + "api/businesses/" + cookies.get("b-Id") + "/social-networks",
        {
          link: link,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then(function (response) {
        setLoading(false);
        gettingAllSocial();
        toast.success("?????????????? ???? ???????????? ?????? ????");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("?????? ?????????????? ???? ???????? ?????????? ????. ???????? ???????????? ?????? ????????????");
        console.log(error.message);
      });
  };
  //************************** */
  //Getting All Social Network

  const gettingAllSocial = () => {
    setLoading(true);
    axios
      .get(url + "api/businesses/" + cookies.get("b-Id") + "/social-networks", {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then(function (response) {
        setLoading(false);
        setAllSocials(response.data.data);
        console.log("???????? ???? ???????????? ????????");
      })
      .catch(function (error) {
        setLoading(false);
        console.log("?????????? ??????");
        console.log(error.messgae);
      });
  };
  //Delete Social Network
  // ****************************************
  const modalHandler = () => {
    setShowModal(!showModal);
    console.log(socialId);
  };
  // *****************************************
  const deleteSocial = (e) => {
    e.preventDefault();
    axios
      .post(
        url +
          "api/businesses/" +
          cookies.get("b-Id") +
          "/social-networks/" +
          socialId,
        {
          _method: "DELETE",
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then(function (response) {
        modalHandler();
        gettingAllSocial();
        toast.success("???????????? ???????? ?????????????? ???????? ?????? ???? ???????????? ?????? ????");
      })
      .catch(function (err) {
        toast.error("???????????? ?????????? ??????. ???????? ?????????? ?????? ??????????????");
        console.log(err.message);
      });
  };
  //************************** */

  useEffect(() => {
    setToken(cookies.get("token"));
    gettingAllSocial();
  }, []);

  return (
    <div className="mx-auto">
      <div className="business-panel-container">
        <div className="business-panel-cols flex grid-cols-12 bg-slate-100 ">
          <div>
            <MarketingInfoSide />
          </div>
          <div className="business-panel-mainbar w-100 lg:col-span-9 col-span-12 shadow-lg shadow-slate-100 relative">
            <MarketingInfoHeader />

            <section className="max-w-screen-md mx-auto my-14 relative ">
              <div className="social-form bg-white p-5">
                {loading && (
                  <>
                    <span className="ml-2 text-primary">...????????????????</span>
                    <div
                      className="spinner-border text-primary ml-2"
                      role="status"
                    ></div>
                  </>
                )}
                <div className="social-title flex flex-col mb-4">
                  <h5 className="text-base font-semibold">???????? ?????? ?????????????? </h5>
                  <small className="text-slate-500 text-xs mt-1">
                    ???? ?????? ???????? ???????? ???????? ?????? ?????????????? ?????? ???? ???????? ????????.
                  </small>
                </div>
                <div className="social-inputs"></div>
                <label className="text-xs text-primary mb-3">
                  ???????????? ???????? ???????? ?????? ??????????????
                </label>
                <div className="d-flex justify-between">
                  <select
                    onChange={(e) => {
                      setNewNetwork(e.target.value);
                    }}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>???????????? ????????</option>
                    <option value="whatsapp">whatsapp</option>
                    <option value="instagram">instagram</option>
                    <option value="linkedin">linkedin</option>
                    <option value="telegram">telegram</option>
                    <option value="facebook">facebook</option>
                    <option value="aparat">aparat</option>
                    <option value="youtube">youtube</option>
                    <option value="twitter">twitter</option>
                    <option value="skype">skype</option>
                  </select>
                  <button
                    onClick={handelNewNetwork}
                    className="btn btn-primary mr-5"
                    disabled={newNetwork == "" ? true : false}
                  >
                    ??????????
                  </button>
                </div>
                {/* ********************************************************** */}
                {type == "" && ""}
                {type == "whatsapp" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2 ">
                      ????????????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) =>
                          setLink(
                            "https://wa.me/+98" + e.target.value.toString()
                          )
                        }
                        type="number"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder="?????????? ?????????? ?????? ???? ???????? ?????? ???????? ????????"
                      />

                      <div
                        className="input-group-text input-group-text-whatsapp bg-slate-50 text-xs text-slate-400 flex relative"
                        id="basic-addon3"
                      >
                        <div className="absolute right-[-36px]">???? +</div>
                        <span className="text-slate-500">whatsapp</span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {type == "instagram" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2">
                      ????????????????????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) =>
                          setLink("https://www.instagram.com/" + e.target.value)
                        }
                        type="text"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder="?????? ???????????? ???????????????????? ?????? ???? ???????? ??????????????"
                      />

                      <div
                        className="input-group-text bg-slate-50 text-xs text-slate-400 flex relative"
                        id="basic-addon3"
                      >
                        <span className="text-slate-500">instagram</span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {type == "linkedin" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2">
                      ????????????????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder="???????? ?????????????? Linkedin ?????? ???? ???????? ??????????????"
                      />
                      <div
                        className="input-group-text bg-slate-50 text-xs text-slate-400  flex relative"
                        id="basic-addon3"
                      >
                        <span className="text-slate-500 mr-[22px]">
                          linkdin
                        </span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {type == "telegram" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2">
                      ????????????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder="ID ???????????? ?????? ???? ???????? ????????????"
                      />

                      <div
                        className="input-group-text bg-slate-50 text-xs text-slate-400  flex relative"
                        id="basic-addon3"
                      >
                        <span className="text-slate-500 mr-[8px]">
                          telegram
                        </span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {type == "facebook" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2">
                      ?????? ??????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder=" ???????? ?????? ?????? ?????? ?????? ???? ???????? ????????????"
                      />

                      <div
                        className="input-group-text bg-slate-50 text-xs text-slate-400 flex relative"
                        id="basic-addon3"
                      >
                        <span className="text-slate-500">facebook</span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {type == "aparat" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2">
                      ????????????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder="?????? ?????????? ?????????? ?????? ???? ???????? ??????????????"
                      />

                      <div
                        className="input-group-text bg-slate-50 text-xs text-slate-400 flex relative"
                        id="basic-addon3"
                      >
                        <span className="text-slate-500">aparat</span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {type == "youtube" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2">
                      ????????????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder="???????? ?????????? ???????????? ?????? ???? ???????? ????????????"
                      />

                      <div
                        className="input-group-text bg-slate-50 text-xs text-slate-400  flex relative"
                        id="basic-addon3"
                      >
                        <span className="text-slate-500 mr-[8px]">youtybe</span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {type == "twitter" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2">
                      ????????????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder="???????? ???????????? ?????? ???? ???????? ????????????"
                      />

                      <div
                        className="input-group-text bg-slate-50 text-xs text-slate-400  flex relative"
                        id="basic-addon3"
                      >
                        <span className="text-slate-500 mr-[8px]">twitter</span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {type == "skype" && (
                  <div className="social-input mt-3">
                    <label className="text-xs text-slate-500 mb-2">
                      ????????????
                    </label>
                    <div className="social-input-group input-group mb-3 placeholder-slate-300">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        placeholder="???????? ???????????? ?????? ???? ???????? ????????????"
                      />

                      <div
                        className="input-group-text bg-slate-50 text-xs text-slate-400  flex relative"
                        id="basic-addon3"
                      >
                        <span className="text-slate-500 mr-[8px]">skype</span>

                        {/* <button className="text-danger me-2 fs-6">
                          <i class="bi bi-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {/* *********************************************************************** */}
                <div className="save-btn w-full h-full border-t-2 border-dotted border-slate-100 flex justify-end items-center">
                  <button
                    onClick={handleSubmitSocial}
                    type="submit"
                    className="px-4 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 mt-3"
                  >
                    ??????
                  </button>
                </div>

                {/* Delete Modal  */}
                {showModal ? (
                  <Modal delete={deleteSocial} modalHandler={modalHandler} />
                ) : null}
                {/* ********************************************************** */}
                {allSocials &&
                  allSocials.map((social) => {
                    return (
                      <>
                        <div className="social-input mt-3">
                          <label className="text-xs text-slate-500 mb-2 ">
                            {social.type}
                          </label>
                          <div className="social-input-group input-group mb-3 placeholder-slate-300">
                            <input
                              type="text"
                              className="form-control"
                              id="basic-url"
                              aria-describedby="basic-addon3"
                              value={social.link}
                            />

                            <div
                              className="input-group-text input-group-text-whatsapp bg-slate-50 text-xs text-slate-400 flex relative"
                              id="basic-addon3"
                            >
                              <span className="text-slate-500">
                                {social.type}
                              </span>

                              <button
                                onClick={(e) => {
                                  setSocialId(social.id);
                                  console.log(social.id);
                                  modalHandler();
                                }}
                                className="text-danger me-2 fs-6"
                              >
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default social;
