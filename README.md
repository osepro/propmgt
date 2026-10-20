# Property Management System

A web app for property and mortgage sales. Marketers sign in, register customers who are buying plots in estates, work out each sale's cost, and record installment payments until the balance is paid off.

## Features

- **Marketer accounts:** create marketer accounts and sign in with a username and password. Passwords are hashed with bcrypt, and logins use Passport (local strategy) with sessions.
- **Customer registration:** record a buyer's contact details, property location, plot size and the marketer handling the sale.
- **Automatic pricing:** the total cost is worked out in the browser from the chosen location's price per plot × the number of plots:

  | Location                 | Price per plot |
  | ------------------------ | -------------: |
  | Lakowe/Lekki             | 4,800,000      |
  | Agbara Igbesa            | 1,800,000      |
  | Ilamija Ibeju Lekki/Epe  | 1,800,000      |
  | Agbowa/Ikorodu           | 750,000        |
  | Mowe/Ofada               | 650,000        |

- **Payment plans:** choose full or installment payment. For installments, enter a first deposit and the balance is calculated, with a check that the deposit isn't more than the total cost.
- **Payment tracking:** record payments against a customer. Each payment is saved with its date, and a bar on the customer's page shows how much is paid and how much is left.
- **Dashboards:** each marketer sees only their own customers and payments. There's also a list of all marketers.
- **Customer management:** view, edit and delete customer records.
- **Form validation and flash messages** using `express-validator` and `connect-flash`.

## Tech Stack

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Server     | Node.js, Express 4                                 |
| Database   | MongoDB with Mongoose                              |
| Auth       | Passport (local strategy), bcryptjs, express-session |
| Views      | Pug templates                                      |
| Frontend   | Bootstrap, jQuery, bootstrap-slider (installed with Bower) |

## Project Structure

```
propmgt/
├── app.js                 # Express setup, middleware, and server start (port 5000)
├── config/
│   ├── database.js        # MongoDB connection string and secret
│   └── passport.js        # Passport local strategy
├── models/
│   ├── user.js            # Marketer accounts
│   ├── customers.js       # Customers and their property purchases
│   └── payment.js         # Payment records
├── routes/
│   ├── users.js           # Login, logout, marketers, dashboards
│   └── customers.js       # Customer CRUD and payments
├── views/                 # Pug templates
└── public/
    ├── custom-style/      # App CSS
    ├── js/main.js         # Pricing, balance, and progress bar logic
    └── bower_components/  # Bootstrap, jQuery, bootstrap-slider
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port `27017`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/osepro/propmgt.git
   cd propmgt
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Change the database connection in `config/database.js`:

   ```js
   module.exports = {
     database: 'mongodb://localhost:27017/propertymgt',
     secret: 'yoursecret'
   }
   ```

4. Start the app:

   ```bash
   npm start
   ```

5. Open `http://localhost:5000` in your browser.

### Creating the first account

Go to `http://localhost:5000/users/dashboard/newuser` to create a marketer account, then sign in on the home page.

## Routes

| Method | Path                                  | Description                       |
| ------ | ------------------------------------- | --------------------------------- |
| GET    | `/`                                   | Sign-in page                      |
| POST   | `/users/login`                        | Sign in                           |
| GET    | `/users/logout`                       | Sign out                          |
| GET/POST | `/users/dashboard/newuser`          | Create a marketer account         |
| GET    | `/users/dashboard/welcome`            | The signed-in marketer's customers |
| GET    | `/users/dashboard/marketers`          | All marketers                     |
| GET    | `/users/dashboard/payment`            | Payment overview                  |
| GET/POST | `/customer/register`                | Register a customer               |
| GET    | `/customer/details/:id`               | Customer details and payment progress |
| GET/POST | `/customer/details/edit/:id`        | Edit a customer                   |
| DELETE | `/customer/delete/:id`                | Delete a customer                 |
| GET/POST | `/customer/makepayment/edit/:id`    | Record a payment                  |

## Data Models

**User** — `fullname`, `email`, `phoneno`, `username`, `password`, `role`

**Customers** — `Firstname`, `Lastname`, `Email`, `PhoneNo`, `Address`, `PropertyLocation`, `PlotSize`, `PropertyCost`, `InitialDeposit`, `Balance`, `PaymentType`, `Marketer`

**Payment** — `custid`, `amount`, `dateposted`

## Notes

This is a learning project. Before using it in production:

- Move the session secret and database settings into environment variables.
- Protect the account-creation route so only admins can add marketers.
- Remove `node_modules/` from the repository and add a `.gitignore`.
- Move location prices from front-end code to the database.
