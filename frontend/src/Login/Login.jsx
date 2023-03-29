import React, { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom'
import axios from "axios"
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
// import Loading from '../Loading/Loading';

const Login = () => {
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const [forgetPass, setForgetPass] = useState("")
	const [loding, setLoing] = useState(false)
	const [loadings, setLoadings] = useState(false)
	const navigate = useNavigate()
	
	
	useEffect(() => {
		setLoing(true)
		setLoadings(true)
		document.title ="EmailAuth | Login"
	}, [])

	

	const Send = async (e) => {
		try {

			if (forgetPass === "") {
				setLoing(false)
				toast.warn('Fill Data!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				setLoing(true)
				return false;
			}
			e.preventDefault()
			setLoing(false)
			await axios.post("http://localhost:8000/verification", {
				forgetPass
			}).then((res) => {
				if (res.data.mess === "NO account") {
					toast.warn('No such account!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
					setLoing(true)
				} else {
					const ids = res.data.id
					
					toast.success('Check Mail!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
					setLoing(true)
					navigate(`/verification/${ids}`)
					
				}
			})

		} catch (e) {
			console.log(e)
		}
	}




	const Logins = async (e) => {
		e.preventDefault()
		
		if (email !== "" && pass !== "") {
			setLoadings(false)
			await axios.post("http://localhost:8000/login", {
				email, pass
			}).then((res) =>
			 {
				if(res.data.mess === "user find"){
					
					toast.success('Success!', {
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
				}else if(res.data.mess === "wrong pass"){
					
					toast.error('wrong pass!', {
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
				}else if(res.data.mess === "no account find"){
					
					toast.warn('No such account!', {
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
			}).catch((e)=>{
				console.error(e)
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
								<p className="lead">
									Start creating the best possible user experience for you customers.
								</p>
							</div>

							<div className="card">
								<div className="card-body">
									<div className="m-sm-4">
										<form>
											<div className="form-group">
												<label>Email</label>
												<input className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter your email" required />
											</div>
											<div className="form-group">
												<label>Password</label>
												<input className="form-control form-control-lg" value={pass} onChange={(e) => setPass(e.target.value)} type="password" name="password" placeholder="Enter password" required />
											</div>
											<div className="text-center mt-3">

												{
													loadings ?
														<>
															<button type="submit" className="btn btn-lg btn-primary" onClick={Logins}>Login</button>
														</> : <></>
												}
												{
													!loadings ?
														<>
															<div className="spinner-border text-primary" style={{ marginTop: "1rem" }} role="status">
																<span class="visually-hidden" style={{ marginTop: "-1rem" }}></span>
															</div>
														</> : <></>
												}
											</div>
										</form>

									</div>
								</div>
							</div>
											<div className="text-center mt-3">
												<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
													Forget Password ?
												</button>
											</div>

						</div>
					</div>
				</div>
			</div>


			<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="staticBackdropLabel">Enter Email Id</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<input className="form-control form-control-lg" value={forgetPass} onChange={(e) => setForgetPass(e.target.value)} type="email" name="email" placeholder="Enter your email" required />
						</div>
						<div class="modal-footer">
							{
								loding ?
									<>
										<button type="button" class="btn btn-secondary" onClick={Send} >Send</button>
									</> : <></>
							}

							{
								!loding ?
									<>
										<div className="spinner-border text-primary" style={{ marginTop: "1rem" }} role="status">
											<span class="visually-hidden" style={{ marginTop: "-1rem" }}></span>
										</div>
									</> : <></>
							}
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

export default Login