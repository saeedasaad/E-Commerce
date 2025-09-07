import React from 'react';
import Title from '../Components/Title';
import NewsletterBox from '../Components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {

    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />

                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id sed alias perferendis mollitia suscipit aspernatur neque. Labore id reprehenderit eaque? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id sed alias perferendis mollitia suscipit aspernatur neque. Labore id reprehenderit eaque? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id sed alias perferendis mollitia suscipit aspernatur neque. Labore id reprehenderit eaque?</p>
                    <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati omnis quo doloribus dicta nisi et inventore maxime pariatur laborum ut! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id sed alias perferendis mollitia suscipit aspernatur neque. Labore id reprehenderit eaque? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id sed alias perferendis mollitia suscipit aspernatur neque. Labore id reprehenderit eaque?</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et atque officiis quo dolores odit hic fuga doloremque saepe voluptates beatae?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id sed alias perferendis mollitia suscipit aspernatur neque. Labore id reprehenderit eaque?</p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi suscipit eum sed! Dolorum culpa cumque eveniet reprehenderit illum explicabo nulla.</p>
                </div>                
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Covenience:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi suscipit eum sed! Dolorum culpa cumque eveniet reprehenderit illum explicabo nulla.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi suscipit eum sed! Dolorum culpa cumque eveniet reprehenderit illum explicabo nulla.</p>
                </div>
            </div>
            <NewsletterBox/>

        </div>
    )
}


export default About
