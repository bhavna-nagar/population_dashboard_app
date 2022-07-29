import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Card from "./Components/Card";


function App() {
  const [listOfStates, setListOfStates] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searchYear, setSearchYear] = useState("");
  
  
  
 

  useEffect(() => {
    Axios.get("https://datausa.io/api/data?drilldowns=State&measures=Population").then(
      (response) => {
        setListOfStates(response.data.data);
        
      }
    );
  }, []);

 const filteredStates = listOfStates.filter((state) => {
    return state.State.toLowerCase().includes(searchWord.toLowerCase());
  });

  const filteredYears=listOfStates.filter((state) => {
    return state.Year.includes(searchYear);
  });
  const stateCardList=filteredStates.map((state) => {return (<Card State={state.State} Year={state.Year} Population={state.Population} />
                                                        );})

  const yearCardList=filteredYears.map((state) => {return (<Card State={state.State} Year={state.Year} Population={state.Population} />
                                                        );})

  return (
    <div className="App"> 
      <div className="appHeader">
        
        <h4>Filter using one parameter at a time</h4>
        
        <input
          type="text"
          placeholder="State..."
          onChange={(event) => {
            setSearchWord(event.target.value);
            setSearchYear("");
          }}
        />

       <input
          type="text"
          placeholder="Year..."
          onChange={(event) => {
            setSearchYear(event.target.value);
            setSearchWord("");
          }}
        />
      </div>
      <div className="cardDisplay">
        {searchYear?(yearCardList.length===0?"No Result Found for Query":yearCardList)
        :
        (stateCardList.length===0?"No Result Found for Query":stateCardList)}
      </div>
    </div>
    
  );
}

export default App;