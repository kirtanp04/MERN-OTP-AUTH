import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./signup.css"
// import Loading from '../Loading/Loading';

const Signup = () => {
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		
	}, [])

	const Sign = async (e) => {
		if (name === "" || phone === "" || email === "" || pass === "") {
			setLoading(false)
			toast.warn('Fill data first!', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			setLoading(true)
		} else {
			e.preventDefault()
			setLoading(false)
			await axios.post("http://localhost:8000/signup", {
				name, phone, email, pass
			}).then((res) => {
				if (res.data.mess === "exist") {
					toast.error('Email Exist!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
					setLoading(true)
				} else if (res.data.mess === "created") {
					toast.success('Account Created!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
					setName("")
					setEmail("")
					setPass("")
					setPhone("")
					setLoading(true)
					navigate("/login")
				} else if (res.data.mess === "server error") {
					toast.error('Server Error!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
					setLoading(true)
				}
			}).catch((e) => {
				console.log(e)
				setLoading(true)
			})
		}
	}

	return (
		<>
			<div className="container h-100">
				<div className="row h-100">
					<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
						<div className="d-table-cell align-middle">

							<div className="text-center mt-4">
								<h1 className="h2">Get started</h1>

							</div>

							<div className="card">
								<div className="card-body">
									<div className="m-sm-4">
										<form>
											<div className="form-group">
												<label>Name</label>
												<input className="form-control form-control-lg" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
											</div>
											<div className="form-group">
												<label>Mobile</label>
												<input className="form-control form-control-lg" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your Number" required />
											</div>
											<div className="form-group">
												<label>Email</label>
												<input className="form-control form-control-lg" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
											</div>
											<div className="form-group">
												<label>Password</label>
												<input className="form-control form-control-lg" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password" required />
											</div>
											{
												loading ?
													<>
														<div className="text-center mt-3">

															<button type="submit" className="btn btn-lg btn-primary" onClick={Sign}>Sign up</button>
														</div>
													</> : <></>
											}
											{
												!loading ?
													<>
														<div className="spinner-border text-primary" style={{ marginLeft: "13.5rem", marginTop:"1rem" }} role="status">
															<span class="visually-hidden"></span>
														</div>
													</> : <></>
											}
											<div className="text-center mt-3">
												<p>Already have account? <NavLink to="login">Signin</NavLink></p>
											</div>
										</form>

									</div>
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
			</div>


		</>
	)
}

export default Signup