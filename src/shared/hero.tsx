"use client";

export const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full bg-white overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Create <span className="text-teal-600">Beautiful Slides</span>
          <br /> in Seconds
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Turn your ideas into stunning presentations instantly. Choose a theme,
          add your content, and let our AI do the rest.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-teal-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-teal-700 transition">
            Get Started
          </button>
          <button className="border border-teal-600 text-teal-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-teal-50 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
