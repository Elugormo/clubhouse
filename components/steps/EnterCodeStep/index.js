import React, { useState } from 'react'
import clsx from 'clsx'; 

import styles from './EnterPhoneStep.module.scss';

export const EnterCodeStep = () => { 
    const [codes, setCodes] = useState([]); 

    const nextDisabled = codes.some((v) => !v) || codes.length < 4; 

    const handleChangeInput = (e) => { 
        const id = Number(e.target.getAttribute('id')) - 1; 
        const value = e.target.value; 
        setCodes((prev) => { 
            const newArr = [...prev]; 
            newArr[id] = value; 
            return newArr; 
        })
        if(e.target.nextSibling) { 
            e.target.nextSibling.focus(); 
        }
    }

    console.log(codes); 

    return (
        
    )
}