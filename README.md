# Bank Branch Codes

- Small project for getting bank data together with their branch details
- NB: This list is not exclusive and more data may need to be gathered and cross checked in order to provide accurate data
- **Reason behind this**: Didn't find a Central Place for finding this data. One is forced to visit the website of every bank to find the info which I find abit tiring.
- This is a hobby project and contributions are welcome

## Cloning the Project

- Install the project in your local machine
  ```sh
   git clone https://github.com/KWangechi/bank-codes-web-scrapper.git
  ```

- **Setting Up Venv(Virtual Environment) - Windows**
  > You must have pip installed
  ```sh
    python -m venv venv
  ```
  
  > Navigate to the Scripts folder
    ```sh
     cd venv/Scripts  
    ```
  >  then activate the virtual env
     ```sh
     .\activate 
    ```

That's it!! Your project is now setup

## Running the script

You don't need to do this as the json file has already been generated and it contains additional information e.g icons and aliases.

So this section is for those who want to try this out and also tweak it a bit

- Simply run  `python main.py` on the root folder and you'll have a **`banks_info.json`** output file
  > **NB.** The file is not exhaustive as it only contains data scraped from the PDF file in the root project (Bank-and-Branches-July-2023v.pdf)
- The PDF file is obtained from [Kenya Banks and Branches Information](https://www.kba.co.ke/wp-content/uploads/2023/09/Bank-and-Branches-July-2023v.pdf) and the data is updated till 2023 (May need confirmation)

## Running the frontend

The frontend is written using the [React](https://react.dev) framework

- Navigate to the _bank-info-fe_ folder:
  ```sh
    cd bank-info-fe
  ```
- Install npm dependencies:
   ```sh
    npm install
   ```
- Run the application:
   ```sh
    npm start
   ```
- Open the application at:
    ```sh
    http://localhost:3000
    ```

Hooray! Application is now running

## Contributing

- Contributions are welcome... Simply fork the repository into your Github Account and once done, submit a PR which will be reviewed and if all is good, your changes will be merged

- Also check out the issues tab to create issues and get updates on PR's
