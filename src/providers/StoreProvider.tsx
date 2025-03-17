

"use client";

import Loader from "@/components/shared/Loader";
import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";



export default function StoreProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<AppStore>(undefined);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    // return <Provider store={storeRef.current}> {children} </Provider>;

    const persistedStore = persistStore(storeRef.current);

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={<Loader />} persistor={persistedStore}>
            {children}
            </PersistGate>
        </Provider>
    );

}
