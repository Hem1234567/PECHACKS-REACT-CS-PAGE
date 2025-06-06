export const globalStyles = `
  /* These styles will be injected by main.jsx */
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
  }
  html {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
  }
  body {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: clamp(30px, 3vw, 50px) clamp(30px, 3vw, 50px); }
  }
`;
