const express = require("express");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

const PORT = 3000;


// =========================
// DATABASE CONNECTION
// =========================

const pool = new Pool({

    user: process.env.DB_USER,

    host: process.env.DB_HOST,

    database: process.env.DB_NAME,

    password: process.env.DB_PASSWORD,

    port: process.env.DB_PORT

});


// Test database connection

pool.connect()
    .then(() => {

        console.log("Connected to PostgreSQL database.");

    })
    .catch((error) => {

        console.error(
            "Database connection error:",
            error.message
        );

    });


// =========================
// MIDDLEWARE
// =========================

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);


// =========================
// HOME ROUTE
// =========================

app.get("/", function(req, res) {

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );

});


// =========================
// CONTACT FORM ROUTE
// =========================

app.post("/api/contact", async function(req, res) {

    const { name, email, message } = req.body;


    try {

        const result = await pool.query(

            `
            INSERT INTO contact_messages
            (name, email, message)

            VALUES ($1, $2, $3)

            RETURNING *
            `,

            [name, email, message]

        );


        console.log(
            "New message saved:",
            result.rows[0]
        );


        res.json({

            success: true,

            message:
                "Thank you! Your message has been saved successfully."

        });


    } catch (error) {

        console.error(
            "Error saving message:",
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                "Something went wrong. Please try again."

        });

    }

});


// =========================
// START SERVER
// =========================

app.listen(PORT, function() {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});