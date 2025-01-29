import React, { useState } from "react";
import "./App.css";

function App() {
    const [url, setUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("http://localhost:8000/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setShortenedUrl(data.shortUrl);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="App">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter a URL" required />
                <button type="submit">Shorten</button>
            </form>
            {shortenedUrl && <p>Shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a></p>}
            {error && <p className="error">Error: {error}</p>}
        </div>
    );
}

export default App;
