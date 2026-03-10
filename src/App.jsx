import { useState } from 'react'
import CryptoJS from 'crypto-js'
import trustlockLogo from '/trustlock.svg'
import './App.css'

const APK_DOWNLOAD_URL =
  'https://github.com/ismailmuhammad15g-code/trustlock-landing/releases/latest/download/TrustLock.apk'

function App() {
  const encryptedData = window.location.hash.slice(1)
  const hasData = encryptedData.length > 0

  const [pin, setPin] = useState('')
  const [decrypted, setDecrypted] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function handleDecrypt(e) {
    e.preventDefault()
    setError('')
    setDecrypted(null)
    try {
      const bytes = CryptoJS.AES.decrypt(
        decodeURIComponent(encryptedData),
        pin
      )
      const plainText = bytes.toString(CryptoJS.enc.Utf8)
      if (!plainText) throw new Error('empty')
      const data = JSON.parse(plainText)
      if (
        typeof data !== 'object' ||
        data === null ||
        (!data.platform && !data.username && !data.email && !data.password)
      ) {
        throw new Error('invalid')
      }
      setDecrypted(data)
    } catch {
      setError('❌ فشل فك التشفير. تحقق من الرمز السري والبيانات.')
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(decrypted.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers – position off-screen to avoid visual flash
      const el = document.createElement('textarea')
      el.value = decrypted.password
      el.style.position = 'fixed'
      el.style.top = '-9999px'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // copy failed silently
      }
      document.body.removeChild(el)
    }
  }

  return (
    <div className="landing">
      <header className="header">
        <img src={trustlockLogo} className="logo" alt="TrustLock logo" />
        <h1 className="title">TrustLock</h1>
        <span className="subtitle">by Zetsuserv</span>
      </header>

      <main className="content">
        {hasData ? (
          <>
            {!decrypted ? (
              <div className="message-card">
                <p className="message">
                  🔐 لقد تلقيت بيانات مشفرة بأمان.
                  <br />
                  أدخل الرمز السري الذي أرسله لك صديقك لرؤية المحتوى.
                </p>
                <form className="pin-form" onSubmit={handleDecrypt}>
                  <input
                    type="password"
                    className="pin-input"
                    placeholder="أدخل الرمز السري (PIN)"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    autoComplete="off"
                    required
                    dir="ltr"
                  />
                  <button type="submit" className="decrypt-btn">
                    🔓 فك التشفير
                  </button>
                </form>
                {error && <p className="error-message">{error}</p>}
              </div>
            ) : (
              <div className="result-card">
                <h2 className="result-title">✅ تم فك التشفير بنجاح</h2>
                <div className="result-row">
                  <span className="result-label">المنصة</span>
                  <span className="result-value">
                    {decrypted.platform || '—'}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">اسم المستخدم / الإيميل</span>
                  <span className="result-value">
                    {decrypted.username || decrypted.email || '—'}
                  </span>
                </div>
                <div className="result-row result-row--password">
                  <span className="result-label">كلمة المرور</span>
                  <span className="result-value result-password" dir="ltr">
                    {decrypted.password || '—'}
                  </span>
                </div>
                {decrypted.password && (
                  <button
                    className="copy-btn"
                    onClick={handleCopy}
                    type="button"
                  >
                    {copied ? '✅ تم النسخ!' : '📋 نسخ كلمة المرور'}
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="message-card">
              <p className="message">
                🛡️ TrustLock – مدير كلمات المرور الآمن.
                <br />
                شارك بياناتك المشفرة مع أصدقائك بأمان تام.
              </p>
            </div>
            <a href={APK_DOWNLOAD_URL} className="download-btn" role="button">
              ⬇️ تحميل التطبيق (APK)
            </a>
          </>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Zetsuserv. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
