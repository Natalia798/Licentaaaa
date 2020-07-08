import React from "react";
import classes from "./Rating.module.css";
import ReactStars from "react-rating-stars-component";

function Rating() {
  return (
    <div className={classes.RatingContainer}>
      <ReactStars
        size={50}
        half={true}
        onChange={(newRating) => {
          console.log(newRating);
        }}
      >
        ()
      </ReactStars>
    </div>
  );
}

export default Rating;
