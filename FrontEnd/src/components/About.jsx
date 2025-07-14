import React from 'react';
import useInViewAnimation from "../hook/useInViewAnimation ";

function About() {
  const [leftRef, showLeft] = useInViewAnimation();
  const [rightRef, showRight] = useInViewAnimation();
  const [topRef, showTop] = useInViewAnimation();
  const [bottomRef, showBottom] = useInViewAnimation();
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 px-4 py-12">
      <div ref={bottomRef} className={`max-w-6xl mx-auto text-center ${
          showBottom ? "XacessLoadBottom" : "opacity-0"
        }`}>
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-orange-600 mb-4">About Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          At <span className="text-orange-500 font-bold">FoodieExpress</span>, we make delicious meals travel faster than your cravings.
        </p>
      </div>

      {/* Mission Statement */}
      <div ref={leftRef} className={`mt-12 max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-orange-100 ${
          showLeft ? "XacessLoad1" : "opacity-0"
        }`}>
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-md leading-relaxed">
          We want to make food ordering as simple as breathing. Whether you're at a theater seat, office desk, or anywhere indoors — order your favorite food with a few taps and have it arrive fresh, hot, and fast. We value simplicity, speed, and satisfaction.
        </p>
      </div>

      {/* Feature Blocks */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Why Choose Us */}
        <div  ref={leftRef} className={`bg-gradient-to-tr from-yellow-100 to-orange-100 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 ${
          showLeft ? "XacessLoad1" : "opacity-0"
        }`}>
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Why Choose Us?</h3>
          <ul className="space-y-3 text-gray-700 text-left list-disc list-inside">
            <li>✨ Instant seat-side ordering</li>
            <li>🔥 Hot and freshly prepared meals</li>
            <li>📱 Intuitive and easy-to-use interface</li>
            <li>🔒 Safe payments and real-time tracking</li>
          </ul>
        </div>

        {/* What We Offer */}
        <div  ref={rightRef} className={` bg-gradient-to-tr from-orange-100 to-yellow-100 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 ${
          showRight ? "XacessLoad2" : "opacity-0"
        }`}>
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">What We Offer</h3>
          <ul className="space-y-3 text-gray-700 text-left list-disc list-inside">
            <li>🍽️ Variety of multi-cuisine dishes</li>
            <li>🧾 Personalized orders & combos</li>
            <li>🚚 Live delivery status tracking</li>
            <li>😊 Friendly customer support</li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default About;
