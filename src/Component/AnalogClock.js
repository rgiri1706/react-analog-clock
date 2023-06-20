import { useEffect, useRef } from "react";
import { useState } from "react";

const AnalogClock = () => {
    const [date, setDate] = useState(new Date());
    const dragItem = useRef();
    useEffect(()=>{
        const timerId = setInterval(() => {
             setDate(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    },[]);

    const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0});
    const [rotation, setRotation] = useState(0);

    const onDragStartHandler = (e) => {
        const { x, y } = deltaPosition;
        let rect = e.target.getBoundingClientRect();

        setDeltaPosition({
            x: x + rect.left,
            y: y + rect.bottom,
        });

        setRotation(rotation + 6);
    };

    var minute = date.getMinutes()*6;
    const seconds = date.getSeconds()*6; 
    return (
        <div>
            <div style={{ textAlign: 'center', width: 'fitContent', border: '1px solid black', borderRadius: '10px', background: 'bisque'}}>
                {date.getMinutes()}:{date.getSeconds()}
            </div>
            {rotation}
            {minute}
            <div className="clock-box">
                <div className="inner-clock-box">
                    <div className="min-hand" ref={dragItem} draggable="true" onDragStart={onDragStartHandler} style={{ transform: 'rotate('+rotation+'deg)'}}>
                    </div>
                    <div  className="sec-hand" style={{ transform: 'rotate('+seconds+'deg)'}}></div>
                </div>
            </div>
        </div>
    );
}

export default AnalogClock;