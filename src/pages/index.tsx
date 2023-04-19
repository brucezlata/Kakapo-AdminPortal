import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";

export default function Home() {
  return (
    <div className="grid grid-nogutter surface-section text-800">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
          <span className="block text-6xl font-bold mb-1">
            Use Kakapo to easy your life
          </span>
          <div className="text-4xl text-primary font-bold mb-3">
            Customer Obsessed
          </div>
          <p className="mt-0 mb-4 text-700 line-height-3">
          We will learn about our customers and their businesses with a beginner’s mind and then bring solutions that meet their needs. We will be insatiable in our desire to learn from the outside and bring it into Microsoft, while still innovating to surprise and delight our users.
          </p>
        </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden">
        <img
          src="images/home/hero.png"
          alt="hero-1"
          className="md:ml-auto block md:h-full"
          style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)" }}
        />
      </div>
    </div>
  );
}
