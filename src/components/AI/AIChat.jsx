import { useState } from "react";

export default function AIChat() {

    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}

            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50
                           w-16 h-16 rounded-full
                           bg-green-600
                           text-white
                           text-3xl
                           shadow-xl
                           hover:scale-105
                           transition"
            >
                🤖
            </button>

            {open && (

                <div
                    className="fixed
                               bottom-24
                               right-6
                               w-[380px]
                               h-[600px]
                               bg-white
                               rounded-2xl
                               shadow-2xl
                               flex
                               flex-col
                               overflow-hidden
                               z-50"
                >

                    {/* Header */}

                    <div className="bg-green-600 text-white p-4">

                        <h2 className="text-lg font-bold">
                            Kilimo Smart AI
                        </h2>

                        <p className="text-sm opacity-90">
                            Uliza chochote kuhusu kilimo.
                        </p>

                    </div>

                    {/* Messages */}

                    <div className="flex-1 overflow-y-auto p-4">

                    </div>

                    {/* Input */}

                    <div className="border-t p-4">

                        <input

                            type="text"

                            placeholder="Uliza swali..."

                            className="w-full border rounded-lg p-3"

                        />

                    </div>

                </div>

            )}

        </>
    );

}