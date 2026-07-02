const express = require("express");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(errorHandler);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Cinema API Running 🚀"
    });
});

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

module.exports = app;