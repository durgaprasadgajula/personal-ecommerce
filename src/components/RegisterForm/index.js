// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./index.css";

// function RegisterForm() {
//     const navigate = useNavigate();

//     const [state, setState] = useState({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         showSubmitError: false,
//         errorMsg: "",
//     });

//     const onSubmitSuccess = () => {
//         navigate("/login");
//     };

//     const onChangeUsername = (event) => {
//         setState((prevState) => ({
//             ...prevState,
//             username: event.target.value,
//         }));
//     };

//     const onChangeEmail = (event) => {
//         setState((prevState) => ({ ...prevState, email: event.target.value }));
//     };

//     const onChangePassword = (event) => {
//         setState((prevState) => ({
//             ...prevState,
//             password: event.target.value,
//         }));
//     };

//     const onChangeConfirmPassword = (event) => {
//         setState((prevState) => ({
//             ...prevState,
//             confirmPassword: event.target.value,
//         }));
//     };

//     // const onSubmitFailure = (errorMsg) => {
//     //     setState({ ...state, showSubmitError: true, errorMsg });
//     // };

//     const submitForm = async (event) => {
//         event.preventDefault();
//         const { username, email, password, confirmPassword } = state;
//         if (password !== confirmPassword) {
//             setState({
//                 ...state,
//                 showSubmitError: true,
//                 errorMsg: "Passwords do not match",
//             });
//             return;
//         }
//         const userDetails = { username, email, password };
//         const url = "http://localhost:8000/register";
//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userDetails),
//         };

//         try {
//             const response = await fetch(url, options);
//             const data = await response.json();
//             if (response.ok) {
//                 onSubmitSuccess();
//             } else {
//                 setState({
//                     ...state,
//                     showSubmitError: true,
//                     errorMsg: data.message,
//                 });
//             }
//         } catch (error) {
//             console.error("Error registering user:", error);
//             setState({
//                 ...state,
//                 showSubmitError: true,
//                 errorMsg: "An error occurred. Please try again.",
//             });
//         }
//     };

//     const renderUsernameField = () => {
//         const { username } = state;
//         return (
//             <>
//                 <label className="input-label" htmlFor="username">
//                     USERNAME
//                 </label>
//                 <input
//                     type="text"
//                     id="username"
//                     className="username-input-field"
//                     value={username}
//                     onChange={onChangeUsername}
//                     placeholder="Username"
//                 />
//             </>
//         );
//     };

//     const renderEmailField = () => {
//         const { email } = state;
//         return (
//             <>
//                 <label className="input-label" htmlFor="email">
//                     EMAIL
//                 </label>
//                 <input
//                     type="email"
//                     id="email"
//                     className="username-input-field"
//                     value={email}
//                     onChange={onChangeEmail}
//                     placeholder="Email"
//                 />
//             </>
//         );
//     };

//     const renderPasswordField = () => {
//         const { password } = state;
//         return (
//             <>
//                 <label className="input-label" htmlFor="password">
//                     PASSWORD
//                 </label>
//                 <input
//                     type="password"
//                     id="password"
//                     className="password-input-field"
//                     value={password}
//                     onChange={onChangePassword}
//                     placeholder="Password"
//                 />
//             </>
//         );
//     };

//     const renderConfirmPasswordField = () => {
//         const { confirmPassword } = state;
//         return (
//             <>
//                 <label className="input-label" htmlFor="confirmPassword">
//                     CONFIRM PASSWORD
//                 </label>
//                 <input
//                     type="password"
//                     id="confirmPassword"
//                     className="password-input-field"
//                     value={confirmPassword}
//                     onChange={onChangeConfirmPassword}
//                     placeholder="Confirm Password"
//                 />
//             </>
//         );
//     };

//     const { showSubmitError, errorMsg } = state;

//     return (
//         <div className="login-form-container">
//             <img
//                 src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712597163/Screenshot_2024-04-08_223200_szybqq.png"
//                 className="login-website-logo-mobile-img"
//                 alt="website logo"
//             />
//             <img
//                 src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712592804/6505894_ad09hr.jpg"
//                 className="login-img"
//                 alt="website login"
//             />

//             <form className="form-container" onSubmit={submitForm}>
//                 <img
//                     src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712597163/Screenshot_2024-04-08_223200_szybqq.png"
//                     className="login-website-logo-desktop-img"
//                     alt="website logo"
//                 />
//                 <div className="input-container">{renderUsernameField()}</div>
//                 <div className="input-container">{renderEmailField()}</div>
//                 <div className="input-container">{renderPasswordField()}</div>
//                 <div className="input-container">
//                     {renderConfirmPasswordField()}
//                 </div>
//                 <button type="submit" className="login-button">
//                     Register
//                 </button>
//                 {showSubmitError && (
//                     <p className="error-message">*{errorMsg}</p>
//                 )}
//             </form>
//         </div>
//     );
// }

// export default RegisterForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function RegisterForm() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onChangeUsername = (event) => {
        setState((prevState) => ({
            ...prevState,
            username: event.target.value,
        }));
    };

    const onChangeEmail = (event) => {
        setState((prevState) => ({ ...prevState, email: event.target.value }));
    };

    const onChangePassword = (event) => {
        setState((prevState) => ({
            ...prevState,
            password: event.target.value,
        }));
    };

    const onChangeConfirmPassword = (event) => {
        setState((prevState) => ({
            ...prevState,
            confirmPassword: event.target.value,
        }));
    };

    const submitForm = async (event) => {
        event.preventDefault();
        const { username, email, password, confirmPassword } = state;
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const userDetails = { username, email, password };
        const url = "http://localhost:8000/register";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                toast.success("Successfully Registered!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000); // Redirect after 2 seconds
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <motion.div
            className="login-form-container"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <img
                src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712597163/Screenshot_2024-04-08_223200_szybqq.png"
                className="login-website-logo-mobile-img"
                alt="website logo"
            />
            <img
                src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712592804/6505894_ad09hr.jpg"
                className="login-img"
                alt="website login"
            />

            <form className="form-container" onSubmit={submitForm}>
                <img
                    src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712597163/Screenshot_2024-04-08_223200_szybqq.png"
                    className="login-website-logo-desktop-img"
                    alt="website logo"
                />
                <div className="input-container">
                    <label className="input-label" htmlFor="username">
                        USERNAME
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="username-input-field"
                        value={state.username}
                        onChange={onChangeUsername}
                        placeholder="Username"
                    />
                </div>
                <div className="input-container">
                    <label className="input-label" htmlFor="email">
                        EMAIL
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="username-input-field"
                        value={state.email}
                        onChange={onChangeEmail}
                        placeholder="Email"
                    />
                </div>
                <div className="input-container">
                    <label className="input-label" htmlFor="password">
                        PASSWORD
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="password-input-field"
                        value={state.password}
                        onChange={onChangePassword}
                        placeholder="Password"
                    />
                </div>
                <div className="input-container">
                    <label className="input-label" htmlFor="confirmPassword">
                        CONFIRM PASSWORD
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="password-input-field"
                        value={state.confirmPassword}
                        onChange={onChangeConfirmPassword}
                        placeholder="Confirm Password"
                    />
                </div>
                <button type="submit" className="login-button">
                    Register
                </button>
            </form>
            <ToastContainer />
        </motion.div>
    );
}

export default RegisterForm;
