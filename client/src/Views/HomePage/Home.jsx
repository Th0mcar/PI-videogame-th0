import Cards from "../../Components/Cards/Cards"
import FilterButtons from "../../Components/FilterButtons/FilterButtons"
import style from './Home.module.css'

const Home = (props) => {

    return (
        <div className={style.container}>
            <div className={style.descrip}>
                <h2 className={style.h2}>Filter by:</h2>
                <h2 className={style.h2}>Order by:</h2>
            </div>
            <FilterButtons/>
            <Cards/>
        </div>
    )
}

export default Home