import React from 'react';
import data from './data';


export const DataContext = React.createContext();


const DataProvider = (props) => {
    const [comments, setComments] = React.useState(data);

    return <DataContext.Provider value={[comments, setComments]}>
        {props.children}
    </DataContext.Provider>
}

export default DataProvider
