import Atmosphere from "@/components/confession/atmosphere";
import ChapterOne from "@/components/confession/chapter-one";
import ChapterThree from "@/components/confession/chapter-three";
import ChapterTwo from "@/components/confession/chapter-two";
import CursorSparkle from "@/components/confession/cursor-sparkle";
import Finale from "@/components/confession/finale";
import InteractiveEnvelope from "@/components/confession/interactive-envelope";
import IntroScene from "@/components/confession/intro-scene";
import LoveReasons from "@/components/confession/love-reasons";
import LuxuryNav from "@/components/confession/luxury-nav";
import MemoriesGallery from "@/components/confession/memories-gallery";
import PageFooter from "@/components/confession/page-footer";
import ScrollProgress from "@/components/confession/scroll-progress";

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <Atmosphere />
      <CursorSparkle />
      <LuxuryNav />
      <main className="relative z-10 flex-1">
        <IntroScene />
        <ChapterOne />
        <ChapterTwo />
        <MemoriesGallery />
        <LoveReasons />
        <ChapterThree />
        <InteractiveEnvelope />
        <Finale />
      </main>
      <PageFooter />
    </div>
  );
}
