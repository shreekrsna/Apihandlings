import React from 'react';

import arr from './arr';


const sections =() => {


    
 
  return (
    <div >
        <h1> hgdgiwehnw</h1>
        <select>
        {arr.map((item,index)=>{
            return(
                <linearGradient value={item} >
                     {arr}

                </linearGradient>
            )
        })}
        </select>
    </div>
  )
}

export default sections;