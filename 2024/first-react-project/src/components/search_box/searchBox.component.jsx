import './searchBox.styles.css'

// class SearchBox extends Component {
//     render(){
//         const {onChangeHandler, placeHolderText } = this.props;
//         return (
//             <>            
            // <input
            //   className="search-box"
            //   type="search"
            //   placeholder={placeHolderText}
            //   onChange={onChangeHandler}
            // />
//             </>
//         );
//     }
// }

const SearchBox = ({ onChangeHandler, placeHolderText } ) => {
    return (
      <input
        className="search-box"
        type="search"
        placeholder={placeHolderText}
        onChange={onChangeHandler}
      />
    );
};

export default SearchBox;