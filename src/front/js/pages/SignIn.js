import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/signin.css";

import { useNavigate, Link } from "react-router-dom";


export const SignIn = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // console.log("this is your token", store.token);

    const handleClick = (e) => {
        e.preventDefault();
        actions.login(email, password);
        actions.setRegistrationInProgress(true);

        // CONDITIONALS with FRONTEND messages (below in the jsx):
        setTimeout(() => {
            actions.getIdUserAndRoleAndImage(email);
            actions
            actions.setRegistrationInProgress(false);
            if (store.registrationSuccess) {
                actions.setRegistrationSuccess(false);
                navigate("/");
            }
            actions.setRegistrationDoesntExist(false);
            actions.setRegistrationEmpty(false);
            actions.setRegistrationWrong(false);
        }, 2000);
    };

    return (
        <div className="bg-yellow">
            <div className="text-center pt-5 signin_max-width container">

                {!store.registrationSuccess &&
                    <h1 className="font-nunito fs-1 my-4">Acceso a tu cuenta</h1>
                }

                {store.registrationSuccess && (
                    <div className="fs-3 py-5">¡Has iniciado sesión con éxito!</div>
                )}

                {store.registrationEmpty && (
                    <div className="fs-3 py-3">
                        Email y contraseña son necesarios.
                        <br />
                        ¡Inténtalo de nuevo!
                    </div>
                )}

                {store.registrationWrong && (
                    <div className="fs-3 py-3">
                        Email o contraseña es incorrecta.
                        <br />
                        ¡Inténtalo de nuevo!
                    </div>
                )}

                {!store.registrationSuccess && (
                    <div>
                        <form onSubmit={handleClick}>
                            <input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control mt-3"
                            />
                            <input
                                type="password"
                                placeholder="contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control mt-3"
                            />
                            <button
                                type="submit"
                                className="btn rounded-3 rounded sign-in-btn bg-extradark-blue fw-bolder text-light px-md-5 py-3 extradark-grey my-auto mt-3"
                                disabled={store.registrationInProgress}
                            >
                                Login
                            </button>
                        </form>

                        <p className="mt-5 pb-5 extradark-grey fs-5 font-nunito mb-0">
                            ¿Aún no te has registrado? <Link to="/createnewuserprofile"> Haz click aquí. </Link>
                        </p>
                    </div>
                )
                }
            </div >
        </div>
    );
};