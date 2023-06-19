import { useState, useEffect } from "react";

const AnalogClock = () => {

    const [date, setDate] = useState(new Date());
    const [minutes, setMin] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isInputInActive, setInput] = useState(true);
    useEffect(() => {
        if(isInputInActive){
            const timerId = setInterval(() => {
            setDate(new Date());
            }, 1000);
        
            return () => clearInterval(timerId);
        } else{
            const timerId = setInterval(()=> {
                let updatedSecond = parseInt(seconds)+1;
                if(updatedSecond%60 == 0){
                    let updatedMinute = parseInt(minutes)+1;
                    updatedSecond = 0;
                    setMin(updatedMinute);
                }
                setSeconds(updatedSecond);
            },1000);
            return () => {
                clearInterval(timerId);
            };
        }
      }, [minutes, seconds]);

    const handleMinuteChange=(event)=>{
        setMin(event.target.value);
    };

    const handleSecondChange=(event)=>{
        setSeconds(event.target.value);
    }

    let min, sec;
    if(!isInputInActive){
        min = minutes*6+180;
        sec = seconds*6+180;
    } else {
        min = date.getMinutes()*6+180;
        sec = date.getSeconds()*6+180;
    }
    return (
    <div>
        <div className="clock-container-analog">
            <div className="clock-circle">
                    <div className="min-hand" style={{ transform: 'rotate('+min+'deg)'}}></div>
                    <div className="sec-hand" style={{ transform: 'rotate('+sec+'deg)'}}></div>
            </div>
        </div>

        <div className="display-box">
            {isInputInActive ? <div className="display-field">
                 {date.getMinutes()+':'+date.getSeconds()}
            </div> : <div>
                   Minutes <input type="text" value={minutes} onChange={handleMinuteChange}/> : <input type="text" value={seconds} onChange={handleSecondChange}/> Seconds
                </div>}

            {isInputInActive && <button onClick={()=> setInput(false)}>Edit Time</button>}
        </div>
    </div>
    );
}

export default AnalogClock;