# Bank Branch Codes

- Small project for getting bank data together with their branch details
- **NOTE**: This list is not exclusive and more data may need to be gathered and cross checked in order to provide accurate data
- **Reason behind this**: Didn't find a Central Place for finding this data. One is forced to visit the website of every bank to find the info which I find a bit tiresome.
- This is a hobby project and contributions are welcome

## Development

- Clone the repository: `git clone https://github.com/KWangechi/bank-codes-web-scrapper.git`

### Running the script

**This is UNNECESSARY**

You don't need to do this as the json file (`banks_info.json`) has already been generated and it contains additional information e.g icon, alias.

So this section is for those who want to try this out and also tweak it a bit

A virtual environment is necessary.

#### Setting up pip `

On Windows:
- You must have pip installed - python -m venv venv
- Navigate to the `/venv/Scripts`: `cd venv/Scripts`
- Activate the virtual env: `.\activate``
- Install dependencies: `pip install -r requirements.txt`

On Linux:
- Install pip (depending on your distro)
- For debian based: `sudo apt install pip` and arch based 'sudo pacman -Sy pip'
- Create a virtual environment: `python -m venv <name of virtual env>`
- Activate the virtual environment: `source <name of virtual env>/bin/activate`
- Install dependencies: `pip install -r requirements.txt`

Run `python main.py` on the root folder and you'll have a **`banks_info.json`** output file

  > **NB.** The file is not exhaustive as it only contains data scraped from the PDF file in the root project (Bank-and-Branches-July-2023v.pdf)
- The PDF file is obtained from [Kenya Banks and Branches Information](https://www.kba.co.ke/wp-content/uploads/2023/09/Bank-and-Branches-July-2023v.pdf) and the data is updated till 2023 (May need confirmation)

### Running the frontend

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

- Contributions are welcome
- Simply fork the repository into your Github Account and once done, submit a PR which will be reviewed and if all is good, your changes will be merged
- Also check out the issues tab to create issues and get updates on PR's
