import React from "react";
import { render } from "react-dom";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export default function Video() {
    return (
        <>
        <h2 className="text-xl text-center font-semibold text-zinc-800 mb-4 max-w-screen-lg mx-auto px-5 md:px-0">
            Video Promocional
        </h2>
        <div className="max-w-screen-md mx-auto rounded-md border-2 border-lime-600">
            <LiteYouTubeEmbed
                id="Qa7tTM-8oGk"
                title="Video Promocional"
            />
        </div>
        </>
    );
}
