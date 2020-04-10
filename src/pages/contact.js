import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

function Feature({ imageUrl, title, description }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={classnames("col col--4", styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img
                        className={styles.featureImage}
                        src={imgUrl}
                        alt={title}
                    />
                </div>
            )}
            <h3 className="text--center">{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

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
                        height: "90vh",
                        fontSize: "20px",
                    }}
                >
                    <p>
                        <strong>Email : </strong> info@arash-hatami.ir
                    </p>

                    <p>
                        <strong>Phone : </strong> +98 918 218 0519
                    </p>

                    <h2
                        style={{
                            marginTop: "50px",
                        }}
                    >
                        StackOverflow
                    </h2>

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

                    <h2
                        style={{
                            marginTop: "50px",
                        }}
                    >
                        LinkedIn
                    </h2>

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

                    <h2
                        style={{
                            marginTop: "50px",
                        }}
                    >
                        Github
                    </h2>

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

export default Home;
