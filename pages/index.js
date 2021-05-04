import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import styles from "../styles/Home.module.scss";
import VideoBox from "../components/VideoBox";
import EnquiryForm from "../components/EnquiryForm";

export default function IndexPage() {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.logo}>AAOPP</h1>
      </header>

      <VideoBox autoPlay={false} />

      <div className={styles.main + " ml-5 mr-5 "}>
        {/* <p className="text-small text-secondary">We will get back to with your query. Thank you.</p> */}

        <EnquiryForm title="Enquiry for Rates & Delivery" />
      </div>

      <footer className="text-center mt-5 p-2">
        <p className="text-secondary text-small">Thank you for visiting.</p>
        <cite>
          Copyright {new Date().getFullYear()}
          <br />
          <small>All rights reserved.</small>
        </cite>
      </footer>
    </div>
  );
}
