import React, { useEffect } from "react";
import { Col, Divider, Form, Input, Modal, Row, Typography } from "antd";
import OurSolution from "../../components/LandingPage/OurSolution";
import BookMedicalBanner from "../../components/LandingPage/BookMedicalBanner";
import ExcitementSection from "../../components/LandingPage/ExcitementSection";
import FAQ from "../../components/LandingPage/FAQ";
import ReaderCorner from "../../components/LandingPage/ReaderCorner";
import Subscribe from "../../components/LandingPage/Subscribe";
import DiscountAndOffers from "../../components/LandingPage/DiscountAndOffers";
import Footer from "../../components/CommonComponents/Footer";
import PopularPackage from "../../components/LandingPage/PopularPackage";
import NavbarTabs from "../../components/CommonComponents/NavbarTabs";
import SearchBarMobile from "../../components/CommonComponents/SearchBarMobile";
import WhatsAppIcon from "../../components/CommonComponents/WhatsAppIcon";
import { useState } from "react";
import axios from "axios";
import { CloseCircleOutlined } from "@ant-design/icons";
import my_location from "../../assets/images/my_location.svg";
import thumbnailTick from "../../assets/images/thumbnailTick.png";
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../Auth/LoginPage";
import SignUpPage from "../Auth/SignUpPage";
import ForgotPage from "../Auth/ForgotPage";
import VerifyEmailPage from "../Auth/VerifyEmailPage";
import paymentSuccesfullModal from "../../components/CommonComponents/paymentSuccesfullModal";
import { useDispatch, useSelector } from "react-redux";
import { getcount } from "../../redux/Cart/cartCountSlice";
import { image73, OfferAppliedgif } from "../../assets/images";

const LandingPage = () => {
  const [openPinCodeModal, setOpenPincodeModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcount());
  }, []);

  const [paymentModal, setPaymentModal] = useState(false);
  const { state } = useLocation();
  useEffect(() => {
    if (state?.data) {
      setPaymentModal(state?.data);
    } else {
      setPaymentModal(false);
    }
  });

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiKey = process.env.REACT_APP_GOOGLE_PLACES_KEY;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&key=${apiKey}`
        );

        const results = response?.data?.results;

        if (results.length > 0) {
          const placeId = results[0].place_id;

          const placeResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
          );
          const placeDetails = placeResponse?.data?.result;
          const locationPlace = localStorage.getItem("locationPlace");
          if (!locationPlace) {
            const placeLocation = localStorage.setItem(
              "locationPlace",
              placeDetails?.vicinity
            );
          }
        }
      });
    } else {
      // console.error("Geolocation is not supported by this browser.");
    }
  }
  getCurrentLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div
      className={`${location.pathname !== "/" && "h-[90vh] overflow-hidden z-10"
        }`}
    >
      <NavbarTabs />
      <div className="border-t border-[#D9D9D9]">
        <Row className="mt-2">
         
        
        </Row>
        <Footer />
        <WhatsAppIcon phoneNumber={9990523922} />
        {location.pathname === "/login" ? (
          <LoginPage />
        ) : location.pathname === "/signup" ? (
          <SignUpPage />
        ) : location.pathname === "/forgot-password" ? (
          <ForgotPage />
        ) : location.pathname === "/verify-email" ? (
          <VerifyEmailPage />
        ) : (
          ""
        )}
      </div>
      <Modal
        open={openPinCodeModal}
        title={
          <Typography className="text-xl font-sans">Enter Location</Typography>
        }
        centered={true}
        footer={[]}
        closeIcon={
          <CloseCircleOutlined
            className="text-black text-lg"
            onClick={() => setOpenPincodeModal(!openPinCodeModal)}
          />
        }
        width={400}
      >
        <>
          <Divider className="mt-0" />
          <Form>
            <Form.Item
              className="mb-[17vh]"
              name="Location"
              rules={[
                {
                  required: true,
                  message: "Location",
                },
              ]}
            >
              <Input
                placeholder="Location"
                className="rounded text-[0.85rem] py-2 font-sans"
                suffix={<img src={my_location} className="h-5 w-5" />}
              />
            </Form.Item>
            <div className="flex justify-end">
              <button
                className="mt-[0.5rem] bg-[#F15E7E] text-[white] py-[0.6rem] px-[2rem] rounded-[4px] font-sans"
                type="submit"
              >
                Continue
              </button>
            </div>
          </Form>
        </>
      </Modal>

      <Modal
        open={paymentModal}
        centered={true}
        closeIcon={<></>}
        footer={null}
        width={window.innerWidth > 650 ? "35%" : "90%"}
      >
        <div className="flex flex-col  items-center justify-center">
          <div></div>
          <div className="flex relative justify-center items-center overflow-hidden w-[100%] sm:h-[15rem] h-[12rem] sm:my-10">
            <img src={OfferAppliedgif} alt="" className="w-[120%]" />
            <img src={thumbnailTick} alt="" className="w-[25%] absolute" />
          </div>
          <Typography className="text-[#595959] sm:text-[1.1rem]">
            Your Payment is done.{" "}
          </Typography>
          <Typography className="text-[#595959] sm:text-[1.1rem] mb-5">
            We’ll confirm your order in next 15-20 mins
          </Typography>
        </div>
        <div className="flex justify-around items-center my-4 ">
          <button
            className="mt-[0.5rem] border border-[#F15E7E] text-[#F15E7E] py-[0.6rem] px-[0.8rem] sm:px-[2rem] rounded-[4px] font-sans"
            onClick={() => {
              setPaymentModal(false);
              navigate("/order-review");
            }}
          >
            Order Review
          </button>
          <button
            className="mt-[0.5rem] bg-[#F15E7E] text-[white] py-[0.6rem] px-[0.8rem] sm:px-[1.4rem] rounded-[4px] font-sans"
            onClick={() => {
              setPaymentModal(false);
              navigate("/");
            }}
          >
            Continue Shopping
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
