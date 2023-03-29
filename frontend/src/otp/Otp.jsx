import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./otp.css"
import { ToastContainer, toast } from 'react-toastify';



const Otp = () => {
    const [one, setOne] = useState("")
    const [two, setTwo] = useState("")
    const [three, setThree] = useState("")
    const [four, setFour] = useState("")
    const [loading, setLoadings] = useState(false)
    const { ids } = useParams()
    const navigate= useNavigate()

    useEffect(()=>{
        setLoadings(true)
    },[])

    const sendOtp = async (e) => {
        e.preventDefault()
        if (one !== "" && two !== "" && three !== "" && four !== "") {
            setLoadings(false)
            await axios.post("http://localhost:8000/otp", {
                ids, one, two, three, four
            }).then((res) => {
                if (res.data.mess === "otp matched") {
                    toast.success('otp matched!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setLoadings(true)
                    navigate("/home")
                } else {
                    toast.error('Wrong otp!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setLoadings(true)

                }
            }).catch((res) => {
                toast.error('server!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setLoadings(true)
            })
        }
    }


    return (
        <>


            <div className="row justify-content-center mt-7">
                <div className="col-lg-5 text-center">
                    <a href="index.html">
                        <img src="assets/img/svg/logo.svg" alt="" />
                    </a>
                    <div className="card mt-5">
                        <div className="card-body py-5 px-lg-5">
                            <div className="svg-icon svg-icon-xl text-purple">
                                <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-g</title><path d="M336,208V113a80,80,0,0,0-160,0v95" style={{ fill: "none", stroke: "#000", strokeLinejoin: "round", strokeWidth: "32px" }}></path><rect x="96" y="208" width="320" height="272" rx="48" ry="48" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLineJoin: "round", strokeWidth: "32px" }}></rect></svg>
                            </div>
                            <h3 className="fw-normal text-dark mt-4">
                                2-step verification
                            </h3>
                            <p className="mt-4 mb-1">
                                We sent a verification code to your email.
                            </p>
                            <p>
                                Please enter the code in the field below.
                            </p>

                            <div className="row mt-4 pt-2">
                                <div className="col">
                                    <input type="text" value={one} onChange={(e) => setOne(e.target.value)} className="form-control form-control-lg text-center py-4" maxlength="1" autofocus="" />
                                </div>
                                <div className="col">
                                    <input type="text" value={two} onChange={(e) => setTwo(e.target.value)} className="form-control form-control-lg text-center py-4" maxlength="1" />
                                </div>
                                <div className="col">
                                    <input type="text" value={three} onChange={(e) => setThree(e.target.value)} className="form-control form-control-lg text-center py-4" maxlength="1" />
                                </div>
                                <div className="col">
                                    <input type="text" value={four} onChange={(e) => setFour(e.target.value)} className="form-control form-control-lg text-center py-4" maxlength="1" />
                                </div>
                            </div>

                            <div className="main">
                            {
                                loading ? 
                                <>
                                <a onClick={sendOtp} href="#!" className="btn btn-purple btn-lg w-100 hover-lift-light mt-4">
                                Verify my account
                            </a>
                                </> : <></>
                            }

                                {
                                    !loading ? 
                                    <>
                                    <div className="spinner-border text-primary" style={{ marginTop: "1rem" }} role="status">
                                    <span class="visually-hidden" style={{ marginTop: "-1rem" }}></span>
                                </div>
                                    </> : <></>
                                }
                            </div>
                            
                        </div>
                    </div>


                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

        </>
    )
}

export default Otp