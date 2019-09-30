const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours
    }
  });
};
const getTour = (req, res) => {
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
const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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
const deleteTour = (req, res) => {
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

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app
  .route("/api/v1/tours")
  .get(getAllTours)
  .post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 8011;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
