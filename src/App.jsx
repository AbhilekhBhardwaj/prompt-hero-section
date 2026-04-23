import { useEffect, useRef, useState } from "react";

export default function App() {
  const videoRef = useRef(null);
  const fadingOutRef = useRef(false);
  const animFrameId = useRef(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const cancelAnim = () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };

    const fadeIn = (duration = 250) => {
      cancelAnim();
      const start = performance.now();
      const startOpacity = parseFloat(video.style.opacity) || 0;
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        video.style.opacity = String(startOpacity + (1 - startOpacity) * t);
        if (t < 1) animFrameId.current = requestAnimationFrame(step);
        else animFrameId.current = null;
      };
      animFrameId.current = requestAnimationFrame(step);
    };

    const fadeOut = (duration = 250, onComplete) => {
      cancelAnim();
      const start = performance.now();
      const startOpacity = parseFloat(video.style.opacity) || 1;
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        video.style.opacity = String(startOpacity * (1 - t));
        if (t < 1) animFrameId.current = requestAnimationFrame(step);
        else {
          animFrameId.current = null;
          if (onComplete) onComplete();
        }
      };
      animFrameId.current = requestAnimationFrame(step);
    };

    const onCanPlay = () => {
      fadingOutRef.current = false;
      video.play().catch(() => {});
      fadeIn(250);
    };

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (!fadingOutRef.current && Number.isFinite(video.duration) && remaining <= 0.55) {
        fadingOutRef.current = true;
        fadeOut(250);
      }
    };

    const onEnded = () => {
      video.style.opacity = "0";
      fadingOutRef.current = false;
      setTimeout(() => {
        video.currentTime = 0;
        video
          .play()
          .then(() => {
            fadeIn(250);
          })
          .catch(() => {});
      }, 100);
    };

    video.addEventListener("canplay", onCanPlay, { once: true });
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      cancelAnim();
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <>
      <div className="video-wrapper">
        <video id="bg-video" ref={videoRef} muted playsInline preload="auto">
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="content-layer">
        <nav>
          <a className="nav-logo" href="#">
            Logoipsum
          </a>
          <ul className="nav-links">
            <li>
              <a href="#">Platform</a>
            </li>
            <li>
              <a href="#">
                Features
                <svg className="chevron-icon" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div className="nav-actions">
            <button className="btn-signup">Sign Up</button>
            <button className="btn-login">Log In</button>
          </div>
        </nav>

        <div className="hero-content">
          <div className="badge-container">
            <div className="badge-dark">
              <svg className="star-icon" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1l1.8 3.6L14 5.5l-3 2.9.7 4.1L8 10.4l-3.7 2.1.7-4.1-3-2.9 4.2-.9L8 1z"
                  fill="#f0c040"
                />
              </svg>
              <span>New</span>
            </div>
            <div className="badge-light">Discover what's possible</div>
          </div>

          <h1 className="hero-headline">Transform Data Quickly</h1>

          <p className="hero-subtitle">
            Upload your information and get powerful insights right away. Work smarter and achieve
            goals effortlessly.
          </p>

          <div className="search-outer">
            <div className="search-top-row">
              <div className="credits-info">
                <span>60/450 credits</span>
                <button className="btn-upgrade">Upgrade</button>
              </div>
              <div className="ai-badge">
                <svg className="ai-icon" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="8" cy="8" r="2.5" fill="rgba(255,255,255,0.85)" />
                </svg>
                <span>Powered by GPT-4o</span>
              </div>
            </div>

            <div className="search-input-area">
              <input
                className="search-input"
                type="text"
                placeholder="Type question..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                maxLength={3000}
              />
              <button className="submit-btn" aria-label="Submit">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 12V4M4 8l4-4 4 4"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="search-bottom-row">
              <div className="action-buttons">
                <button className="action-btn">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M9.5 2.5a3 3 0 014.2 4.2L8 12.5l-5.7.7.7-5.7L8.8 2.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Attach
                </button>
                <button className="action-btn">
                  <svg viewBox="0 0 16 16" fill="none">
                    <rect
                      x="5.5"
                      y="1.5"
                      width="5"
                      height="8"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M3 8a5 5 0 0010 0M8 13.5v1.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Voice
                </button>
                <button className="action-btn">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.3" />
                    <path
                      d="M10 10l3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Prompts
                </button>
              </div>
              <span className="char-counter">{searchText.length.toLocaleString()}/3,000</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
