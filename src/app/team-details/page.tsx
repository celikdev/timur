import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/header/header";
import Footer from "@/layout/footer/footer";
import BreadcrumbArea from "../components/breadcrumb/breadcrumb-area";
import brd_bg from "@/assets/img/bg/breadcrumb_bg01.jpg";
import brd_img from "@/assets/img/team/breadcrumb_team.png";
import TeamInfoArea from "../components/team/team-info-area";
import TeamDetailsArea from "../components/team/team-details-area";
import VideoArea from "../components/video/video-area";

export const metadata: Metadata = {
  title: "Team Details Page",
};

export default function TeamDetailsPage() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      {/* main area start */}
      <main className="main--area">
        {/* breadcrumb area start */}
        <BreadcrumbArea
          title="SHAKH DANIAL"
          subtitle="TEAM DETAILS"
          bg={brd_bg}
          brd_img={brd_img}
        />
        {/* breadcrumb area end */}

        {/* team info start */}
        <TeamInfoArea />
        {/* team info end */}

        {/* team details area start */}
        <TeamDetailsArea />
        {/* team details area end */}

        {/* video area start */}
        <VideoArea />
        {/* video area end */}

        {/*  */}
      </main>
      {/* main area end */}

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
