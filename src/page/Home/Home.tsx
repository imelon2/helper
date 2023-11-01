import { Link } from 'react-router-dom'
import '../../styles/GlobalStyle.css'
import "./Home.css"

function Home() {
    return (
        <div className="container">
            {/* <div className='wrapper'>
                <div className="titleText title">KEY</div>
                <li><Link to={"/key/dev"}>DEV</Link></li>
                <li><Link to={"/key/test"}>TEST</Link></li>
                <li><Link to={"/key/stag"}>STAG</Link></li>
                <li><Link to={"/key/beta"}>BETA</Link></li>
            </div> */}
            <div className='wrapper'>
                <div className="titleText title">Order Contract Researcher</div>
                <li><Link to={"/order/dev"}>DEV</Link></li>
                <li><Link to={"/order/test"}>TEST</Link></li>
                <li><Link to={"/order/stag"}>STAG</Link></li>
                <li><Link to={"/order/beta"}>BETA</Link></li>
            </div>
            <div className='wrapper'>
                <div className="titleText title">Lodis Signature Function</div>
                <li><Link to={"/signature/dev"}>DEV</Link></li>
                <li><Link to={"/signature/test"}>TEST</Link></li>
                <li><Link to={"/signature/stag"}>STAG</Link></li>
                <li><Link to={"/signature/beta"}>BETA</Link></li>
            </div>
        </div>
    )
}

export default Home