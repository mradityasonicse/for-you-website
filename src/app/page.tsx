import Atmosphere from "@/components/confession/atmosphere";
import ChapterFour from "@/components/confession/chapter-four";
import ChapterOne from "@/components/confession/chapter-one";
import ChapterThree from "@/components/confession/chapter-three";
import ChapterTwo from "@/components/confession/chapter-two";
import CursorSparkle from "@/components/confession/cursor-sparkle";
import Finale from "@/components/confession/finale";
import IntroScene from "@/components/confession/intro-scene";
import LoveReasons from "@/components/confession/love-reasons";
import MemoriesGallery from "@/components/confession/memories-gallery";
import PageFooter from "@/components/confession/page-footer";
import ScrollProgress from "@/components/confession/scroll-progress";
import SoundToggle from "@/components/confession/sound-toggle";

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <Atmosphere />
      <CursorSparkle />
      <SoundToggle />
      <main className="relative z-10 flex-1">
        <IntroScene />
        <ChapterOne />
        <ChapterTwo />
        <MemoriesGallery />
        <LoveReasons />
        <ChapterThree />
        <ChapterFour />
        <Finale />
      </main>
      <PageFooter />
    </div>
  );
}
