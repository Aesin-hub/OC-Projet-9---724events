import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = (data?.focus ?? [])
    .slice()
    .sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date));
  const nextCard = () => {
    setIndex((i) => (i < byDateDesc.length - 1 ? i + 1 : 0));
  };
  useEffect(() => {
    if (!byDateDesc.length) return undefined;
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [byDateDesc.length, index]);   

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={event.id ?? `${event.title}-${event.date}-${idx}`}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt={event.title} />

            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((evtDot, radioIdx) => (
                <input
                  key={`dot-${evtDot.id ?? `${evtDot.title}-${evtDot.date}`}`}  
                  type="radio"
                  name="slider-dots"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)} 
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
