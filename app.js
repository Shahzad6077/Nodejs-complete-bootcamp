const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
/*
 * 1) MIDDLERWARES
 */

app.use(morgan("dev"));
app.use(express.json());
//*------ OWN MIDDLEWARES ----------
app.use((req, res, next) => {
  console.log("Hey, from middlewares. !");
  next();
});

app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  console.log(req.requesTime);
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/*
 * 2) ROUTE HANDLERS
 */
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined yet"
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined yet"
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined yet"
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined yet"
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined yet"
  });
};
/*
 * 3) ROUTES
 */

//  # MOUNTING ROUTER

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route("/")
  .get(getAllTours)
  .post(createTour);
tourRouter
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser);
userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

/*
 * 4) START SERVERR
 */
const port = 8011;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
