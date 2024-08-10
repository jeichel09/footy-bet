import { useState } from "react";

export default function Betslip() {
    const [openTab, setOpenTab] = useState(1);
    
    return (
        <div className="betslip w-1/5 ml-1 mr-0">
            <div className="betslip-ui mx-4 mt-4">
                <ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0" role="tablist" data-te-nav-ref >
                    <li role="presentation" className="flex-auto text-center">
                        <a
                        href="#" onClick={() => setOpenTab(1)}
                        className={` ${openTab === 1 ? "bg-[#ECEFEA] text-gray-600" : "bg-grey-400 text-white"} w-full inline-block px-4 py-4`} 
                        
                        >Betslip</a>
                        
                    </li>
                    <li role="presentation" className="flex-auto text-center">
                        <a
                        href="#" onClick={() => setOpenTab(2)}
                        className={` ${openTab === 2 ? "bg-[#ECEFEA] text-gray-600" : "bg-grey-400 text-white"} w-full inline-block px-4 py-4`}
                        
                        >Open bets</a>
                        
                    </li>
                </ul>

                <div className="p-3 mt-6 bg-white border">
                    <div className={openTab === 1 ? "block" : "hidden"}>
                        {" "}
                        Tab 1 Content show
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"}>
                        Tab 2 Content show
                    </div>
                </div>
            </div>
        </div>
    );
}