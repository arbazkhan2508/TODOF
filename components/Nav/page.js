"use client";
import React from "react";
import style from "./style.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

import {
  asynclogoutstudent,
  asynccurrentstudent,
  asyncaddtask,
} from "@/store/Actions/studentActions";

const Nav = () => {
  const router = useRouter();
  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    } else {
      router.push("/");
    }
  }, [isAuthenticated]);

  const [showloc, setshowloc] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(asynclogoutstudent());
  };

  const toggleJob = () => {
    setshowloc(!showloc);
  };

  const initialreviewData = {
    task: "",
    duedate: "",
    description: "",
    // Add more fields as needed
  };

  const [reviewData, setreviewData] = useState(initialreviewData);

  const inputjobEvent = (event) => {
    const { name, value } = event.target;

    setreviewData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  console.log(reviewData, "us r data");

  const reviewForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncaddtask(reviewData));
      setreviewData(initialreviewData); // Reset form fields
      setFunctionCalled(true);
      toggleJob();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [asynccurrentstudent]);

  useEffect(() => {
    if (functionCalled) {
      dispatch(asynccurrentstudent());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  return (
    <>
      {showloc && (
        <div className={`${style.edu_form}`}>
          <div className={style.e_head}>
            <h6>Add Review</h6>
            <MdClose className={style.close} onClick={toggleJob} />
          </div>
          <div className={style.form_div}>
            <form onSubmit={reviewForm}>
              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={reviewData.task}
                    onChange={inputjobEvent}
                    name="task"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Head text for the review{" "}
                  </label>
                </div>
              </div>
              <div className=" mb-3">
                <label
                  htmlFor="floatingPassword"
                  style={{ marginBottom: "2vh" }}
                >
                  Choose Date
                </label>
                <input
                  type="date"
                  value={reviewData.duedate}
                  onChange={inputjobEvent}
                  className="form-control"
                  name="duedate"
                  placeholder="Recipient's username"
                />
              </div>

              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={reviewData.description}
                    onChange={inputjobEvent}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">description</label>
                </div>
              </div>

              <div className={style.btn}>
                <button
                  onClick={reviewForm}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className={style.nav}>
        <div className={style.mylogo}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaOXXMGdtKBJwGlyphd-8uxWNtxIvbnK8425b3oI7wkA&s"
            alt=""
          />
          <h3>My Todo</h3>
        </div>
        <div className={style.right}>
          <div onClick={toggleJob} className={style.add}>
            <h6>Add Task</h6>
            <AiOutlinePlus className={style.aic} />
          </div>
          {/* <div className={style.profile}>
                       <h6>A</h6>
                   </div> */}
          {student ? (
            <>
              <h6>Heyy , {student.name}</h6>
              <h6 onClick={logout}>Logout</h6>
            </>
          ) : (
            <h6>Sign up</h6>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
