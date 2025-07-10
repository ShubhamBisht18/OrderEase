import React, { useState } from "react";

export default function Contact() {
  const [buttonText, setButtonText] = useState("Submit");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "ed420882-50ae-47d5-9981-3e519b9aa1fe");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setButtonText("Submitted");
      setTimeout(() => setButtonText("Submit"), 1500);
    } else {
      setButtonText("Submit");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 py-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-500">Get in Touch</h1>
        <p className="text-gray-600 text-lg mt-2">We'd love to hear from you.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <img src="src\assets\location.png" className="w-10 h-10" alt="Location" />
            <div>
              <h2 className="text-xl font-semibold text-orange-500">Our Location</h2>
              <p className="text-gray-500">Haldwani, Uttarakhand</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <img src="src\assets\email.png" className="w-8 h-8" alt="Email" />
            <div>
              <h2 className="text-xl font-semibold text-orange-400">Email Us</h2>
              <p className="text-gray-500">MyContact05@gmail.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <img src="src\assets\phone.png" className="w-8 h-8" alt="Phone" />
            <div>
              <h2 className="text-xl font-semibold text-orange-400">Call Us</h2>
              <p className="text-gray-500">+91 75xxxxxxx321</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-orange-400">Send Us a Message</h2>

          <div>
            <label className="text-sm font-medium text-gray-600">Full Name *</label>
            <input
              type="text"
              name="Name"
              required
              placeholder="Your Name"
              className="w-full mt-1 px-4 py-2 border-b-2 border-orange-200 focus:outline-none focus:border-orange-400 text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Email *</label>
            <input
              type="email"
              name="Email"
              required
              placeholder="example@email.com"
              className="w-full mt-1 px-4 py-2 border-b-2 border-orange-200 focus:outline-none focus:border-orange-400 text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Phone *</label>
            <input
              type="text"
              name="Phone Number"
              required
              placeholder="+91 98765 43210"
              className="w-full mt-1 px-4 py-2 border-b-2 border-orange-200 focus:outline-none focus:border-orange-400 text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Message *</label>
            <textarea
              name="Message"
              rows="4"
              required
              placeholder="Type your message..."
              className="w-full mt-1 px-4 py-2 border-b-2 border-blue-200 focus:outline-none focus:border-orange-400 text-gray-700"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-600 transition-all px-6 py-2 text-white font-semibold rounded-lg"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
