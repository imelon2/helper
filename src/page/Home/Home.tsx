import { Link } from 'react-router-dom'
import '../../styles/GlobalStyle.css'
import "./Home.css"

function Home() {
    return (
        <div className="container">
            <div>
                <div className="titleText title">Order Contract</div>
                <li><Link to={"/order/dev"}>DEV</Link></li>
                <li><Link to={"/order/test"}>TEST</Link></li>
                <li><Link to={"/order/stag"}>STAG</Link></li>
                <li><Link to={"/order/beta"}>BETA</Link></li>
            </div>
        </div>
    )
}

export default Home