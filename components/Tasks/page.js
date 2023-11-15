"use client";
import React from "react";
import style from "./style.module.css";
import { BsCircle } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Nav from "@/components/Nav/page";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import {
  asynccurrentstudent,
  asyncfindtask,
  asyncupdatetask,
  asyncdeletetask,
  asynccomplete,
} from "@/store/Actions/studentActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
const tasks = () => {
  const { findtask } = useSelector((state) => state.studentReducers);
  const dispatch = useDispatch();
  const router = useRouter();
  const { student, isAuthenticated, alltasks } = useSelector(
    (state) => state.studentReducers
  );
  const [functionCalled, setFunctionCalled] = useState(false);

  const [updateData, setUpdateData] = useState("");

  useEffect(() => {
    if (functionCalled) {
      dispatch(asynccurrentstudent());
      dispatch(asynccurrentstudent());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [asynccurrentstudent]);

  useEffect(() => {
    setUpdateData(findtask);
    // setIsChecked(event.target.checked);
  }, [findtask]);

  console.log(updateData, "its updr");

  {
    updateData && console.log(updateData.duedate, "ust shsj");
  }

  const updateEvent = (event) => {
    const { name, value } = event.target;
    setUpdateData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const resetUpdateData = () => {
    setUpdateData("");
  };

  const findtaskHandler = async (id) => {
    try {
      console.log("hitted");
      console.log(id, "hitted");
      // const { data } = await axios.get(`/resume/findj/${id}`);
      dispatch(asyncfindtask(id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskHandler = async (id) => {
    try {
      console.log(id, "its id");
      event.preventDefault();
      dispatch(asyncupdatetask(id, updateData));
      resetUpdateData();
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deletetask = async (id) => {
    try {
      console.log("hitted");
      dispatch(asyncdeletetask(id));
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };
  const completetask = async (id) => {
    try {
      console.log(id, "its od id");
      dispatch(asynccomplete(id));
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {updateData && (
        <div className={`${style.edu_form}`}>
          <div className={style.e_head}>
            <h6>Add Review</h6>
            <MdClose className={style.close} onClick={resetUpdateData} />
          </div>
          <div className={style.form_div}>
            <form onSubmit={() => updateTaskHandler(updateData._id)}>
              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={updateData.task}
                    onChange={updateEvent}
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
                  Choose Due Date
                </label>
                <input
                  type="date"
                  value={updateData.duedate}
                  onChange={updateEvent}
                  className="form-control"
                  name="duedate"
                  placeholder="Recipient's username"
                />
              </div>

              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={updateData.description}
                    onChange={updateEvent}
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
                  onClick={() => updateTaskHandler(updateData._id)}
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
      <div className={style.task_container}>
        <Nav />
        <div className={style.taskss}>
          <div className={style.head}>
            <h2>My Tasks</h2>
          </div>
         { student ? (
          <div className={style.tasks}>
            {student &&
              student.tasks &&
              student.tasks.map((el, i) => {
                const isCompleted =
                  student.complited && student.complited.includes(el._id);
                return (
                  <div key={i} className={style.task}>
                    <div className={style.tcard}>
                      <div className={style.tcl}>
                        <div className={style.tcl1}>
                          <BsCircle />
                          <small>{el.task}</small>
                        </div>
                        <h5>{el.description}</h5>
                        <p>
                          Created Date :{" "}
                          {new Date(el.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                          Due Date : {new Date(el.duedate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={style.tcr}>
                        {isCompleted ? (
                          <small key={i}>Completed</small>
                        ) : (
                          <small key={i} onClick={() => completetask(el._id)}>
                            Mark Completed
                          </small>
                        )}

                        <BiPencil
                          onClick={() => findtaskHandler(el._id)}
                          className={style.icns}
                        />
                        <MdDelete
                          onClick={() => {
                            deletetask(el._id);
                          }}
                          className={style.icns}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={210}
              height={118}
            /> */}
          </div>
          ) : (
          <Skeleton variant="rectangular" width={500} height={450} />
          )}
          {/* <div className={style.adbutton}>
            <h6>Add Task</h6>
            <AiOutlinePlus className={style.aic} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default tasks;
