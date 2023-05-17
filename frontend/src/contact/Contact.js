import './Contact.css'
const Contact = () =>{
    return(
        <div className={"background"}>
            <div className={"container-contact"}>
                <div className={"text-box"}>
                    <div className={"text"}>
                        <div>
                            <h1>Adresa:</h1>
                            <h3>Strada Privighetorii nr 24A, Cluj-Napoca, Jud. Cluj, Romania, 400247</h3>
                        </div>
                        <div>
                            <h1>Suport general:</h1>
                            <h3>support@imobil.gmail.ro</h3>
                        </div>
                        <div>
                            <h1>Ne puteti contacta si pe:</h1>
                            <h3>Whatsapp: +40 770297665
                                Instagram sau Facebook</h3>
                        </div>
                    </div>
                </div>
                <div className={"form"}>
                    <h1>Trimiteti-ne un e-mail!</h1>
                    <form>
                        <div className="form-content">
                            <label htmlFor="email">Email*</label>
                            <input id="email"
                                   type="text"
                                   placeholder="Eg. adresa@gmail.com"
                                   required="required"
                            />
                        </div>
                        <div className="form-content">
                            <label htmlFor="subject-input">Subiect</label>
                            <input id="subject-input" type="text"/>
                        </div>
                        <div className="form-content">
                            <label htmlFor="subject-input">Destinatar: support@imobil.gmail.ro</label>
                        </div>
                        <div className="form-content">
                            <label htmlFor="message-textarea">Mesaj</label>
                            <textarea id="message-textarea"
                                      placeholder="Scrie un mesaj"
                            />
                        </div>
                        <button>Trimite Email</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Contact;