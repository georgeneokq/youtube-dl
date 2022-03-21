/* 
 * Keys starting with underscore like _LANGUAGE and _ISO are metadata,
 * to be used in code instead of displaying on UI
 */
export interface AppStrings {
  _LANGUAGE: string
  _ISO: string
  LANGUAGE: string
  BRAND_NAME: string
  LABEL_START_TIMESTAMP: string
  LABEL_END_TIMESTAMP: string
  MAIN_PAGE_HELP: string
  START_DOWNLOAD: string
  DOWNLOAD   : string
  URL        : string
  ERROR_INVALID_LINK: string
  ERROR_INVALID_TIMESTAMP_FORMAT: string
  ERROR_INVALID_TIMESTAMP_VALUES: string
  ERROR_HTTP_INVALID_DATA: string
  ERROR_HTTP_UNKNOWN_ERROR: string
}

export interface SupportedLanguages {
  ja: AppStrings
  en: AppStrings
}

export const strings: SupportedLanguages = {
  ja: {
    _LANGUAGE: '日本語',
    _ISO: 'ja',
    LANGUAGE: '言語',
    BRAND_NAME: 'かなでTUBE',
    LABEL_START_TIMESTAMP: "スタート時刻",
    LABEL_END_TIMESTAMP: "エンド時刻",
    MAIN_PAGE_HELP: `
      スタート時刻はデフォルトで00:00:00。
      エンド時刻はデフォルトで動画の最後まで。
      動画を右クリックして、「動画のURLをコピー」を選択して、リンクを使ってください。
    `,
    START_DOWNLOAD: 'ダウンロード開始',
    DOWNLOAD: 'ダウンロード',
    URL: 'リンク',
    ERROR_INVALID_LINK: 'リンクが必要です。',
    ERROR_INVALID_TIMESTAMP_FORMAT: '切り取り時間の形式が間違ってます。HH:MM:SSの形式を使ってください。',
    ERROR_INVALID_TIMESTAMP_VALUES: '指定したスタート時間はエンド時間より大きい数値です。',
    ERROR_HTTP_INVALID_DATA: '入力データを再確認してください。',
    ERROR_HTTP_UNKNOWN_ERROR: '不明なエラーが発生しました。'
  },
  en: {
    _LANGUAGE: 'English',
    _ISO: 'en',
    LANGUAGE: 'Language',
    BRAND_NAME: 'KanadeTube',
    LABEL_START_TIMESTAMP: "Start",
    LABEL_END_TIMESTAMP: "End",
    MAIN_PAGE_HELP: `
      The "Start timestamp" and "End timestamp" default to the start and end of the video respectively.
      Attain the URL by right clicking on the video.
    `,
    START_DOWNLOAD: 'Start download',
    DOWNLOAD: 'Download',
    URL: 'URL',
    ERROR_INVALID_LINK: 'Invalid URL.',
    ERROR_INVALID_TIMESTAMP_FORMAT: 'Timestamp format must be HH:MM:SS.',
    ERROR_INVALID_TIMESTAMP_VALUES: 'The start timestamp must not go over the end timestamp.',
    ERROR_HTTP_INVALID_DATA: 'Please reconfirm your inputs.',
    ERROR_HTTP_UNKNOWN_ERROR: 'An unknown error has occurred.'
  }
}