import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import "./contact.scss";

function Contact() {
    return (
        <Layout description="DevOps - SRE / Network Eng">
            <header
                className={classnames("hero hero--primary", styles.heroBanner)}
            >
                <div className="container">
                    <h1 className="hero__title">Contact Me</h1>
                </div>
            </header>
            <main>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        paddingTop: "5vh",
                        paddingBottom: "5vh",
                    }}
                >
                    <form
                        name="contact"
                        method="POST"
                        data-netlify-recaptcha="true"
                        data-netlify="true"
                    >
                        <div className="large-group">
                            <div className="small-group">
                                <label for="name">Name</label>
                                <input id="name" type="text" name="name" />
                            </div>

                            <div className="small-group">
                                <label for="email">Email</label>
                                <input id="email" type="email" name="email" />
                            </div>

                            <div className="textarea-div">
                                <label for="message">Message</label>
                                <textarea
                                    id="message"
                                    type="text"
                                    name="message"
                                ></textarea>
                            </div>

                            <input
                                id="submit"
                                className="btn"
                                type="submit"
                                name="submit"
                                value="Submit"
                            />
                        </div>
                    </form>

                    <h2 style={{ marginTop: "50px" }}>StackOverflow</h2>

                    <a
                        href="https://stackoverflow.com/users/4905220/arash-hatami"
                        target="_blank"
                    >
                        <img
                            src="https://stackoverflow.com/users/flair/4905220.png"
                            width="208"
                            height="58"
                            alt="profile for Arash Hatami at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
                            title="profile for Arash Hatami at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
                        ></img>
                    </a>

                    <h2 style={{ marginTop: "50px" }}>LinkedIn</h2>

                    <a
                        href="https://www.linkedin.com/in/hatamiarash7"
                        target="_blank"
                    >
                        <img
                            src="/img/linkedin.png"
                            width="208"
                            height="90"
                            alt="profile for Arash Hatami at LinkedIn"
                            title="profile for Arash Hatami at LinkedIn"
                        ></img>
                    </a>

                    <h2 style={{ marginTop: "50px" }}>Github</h2>

                    <a href="https://github.com/hatamiarash7" target="_blank">
                        <img
                            src="/img/github.jpg"
                            width="208"
                            height="90"
                            alt="profile for Arash Hatami at Github"
                            title="profile for Arash Hatami at Github"
                        ></img>
                    </a>
                </div>
            </main>
        </Layout>
    );
}

export default Contact;
