import trustlockLogo from '/trustlock.svg'
import './App.css'

function App() {
  return (
    <div className="landing">
      <header className="header">
        <img src={trustlockLogo} className="logo" alt="TrustLock logo" />
        <h1 className="title">TrustLock</h1>
        <span className="subtitle">by Zetsuserv</span>
      </header>

      <main className="content">
        <div className="message-card">
          <p className="message">
            🛡️ لقد تلقيت بيانات مشفرة بأمان.
            <br />
            لرؤية المحتوى، يرجى تحميل تطبيق TrustLock على هاتفك الأندرويد.
          </p>
        </div>

        <a
          href="#"
          className="download-btn"
          role="button"
          onClick={(e) => e.preventDefault()}
        >
          تحميل التطبيق (APK)
        </a>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Zetsuserv. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
