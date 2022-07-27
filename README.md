
# QRCode Timekeeper

## Frontend

This application is for a time management system where employees can clock in and out using qr codes and
where management can keep track of the timesheets. 

The frontend of this project is hosted on https://frontend-for-heroku.herokuapp.com/
You can visit the above link to see the current version of this application. 

### Possible Routes: 

/  
/managererror  
/manager  
/clockinsuccess  
/clockoutsuccess  
/accounterror  
/editaccount  
/newaccount
/timelog
/audits
/incompletes 

## Backend

The backend of this project is hosted on https://backend-for-heroku.herokuapp.com/

### Possible Routes:

Using Postman, some possible routes through HTTP requests are:

GET https://backend-for-heroku.herokuapp.com/api/employees

GET https://backend-for-heroku.herokuapp.com/api/employees/154 

DELETE https://backend-for-heroku.herokuapp.com/api/employees/214

POST https://backend-for-heroku.herokuapp.com/api/employees  
With the following request body in json form  
{  
    "unique_id": 10,  
    "first_name": "Harry",  
    "last_name": "Potter",  
    "birthdate": "1980-07-31",  
    "manager_id": null,  
    "password": "nothashedpass",  
    "email": "harrypotter@gmail.com"  
}  


Authors: Robert Landowski, Manbir Singh, Yaline Sivekumaar