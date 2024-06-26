import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
// import useWindowSize from "@rooks/use-window-size";
// import soundfile from "./alert.mp3";
import { useAudio } from "../contexts/AudioContext";

import { useThrowRandomConfetti } from "@guanghechen/react-confetti";

const DynamicConfettiExplosion = dynamic(
  () => import("react-confetti-explosion"),
  {
    ssr: false,
  },
);

import { AnimatePresence, motion } from "framer-motion";
export default function Home() {
  const [isPrevButtonClicked, setPrevButtonClicked] = useState(false);
  const [isNextButtonClicked, setNextButtonClicked] = useState(false);
  const throwConfetti = useThrowRandomConfetti();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (tick > 0) void throwConfetti();
  }, [tick]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isExploding, setIsExploding] = useState(true);

  useEffect(() => {
    let intervalId;

    // Start the explosion initially

    // Set interval to trigger explosion every 3 seconds (adjust as needed)
    intervalId = setInterval(() => {
      setIsExploding(false);

      console.log(1, isExploding);
    }, 3000); // Adjust the interval as needed (e.g., every 3 seconds)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [isExploding]);

  const slideRef = useRef(null);
  const audioRef = useRef(null);

  const handleNextClick = () => {
    audioRef.current.play();
    setNextButtonClicked(!isNextButtonClicked);

    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % items.length);
    setIsExploding(true);
    setTick((c) => c + 1);
  };

  const handlePrevClick = () => {
    audioRef.current.play();
    setPrevButtonClicked(!isPrevButtonClicked);

    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length,
    );

    setIsExploding(true);
    setTick((c) => c + 1);
  };

  const generateConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 700); // Adjust the timeout to match the animation duration
  };

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window) {
        setContainerWidth(window.innerWidth);
        setContainerHeight(window.innerHeight);
      }
    };

    handleResize(); // Initial set based on window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://i.ibb.co/S7H3jd6/IMG-8880-Original.jpg",
    "https://i.ibb.co/XJZYGNN/IMG-7196-Original.jpg",
    
    "https://i.ibb.co/9GQtX1r/IMG-5144-Original.jpg",
    "https://i.ibb.co/HG47wFw/IMG-4933-Original.jpg",
    "https://i.ibb.co/ZhC4t4c/IMG-3738-Original.jpg",
    "https://i.ibb.co/Zxz5jYS/B9-EE9-F7-B-E889-4757-8-B64-E10-EDB5-FF9-A5-Original.jpg",
    "https://i.ibb.co/m9YGtbg/310-E5382-E87-D-4-A28-A365-2504-D7-D04-C06-Original.jpg",
    "https://i.ibb.co/J3QZGNp/IMG-2011-Original.jpg",
    "https://i.ibb.co/KxgVJs6/IMG-0093-Original.jpg",

  ];
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
      setContainerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [audioSrc, setAudioSrc] = useState("./birthday.mp3");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setAudioSrc("./birthday.mp3");
  }, []);

  const stopAudio = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <DynamicConfettiExplosion />
      <DynamicConfettiExplosion />
      <DynamicConfettiExplosion />
      <DynamicConfettiExplosion />
      <DynamicConfettiExplosion />
      <DynamicConfettiExplosion />

      <Head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>


      <audio 
        ref={audioRef}
        src={"/birthday.mp3"} loop={true} />
      <div
        className="container"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
        }}
      >
        <div className="slide" ref={slideRef}>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/S7H3jd6/IMG-8880-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name"><h1>Happy birthday, eternal youth!</h1></div>
              <div className="des">

              </div>

            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/XJZYGNN/IMG-7196-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
              <h1>Many Happy Returns</h1>

              </div>

            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/9GQtX1r/IMG-5144-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name"><h1>Happy birthday Ara!!!</h1></div>
              <div className="des">

              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/HG47wFw/IMG-4933-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name"><h1>Happy Birthday to me!</h1></div>
              <div className="des"></div>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/ZhC4t4c/IMG-3738-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name"><h1>I celebrate the incredible </h1></div>
              <div className="name">
              <h1> person I am</h1>
              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/Zxz5jYS/B9-EE9-F7-B-E889-4757-8-B64-E10-EDB5-FF9-A5-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name"><h1>Anything you want, </h1></div>

              <div className="name">
              <h1>you deserve it</h1>
              </div>
            </div>
          </div>
{/* ///////////////////////////////////////// */}
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/m9YGtbg/310-E5382-E87-D-4-A28-A365-2504-D7-D04-C06-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name"><h1>Fine wine vibes cakes. Cheers!!!</h1></div>
              <div className="des">

              </div>
            </div>
          </div>


          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/J3QZGNp/IMG-2011-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name"><h1>Many Happy Returns</h1></div>
              <div className="name">

              </div>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/KxgVJs6/IMG-0093-Original.jpg)",
            }}
          >
            <div className="content">
              <div className="name"><h1>Another year older, </h1></div>
              <div className="name">
              <h1>another reason to celebrate!</h1>
              </div>
            </div>

          </div>


        </div>




        <div className="button">
      <button className={`prev ${isPrevButtonClicked ? 'pop' : ''}`} onClick={handlePrevClick}>
        <i className="fas fa-arrow-left"></i>
      </button>

      <button className={`next ${isNextButtonClicked ? 'pop' : ''}`} onClick={handleNextClick}>
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            background: #eaeaea;
            overflow: hidden;
          }

          .container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }

          .slide {
            display: flex;
            transition: transform 0.5s ease-in-out;
          }

          .item {
            flex: 0 0 100%;
            height: 100vh;
            background-size: cover;
          }

          .button button {
            display: block;
          }

          .name h1 {
            font-size: 24px;
            font-weight: bold;
            background: linear-gradient(
              to right,
              violet,
              indigo,
              blue,
              green,
              yellow,
              orange,
              red
            );
            -webkit-background-clip: text;
            color: transparent;
          }
          .button button {
            width: 40px;
            height: 35px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            margin: 0 5px;
            border: 1px solid #000;
            transition: 0.3s;
          }

          .button button:hover {
            background: #ababab;
            color: #fff;
          }
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #eaeaea;
          overflow: hidden;
        }

        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1000px;
          height: 600px;
          background: #f5f5f5;
          box-shadow: 0 30px 50px #dbdbdb;
          max-width: 900px;
        }

        .container .slide .item {
          width: 200px;
          height: 300px;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          border-radius: 20px;
          box-shadow: 0 30px 50px #505050;
          background-position: 50% 50%;
          background-size: cover;
          display: inline-block;
          transition: 0.5s;
        }
        .container .slide .item:hover {
          transform: scale(1.1);
        }

        .slide .item:nth-child(1),
        .slide .item:nth-child(2) {
          top: 0;
          left: 0;
          transform: translate(0, 0);
          border-radius: 0;
          width: 100%;
          height: 100%;
        }

        .slide .item:nth-child(3) {
          left: 50%;
        }
        .slide .item:nth-child(4) {
          left: calc(50% + 220px);
        }
        .slide .item:nth-child(5) {
          left: calc(50% + 440px);
        }

        /* here n = 0, 1, 2, 3,... */
        .slide .item:nth-child(n + 6) {
          left: calc(50% + 660px);
          opacity: 0;
        }

        .item .content {
          position: absolute;
          top: 50%;
          left: 100px;
          width: 300px;
          text-align: left;
          color: #eee;
          transform: translate(0, -50%);
          font-family: system-ui;
          display: none;
        }

        .slide .item:nth-child(2) .content {
          display: block;
        }

        .content .name {
          font-size: 40px;
          text-transform: uppercase;
          font-weight: bold;
          opacity: 0;
          animation: animate 1s ease-in-out 1 forwards;
        }

        .content .des {
          margin-top: 10px;
          margin-bottom: 20px;
          opacity: 0;
          animation: animate 1s ease-in-out 0.3s 1 forwards;
        }

        .content button {
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          opacity: 0;
          animation: animate 1s ease-in-out 0.6s 1 forwards;
        }

        @keyframes animate {
          from {
            opacity: 0;
            transform: translate(0, 100px);
            filter: blur(33px);
          }

          to {
            opacity: 1;
            transform: translate(0);
            filter: blur(0);
          }
        }

        .button {
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: 20px;
        }

        .button button {
          width: 40px;
          height: 35px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          margin: 0 5px;
          border: 1px solid #000;
          transition: 0.3s;
        }

        .button button:hover {
          background: #ababab;
          color: #fff;
        }
        //
        @media (min-width: 300px) {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            background: #eaeaea;
            overflow: hidden;
          }
          .name h1 {
            font-size: 40px;
            font-weight: bold;
            background: linear-gradient(
              to right,
              violet,
              indigo,
              blue,
              green,
              yellow,
              orange,
              red
            );
            -webkit-background-clip: text;
            color: transparent;
          }
          .container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }

          .slide {
            display: flex;
            transition: transform 0.5s ease-in-out;
          }

          .item {
            flex: 0 0 100%;
            height: 100vh;
            background-size: cover;
          }

          .button button {
            display: block;
          }

          .button button {
            width: 18px;
            height: 15px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            margin: 0 25px;
            border: 1px solid #000;
            transition: 0.3s;
          }

          .button button:hover {
            background: #ababab;
            color: #fff;
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #eaeaea;
          overflow: hidden;
        }

        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 21rem; /* Updated max-width to 21rem */
          height: 600px;
          background: #f5f5f5;
          box-shadow: 0 30px 50px #dbdbdb;
        }

        .button {
          display: flex;
        }

        .prev,
        .next {
          background-color: #ff66b2; /* Pink color */
          color: #fff;
          font-size: 16px;
          padding: 10px 20px;
          border: 1px solid #ff66b2 !important; /* Remove border */
          border-radius: 5px;
          cursor: pointer;
          transition:
            transform 0.2s ease-in-out,
            background-color 0.2s ease-in-out;
          outline: none; /* Remove outline on click */
        }

        .prev:hover,
        .next:hover {
          background-color: #ff3385 !important; /* Lighter pink on hover */
        }

        .prev.pop,
        .next.pop {
          transform: scale(1.2);
        }

        .container .slide .item {
          width: 200px;
          height: 300px;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          border-radius: 20px;
          box-shadow: 0 10px 30px #333333;
          background-position: 50% 50%;
          background-size: cover;
          display: inline-block;
          transition: 0.5s;
        }
        .container .slide .item:hover {
          transform: scale(1.1);
        }

        .slide .item:nth-child(1),
        .slide .item:nth-child(2) {
          top: 0;
          left: 5%;
          transform: translate(0, 0);
          border-radius: 0;
          width: 100%;
          height: 100%;
        }

        .slide .item:nth-child(3) {
          left: 100%;
        }
        .slide .item:nth-child(4) {
          left: calc(50% + 220px);
        }
        .slide .item:nth-child(5) {
          left: calc(50% + 440px);
        }

        /* here n = 0, 1, 2, 3,... */
        .slide .item:nth-child(n + 6) {
          left: calc(50% + 660px);
          opacity: 0;
        }

        .item .content {
          position: absolute;
          top: 50%;
          left: 100px;
          width: 200px;
          text-align: left;
          color: #eee;
          transform: translate(0, -50%);
          font-family: system-ui;
          display: none;
        }

        .slide .item:nth-child(2) .content {
          display: block;
        }

        .content .name {
          font-size: 40px;
          text-transform: uppercase;
          font-weight: bold;
          opacity: 0;
          animation: animate 1s ease-in-out 1 forwards;
        }

        .content .des {
          margin-top: 10px;
          margin-bottom: 20px;
          opacity: 0;
          animation: animate 1s ease-in-out 0.3s 1 forwards;
        }

        .content button {
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          opacity: 0;
          animation: animate 1s ease-in-out 0.6s 1 forwards;
        }

        @keyframes animate {
          from {
            opacity: 0;
            transform: translate(0, 100px);
            filter: blur(33px);
          }

          to {
            opacity: 1;
            transform: translate(0);
            filter: blur(0);
          }
        }

        .field {
          display: flex;
          width: 330px;
          justify-content: space-around;
        }

        .sns-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70px;
          width: 70px;
          border-radius: 50%;
          border: none;
          transition-duration: 0.5s;
          transform: rotateX(45deg);
          box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          &--twitter {
            background-color: #1da1f2;
          }
          &--facebook {
            background-color: #3b5998;
          }
          &--instagram {
            background-color: #dd2b75;
          }
          &:hover {
            transform: scale(1.2);
            box-shadow: none;
          }
          &__icon {
            font-size: 33px;
            letter-spacing: 0.1em;
            color: #fff;
          }
        }
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: absolute;
          left: 50%;
          bottom: 40px;
          transform: translateX(-50%);
        }

        .button button {
          width: 40px;
          height: 35px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          margin: 0 5px;
          border: 1px solid #000;
          transition: 0.3s;
        }

        .button button:hover {
          background: #ababab;
          color: #fff;
        }
      `}</style>
    </>
  );
}
