import React, { useContext, useEffect, useRef, useState } from 'react'
import Form from './Form'
import ReadyDownload, { DownloadInfo } from './ReadyDownload'
import { strings } from '../config/strings'
import { globalContext } from '../App'

import '../../public/css/reset.css'
import '../../public/css/common.css'
import '../../public/css/index.css'

export default function Main() {

  const globalState = useContext(globalContext);
    
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo>(null);

  const bottomRef = useRef(null);

  useEffect(() => {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [downloadInfo]);

  return(
    <section role="main" className="flex-center-vertical">
      <h1 className="brand">{strings[globalState.language].BRAND_NAME}</h1>

      <p>
          {strings[globalState.language].MAIN_PAGE_HELP}
      </p>
      
      <Form setDownloadInfo={setDownloadInfo} />

      <ReadyDownload downloadInfo={downloadInfo} />

      {/* For scrolling to bottom */}
      <div ref={bottomRef}></div>
    </section>
  )
}