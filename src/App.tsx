import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {CalendarBody, Wrapper} from "./components/style";
import Title from "./components/Title";
import Header from "./components/header/Header";
import Week from "./components/week/Week";
import Footer from "./components/footer/Footer";
import Body from "./components/body/Body";

function App() {

    const [key, setKey] = useState(false)
    const [colorTitle, setColorTitle] = useState('')
    const [fillSvg, setFillSvg] = useState('#ff3131')
    const [background, setBackground] = useState('#ffff')
    const changeColor = () => {
        setKey(!key)
    }
    useEffect(()=>{
        if(key){
            setColorTitle('palevioletred')
            setFillSvg('blue')
            setBackground('#ebecff')
        }else {setColorTitle('')
            setFillSvg('#ff3131')
            setBackground('#ffff')
        }
    },[key])


    return (
        <Wrapper>
            {/*<button onClick={()=>changeColor()}>CLICK</button>*/}
            <CalendarBody>
                <Header background={background} colorTitle={colorTitle} fillSvg={fillSvg}/>
                <Week/>
                <Body/>
                <Footer/>
            </CalendarBody>
        </Wrapper>
    );
}

export default App;


// import React from 'react';
//
// const App = () => {
//   return (
//       <div>
//         calendar
//       </div>
//   );
// };
//
// export default App;