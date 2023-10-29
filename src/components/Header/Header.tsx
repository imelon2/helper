import { Link } from 'react-router-dom'
import '../../styles/GlobalStyle.css'
import './Header.css'
import { AiOutlineHome } from "react-icons/ai";
const Header = () => {
    const onClickHome = () => {
        window.location.replace('/helper')
    }
    return (
        <header onClick={onClickHome} className="header-container">
            <AiOutlineHome size={30}/>  
            <div className='headerText'>  Lodis BC Helper</div>
        </header>
    )
}

export default Header