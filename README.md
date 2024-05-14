# Content Moderator

This project is a Node.js backend application for moderating images and videos using AWS Rekognition. It fetches content from a specified API, processes it, and determines if the content is appropriate.

## Prerequisites

- Node.js installed
- AWS account with access to AWS Rekognition
- MySQL database

## Setup

1. Clone the repository:

```bash
git clone https://github.com/s3roy/content-moderator.git
cd content-moderator


npm install


Create a .env file in the root directory with the following content:
plaintext
Copy code
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
PORT=3000
Replace the placeholders with your actual AWS and database credentials.

Set up the MySQL database:
sql
Copy code
CREATE DATABASE your-database-name;
Start the application:
bash
Copy code
node app.js
API Endpoints
GET /moderated-content: Fetch paginated moderated content.
POST /moderate-content: Start content moderation.
GET /config: Get the current configuration.
POST /config: Update the configuration.
POST /upload-json: Upload a JSON array of content to moderate.
Usage
Use Postman or a similar tool to interact with the API endpoints.

Contributing
Feel free to open issues or submit pull requests if you find bugs or have suggestions for improvements.
