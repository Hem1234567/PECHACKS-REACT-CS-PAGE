export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Poppins', sans-serif;
  }

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
    overscroll-behavior-y: none;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: clamp(30px, 3vw, 50px) clamp(30px, 3vw, 50px); }
  }
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  @keyframes float-reverse {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(20px); }
  }
  .animate-gradient-shift {
    background-size: 200% 200%;
    animation: gradient-shift 15s ease infinite;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-reverse {
    animation: float-reverse 6s ease-in-out infinite;
  }
`;
