import React from "react";
import "./Header.css";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      search: "",
      ims: '',
      value: 0,
    };
  }

  searchHandler = (e) => {
    this.setState({
      search: e.target.value,
    });
    console.log(this.state.search);
  };
  findHandler() {
    let that = this;

    var xmlhttp = new XMLHttpRequest();
    var url =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
      this.state.search;

    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        that.setState({
          name: JSON.parse(this.responseText).meals,
        });
        console.log(this.responseText);
        console.log(that.state.name[0].strMeal);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  findoneHandler = () => {
    let that = this;

    var xmlhttp = new XMLHttpRequest();
    var url =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
      this.state.search;

    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        that.setState({
          name: JSON.parse(this.responseText).meals[0].strMeal,
          ims: JSON.parse(this.responseText).meals[0].strMealThumb,
        });

        
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    this.setState({
      value: 1,
    });
  };
  

  render() {
    return (
      <div>
        <div className="hd">Recpie Finder</div>
        <div className="search">
          <input
            className="boxin"
            type="text"
            value={this.state.search}
            placeholder="Enter the Name of Dish"
            onChange={this.searchHandler}
          ></input>
          {/* <input type="submit">Get</input> */}
          <input
            className="bt"
            type="submit"
            value="Get Ingredients"
            onClick={this.findoneHandler.bind(this)}
          />
        </div>
        <div className="hd">
          Type a Dish Name to Search for it's ingredients
        </div>
        {this.state.value === 1 ? (
          <div className="contain">
            
              <div className="heading"><center><span>{this.state.name}</span></center>
              <span></span>
              </div>

              <div className="containerone">
                

                <div>
                <img src={this.state.ims} alt="food" className="pic"/>
                </div>
                <div> des</div>


                </div>
            



          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Header;
