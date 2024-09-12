import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { DownloadInfo } from "./ReadyDownload"
import Swal from 'sweetalert2'
import Spinner from "./Spinner"
import { strings } from '../config/strings'
import { globalContext } from '../App'

interface Props {
    setDownloadInfo: Dispatch<SetStateAction<DownloadInfo>>
}

export default function Form({ setDownloadInfo }: Props) { 

    const globalState = useContext(globalContext)
    
    const [link, setLink] = useState<string>('')
    const [startTimestamp, setStartTimestamp] = useState<string>('')
    const [endTimestamp, setEndTimestamp] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    
    const submit = async (e) => {
        e.preventDefault()
        
        let errors = []

        // Validate form
        const timestampRegex = /^\d{2}:\d{2}:\d{2}$/

        // validate data
        if(link === '') {
            errors.push([...errors, strings[globalState.language].ERROR_INVALID_LINK])
        }

        if(
            (startTimestamp !== '' && !timestampRegex.test(startTimestamp)) ||
            (endTimestamp !== '' && !timestampRegex.test(endTimestamp))
        ) {
            errors.push([...errors, strings[globalState.language].ERROR_INVALID_TIMESTAMP_FORMAT])
        }

        if(startTimestamp && endTimestamp && startTimestamp > endTimestamp) {
            errors.push([...errors, strings[globalState.language].ERROR_INVALID_TIMESTAMP_VALUES])
        }

        if(errors.length > 0) {
            Swal.fire(errors.join('\n'))
            return
        }

        setIsSubmitting(true)
        const response = await fetch('/api/convert/audio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link,
                start_timestamp: startTimestamp ?? null,
                end_timestamp: endTimestamp ?? null
            })
        })
        const responseBody = await response.json()

        // Check for response status
        // 422: Input error, probably invalid youtube link
        switch(response.status) {
            case 422:
                errors.push(strings[globalState.language].ERROR_HTTP_INVALID_DATA)
                break
            case 400:
                errors.push(strings[globalState.language].ERROR_HTTP_UNKNOWN_ERROR)
                break
            default:
                break
        }

        if(errors.length > 0) {
            Swal.fire(errors.join('\n'))
            setIsSubmitting(false)
            return
        }

        const downloadInfo: DownloadInfo = {
            title: responseBody.title,
            downloadUrl: responseBody.link,
            artist: responseBody.artist,
            duration: responseBody.duration_string,
            thumbnailUrl: responseBody.thumbnail
        }

        setDownloadInfo(downloadInfo)

        setLink('')
        setStartTimestamp('')
        setEndTimestamp('')
        setIsSubmitting(false)
        e.target.reset()
    }

    return (
        <div className="flex-center-vertical margin-vertical">
            <form onSubmit={e => submit(e)}>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>{strings[globalState.language].URL}</td>
                            <td>
                                <input type="text"
                                    name="link"
                                    placeholder="https://youtu.be/tQJ..."
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>{strings[globalState.language].LABEL_START_TIMESTAMP}</td>
                            <td>
                                <input
                                    type="text"
                                    name="start_timestamp"
                                    placeholder="00:00:00"
                                    autoComplete="off"
                                    value={startTimestamp}
                                    onChange={e => setStartTimestamp(e.target.value)}
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>{strings[globalState.language].LABEL_END_TIMESTAMP}</td>
                            <td>
                                <input
                                type="text"
                                name="end_timestamp"
                                autoComplete="off"
                                value={endTimestamp}
                                onChange={e => setEndTimestamp(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value={strings[globalState.language].START_DOWNLOAD} className="right" disabled={isSubmitting} />
            </form>
            <Spinner show={isSubmitting} />
        </div>

    )
}