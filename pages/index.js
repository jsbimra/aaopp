import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../styles/Home.module.scss";
import VideoBox from "../components/VideoBox";
import EnquiryForm from "../components/EnquiryForm";

export default function IndexPage() {
  return (
    <div className={styles.container}>
      <header className="p-0 m-0">
        <h1 className={styles.logo} style={{fontSize: '1.3rem'}}>AAOPP</h1>
        <h2 className="text-center zenFontStyle mb-3 pb-0">Season Fruit</h2>
        <h5 className="text-center">Mangoes!</h5>
      </header>

      <div className={styles.main + " ml-5 mr-5 "}>
        {/* <p className="text-small text-secondary">We will get back to with your query. Thank you.</p> */}
        <VideoBox autoPlay={false} />

        <EnquiryForm title="Enquiry for Rates & Delivery" />
      </div>

      <footer className="text-center mt-5 p-2">
        <p className="text-secondary text-black-50">Thank you for visiting.</p>
        <cite>
          {/* <small className="text-muted">&copy; {new Date().getFullYear()} all rights reserved. </small> */}
        </cite>
      </footer>
    </div>
  );
}
