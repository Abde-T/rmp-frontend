import React from 'react';
import Landing from '../Main page components/Landing';
import Info from '../Main page components/info';
import Details from '../Main page components/Details';
import FormSection from '../Main page components/FormSection';
import Footer from '../Main page components/Footer';

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