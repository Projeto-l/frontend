
import { EditorReceita } from '../components/EditorReceita.jsx';
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';

const Editor = () => {
    return (
        <div className="page">
            <div className="content">
                <Header isHome={false}></Header>
                <EditorReceita />
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Editor;