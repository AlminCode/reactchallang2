import React, {Component} from "react";
import Rating from "../components/Rating";

class ToursComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const tours = this.props.data;
        return (
            <div className="tour-contianer">
                {tours.map((tour, index) => {
                    return (
                        <div key={index}>
                            <div className="col s12 m3 image-container margin-bottom30">
                                <img src={tour.images[0].url} className="tour-image"/>
                                <div className="tour-reviews">{tour.reviews} reviews</div>
                                <div className="tour-rating">
                                    <Rating rating={tour.rating}></Rating>
                                </div>
                                {parseInt(tour.discount) > 0 &&
                                <div className="discount">
                                    <div className="rotate"> -{tour.discount}</div>
                                </div>
                                }
                            </div>

                            <div className="data-container col s12 m4 margin-bottom30">
                                <div className="data-title">{tour.name}</div>
                                <div className="block-with-text">{tour.description}</div>
                                <div className="data-info">
                                    <div>
                                        <div className="data-info-label">DAYS</div>
                                        <div className="data-info-values">{tour.length} days</div>
                                    </div>
                                    <div>
                                        <div className="data-info-label">DESTINATION</div>
                                        <div className="data-info-values">{tour.cities.length} cities</div>
                                    </div>
                                    <div>
                                        <div className="data-info-label">STARTS/ENDS</div>
                                        <div className="data-info-values">
                                            {tour.cities[0].name} / {tour.cities[tour.cities.length - 1].name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="data-info-label">OPERATOR</div>
                                        <div className="data-info-values">{tour.operator_name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="info-container col s12 m3 margin-bottom30">
                                <div className="info-title">
                                    <div className="info-title-label">Total price</div>
                                    <div className="info-price">${tour.price}</div>

                                    <div className="info-dates-box">
                                        {
                                            tour.dates.slice(0, 2).map((date, i) => {
                                                return (
                                                    <div key={i}>
                                                        <div className="info-dates-dates">
                                                            {date.start}
                                                        </div>
                                                        <div className={["info-dates-seats",
                                                            (date.availability === undefined || date.availability < 5) ? 'alert' : ''].join(' ')}>
                                                            {date.availability ? date.availability : 0} seats left
                                                        </div>
                                                    </div>
                                                
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="info-dates-more">
                                        <button onClick={() => this.props.openModal(tour)} className="btn">View More</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>
        )
    }
}

export default ToursComponent;

