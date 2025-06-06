import { BackgroundEffects } from "./components/BackgroundEffects";
import { TitleSection } from "./components/TitleSection";
import { CTAButtons } from "./components/CTAButtons";
import { SocialLinks } from "./components/SocialLinks";

export const App = () => {
  return (
    <BackgroundEffects>
      <header className="w-full fixed top-0 z-50 bg-transparent backdrop-blur-md  ">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center space-x-2 cursor-pointer">
            <img src="/pechacks bgr.png" alt="Logo" className="h-8" />
          </a>
        </nav>
      </header>

      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center pt-24 pb-5 px-4">
        <TitleSection />
        <CTAButtons />
        <SocialLinks />
      </div>
    </BackgroundEffects>
  );
};
