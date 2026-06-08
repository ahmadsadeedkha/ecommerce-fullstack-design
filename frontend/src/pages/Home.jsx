import React from "react";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto p-6">
        <section className="py-12">
          <h1 className="text-3xl font-bold mb-4">Welcome to Sadeed</h1>
          <p className="text-gray-600">
            This is the home page. Add your content here.
          </p>
        </section>
      </main>
      <Newsletter />
    </>
  );
};

export default Home;
