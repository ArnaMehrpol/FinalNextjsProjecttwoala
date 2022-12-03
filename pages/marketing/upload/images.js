import Link from "next/link";
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";
import MarketingUploadSide from "../../../components/marketing/layout/MarketingUploadSide";
import MarketingInfoHeader from "../../../components/marketing/marketingHeader/MarketingInfoHeader";
import Modal from "../../../components/Modal";
import ModalSoftDelete from "../../../components/ModalSoftDelete";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import MainRoot from "../../../components/marketing/fileManager/components/MainRoot";

const images = () => {
  const [url, seturl] = useState("https://dfgsdfgsdfgj32gsdg.mehrpol.com/");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [rootFilesAddress, setrootFilesAddress] = useState();
  const [chooseFiles, setChooseFiles] = useState([]);
  const [slideId, setSlideId] = useState();
  const [Type, setType] = useState("working_picture");
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeLeteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allSlide, setAllSlide] = useState([]);
  const [dbSlideId, setDbSlideId] = useState(null);
  const [softDeleteModal, setSoftDeleteModal] = useState(false);

  const cookies = new Cookies();
  const closeMainRoot = () => {
    setShow(false);
    setShowDelete(false);
  };

  const InsertIntoPictures = async (e) => {
    e.preventDefault();
    setLoading(true);
    for (var i = 0; i < chooseFiles.length; i++) {
      setCounter(chooseFiles.length);
      axios
        .post(
          url + "api/businesses/" + cookies.get("b-Id") + "/documents",
          {
            type: "working_picture",
            filemanager_item_id: chooseFiles[i].id,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.get("token")}`,
            },
          }
        )
        .then(function (response) {
          if ([i] >= counter) {
            gettingSlides();
            softDeleteModalHandler2();
            toast.success(`تصویر با موفقیت ذخیره شد`);
            setLoading(false);
          } else {
            console.log("عملیات با مشکل مواجه شد");
            console.log([i]);
            console.log(chooseFiles.length);
            setLoading(false);
          }
        })
        .catch(function (error) {
          toast.error("عملیات انجام نشد. لطفا دوباره سعی نمایید");
          setError(true);
          console.log(error.message);
          setLoading(false);
        });
    }
  };

  // const slideIdSetter = () => {
  //   slideId(file.id);
  // };
  const gettingSlides = () => {
    axios
      .get(
        url +
          "api/businesses/" +
          cookies.get("b-Id") +
          "/documents?type=working_picture",

        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then(function (response) {
        setAllSlide(response.data.data);
        console.log(response.status);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  console.log(allSlide.full_link);

  const rootFilesAddressFunc = (rootFilesAddress) => {
    setrootFilesAddress(rootFilesAddress);
  };

  const chooseFileFromMainRootFunc = (chooseFile) => {
    setChooseFiles(chooseFile);
  };
  useEffect(() => {
    gettingSlides();
  }, []);
  const modalHandler = () => {
    setShowModal(!showModal);
    setDeLeteLoading(false);
  };
  const DeleteHandler = () => {
    console.log(slideId);
    setDeLeteLoading(true);
    axios
      .post(
        url +
          "api/businesses/" +
          cookies.get("b-Id") +
          "/documents/" +
          dbSlideId,
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
        if (response) {
          toast.success("تصویر مورد نظر با موفقیت پاک شد");
          setDeLeteLoading(false);
          gettingSlides();
          setShowModal(false);
        } else {
          toast.error("عملیات انجام نشد. مجددا سعی نمایید");
          setDeLeteLoading(false);
        }
      })
      .catch(function (error) {
        toast.error("متاسفانه سرور جواب نمی دهد");
        console.log(error.message);
        setDeLeteLoading(false);
      });
  };
  const showSoftDeleteModal = () => {
    setSoftDeleteModal(!softDeleteModal);
  };
  const softDeleteModalHandler = () => {
    setChooseFiles(null);
    setSoftDeleteModal(!softDeleteModal);
  };
  const softDeleteModalHandler2 = () => {
    setChooseFiles(null);
  };

  return (
    <div>
      {show && (
        <MainRoot
          closeMainRoot={closeMainRoot}
          rootFilesAddress={rootFilesAddressFunc}
          chooseFileFromMainRoot={chooseFileFromMainRootFunc}
        />
      )}

      {showModal && (
        <Modal
          modalHandler={modalHandler}
          delete={DeleteHandler}
          deleteLoading={deleteLoading}
        />
      )}
      {softDeleteModal && (
        <ModalSoftDelete
          modalHandler={showSoftDeleteModal}
          delete={softDeleteModalHandler}
        />
      )}
      <div className="business-panel-container">
        <div className="business-panel-cols flex grid-cols-12 bg-slate-100 ">
          <div>
            <MarketingUploadSide />
          </div>
          <div className="business-panel-mainbar w-100 lg:col-span-9 col-span-12 shadow-lg shadow-slate-100 relative overflow-hidden">
            <MarketingInfoHeader />
            <section className="images-container max-w-screen-lg mx-auto flex justify-center items-center relative z-0 mt-[85px]">
              <div className=" bg-white overflow-hidden rounded-lg shadow-md px-5">
                <div className="images-title flex flex-col my-4">
                  <h5 className="text-base font-semibold">تصاویر کاری</h5>
                  <small className="text-slate-600 text-xs mt-0.5">
                    تصاویر جهت نمایش در صفحه کسب و کار
                  </small>
                </div>
                <div className="images-flex flex flex-col">
                  <div className="btn-add inline-flex">
                    <button
                      onClick={() => {
                        setShow(true);
                      }}
                      className="fs-5 text-slate-400 mr-2"
                    >
                      افزودن تصویر
                      <i className="bi bi-cloud-arrow-up fs-5 mr-2"></i>
                    </button>
                  </div>
                  {/* ************************************************************** */}
                  <div className=" slideContainer items-center">
                    {chooseFiles &&
                      chooseFiles.map((file) => (
                        <>
                          <div
                            id="myElement"
                            key={file.id}
                            className="m-1 relative"
                          >
                            <div
                              onClick={showSoftDeleteModal}
                              className="absolute mr-2 mt-2"
                            >
                              <i class="bi bi-x-circle text-danger"></i>
                            </div>
                            <div className="mySlideCard overflow-hidden silideScale ">
                              <img
                                onChange={(e) => {
                                  setSlideId(file.id);
                                }}
                                src={`${rootFilesAddress}/${file.name}`}
                                className="rounded-md  "
                              />
                            </div>
                          </div>
                        </>
                      ))}

                    {allSlide &&
                      allSlide.map((slide) => (
                        <div key={slide.id} className="m-1 relative">
                          <div
                            onClick={() => {
                              setDbSlideId(slide.id);
                              modalHandler();
                            }}
                            className="absolute mr-2 mt-2 myPointer"
                          >
                            <i className="bi bi-trash text-danger"></i>
                          </div>
                          <div className="mySlideCard overflow-hidden silideScale ">
                            <img
                              onChange={(e) => {
                                setDbSlideId(slide.id);
                              }}
                              src={slide.full_link}
                              className="rounded-md  "
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* Ta Inja */}
                  <div className="images-text flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-slate-400 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>

                    <p className="text-slate-600 text-xs my-4">
                      برای نمایش بهتر تصاویر توصیه می شود سایز تصاویر ۴۸۰ در ۷۰۰
                      پیکسل و حداکثر حجم ۳۰۰ کیلو بایت باشد.{" "}
                    </p>
                  </div>
                </div>
                <div className="next-btn w-full h-full border-t-2 border-dotted border-slate-100 flex justify-end items-center">
                  {loading && (
                    <>
                      <span className="ml-2 text-primary">...بارگذاری</span>
                      <div
                        className="spinner-border text-primary ml-2"
                        role="status"
                      ></div>
                    </>
                  )}
                  <button
                    onClick={InsertIntoPictures}
                    className="text-white bg-blue-600 btn btn-primary  hover:bg-blue-700 rounded-md IranSanse  font-bold ml-2"
                    type="submit"
                  >
                    ثبت
                  </button>
                  <button className="text-white bg-blue-600 btn btn-primary  hover:bg-blue-700 rounded-md IranSanse  font-bold ml-2">
                    مرحله بعد
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default images;
