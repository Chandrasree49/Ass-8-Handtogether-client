import HeroBanner from "../component/HeroBanner";
import Chooseus from "../component/chooseus";
import News from "../component/News"
import EventSection from "../component/EventSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Chooseus/>
      <EventSection/>
      <News/>
    </>
  );
}