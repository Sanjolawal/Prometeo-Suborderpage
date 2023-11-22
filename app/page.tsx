"use client";

import { useEffect, useState } from "react";
import Clientinformation from "@/components/clientinformation";
import Clientaddress from "@/components/clientaddress";
import Clientdocument from "@/components/clientdocument";
import Clientproducts from "@/components/clientproducts";
import Productallocation from "@/components/productallocation";
import style from "@/styles/style.module.scss";

export default function Page() {
  const [response, setresponse] = useState([]);
  useEffect(() => {
    async function clientInfo() {
      const response2 = await fetch("/api");
      const response3 = await response2.json();
      setresponse(response3);
    }
    clientInfo();
  }, []);

  return (
    <div className={style.body}>
      <h1 className={style.h1}>Order details | Salesman</h1>
      <Clientinformation info={response} />
      <Clientaddress info={response} />
      <Clientdocument info={response} />
      <Clientproducts info={response} />
      <Productallocation info={response} />
    </div>
  );
}
