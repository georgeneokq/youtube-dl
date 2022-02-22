async function sleep(seconds) {
    return new Promise((resolve, _) => {
        window.setTimeout(() => resolve(), seconds * 1000);
    });
}

async function serveDownload(info) {
    const { title, link, duration_string: duration, thumbnail } = info

    const readyDownloadContainerEl = document.querySelector('.ready-download-container');
    const downloadTitleEl = readyDownloadContainerEl.querySelector('#download-title');
    const downloadLinkEl = readyDownloadContainerEl.querySelector('#download-link');
    const durationEl = readyDownloadContainerEl.querySelector('#duration');
    const thumbnailEl = readyDownloadContainerEl.querySelector('#thumbnail');

    downloadTitleEl.innerText = title;
    downloadLinkEl.download = title;
    downloadLinkEl.href = link;
    durationEl.innerText = `長さ：${duration}`;
    thumbnailEl.src = thumbnail;
    readyDownloadContainerEl.style.display = 'flex';
    await sleep(0.01);  // Workaround: Delay for abit so that the following scroll instruction works
    readyDownloadContainerEl.scrollIntoView();
}

function hideDownload() {
    const readyDownloadContainerEl = document.querySelector('.ready-download-container');
    readyDownloadContainerEl.style.display = 'none';
}

function showSpinner() {
    document.querySelector('#spinner').style.display = 'inline';
}

function hideSpinner() {
    document.querySelector('#spinner').style.display = 'none';
}

function disableStartDownloadButton() {
    document.querySelector('input[type=submit]').disabled = true;
}

function enableStartDownloadButton() {
    document.querySelector('input[type=submit]').disabled = false;
}

(function() {
    const form = document.querySelector('form');
    const inputLink = form.querySelector('[name=link]');
    const inputStartTimestamp = form.querySelector('[name=start_timestamp]');
    const inputEndTimestamp = form.querySelector('[name=end_timestamp]');

    const timestampRegex = /^\d{2}:\d{2}:\d{2}$/;

    form.onsubmit = async e => {
        e.preventDefault();

        const link = inputLink.value;
        const startTimestamp = inputStartTimestamp.value;
        const endTimestamp = inputEndTimestamp.value;

        // validate data
        if(link === '') {
            Swal.fire('リンクが必要です。');
            return;
        }

        if(
            (startTimestamp !== '' && !timestampRegex.test(startTimestamp)) ||
            (endTimestamp !== '' && !timestampRegex.test(endTimestamp))
        ) {
            Swal.fire('切り取り時間の形式が間違ってます。HH:MM:SSの形式を使ってください。');
            return;
        }

        if(startTimestamp && endTimestamp && startTimestamp > endTimestamp) {
            Swal.fire('指定したスタート時間はエンド時間より大きい数値です。');
            return;
        }

        disableStartDownloadButton();
        hideDownload();
        showSpinner();

        let response;
        try {
            response = await fetch('/api/convert/audio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    link,
                    start_timestamp: startTimestamp ?? null,
                    end_timestamp: endTimestamp ?? null
                })
            });
            response = await response.json();

        } catch(e) {
            console.log(e);
        }

        hideSpinner();
        enableStartDownloadButton();

        // Check if any error occured.
        // 422: Input error, probably invalid youtube link
        if(response.status === 422) {
            Swal.fire('リンクが正しいことを確認してください。');
        }
        else if(response.status === 400) {
            Swal.fire('不明なエラーが発生しました。');
        }
        else {
            if(response.error) {
                Swal.fire('リンクが正しいことを確認してください。');
                return;
            }
    
            serveDownload(response);
        }
    }
})();