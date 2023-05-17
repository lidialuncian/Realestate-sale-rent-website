import './Footer.css'
import { SocialIcon } from 'react-social-icons';
const Footer = () =>{
    return (
        <footer className={"footer"}>
            <div>
                <SocialIcon
                    network="facebook" style={{ height: 30, width: 30}}
                    bgColor={"black"}
                /> {'  '}
                <SocialIcon
                    network="instagram" style={{ height: 30, width: 30 }}
                    bgColor={"black"}
                />{'  '}
                <SocialIcon
                    network="whatsapp" style={{ height: 30, width: 30 }}
                    bgColor={"black"}
                />
            </div>
        </footer>

    )
}

export default Footer;