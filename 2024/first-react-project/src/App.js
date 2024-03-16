import "./App.css";

// MY Class Components 
import CardList from "./components/cardList/cardList.component";
import SearchBox from "./components/search_box/searchBox.component";

//HOOKS we're gonna be using
import { useState, useEffect } from "react";

// class App extends Component {
  
//   constructor() {
//     super();
//     this.state = {
//       collegues: [],
//       searchField: ''
//     };
//     console.log( 'CONSTRUCTOR')
//   }

//   componentDidMount() {
//     console.log( 'COMPONENT DID MOUNT')
//     fetch("https://jsonplaceholder.typicode.com/users")
//     .then( res => res.json() ) // res.json() will return a promise    
//     .then( (res) => {
//             this.setState( {
//                 collegues: res
//             });
//         })
// }

//   // OPTIMIZATION: 
//   // so this function get's stored in the memory 
//   // instead of getting created and destroyed every time their is onChange Event
//   // class component is only gonna build this function once when it get's initialized
//   // no unnessary loading for anonymous functions
//   onSearchFieldChange = (event) => {
//             console.log( event )
//             const searchField = event.target.value.toLowerCase();
//             this.setState( () => {
//               return { searchField };
//             });
//           }

//   render() {
//     // every time react needs to update the DOM it will use this render()!!!
//     console.log( 'RENDER', this );

//     // makes our code more readable
//     const { collegues, searchField } = this.state;
//     const { onSearchFieldChange } = this;

//     // do not perform the filter on collegues becuase it will mutate the orignal data in the state
//     // and will only keep the searched name
//     const filterdListOfCollegue = collegues.filter( (e) => {
//       return e.name.toLowerCase().includes( searchField );
//     });

//     return (
//       <div className="App">
//         <SearchBox 
//             onChangeHandler={ onSearchFieldChange }
//             placeHolderText='Search string here...' />
//         <CardList 
//             listToRender={filterdListOfCollegue}
//         />
//       </div>
//     );
//   }
// }

const App = () => {
  // react will render this top to bottom during rendering and re-rendering
  const [searchField, setSearchField] = useState("");
  const [collegues, setCollegues] = useState([]);
  const [ filteredCollegues, setFilteredCollegues ] = useState( collegues );

    // IMP** 
    // this will cause infinite re-render
    //   fetch("https://jsonplaceholder.typicode.com/users")
    //   .then( res => res.json() ) // res.json() will return a promise
    //   .then( (res) => {
    //           setCollegues( res )
    //       })

    useEffect( () => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then( res => res.json() ) // res.json() will return a promise
        .then( (res) => {
                setCollegues( res )
            })
    }, [] ); // dependency array is empty because we only want to fetch once the component mounts

    useEffect( () => {
        const filterdListOfCollegue = collegues.filter( (e) => {
              return e.name.toLowerCase().includes( searchField );
            });
            setFilteredCollegues( filterdListOfCollegue );
    }, [ collegues, searchField ] ); // whenever collegues or searchField changes

  const onSearchFieldChange = (event) => {
    console.log(event);
    const searchFieldValue = event.target.value.toLowerCase();
    setSearchField(searchFieldValue);
  };

  return (
    <div className="App">
      <SearchBox
        onChangeHandler={onSearchFieldChange}
        placeHolderText="Search string here..."
      />
      <CardList listToRender={ filteredCollegues } />
    </div>
  );
}

export default App;
