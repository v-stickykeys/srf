import { useEffect, useState } from 'react';
import { createConfig, createClient } from "donedb";
const app = "f20f6f46-ed95-4937-ac07-c3ab6374d52d";
const initialValue = 0;
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

export default function CountVote({ field }: { field: string }) {
    const [loading, setLoading] = useState(false);
    const [donedb, setDonedb] = useState<any>();
    const [value, setValue] = useState(initialValue);
    const [voted, setVoted] = useState(false);
    useEffect(setup, []);
    function setup() {
        setupDoneDb();
        async function setupDoneDb() {
            setLoading(true);
            const donedbConfig = createConfig({ app });
            await donedbConfig.fill();
            const donedbClient = createClient(donedbConfig);
            setDonedb(donedbClient);
            setLoading(false);
        }
    }
    useEffect(watch, [donedb]);
    function watch() {
        let watcher: any;
        if (donedb) {
            watcher = donedb.watch(field, (data: any) => {
                setValue(data.value);
            });
        }
        return () => {
            if (watcher) {
                donedb.stopWatch(watcher);
            }
        }
    }

    async function increment() {
        if (!voted) {

        setLoading(true);
        await donedb.increment(field);
        setVoted(true);
        setLoading(false);
        }
    }

    return (
    <button className={`flex items-center text-gray-700 hover:text-green-500 ${voted ? "text-green-500" : ""}`}  aria-label="Vote" onClick={increment}>
                      <ArrowUpIcon className="h-6 w-6 mr-1" />
                      <span>{value}</span>
                    </button>
    );
}
