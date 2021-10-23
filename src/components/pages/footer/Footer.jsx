import React from "react";
import footer from "./footer.scss"

const Footer = () => {
    return <div className = "footer">
                <div class="footer__bg">
                    <div class="footer__container container grid">
                        <div>
                            <h1 class="footer__title">Vaccine Passport</h1>
                            <span class="footer__subtitle">Project from Vietnamese - German University</span>
                        </div>

                        {/* <div class="footer__social">
                            <a href="https://www.facebook.com/cuongphat.nguyen.26/" target="_blank" class="footer__social">
                            <i class="uil uil-facebook-f"></i>
                            </a>
                            <a href="https://www.instagram.com/alwayssleepyphats/" target="_blank" class="footer__social">
                            <i class="uil uil-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/phat-nguyen-b14196175/" target="_blank" class="footer__social">
                            <i class="uil uil-linkedin"></i>
                            </a>
                        </div> */}
                    </div>
                    <p class="footer__copy">&#169; All right reserved</p>
                </div>
            </div>
};

export default Footer;
