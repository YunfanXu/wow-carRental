import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Features } from "../components/features";
import { About } from "../components/about";
import { Services } from "../components/services";
import CarsGallery from "../components/gallery";
import { Testimonials } from "../components/testimonials";
import { Team } from "../components/Team";
import { Contact } from "../components/contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import { useState, useEffect } from "react";


export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const MainPage = ({ handleJoinClick, handleLoginClick }) => {
    const [landingPageData, setLandingPageData] = useState({});
    const [searchData, setSearchData] = useState(null);

    const handleSearchData = (data) => {
        setSearchData(data);
    }
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);


    return (
        <div>
            <Navigation handleLoginClick={handleLoginClick} handleJoinClick={handleJoinClick} />
            <Header data={landingPageData.Header} searchData={searchData} handleSearchData={handleSearchData} />
            <CarsGallery data={landingPageData.Gallery} searchData={searchData} />
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
