import { Link } from 'react-router-dom'
import GithubLogo from './github_PNG83.png'
import IronhackLogo from './logo-ironhack-1.png'
import './Footer.css'

const Footer = () => {

    return (
        <footer>
            <ul className='nav '>
                <li className='nav-item'>
                    <Link to='https://www.ironhack.com/es/madrid' target='_blank'>
                        <img src={IronhackLogo} alt='ironhack logo' />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='https://www.linkedin.com/in/carlos-davila-roman/' target='_blank'>
                        <span>Developed by: Carlos Dávila</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='https://github.com/davila795/Hink-Final-Project' target='_blank'>
                        <img src={GithubLogo} alt='github logo' />
                    </Link>
                </li>
            </ul>
        </footer>

    )
}

export default Footer
