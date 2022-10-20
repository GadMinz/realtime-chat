import React from 'react';
import loader from '../assets/Loading.svg'

interface LoadingProps {

}


const Loading: React.FC<LoadingProps> = () => {
    return (
        <div className='loading'>
            <img src={loader} alt="Loading..."/>
        </div>
    );
};

export default Loading;
