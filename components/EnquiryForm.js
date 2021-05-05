import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../styles/Form.module.scss";
import ReCAPTCHA from "react-google-recaptcha";

import Loader from "../components/Loader";
import ToastAlert from "../components/ToastAlert";

function EnquiryForm(props) {
  const [submitting, setSubmitting] = useState(false);
  const [captchaValidate, setCaptchaValidate] = useState({
    status: false,
    error: false,
    value: null,
    isInvalid: false,
  });

  const mangoTypes = ["Ratnagiri", "Devgarh", "for Both"].sort();
  // const mangoTypes = ["Devgarh"].sort();
  const dozen = [1,2,4,5,"more than 5"];
  const timeOptions = () => {
    const startTime = 1000;
    const endTime = 2000;
    const options = [];

    let next = startTime;

    while (next <= endTime) {
      if (next !== endTime) {
        let secondInterval = next + 30;
        options.push(formatTime(next), formatTime(secondInterval));
      } else {
        options.push(formatTime(next));
      }
      next = next + 100;
    }

    return options;
  };

  const formatTime = (time) => {
    if (!time) return;

    let splitTime = time + "".split("");
    const formatted = `${splitTime[0]}${splitTime[1]}:${splitTime[2]}${splitTime[3]}`;
    return formatted;
  };
  const dayTypes = [
    "Mon to Fri",
    "Saturday or Sunday",
    "Only Saturday",
    "Only Sunday"
  ];

  const testDefaultValue = {
    name: "TestBoy",
    mobile: "123467890",
    email: "test@test.com",
    productType: mangoTypes[1],
    dozen: dozen[4],
    reachTimeStart: "10:00",
    reachTimeEnd: "12:30",
    day: dayTypes[3],
    message: ""
  };

  const formInitialState = {
    name: "",
    mobile: "",
    email: "",
    productType: "",
    dozen: dozen[0],
    reachTimeStart: "10:00",
    reachTimeEnd: "12:30",
    day: dayTypes[1],
    message: ""
  };

  // console.log({ formInitialState });
  // const [formData, setFormData] = useState({ ...testDefaultValue });
  const [formData, setFormData] = useState({ ...formInitialState });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    // e.preventDefault(); //cause radio to twice click to reflect change
    const { name, value } = e.target;

    if (name) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCaptcha = (value) => {
    // console.log("Captcha value:", value);

    if (value) {
      setCaptchaValidate({
        status: true,
        isInvalid: false,
        value
      });
      return;
    }

    setCaptchaValidate({
      ...captchaValidate,
      error: true,
    });
  };

  const handleCaptchaEror = (error) => {
    console.log("Captcha error:", error);
   
    setCaptchaValidate({
      ...captchaValidate,
      error: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(captchaValidate.status)
    if (!captchaValidate.status) {
      console.log("Captcha not validated yet ");
      setCaptchaValidate({
        ...captchaValidate,
        isInvalid: true
      });
      return;
    }

    // console.log("Sending", formData);

    let data = {
      ...formData,
      captchaValidate: captchaValidate.value
    };

    setSubmitting(true);

    fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        // console.log("Response received",
        // res
        // );
        setSubmitting(false);
        if (res.status === 200) {
          const result = await res.json();
          // console.log("Response succeeded!", result);

          if (result.success) {
            setSubmitted(true);
          }
        }
      })
      .catch((error) => {
        // console.log("Error ", new Error(error));
        setSubmitting(false);
      });
  };

  const returnToForm = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setFormData({ ...formInitialState });
  };

  const { title } = props;

  return (
    <>
      {/* {'env ' + process.env.NEXT_PUBLIC_reCaptchaSiteKeyV3} */}

      {!submitted ? (
        <>
          {title ? (
            <h2 className={styles.h2 + " text-center"}>{title}</h2>
          ) : null}
          <form onSubmit={handleSubmit} className="mb-3" validate="true">
            
            <div className={styles.inputGroup + " form-floating"}>
              <input
                required
                type="text"
                id="name"
                name="name"
                defaultValue={formData.name}
                onChange={handleChange}
                className={"form-control form-control-sm"}
                placeholder="Enter your name"
              />
              <label htmlFor="name" className="form-label1">
                Name:<sup>*</sup>
              </label>
            </div>
            <div className={styles.inputGroup + " form-floating"}>
             
              <input
                required
                type="number"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile"
                defaultValue={formData.mobile}
                onChange={handleChange}
                className={"form-control form-control-sm"}
                minLength="10"
                maxLength="10"
              />
               <label htmlFor="mobile">
                Mobile:<sup>*</sup>
              </label>
            </div>
            <div className={styles.inputGroup + " form-floating"}>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={formData.email}
                onChange={handleChange}
                className={"form-control form-control-sm"}
              />
              <label htmlFor="email">
                Email:<sup>*</sup>
              </label>
            </div>

            <div className={styles.inputGroup + " form-floating"}>
              <select
                required
                id="mangoType"
                name="productType"
                defaultValue={formData.productType}
                onChange={handleChange}
                className={"form-select form-select-sm"}
              >
                
                <option>Select</option>
                {mangoTypes.map((type, idx) => (
                  <option key={"option-" + idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label htmlFor="mangoType">
                Mango type:<sup>*</sup>
              </label>
            </div>

            <div className={styles.inputGroup + " form-floating"}>
              <select
                required
                id="dozen"
                name="dozen"
                defaultValue={formData.dozen}
                onChange={handleChange}
                className={"form-select form-select-sm"}
              >
                
                <option>Select</option>
                {dozen.map((value, idx) => (
                  <option key={"option-" + idx} 
                  value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <label htmlFor="dozen">
                How many dozen?:<sup>*</sup>
              </label>
            </div>

            <label>Day and Time we can reach you back</label>

            <div className="row">
              <div className="col-sm-5 col-md-6">
                <div>
                  <label>Day:</label>
                  {dayTypes.map((type, idx) => {
                    return (
                      <div key={`day-` + idx}  className={"form-check"}>
                        <input
                          type="radio"
                          id={`day-` + idx}
                          name="day"
                          defaultValue={type}
                          defaultChecked={type === formData.day ? true : false}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                      <label htmlFor={`day-` + idx}
                          className="form-check-label"
                      >
                      {" " + type}
                      </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-sm-7 col-md-6">
                <label>Time:</label>
                <div className={styles.inputGroup}>
                  <div className=" d-flex align-items-center 
                  justify-content-stretch">
                    <div className="form-floating flex-fill ">                    
                      <select
                        required
                        id="reachTimeStart"
                        name="reachTimeStart"
                        defaultValue={formData.reachTimeStart}
                        onChange={handleChange}
                        className={"form-select form-select-sm"}
                      >
                        <option>Start Time</option>
                        {timeOptions().map((time, idx) => {
                          return (
                            <option key={"option-" + idx} value={time}>
                              {time}
                            </option>
                          );
                        })}
                      </select>
                      <label htmlFor="reachTimeStart">
                        From:<sup>*</sup>
                      </label>
                    </div>
                    <span className="text-center flex-fill text-secondary">{" "}until{" "}</span>
                    <div className="form-floating flex-fill ">                    
                      <select
                        required
                        id="reachTimeEnd"
                        name="reachTimeEnd"
                        defaultValue={formData.reachTimeEnd}
                        onChange={handleChange}
                        className={"form-select form-select-sm"}
                      >
                        <option>End Time</option>
                        {timeOptions().map((time, idx) => {
                          return (
                            <option key={"option-" + idx} value={time}>
                              {time}
                            </option>
                          );
                        })}
                      </select>
                      <label htmlFor="reachTimeEnd">
                        To:<sup>*</sup>
                      </label>
                    </div>
                  </div>
                  <small className="d-inline-block text-right text-secondary">
                    Assuming you will be selecting right start and end time of
                    selection.
                  </small>
                </div>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="">Verify captcha code:<sup>*</sup></label>
              {/* {'SITE Key ' +process.env.NEXT_PUBLIC_reCaptchaSiteKeyV2} */}
              {/* <input type="hidden" value={process.env.NEXT_PUBLIC_reCaptchaSiteKeyV2}  /> tested working now */}
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_reCaptchaSiteKeyV2 || ""}
                onChange={handleCaptcha}
                onErrored={handleCaptchaEror}
              />
              <small className="d-inline-block text-right text-secondary">This is security purpose check.</small>
            </div>
            
            <div className={'mt-4 d-flex'}>
              <input
                type="submit"
                className="btn btn-primary flex-fill"
                defaultValue="Send"
              />
            </div>
          </form>
        </>
      ) : (
        <div className="card mt-4 mb-4">
          <div className="card-body">
            <h4 className="card-title">Thank you</h4>
            <p className="card-text">
              Your Enquiry have been sent successfull! We will get back to you
              soon.
            </p>
            <span className="card-link">Happy Mangoes!</span>

            <p className="mt-3 text-center">
              (
              <a href="#" onClick={returnToForm}>
                Back to form
              </a>
              )
            </p>
          </div>
        </div>
      )}
      {captchaValidate.status}
      <Loader show={submitting} message={"Moment please "} />
      <ToastAlert 
        show={captchaValidate.error}
        type={'error'}
        heading="Alert"
        message={'We are facing recaptcha issue, please try after sometime.'} />
      <ToastAlert 
        show={captchaValidate.isInvalid}
        type={'error'}
        heading="Alert"
        message={'Please verify captcha.'} />
    </>
  );
}

export default EnquiryForm;
