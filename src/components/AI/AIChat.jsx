import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";

const quickQuestions = [
    "Ni mbolea gani nzuri kwa mahindi?",
    "Majani ya mahindi kuwa njano husababishwa na nini?",
    "Ninawezaje kuzuia wadudu kwenye nyanya?",
    "Ni wakati gani mzuri wa kupanda mahindi?",
];

export default function AIChat() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    /*
    |--------------------------------------------------------------------------
    | Auto scroll
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    /*
    |--------------------------------------------------------------------------
    | Focus input when chat opens
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [open]);

    /*
    |--------------------------------------------------------------------------
    | Send message
    |--------------------------------------------------------------------------
    */

    const sendMessage = async (text = message) => {
        const cleanMessage = text.trim();

        if (!cleanMessage || loading) {
            return;
        }

        // Show user message immediately
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                role: "user",
                content: cleanMessage,
            },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/ask-ai", {
                message: cleanMessage,
            });

            const reply = response.data?.reply;

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    content:
                        reply ||
                        "Samahani, sijapata jibu kwa sasa.",
                },
            ]);
        } catch (error) {
            console.error("AI Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    content:
                        "Samahani, kuna tatizo la kuwasiliana na AI. Tafadhali jaribu tena.",
                    error: true,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Enter key
    |--------------------------------------------------------------------------
    */

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Welcome screen
    |--------------------------------------------------------------------------
    */

    const showWelcome = messages.length === 0;

    return (
        <>
            {/* =========================================================
                Floating AI Button
            ========================================================= */}

            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open Kilimo Smart AI"
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-[9999]

                        w-16
                        h-16

                        rounded-full

                        bg-green-600
                        hover:bg-green-700

                        text-white

                        shadow-xl
                        hover:shadow-2xl

                        flex
                        items-center
                        justify-center

                        transition-all
                        duration-200

                        hover:scale-105
                    "
                >
                    <span className="text-3xl">
                        🤖
                    </span>
                </button>
            )}

            {/* =========================================================
                Chat Window
            ========================================================= */}

            {open && (
                <div
                    className="
                        fixed
                        z-[9999]

                        bottom-4
                        right-4

                        sm:bottom-6
                        sm:right-6

                        w-[calc(100vw-2rem)]
                        sm:w-[390px]

                        h-[calc(100vh-2rem)]
                        sm:h-[650px]

                        max-h-[750px]

                        bg-white

                        rounded-2xl

                        shadow-2xl

                        border
                        border-gray-200

                        overflow-hidden

                        flex
                        flex-col
                    "
                >

                    {/* =================================================
                        Header
                    ================================================= */}

                    <div
                        className="
                            bg-gradient-to-r
                            from-green-700
                            to-green-600

                            text-white

                            px-5
                            py-4

                            flex
                            items-center
                            justify-between

                            shrink-0
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    w-11
                                    h-11
                                    rounded-full

                                    bg-white/15

                                    flex
                                    items-center
                                    justify-center

                                    text-2xl
                                "
                            >
                                🤖
                            </div>

                            <div>
                                <h2 className="font-bold text-base">
                                    Kilimo Smart AI
                                </h2>

                                <div className="flex items-center gap-1.5">

                                    <span
                                        className="
                                            w-2
                                            h-2
                                            rounded-full
                                            bg-green-300
                                        "
                                    />

                                    <span className="text-xs text-green-100">
                                        AI Assistant
                                    </span>

                                </div>
                            </div>

                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="
                                w-9
                                h-9
                                rounded-full

                                hover:bg-white/10

                                flex
                                items-center
                                justify-center

                                text-xl

                                transition
                            "
                            aria-label="Close AI"
                        >
                            ×
                        </button>

                    </div>


                    {/* =================================================
                        Messages Area
                    ================================================= */}

                    <div
                        className="
                            flex-1
                            overflow-y-auto

                            bg-gray-50

                            px-4
                            py-5

                            space-y-4
                        "
                    >


                        {/* Welcome */}

                        {showWelcome && (
                            <div className="h-full flex flex-col justify-center">

                                <div className="text-center mb-6">

                                    <div
                                        className="
                                            w-16
                                            h-16
                                            mx-auto
                                            rounded-full

                                            bg-green-100

                                            flex
                                            items-center
                                            justify-center

                                            text-3xl

                                            mb-4
                                        "
                                    >
                                        🌱
                                    </div>

                                    <h3
                                        className="
                                            text-lg
                                            font-bold
                                            text-gray-800
                                        "
                                    >
                                        Karibu Kilimo Smart AI
                                    </h3>
                                

                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                            mt-2
                                            px-4
                                        "
                                    >
                                        Uliza swali lolote kuhusu
                                        kilimo, mazao, mbolea,
                                        magonjwa au wadudu.
                                    </p>

                                </div>


                                {/* Quick Questions */}

                                <div className="space-y-2">

                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wide
                                        "
                                    >
                                        Jaribu kuuliza
                                    </p>

                                    {quickQuestions.map((question) => (
                                        <button
                                            key={question}
                                            onClick={() =>
                                                sendMessage(question)
                                            }
                                            className="
                                                w-full
                                                text-left

                                                bg-white

                                                border
                                                border-gray-200

                                                rounded-xl

                                                px-4
                                                py-3

                                                text-sm
                                                text-gray-700

                                                hover:border-green-400
                                                hover:bg-green-50

                                                transition
                                            "
                                        >
                                            {question}
                                        </button>
                                    ))}

                                </div>

                            </div>
                        )}


                        {/* Messages */}

                        {messages.map((item) => (

                            <div
                                key={item.id}
                                className={`
                                    flex
                                    ${
                                        item.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }
                                `}
                            >

                                <div
                                    className={`
                                        max-w-[85%]

                                        rounded-2xl

                                        px-4
                                        py-3

                                        text-sm
                                        leading-6

                                        ${
                                            item.role === "user"
                                                ? `
                                                    bg-green-600
                                                    text-white
                                                    rounded-br-md
                                                  `
                                                : `
                                                    bg-white
                                                    text-gray-800
                                                    border
                                                    border-gray-200
                                                    rounded-bl-md
                                                  `
                                        }
                                    `}
                                >

                                    {item.role === "assistant" && (
                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2

                                                text-xs
                                                font-semibold
                                                text-green-700

                                                mb-1
                                            "
                                        >
                                            🤖 Kilimo Smart AI
                                        </div>
                                    )}

                                    <div className="whitespace-pre-wrap">
                                        {item.content}
                                    </div>

                                </div>

                            </div>

                        ))}


                        {/* =================================================
                            Typing indicator
                        ================================================= */}

                        {loading && (
                            <div className="flex justify-start">

                                <div
                                    className="
                                        bg-white
                                        border
                                        border-gray-200

                                        rounded-2xl
                                        rounded-bl-md

                                        px-4
                                        py-3
                                    "
                                >

                                    <div className="flex gap-1">

                                        <span
                                            className="
                                                w-2
                                                h-2
                                                bg-gray-400
                                                rounded-full
                                                animate-bounce
                                            "
                                        />

                                        <span
                                            className="
                                                w-2
                                                h-2
                                                bg-gray-400
                                                rounded-full
                                                animate-bounce
                                            "
                                        />

                                        <span
                                            className="
                                                w-2
                                                h-2
                                                bg-gray-400
                                                rounded-full
                                                animate-bounce
                                            "
                                        />

                                    </div>

                                </div>

                            </div>
                        )}

                        <div ref={messagesEndRef} />

                    </div>


                    {/* =================================================
                        Input Area
                    ================================================= */}

                    <div
                        className="
                            bg-white

                            border-t
                            border-gray-200

                            p-3

                            shrink-0
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2

                                bg-gray-50

                                border
                                border-gray-200

                                rounded-xl

                                p-2

                                focus-within:border-green-500
                                focus-within:ring-2
                                focus-within:ring-green-100
                            "
                        >

                            <input
                                ref={inputRef}
                                type="text"
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                                placeholder={
                                    loading
                                        ? "AI anajibu..."
                                        : "Andika swali..."
                                }
                                className="
                                    flex-1

                                    bg-transparent

                                    outline-none

                                    px-2

                                    text-sm
                                    text-gray-800

                                    placeholder:text-gray-400

                                    disabled:opacity-50
                                "
                            />

                            <button
                                onClick={() => sendMessage()}
                                disabled={
                                    !message.trim() ||
                                    loading
                                }
                                className="
                                    w-10
                                    h-10

                                    rounded-lg

                                    bg-green-600
                                    hover:bg-green-700

                                    text-white

                                    flex
                                    items-center
                                    justify-center

                                    transition

                                    disabled:bg-gray-300
                                    disabled:cursor-not-allowed
                                "
                                aria-label="Send message"
                            >
                                ➤
                            </button>

                        </div>

                        <p
                            className="
                                text-[10px]
                                text-gray-400
                                text-center
                                mt-2
                            "
                        >
                            Kilimo Smart AI inaweza kutoa majibu
                            yanayohitaji uthibitisho wa mtaalamu.
                        </p>

                    </div>

                </div>
            )}
        </>
    );
}