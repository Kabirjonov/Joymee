import React, {  useState } from "react";
import { Basic, Button, Input } from "../../ui";
import { Head } from "../home";
import { toast } from "react-toastify";
function Contact() {
  const [loading,setLoading]=useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Message sent successfully!");
      setFirstName('')
      setEmail("")
      setLastName('')
      setMessage('')
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }

    setLoading(false);
  };
  return (
    <>
      <Basic name="Contact Us" title="Get Help & Friendly Support">
        <form className="px-2" onSubmit={handleSubmit}>
          <Head title="Fill up the form" classNameDiv="text-center" />
          <div className="row mb-2 mt-3">
            <div className="col-md-6 form-group p-1">
              <Input label="First Name" setState={setFirstName} state={firstName}/>
            </div>
            <div className="col-md-6 form-group p-1">
              <Input label="Last Name" setState={setLastName} state={lastName} />
            </div>
            <div className="col-12 form-group p-1">
              <Input label="Email address" type='email' setState={setEmail} state={email} />
            </div>
            <div className="col-12 form-group p-1">
              <Input label="Message" type='textarea' setState={setMessage} state={message} />
            </div>
          </div>
          <Button disabled={loading}>{loading?'Sending...':'Send'}</Button>
        </form>
      </Basic>
    </>
  );
}

export default Contact;
