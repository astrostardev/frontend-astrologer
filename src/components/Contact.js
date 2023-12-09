import "../Stylesheets/Contact.css"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";


function Contact() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful, reset]);

    const validation = {
        name: {
            required: {
                value: true,
                message: "*Required",
            },
        },
        email: {
            required: {
                value: true,
                message: "*Required",
            },
            pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Enter valid Email address",
            },
        },
        mobile: {
            required: {
                value: true,
                message: "*Required",
            },
            pattern: {
                value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: "Enter valid mobile number"
            }
        },
        message: {
            required: {
                value: true,
                message: "*Required",
            },
            minLength: {
                value: 10,
                message: "*Message incomplete"
            }
        },
    };


    return (
        <main id="contact">
            <section className="contactUS">
                <h2 className="fw-bold mb-4">Contact Us</h2>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,</p>
            </section>
            <section className="contactForm">
                <form className="" onSubmit={handleSubmit((data, e) => {
                    e.preventDefault();
                    setSuccess(true)
                })}>
                    <div className="form-floating my-4">
                        <input type="text" className="form-control" id="name" placeholder="Name" {...register("name", validation.name)} />
                        <label htmlFor="name">Name*</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" {...register("email", validation.email)} />
                        <label htmlFor="email">Email*</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="number" className="form-control" id="mobile" placeholder="Mobile number" {...register("mobile", validation.mobile)} />
                        <label htmlFor="mobile">Mobile*</label>
                    </div>
                    <div className="form-floating mb-4">
                        <textarea className="form-control" placeholder="Leave your message here" id="message" style={{ height: "100px" }} {...register("message", validation.message)}></textarea>
                        <label htmlFor="message">Message*</label>
                    </div>
                    <p className="errormsg my-3">{errors.name && errors.name.message || errors.email && errors.email.message || errors.message && errors.message.message || errors.mobile && errors.mobile.message}</p>
                    <button className="contactBtn mb-4">Submit</button>
                    {success && <>
                        <span style={{ color: "green", display: "block", fontSize: "16px" }} className="autoHide">Thank You!!! We will reach out to you soon!!!</span>
                    </>}
                </form>
            </section>
        </main>
    )
}


export default Contact