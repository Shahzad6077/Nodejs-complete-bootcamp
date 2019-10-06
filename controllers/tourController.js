const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/*
 * 2) ROUTE HANDLERS
 */
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours
    }
  });
};
exports.getTour = (req, res) => {
  const { id } = req.params;

  if (id * 1 > tours.length - 1) {
    res.status(404).json({
      status: "error",
      massege: "Invalid id"
    });
  } else {
    const tour = tours.find(el => el.id === id * 1);

    res.status(200).json({
      status: "success",
      data: {
        tour
      }
    });
  }
};
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) {
        res.status(404).json({
          status: "error",
          message: "New Tour not created."
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            data: "created"
          }
        });
      }
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        tour: "<Tour here..>"
      }
    });
  }
};
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        tour: "delete tour"
      }
    });
  }
};
