
# Shift Schedule Assignment

A Full Stack Assignment to create, retrieve and delete shifts.

## Set up
### Backend
`npm init -y` \
`npm install express mongoose dotenv cors uuid` \
Express is used to create routing and APIs, mongoose for database model, dotenv to keep database URl, cors for cross origin data passage and uuid to generate unique ID for each shift.
### Frontend
`npm install @mui/icons-material @mui/material @emotion/styled @emotion/react` \
In the Frontend i have used Material UI for styling.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL` - MongoDB url 


## Brief Summary
This project uses three APIs to retrieve, create and delete shifts which are `/api/get-shifts`, `/api/add-shift` and `/api/remove-shift` respectively.

 - `/api/get-shifts` is a `GET` request which retrieves all data from the database.

 - `/api/add-shift` is a `POST` method which takes "from, to and shiftTitle" from the client side. It also generates a unique ID for that shift and save it into the database.

 - `/api/remove-shift` is a `DELETE` method which takes ID which was created while creation of that shift and by this ID it finds it into the database and deletes it.

 - In the frontend theses APIs are handled and displayed in tabular format. And, whenever an action (like creation and deletion) is performed it reloads the page so that the updated list of data can be displayed.
