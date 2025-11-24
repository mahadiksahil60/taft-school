"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Home from "./home/page";
import {Provider} from "react-redux";
import {store} from "@/app/redux/store.js";

export default function Page() {
  return (
    <>
        <Provider store={store}>
      <Home />
        </Provider>
    </>
  );
}
