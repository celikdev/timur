import Wrapper from "@/layout/wrapper";
import Header from "@/layout/header/header";
import HeroBanner from "./components/hero-banner/hero-banner";
import NftItemArea from "./components/nft-item/nft-item-area";
import VideoArea from "./components/video/video-area";
import RoadMapArea from "./components/road-map/road-map-area";
import Footer from "@/layout/footer/footer";

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <main className="main--area">
        <HeroBanner />
        <NftItemArea />
        <VideoArea />
        <RoadMapArea />
      </main>
      <Footer />
    </Wrapper>
  );
}
