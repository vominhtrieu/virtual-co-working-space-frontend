
import MenuLeft from '../../components/Menu/MenuLeft';
import 'antd/dist/antd.css';
import "./Main.css";
import Card from '../../components/UI/Card/Card';
import CardOnline from '../../components/UI/Card/CardOnline';

function Main() {
    return(
        <div className='main'>
        <MenuLeft/>
        <Card/>
        <CardOnline/>
        </div>
    )
}

export default Main;