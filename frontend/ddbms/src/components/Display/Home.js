import React, { useState } from 'react'
import PieChart from '../chart/PieChart';
import ChatApp from '../chat/chatapp';

const Home = () => {
    const colors = ['#FF6384', '#FFCE56', '#9966FF'];
    const labels = ['Request receive time', 'NLP processing time', 'Response Return time'];

    const [state, setState] = useState(false);
    const [Data, setData] = useState({});

    return (
        <React.Fragment>
            <div className="flex flex-col lg:flex-row h-screen overflow-x-hidden">
                <div className="lg:w-3/4 w-full bg-gray-100 lg:h-[82%]">
                    <ChatApp setState={setState} setDate={setData}/>
                </div>
                {/* <div className="lg:w-1/4 w-full bg-gray-200 h-full"> */}
                <div className="lg:w-1/4 w-full bg-gray-200 lg:h-[82%] h-full pt-5 pe-7">

                    <PieChart labels={labels} colors={colors} state={state} Data={Data}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;