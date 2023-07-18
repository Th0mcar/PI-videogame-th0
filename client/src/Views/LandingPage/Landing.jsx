import style from '../LandingPage/Landing.module.css'
import React from 'react'
import { Link } from "react-router-dom/cjs/react-router-dom"

const Landing = () => {
    
    return (
        <div className={style.container}>
            <div className={style.boxButton}>
                <Link to='/home'><button className={style.button}>singleplayer</button></Link>
            </div>
        </div>
    )
}

export default Landing