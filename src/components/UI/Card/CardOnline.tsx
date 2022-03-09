import 'antd/dist/antd.css';
import "./CardOnline.css";


const CardOnline = () => {
    return (
        <div className='card-online'>
            <div className='online-left'>
                <div className="avatar">
                    <img src="" alt="" />
                </div>
                <div className='user'>
                    <p className='name-user'>Thuy</p>
                    <p className='position-user'>Thuy</p>
                </div>
            </div>
            <div className="online">
                <div className='icon'></div>
                <div className='time'>4h</div>
            </div>
        </div>
    )
}

export default CardOnline;