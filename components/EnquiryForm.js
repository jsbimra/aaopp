import React, { useState } from "react";
import styles from "../styles/Form.module.scss";
import ReCAPTCHA from "react-google-recaptcha";

import Loader from "../components/Loader";

function EnquiryForm(props) {
  const [submitting, setSubmitting] = useState(false);
  const [captchaValidate, setCaptchaValidate] = useState({
    status: false,
    value: null
  });

  const mangoTypes = ["Ratnagiri", "Devgarh"].sort();
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
    reachTimeStart: "10:00",
    reachTimeEnd: "12:30",
    day: dayTypes[0],
    message: ""
  };

  const formInitialState = {
    name: "",
    mobile: "",
    email: "",
    productType: "",
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
    const { name, value} = e.target;

    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCaptcha = (value) => {
    console.log("Captcha value:", value);

    if(value) {
      setCaptchaValidate({
        status: true,
        value
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!captchaValidate.status) {
      console.log('Captcha not validated yet ');
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
          {title ? <h2 className={styles.h2+ ' text-center'}>{title}</h2> : null}
          <form onSubmit={handleSubmit} className="mb-3" validate="true">
            <div className={styles.inputGroup}>
              <label htmlFor="name" className="form-label">
                Name<sup>*</sup>:
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                defaultValue={formData.name}
                onChange={handleChange}
                className={"form-control"}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phoneno">
                Mobile<sup>*</sup>:
              </label>
              <input
                required
                type="number"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile"
                defaultValue={formData.mobile}
                onChange={handleChange}
                className={"form-control"}
                minLength="10"
                maxLength="10"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">
                Email<sup>*</sup>:
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={formData.email}
                onChange={handleChange}
                className={"form-control"}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mangoType">
                Mango Type<sup>*</sup>:
              </label>
              <select
                required
                id="mangoType"
                name="productType"
                defaultValue={formData.productType}
                onChange={handleChange}
                className={"form-control"}
              >
                <option>Select</option>
                {mangoTypes.map((type, idx) => (
                  <option key={"option-" + idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <label>Day and Time we can reach you back</label>

            <div className="row">
              <div className="col-sm-5 col-md-6">
                <div className={styles.inputGroup}>
                  <label>Day:</label>
                  {dayTypes.map((type, idx) => {
                    return (
                      <label key={`day-` + idx} htmlFor={`day-` + idx}>
                        <input
                          type="radio"
                          id={`day-` + idx}
                          name="day"
                          defaultValue={type}
                          defaultChecked={type === formData.day ? true : false}
                          onChange={handleChange}
                        />
                        {" " +type}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="col-sm-7 col-md-6">
                <div className={styles.inputGroup}>
                  <label className="form-label" htmlFor="reachTimeStart">
                    Time<sup>*</sup>:
                  </label>
                  <div className="d-flex align-items-center justify-content-between">
                    <select
                      required
                      id="reachTimeStart"
                      name="reachTimeStart"
                      defaultValue={formData.reachTimeStart}
                      onChange={handleChange}
                      className={"form-control w-50"}
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
                    to
                    <select
                      required
                      name="reachTimeEnd"
                      defaultValue={formData.reachTimeEnd}
                      onChange={handleChange}
                      className={"form-control w-50"}
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
                  </div>
                  <small className="d-inline-block text-right text-secondary">
                    Assuming you will be selecting right start and end time of
                    selection.
                  </small>
                </div>
              </div>
            </div>
            <div className={styles.inputGroup}>
            <label htmlFor="">
                We need to validate you are human:
              </label>
              {/* {'SITE Key ' +process.env.NEXT_PUBLIC_reCaptchaSiteKeyV3} */}
              <input type="hidden" value={process.env.NEXT_PUBLIC_reCaptchaSiteKeyV3} />
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_reCaptchaSiteKeyV3 || ''}
                onChange={handleCaptcha}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="submit"
                className="btn btn-primary"
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
      <Loader show={submitting} message={"Moment please "} />
    </>
  );
}

export default EnquiryForm;
