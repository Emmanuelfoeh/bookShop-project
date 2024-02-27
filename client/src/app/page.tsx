import Image from "next/image";
import bookIntro from "../../public/images/metabook.png";
import Books from "./components/BookComp/Books";
import Layout from "./components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="flex flex-col ">
        <div className="Hero relative">
          <section className="w-[95%] mx-auto bookIntro grid md:grid-cols-2  sm:grid-cols-1 sm:justify-center md:justify-between py-10">
            <div className="introText order-2 md:order-1 flex flex-col justify-center ">
              <h1 className="py-2 mb-2 font-bold text-4xl text-[#003060]">
                One Stop Bookshop
              </h1>
              <p>
                Explore the boundless world of literature at One Stop Bookshop,
                where every page holds a new adventure and every cover tells a
                unique story. Immerse yourself in the captivating realms crafted
                by brilliant authors from various genres.
              </p>

              <div className="my-5"></div>
            </div>

            <div className="introImage order-1 md:order-2 flex justify-end">
              <Image src={bookIntro} alt="introImg" />
            </div>
          </section>
          <div className="custom-shape-divider-bottom-1696284537">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>

        <div className="w-[95%] mx-auto main-content py-12">
          <Books />
        </div>
      </section>
    </Layout>
  );
}
