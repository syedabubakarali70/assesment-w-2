import React, { Fragment, useCallback, useEffect, useState } from "react";
import "h8k-components";

import { image1, image2, image3, image4 } from "./assets/images";
import { Thumbs, Viewer } from "./components";

const title = "Catalog Viewer";

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(2000);
  const [isChecked, setIsChecked] = useState(false);

  const moveForward = useCallback(() => {
    console.log("moveForward");
    if (activeIndex === 3) {
      setActiveIndex(0);
    } else setActiveIndex(activeIndex => activeIndex + 1);
  }, [activeIndex]);
  const moveBackward = () => {
    if (activeIndex === 0) {
      setActiveIndex(3);
    } else setActiveIndex(activeIndex => activeIndex - 1);
  };

  useEffect(() => {
    let intervalId;
    if (isChecked) intervalId = setInterval(moveForward, slideDuration);
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isChecked, moveForward, slideDuration]);

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={moveBackward}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                setCurrentIndex={setActiveIndex}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={moveForward}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            type="checkbox"
            data-testid="toggle-slide-show-button"
            value={isChecked}
            onChange={e => setIsChecked(checked => !checked)}
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
