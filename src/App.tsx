import { createRef, RefObject, useEffect, useRef, useState } from "react";
import "./App.css";
import img0 from "./assets/img0.png";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";

function App() {
  const [curActive, setCurActive] = useState<number>(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const Images = [
    { id: 0, img: img0 },
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    { id: 4, img: img4 },
  ];

  const refs: RefObject<HTMLDivElement>[] = Images.map(() => createRef<HTMLDivElement>());

  useEffect(() => {
    if (refs[curActive]?.current) {
      refs[curActive].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [curActive]);

  const elements = new Array(5).fill("").map((_, i) => {
    return (
      <div
        key={i}
        ref={refs[i]}
        className='z-0 w-full h-full rounded-lg absolute flex justify-between p-4 bg-cover bg-no-repeat bg-center bg-gradient-to-br from-green-500 to-green-900'
        style={{ marginLeft: i * 75 + "vw", backgroundImage: `url(${Images[i].img})` }}
      ></div>
    );
  });

  const dots = Images.map(({ id }) => (
    <div
      key={id}
      className={`w-4 h-4 rounded-full border-2 border-white cursor-pointer ${
        id === curActive ? "bg-white" : ""
      }`}
      onClick={() => setCurActive(id)}
    ></div>
  ));

  const increaseActive = () => {
    if (curActive + 1 > Images.length - 1) return setCurActive(0);
    setCurActive((prev) => prev + 1);
  };
  const decreaseActive = () => {
    if (curActive - 1 < 0) return setCurActive(Images.length - 1);
    setCurActive((prev) => prev - 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchEndX.current === 0) return;
    const final = touchEndX.current - touchStartX.current;

    touchEndX.current = 0;
    touchStartX.current = 0;
    if (final > 50) decreaseActive();
    if (final < -50) increaseActive();
  };

  return (
    <div
      className='w-screen h-screen flex items-center justify-center bg-neutral-900'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div className='w-3/4 h-3/4 rounded-lg relative  bg-cover bg-no-repeat bg-center overflow-hidden'>
        {elements}
      </div>
      <div className='w-3/4 h-3/4 z-10 absolute flex justify-between md:p-4'>
        <div className='flex items-center'>
          <div
            className='row-span-2 flex items-center justify-center text-4xl text-white select-none cursor-pointer'
            onClick={decreaseActive}
          >
            &#8592;
          </div>
        </div>
        <div className='flex items-end'>
          <div className='flex items-center justify-center gap-3'>{dots}</div>
        </div>
        <div className='flex items-center'>
          <div
            className='row-span-2 flex items-center justify-center text-4xl text-white select-none cursor-pointer'
            onClick={increaseActive}
          >
            &#8594;
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
