import React from "react";
import Layout from "../components/Layout/Layout";
import Order from "../components/order/Order";

const page = () => {
  return (
    <Layout>
      <section className="w-[90%] mx-auto h-fit">
        <Order />
      </section>
    </Layout>
  );
};

export default page;
