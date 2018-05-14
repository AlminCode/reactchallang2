import React, { Component } from "react";
import "./App.css";
import "./css/custom.css";
import FilterComponent from "./components/FilterComponent";
import SortComponent from "./components/SortComponent";
import ToursComponent from "./components/ToursComponent";

// Third party libraries
import NProgress from "nprogress";
import ReactModal from "react-modal";

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: [],
      byYearMonth: {},
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      loading: false,
      selectedTours: [],
      sortBy: "rating",
      showModal: false,
      tourDates: [],
      days: 0
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(data) {
    console.log("modal data", data);
    this.setState({
      tourDates: data.dates,
      showModal: true
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    this.setState(() => ({ loading: true }));
    this.fetchData();
    console.log("Data loaded");
  }

  // Slider controls
  handleChangeStart = () => {
    console.log("Change event started");
  };

  handleChange = value => {
    this.setState({
      days: value
    });
  };

  handleChangeComplete = () => {
    console.log("Change event completed");
    this.filterByDays();
  };

  filterByYearMonth = data => {
    let toursByDate = [];

    data.forEach(tour => {
      tour.dates.forEach(d => {
        toursByDate.push({
          month: new Date(d.start).getMonth() + 1,
          year: new Date(d.start).getFullYear(),
          tour: tour,
          price: d.usd,
          discount: d.discount ? d.discount : 0,
          date: d
        });
      });
    });

    let toursByYearMonth = {};
    toursByDate.forEach(e => {
      if (toursByYearMonth[e.year]) {
        if (toursByYearMonth[e.year][e.month]) {
          let tourExists = toursByYearMonth[e.year][e.month].find(
            tour => tour.id === e.tour.id
          );
          if (tourExists) {
            toursByYearMonth[e.year][e.month] = toursByYearMonth[e.year][
              e.month
            ].map(tour => {
              if (tour.id === e.tour.id) {
                return Object.assign({}, tour, {
                  dates: [...tour.dates, e.date]
                });
              } else {
                return tour;
              }
            });
          } else {
            toursByYearMonth[e.year][e.month].push(
              Object.assign({}, e.tour, {
                price: e.price,
                discount: e.discount,
                date: e.date,
                dates: [e.date]
              })
            );
          }
        } else {
          toursByYearMonth[e.year][e.month] = [];
          toursByYearMonth[e.year][e.month].push(
            Object.assign({}, e.tour, {
              price: e.price,
              discount: e.discount,
              date: e.date,
              dates: [e.date]
            })
          );
        }
      } else {
        toursByYearMonth[e.year] = [];
        if (toursByYearMonth[e.year][e.month]) {
          let tourExists = toursByYearMonth[e.year][e.month].find(
            tour => tour.id === e.tour.id
          );
          if (tourExists) {
            toursByYearMonth[e.year][e.month] = toursByYearMonth[e.year][
              e.month
            ].map(tour => {
              if (tour.id === e.tour.id) {
                return Object.assign({}, tour, {
                  dates: [...tour.dates, e.date]
                });
              } else {
                return tour;
              }
            });
          } else {
            toursByYearMonth[e.year][e.month].push(
              Object.assign({}, e.tour, {
                price: e.price,
                discount: e.discount,
                date: e.date,
                dates: [e.date]
              })
            );
          }
        } else {
          toursByYearMonth[e.year][e.month] = [];
          toursByYearMonth[e.year][e.month].push(
            Object.assign({}, e.tour, {
              price: e.price,
              discount: e.discount,
              date: e.date,
              dates: [e.date]
            })
          );
        }
      }
    });

    console.log("Filtered", toursByYearMonth);
    return toursByYearMonth;
  };

  filterByDays = () => {
    let data = this.state.byYearMonth[this.state.currentYear][this.state.currentMonth];

    if (this.state.days === 0){
      let filteredData = this.filterByYearMonth(data);
      this.setState({selectedTours:data})
    }else{
      let filteredData = data.filter(element => element.length <= this.state.days)
      this.setState({selectedTours:filteredData})
    }
  };

  fetchData = async () => {
    NProgress.start();
    var result = await fetch("https://api.myjson.com/bins/oivjj");
    let data = await result.json();

    var filteredData = await this.filterByYearMonth(data);

    this.setState(() => ({
      rawData: data,
      byYearMonth: filteredData,
      loading: false,
      selectedTours:
        filteredData[this.state.currentYear][this.state.currentMonth]
    }));

    this.sortTours("rating");

    NProgress.done();
  };

  filterTours = (year, month) => {
    this.setState(
      state => ({
        currentYear: year,
        currentMonth: month,
        selectedTours: state.byYearMonth[year][month]
      }),
      () => this.sortTours()
    );
  };

  sortTours = sb => {
    let sortBy = sb ? sb : this.state.sortBy;
    let sortedTours = this.state.selectedTours.sort(function compare(a, b) {
      if (a[sortBy] > b[sortBy]) {
        return -1;
      }
      if (a[sortBy] < b[sortBy]) {
        return 1;
      }
      return 0;
    });
    this.setState({
      selectedTours: sortedTours,
      sortBy: sortBy
    });
  };

  render() {
    const { byYearMonth, selectedTours } = this.state;

    return (
      <div>
        <div className="row">
          <div className="container margin-top49">
            <div className="col m3 s12 margin-top50">
              <FilterComponent
                data={byYearMonth}
                months={months}
                filterTours={this.filterTours}
                days={this.state.days}
                handleChangeStart={this.handleChangeStart}
                handleChange={this.handleChange}
                handleChangeComplete={this.handleChangeComplete}
              />
            </div>

            <div className="sortby col s12 m3 push-m5 margin-left23">
              <SortComponent sortTours={this.sortTours} />
            </div>

            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Modal"
              overlayClassName="Overlay"
              className="Modal"
            >
              <div className="info-modal-dates-label">Dates</div>
              <div className="info-modal-seats-label">Seats</div>
              {this.state.tourDates.map((date, i) => {
                return (
                  <div key={i}>
                    <div className="info-modal-dates">{date.start}</div>
                    <div
                      className={[
                        "info-modal-seats",
                        date.availability === undefined || date.availability < 5
                          ? "alert"
                          : ""
                      ].join(" ")}
                    >
                      {date.availability ? date.availability : 0} seats left
                    </div>
                  </div>
                );
              })}
              <button onClick={this.handleCloseModal} className="btn close-btn">
                X
              </button>
            </ReactModal>

            <div className="col s12 m9 margin-top2">
              {this.state.loading ? (
                <div>
                  <div className="progress">
                    <div className="indeterminate" />
                  </div>
                </div>
              ) : ( selectedTours.length ? 
                <ToursComponent
                  data={selectedTours}
                  openModal={this.handleOpenModal}
                  date={this.state.currentMonth}
                /> :
                <div className="data-title">
                  No data for selected duration
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
