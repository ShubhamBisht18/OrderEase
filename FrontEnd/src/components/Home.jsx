import React from "react";

export default function Home() {
    return (
        <section id="home" className=" w-screen h-[calc(100vh-65px)] lg:h-[calc(100vh-65px)] flex justify-center items-center">
            <div className=" h-[90%] w-[90%] flex justify-center items-center flex-col">
                <div className="sm:w-[600px] sm:h-[265px] lg:w-[800px] lg:h-[300px] flex justify-center items-center flex-col">
                    <div className="sm:w-[100%] lg:w-[80%] flex justify-center items-center flex-col gap-4">
                        <h1 className="font-extrabold text-4xl text-center">Menu at Your Fingertips</h1>
                        <p className="font-semibold text-gray-900 text-[16px] text-center">Forget waving at waiters — just scan, choose your meal, enter your table number, and relax.
                            Your food comes straight to your table, fast and easy.</p>
                        <button className="w-[150px] rounded-[25px] text-[18px] font-semibold h-[50px] bg-orange-400 text-gray-100">Order now</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
