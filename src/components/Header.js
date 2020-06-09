import React from "react";
import "./Header.css";



class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      search: "",
      ims: "",
      value: 0,
      valueone: 0,
      nodata: "",
      catmeal: "",
      areameal: "",
      ingrd: [],
      ingms:[],
      bgColor: "",
      valuecolor: 0,
      desc:""
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
    var data = [];
    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (JSON.parse(this.responseText).meals != null) {
          that.setState({
            value: 1,
            valueone: 0,
            name: JSON.parse(this.responseText).meals[0].strMeal,
            ims: JSON.parse(this.responseText).meals[0].strMealThumb,
            catmeal: JSON.parse(this.responseText).meals[0].strCategory,
            areameal: JSON.parse(this.responseText).meals[0].strArea,
            desc: JSON.parse(this.responseText).meals[0].strInstructions
          });
          data = JSON.parse(this.responseText).meals;
          console.log("inner", data[0]);

          

          // temp=JSON.parse(this.responseText).meals[0].match(/strIngredient/g);
          // console.log(temp);

          // while((JSON.parse(this.responseText).meals[0].strIngredient+i)!=="")
          // {
          //    temp.push(JSON.parse(this.responseText).meals[0].strIngredient+i);
          //    i++;
          // }
          var b = data[0];
          console.log("outer", data);
          let arr = [];
          for (var key in b) {
            if (key.match("strIngredient") && b[key] !== "" && b[key]!==null) {
              arr.push(b[key]);
            }
          }
          console.log(arr);
          that.setState({
            ingrd:arr
          })

          let arrone=[];
          for (key in b) {
            if (key.match("strMeasure") && b[key] !== "" && b[key]!==null) {
              arrone.push(b[key]);
            }
          }
          that.setState({
            ingms:arrone
          })


        } else {
          that.setState({
            nodata: "No data found",
            value: 0,
            valueone: 1,
          });
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    

   
  };
  boxClick = (e) => {
    if (this.state.valuecolor === 0)
      this.setState({
        bgColor: "red",
        valuecolor: 1,
      });
    else {
      this.setState({
        bgColor: "black",
        valuecolor: 0,
      });
    }
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
            value="Get Recipe"
            onClick={this.findoneHandler.bind(this)}
          />
        </div>

        {this.state.valueone === 0 ? (
          <div className="hd">
            Type a Dish Name to Search for it's ingredients
          </div>
        ) : (
          ""
        )}

        {this.state.value === 1 ? (
          <div className="contain">
            <div className="heading">
              <center>
                <span className="headone">{this.state.name}</span>

                <i
                  className="fa fa-heart-o  like"
                  aria-hidden="true"
                  style={{ color: this.state.bgColor }}
                  onClick={this.boxClick}
                />
              </center>
            </div>

            <div className="containerone">
              <div>
                <img src={this.state.ims} alt="food" className="pic" />
              </div>

              <div className="containertwo">
                <div>
                  <i>Category of Meal - </i> {this.state.catmeal}
                </div>
                <div>
                  <i>Area of the Meal - </i> {this.state.areameal}
                </div>
                <div> 
                  <p className="ingrdhead">Ingredients</p>
                <div id="box">
                  {/* this div for ingrd name */}
                  <div> 
                  <span>
                  {
                    
                    this.state.ingrd.map(element => {
                      
                    return (
                      <p>{element}--</p>
                      
                     
                    ) 
                    
                       
                    })

                    
                  }
                  </span>
                 
                 
                 
                 </div>
                 {/* this is for weight measure */}
                 <div>
                   {
                    
                   }
                  </div>
                  
                 
                  
                </div>
                </div>

                <div>
                  <center> <p className="ingrdhead">Recipes</p></center>
                  <div className="desc"> 
                  {
                    this.state.desc
                  }
                    
                  </div>
                     
                </div>
                
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {this.state.valueone === 1 ? (
          <div>
            <center>No Data Has been recieved</center>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Header;
