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
    "https://i.ibb.co/J3dPFWR/img1.jpg",
    "https://i.ibb.co/BtPzYQm/imgs2.jpg",
    "https://i.ibb.co/yfN8BnR/imgs3.jpg",
    "https://i.ibb.co/H4m9Kd0/imgs4.jpg",
    "https://i.ibb.co/44431Mm/imgs5.jpg",
    "https://i.ibb.co/8MJtLss/imgs6.jpg",
    "https://i.ibb.co/wQ6rR1B/img7.jpg",

    "https://i.ibb.co/Gn0rLD5/7fd81223-eb83-4854-9841-64b1db002b19.jpg",
    "https://i.ibb.co/t3xqtB7/34aa1ad8-cef3-4af5-b605-43965671139a.jpg",
    "https://i.ibb.co/cwhYq4b/40d299da-c3a5-41d6-a036-fdbb36c31a5d.jpg",
    // "https://i.ibb.co/D45JNwf/94f30a4f-212f-4bc1-b906-267b5ba253c5.jpg",
    // "https://i.ibb.co/ngkrK22/9153874e-4006-4240-a243-5abe1a5d2974.jpg",
    // "https://i.ibb.co/589mYQH/cb8caf15-d811-4946-91af-0d3233af4f41.jpg",
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
              backgroundImage: "url(https://i.ibb.co/J3dPFWR/img1.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
                <h1>Happy birthday, eternal youth!</h1>
              </div>
              <div className="des"></div>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/BtPzYQm/imgs2.jpg)",
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
              backgroundImage: "url(https://i.ibb.co/yfN8BnR/imgs3.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
                <h1>it's your birthday, Happy birthday !!</h1>
              </div>
              <div className="des"></div>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/H4m9Kd0/imgs4.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
                <h1>Another year, more awsome!!</h1>
              </div>
              <div className="des"></div>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/44431Mm/imgs5.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
                <h1>Happy birthday Christy!!</h1>
              </div>
              <div className="des"></div>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: "url(https://i.ibb.co/8MJtLss/imgs6.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
                <h1>New Level unlock</h1>
              </div>
              <div className="name">
                <h1>ed</h1>
              </div>

              <div className="des"></div>
            </div>
          </div>
          {/* ///////////////////////////////////////// */}
          <div
            className="item"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/Gn0rLD5/7fd81223-eb83-4854-9841-64b1db002b19.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
                <h1>Fine wine vibes cakes. Cheers!!!</h1>
              </div>
              <div className="des"></div>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/t3xqtB7/34aa1ad8-cef3-4af5-b605-43965671139a.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
                <h1>Cheers to another lap!!!</h1>
              </div>
              <div className="des"></div>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/cwhYq4b/40d299da-c3a5-41d6-a036-fdbb36c31a5d.jpg)",
            }}
          >
            <div className="content">
              <div className="name">
                <h1>Whose baby??</h1>
              </div>
              <div className="des"></div>
            </div>
          </div>
        </div>

        <div className="button">
          <button
            className={`prev ${isPrevButtonClicked ? "pop" : ""}`}
            onClick={handlePrevClick}
          >
            <i className="fas fa-arrow-left"></i>
          </button>

          <button
            className={`next ${isNextButtonClicked ? "pop" : ""}`}
            onClick={handleNextClick}
          >
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
