import React from 'react';
import Landing from '../MainPageComponents/Landing';
import Info from '../MainPageComponents/Info';
import Details from '../MainPageComponents/Details';
import FormSection from '../MainPageComponents/FormSection';
import Footer from '../MainPageComponents/Footer';

const Mainpage = () => {
    return (
        <div>
            <Landing/>
            <Info/>
            <Details/>
            <FormSection />
            <Footer/>
        </div>
    );
};

export default Mainpage;