import React, { Component } from "react";
import "../css/custom.css";
import Slider from "react-rangeslider";

// To include the default styles
import "react-rangeslider/lib/index.css";

class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ""
    };
  }

  render() {
    return (
      <div>
        <div className="filter">
          <div className="filter--title">Filter by:</div>
        </div>
        <div className="departureBox">
          <div className="">
            <p className="departureBox--title">Departure date</p>
          </div>

          <div className="filter-content">
            {Object.keys(this.props.data).map((y, index) => {
              return (
                <div key={index}>
                  <ul>
                    <li
                      onClick={event => {
                        event.stopPropagation();
                        this.setState({
                          active: this.state.active === index ? "" : index
                        });
                      }}
                    >
                      {y}
                      <i
                        className={[
                          "arrow",
                          this.state.active === index ? "down" : "right"
                        ].join(" ")}
                      />
                    </li>
                    <ul
                      className={[
                        "filter-months-container",
                        this.state.active === index ? "selected" : ""
                      ].join(" ")}
                    >
                      {Object.keys(this.props.data[y]).map((e, i) => {
                        return (
                          <li key={i}>
                            <a
                              className="filter-months"
                              onClick={() => this.props.filterTours(y, e)}
                            >
                              {this.props.months[e]}{" "}
                              <span className="number-of-tours">
                                ({this.props.data[y][e].length})
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </ul>
                </div>
              );
            })}

            {/* <input type="date" className="browser-default"/> */}
          </div>
        </div>
        <div className="duration-slider-box">
          <div className="duration-title">
            Duration
            <Slider
              min={0}
              max={30}
              value={this.props.days}
              onChangeStart={this.props.handleChangeStart}
              onChange={this.props.handleChange}
              onChangeComplete={this.props.handleChangeComplete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FilterComponent;
