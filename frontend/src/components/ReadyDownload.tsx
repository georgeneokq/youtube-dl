import React, { useContext, useEffect, useState } from "react";
import { strings } from '../config/strings'
import { globalContext } from "../App";

export interface DownloadInfo {
    title: string;
    artist: string;
    duration: string;
    thumbnailUrl: string;
    downloadUrl: string;
}

interface Props {
    downloadInfo?: DownloadInfo
}

export default function ReadyDownload({ downloadInfo }: Props) {

    const globalState = useContext(globalContext);

    if(!downloadInfo) return null;

    return (
        <div className="ready-download-container">
            <h2 id="download-title">{downloadInfo.title}</h2>
            <p id="artist">{downloadInfo.artist}</p>
            <p id="duration">{downloadInfo.duration}</p>
            <img id="thumbnail" width="600" src={downloadInfo.thumbnailUrl} />
            <a id="download-link" href={downloadInfo.downloadUrl}>
                <button className="btn">
                    { strings[globalState.language].DOWNLOAD }
                </button>
            </a>
        </div>
    )
}