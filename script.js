const { useState, useEffect } = React;
function App() {

    const [isActive, setIsActive] = useState(false);
    const [seshLength, setSeshLength] = useState(25);
    const [brkLength, setBrkLength] = useState(5);
    const [isBreak, setisbreak] = useState(false)
    const [time, setTime] = useState({
        second: '00',
        minute: seshLength,
        counter: seshLength * 60
    });
    const audio = React.useRef()
    audio.current = document.getElementById('beep')

    function seshInc() {
        if(seshLength<60){
        setSeshLength(seshLength+1);
        setTime(({
            second: '00',
            minute: seshLength+1,
            counter: (seshLength+1) * 60
        }))
    }
    }
    function seshDec() {
        if(seshLength>=2){
        setSeshLength(seshLength-1);
        setTime(({
            second: '00',
            minute: String(seshLength-1).length===1?`0${seshLength-1}`:(seshLength-1),
            counter: (seshLength-1) * 60
        }))
    }
    }
    function brkInc() {
        if(brkLength<60)
        setBrkLength(brkLength+1)
    }
    function brkdec() {
        if(brkLength>=2) setBrkLength(brkLength-1)
    }

    useEffect(() => {
        let myVar;
        if(isActive) {
            myVar = setInterval(() => {
                
                if(time.counter >= 1) {
                    const secondCounter = (time.counter-1) % 60;
                    const minuteCounter = Math.floor((time.counter-1) / 60);
            
                    const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
                    const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;

                    setTime(prevState=>({
                        second: computedSecond,
                        minute: computedMinute,
                        counter: prevState.counter-1
                    }))
                }
                else if(isBreak === true && time.counter < 1){
                    if (audio.current == null) {
                        audio.current = document.getElementById('beep')
                      }
                    audio.current.currentTime = 0;
                    var playPromise = audio.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                          // Automatic playback started!
                          // Show playing UI.
                          audio.current.play();
                        })
                        .catch(error => {
                          // Auto-play was prevented
                          // Show paused UI.
                          console.log("sd")
                        });
                      }
                    
                    setisbreak(false)
                    setTime(({
                        second: '00',
                        minute: String(seshLength).length === 1? `0${seshLength}`:seshLength,
                        counter: seshLength * 60
                    }))
                }
                else{
                    if (audio.current == null) {
                        audio.current = document.getElementById('beep')
                    }
                    audio.current.currentTime = 0;
                    var playPromise = audio.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                          // Automatic playback started!
                          // Show playing UI.
                          audio.current.play();
                        })
                        .catch(error => {
                          // Auto-play was prevented
                          // Show paused UI.
                          console.log("sd")
                        });
                      }
                    
                    setisbreak(true)
                    setTime(({
                        second: '00',
                        minute: `0${brkLength}`,
                        counter: brkLength*60
                    }))
                }
            }, 1000);
        }
        return () => clearInterval(myVar);
    },[time.counter, isActive]);

    function stopTimer() {
        setIsActive(false);
        setTime({
            second: '00',
            minute: '25',
            counter: 25*60
        })
        setSeshLength(25);
        setBrkLength(5);
        setisbreak(false);
        if (audio.current == null) {
            audio.current = document.getElementById('beep')
        }
        
        audio.current.currentTime = 0;
        audio.current.pause() 
    }

    return(
        <div className="App">
            <div id="break-label">Break Length</div>
            <button onClick={()=>brkdec()} id="break-decrement">-</button>
            <button onClick={()=>brkInc()} id="break-increment">+</button>
            <div id="break-length">{brkLength}</div>
            <div id="session-label">Session Length</div>
            <button onClick={()=>seshInc()} id="session-increment">+</button>
            <button  onClick={()=>seshDec()} id="session-decrement">-</button>
            <div id="session-length">{seshLength}</div>

            <div id="timer-label">{isBreak?'Break':'Session'}</div>

            <div id="time-left">{time.minute}:{time.second}</div>
            
            <button onClick={()=>setIsActive(!isActive)} id="start_stop">{isActive?"stop":"start"}</button>
            <button onClick={() => stopTimer()} id="reset">Reset</button>

            <audio
        preload="none"
        id="beep"
        src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3'
        />
        </div>
        
    );
}
ReactDOM.render(<App/>, document.getElementById('root'))