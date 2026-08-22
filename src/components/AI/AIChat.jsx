import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bot, Leaf, Send, Sparkles, X } from "lucide-react";
import api from "../../api/axios";
import "./AIChat.css";

const quickQuestions = [
    "Ni mbolea gani nzuri kwa mahindi?",
    "Majani ya mahindi kuwa njano husababishwa na nini?",
    "Ninawezaje kuzuia wadudu kwenye nyanya?",
    "Ni wakati gani mzuri wa kupanda mahindi?",
];

export default function AIChat() {
    const location = useLocation();
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

    if (location.pathname.startsWith("/admin")) {
        return null;
    }

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
            // console.log("Response:", response);
            // console.log("Response:", response.data);

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
            {!open && <button className="ai-chat-trigger" onClick={() => setOpen(true)} aria-label="Fungua Kilimo Smart AI">
                <Sparkles size={18} aria-hidden="true" /> <span>Uliza AI</span>
            </button>}

            {open && <div className="ai-chat-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
                <section className="ai-chat-modal" role="dialog" aria-modal="true" aria-labelledby="ai-chat-title">
                    <header className="ai-chat-header">
                        <div className="ai-chat-brand">
                            <div className="ai-chat-brand-icon"><Bot size={22} aria-hidden="true" /></div>
                            <div><h2 id="ai-chat-title" className="ai-chat-title">Kilimo Smart AI</h2><div className="ai-chat-status">Msaidizi wa kilimo</div></div>
                        </div>
                        <button className="ai-chat-close" onClick={() => setOpen(false)} aria-label="Funga AI"><X size={20} /></button>
                    </header>

                    <div className="ai-chat-messages">
                        {showWelcome && <div className="ai-chat-welcome">
                            <div className="ai-chat-welcome-icon"><Leaf size={28} /></div>
                            <h3>Karibu Kilimo Smart AI</h3>
                            <p>Uliza swali lolote kuhusu kilimo, mazao, mbolea, magonjwa au wadudu.</p>
                            <div className="ai-chat-suggestions">
                                {quickQuestions.map((question) => <button className="ai-chat-suggestion" key={question} onClick={() => sendMessage(question)}>{question}</button>)}
                            </div>
                        </div>}

                        {messages.map((item) => <div className={`ai-chat-message ${item.role}`} key={item.id}>
                            <div className="ai-chat-bubble">
                                {item.role === "assistant" && <div className="ai-chat-assistant-label"><Bot size={13} /> Kilimo Smart AI</div>}
                                {item.content}
                            </div>
                        </div>)}
                        {loading && <div className="ai-chat-message"><div className="ai-chat-bubble ai-chat-typing"><span /><span /><span /></div></div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <footer className="ai-chat-composer">
                        <div className="ai-chat-form">
                            <input ref={inputRef} className="ai-chat-input" value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={handleKeyDown} disabled={loading} placeholder={loading ? "AI anajibu..." : "Andika swali..."} aria-label="Andika swali kwa AI" />
                            <button className="ai-chat-send" onClick={() => sendMessage()} disabled={!message.trim() || loading} aria-label="Tuma ujumbe"><Send size={17} /></button>
                        </div>
                        <p className="ai-chat-disclaimer">Majibu ya AI yanahitaji uthibitisho wa mtaalamu.</p>
                    </footer>
                </section>
            </div>}
        </>
    );
}