# United State Energy Information Administration Dashboard

Link to Dashboard: http://eiadashboard-env.eba-hupry3ai.us-east-1.elasticbeanstalk.com/

## Team Members:

- Florin Vasiliu
- Luis Olguin
- Ryan Ashcraft
- Vikash Bhakta

## Background and Motivation:

<div style="text-align: justify";>Inspired by the importance of energy trends in the United States, and particularly to the city of Houston, our group wanted to use data provided by the Energy Information Administration (EIA) to create a single, consolidated dashboard to make sense of the vast amount of available energy data. To that end, our group sought to answer the following questions: 

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ins>Q1</ins>: What is the USA total energy consumption/production by source? <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Data Source: https://www.eia.gov/opendata/qb.php?category=711239)

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ins>Q2</ins>: Which renewable energy source does each state use/produce the most? <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Data Source: https://www.eia.gov/opendata/qb.php?category=40203)

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ins>Q3</ins>: What is the average retail price of electricity by state and sector? <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Data Source: https://www.eia.gov/opendata/qb.php?category=40)

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ins>Q4</ins>: What is the average retail price of oil and gas by state and sector? <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Data Source: https://www.eia.gov/opendata/qb.php?category=241020)</div>

## Development and Deployment:

<div style="text-align: justify;">Each team member used a combination of API Requests, Python, Pandas, and PyMongo to pull their data from the EIA website, clean the data, and send that data to our MongoDB Atlas database. Using the cloud-stored data, we each created plots using JavaScript to answer our questions above. Each plot was created using either the plotly or chartjs library. After finalizing our individual charts, we deployed the entire dashboard to the web using Amazon Web Services. </div>
 
## Total Energy Consupmtion/Production in the United States

<div style="text-align: justify">Vikash</div>

## Renewable Energy Sources Consumed/Produced by State

<div style="text-align: justify">Ryan</div>

## Retail Price of Electricity by State

<div style="text-align: justify">Florin</div>

## Retail Price of Oil and Gas by State

<div style="text-align: justify">Luis</div>

[b. data streaming: EIA site -> data clean-up -> db update -> plot generation -> publishing

2. Energy sources breakdown and evolution by time

3. Renewable energy sources breakdown by state

4. Electricity prices

5. Emissions and gas prices]

  
