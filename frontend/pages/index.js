import Head from "next/head";
import "../app/globals.css";
import Navbar from '../components/Navbar'; // adjust path if needed


export default function Home() {
    return (
     <div>
        <Head>
            <title>Air-booking clone</title>
        </Head>

        {/*Navbar*/}
        <Navbar></Navbar>

        {/*Cards*/}
     </div>
    );
}