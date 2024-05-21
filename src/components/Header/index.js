import './header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <header>

        <Link to='/' className='logo'>DEVFLIX</Link>
        <Link to='/favoritos' className='favoritos'>Meus filmes</Link>

        </header>
     );
}
 
export default Header;