import { useEffect, useState } from 'react'
import '../styles/Header.css'
import { Menu } from './Menu.jsx'

export function Header(props) {
    const [largura, setLargura] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        };

        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup para remover o event listener quando o componente for desmontado
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    

    return (
        <div>
            <div className={`header`} >
                <Menu menu={``} isHome={props.isHome}/>
            </div>
        </div>           
    )
}



