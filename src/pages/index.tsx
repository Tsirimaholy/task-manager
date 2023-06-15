import Head from "next/head";
import {useRouter} from "next/router";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useEffect, useMemo, useState} from "react";

/**
 Calculates the time difference between the server time and client time.
 @param {Date} serverTime - The server time.
 @param {Date} clientTime - The client time.
 @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
 */
const calculateTimeDifference = (serverTime: Date, clientTime: Date) => {
    const number = serverTime.getTime() - clientTime.getTime();
    const dateTimeDifference = new Date(number);
    const formatedDAte = `${dateTimeDifference.getDay()} days, ${dateTimeDifference.getHours()} hours, ${dateTimeDifference.getMinutes()} minutes, ${dateTimeDifference.getSeconds()} seconds`;
    return formatedDAte;
};

type Serverprops ={
    serverDateTime: string
}

export const getServerSideProps: GetServerSideProps<Serverprops> = async ()=>{
    const serverDateTime = new Date().toString();
    return {props: {serverDateTime}}
}


export default function Home(props: InferGetServerSidePropsType<typeof  getServerSideProps>) {
    const {serverDateTime}=props;
    const [timeDifference, setTimeDifference]= useState('');
    const serverDate = useMemo(() => new Date(serverDateTime), [serverDateTime]);
    
    useEffect(() => {
        const clientDateTime = new Date();
        const timeDifference = calculateTimeDifference(serverDate, clientDateTime);
        setTimeDifference(timeDifference);
    },[serverDate, serverDateTime])

    const router = useRouter();

    const moveToTaskManager = async () => {
        await router.push("/tasks");
    }
    return (
        <>
            <Head>
                <title>Web 2 - Exam TD</title>
                <meta name="description" content="Just an exam"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>The easiest exam you will ever find</h1>
                <div>
                    {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
                    <p>
                        Server time: {serverDate.toLocaleTimeString()}
                        <span className="serverTime">{/* Replace with the value */}</span>
                    </p>

                    {/* Display here the time difference between the server side and the client side */}
                    <p>
                        Time diff: {timeDifference}
                        <span className="serverTime">{/* Replace with the value */}</span>
                    </p>
                </div>

                <div>
                    <button onClick={moveToTaskManager}>Go to task manager</button>
                </div>
            </main>
        </>
    );
}
