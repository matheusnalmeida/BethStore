import React, { createContext, useState } from "react";
import BlockUI from "../../components/blockui/BlockUI";

export const BethStoreContext = createContext({
    isBlocking: false,
    Blocking: () => { },
    Unblocking: () => { }
});

const SSRMSProvider = (props) => {
    const [isBlocking, setIsBlocking] = useState(false);

    const showBlocking = (isBlocking) => {
        setIsBlocking(isBlocking);
    };

    const Blocking = () => {
        if (!isBlocking) showBlocking(true);
    };

    const Unblocking = () => showBlocking(false);

    const values = {
        isBlocking,
        Blocking,
        Unblocking
    };
    return (
        <>
            <BethStoreContext.Provider value={values}>
                {props.children}
            </BethStoreContext.Provider>
            <BlockUI blocking={isBlocking} />
        </>
    );
};

export default SSRMSProvider;
