import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
import CarsGallery  from "./gallery";
import { Testimonials } from "./testimonials";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import { useState, useEffect } from "react";


export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const MainPage = ({ handleJoinClick, handleLoginClick }) => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);


    return (
        <div>
            <Navigation handleLoginClick={handleLoginClick} handleJoinClick={handleJoinClick} />
            <Header data={landingPageData.Header} />
            <CarsGallery data={landingPageData.Gallery} />
            <Features data={landingPageData.Features} />
            <About data={landingPageData.About} />
            <Services data={landingPageData.Services} />
            <Testimonials data={landingPageData.Testimonials} />
            <Team data={landingPageData.Team} />
            <Contact data={landingPageData.Contact} />
        </div>

    );
};

export default MainPage;
