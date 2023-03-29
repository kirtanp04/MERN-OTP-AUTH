import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./home.css"

const Home = () => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)

    const Fetch = async () => {

        try {
            setLoading(false)
            await axios.get("http://localhost:8000/user")
                .then((data) => {
                    setUser(data.data)
                    setLoading(true)
                })
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        Fetch()
    }, [])

    return (
        <>
            <h1 className='h1'>All users</h1>
            <table className="tables table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Sr</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                {
                    loading ?
                        <>
                            {
                                user.map((val, id) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{id + 1}</th>
                                                    <td>{val.name}</td>
                                                    <td>{val.email}</td>
                                                    <td>{val.phone}</td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })
                            }
                        </> : <></>
                }


            </table>
                {
                    !loading ?
                        <>
                            <div className="spinner-border text-primary" style={{ marginTop: "14rem",position:"absolute",left:"50%" }} role="status">
                                <span className="visually-hidden" ></span>
                            </div>
                        </> : <></>
                }
        </>
    )
}

export default Home