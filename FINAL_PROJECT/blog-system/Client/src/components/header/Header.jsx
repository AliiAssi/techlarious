import { useState } from 'react';
import './Header.css';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import Navbar from './Navbar';

const Header = () => {
    const [toggle, setToggle] = useState(false);
  
    return (
      <header className="header">
        <HeaderLeft toggle={toggle} setToggle={setToggle} />
        <Navbar toggle={toggle} setToggle={setToggle} />
        <HeaderRight />
      </header>
    );
  };
  
  export default Header;