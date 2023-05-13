const Banner = () => {
  return (
    <section className="home">
      <div className="flex justify-center">
        <div className="w-11/12 grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] items-center">
          <div className="p-8 text-center md:text-left mt-4">
            <h3 className="text-[45px] sm:text-7xl font-medium uppercase shadow-drop leading-[65px] sm:leading-[80px] ml-3">
              GREENERY IS EVERYTHING.
            </h3>
            <p className="px-4 sm:leading-8 leading-[35px] w-full sm:w-4/5 mt-4">
              Urbanisation has become a common phenomenon in the Indian society.
              In the repercussion of ever-growing urbanisation sprawl, we are
              losing our agricultural land every hour and the population is
              growing by leaps and bounds simultaneously. It means we will have
              less land to grow food on and more mouths to feed which is
              alarming and poses a greater challenge for our future generations.
              Balcony farming can be viable option to tackle this situation in
              the near future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
