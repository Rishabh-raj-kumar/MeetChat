import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Timeline from "../Components/timeline";
import Sidebar from "../Components/sidebar/sidebar";
import { useMediaQuery } from "react-responsive";
import Footer from "../Components/footer";
import usePhotos from "../hooks/usePhotos";
import Story from "../Components/Status";
import Post from "../Components/story/Post";
import Navigation from "../Components/Navigation";

function Dashboard() {
  const { photos } = usePhotos();
  const [play, setPlay] = useState(false);
  const [video,setVideo] = useState(null);
  const [text,setText] = useState(null);
  const [followedUserImg,setfollowedImg] = useState(null);
  const [docs,setDocs] = useState(null)
  const [dateCreate,setDateCreate] = useState(null)
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 770px)" });
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [mobi,setMobi] = useState(isMobile);

  return (
    <>
      <div className={`relative ${play && 'overflow-hidden'}`}
      style={{background: '	#040406',minHeight : '100dvh'}}>
        {isMobile && <Header />}
        <div
          className={`grid ${!isTablet && !isMobile && `grid-cols-3`} ${
            isTablet && isMobile && `grid-cols-1`
          } ${isTablet && !isMobile && `grid-cols-2`} gap-3 justify-between mx-auto`}
          style={{ minHeight : '100dvh'}}
        >
          <Navigation mobi={mobi} setMobi={setMobi}/>
          <div className={` col-span-1 mr-3`}>
            <Story setPlay={setPlay} setVideo={setVideo} setfollowedImg={setfollowedImg}
             setDocs={setDocs} setDateCreate={setDateCreate} setText={setText} />
            <Timeline photos={photos} />
          </div>
          {!isTabletOrMobile && <Sidebar photos={photos} />}
          {isMobile && <Footer setMobi={setMobi} mobi={mobi}/>}
        </div>
        {/** we will be playing status */}
        {play && <Post setPlay={setPlay} play={play} followedUserImg={followedUserImg}
        video={video} docs={docs} dateCreate={dateCreate} text={text}/>}
      </div>
    </>
  );
}

export default Dashboard;
