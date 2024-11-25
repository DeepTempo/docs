# Snowflake Quickstart Guide

## Overview
This guide walks you through setting up and using Tempo, a application for automated incendent detection using deep learning.

## Prerequisites
- Ensure you have the same permissions for warehouse, compute pool, and task management to use Tempo.

If you would rather use the Snowflake solution guide you can find it at [this link](https://quickstarts.snowflake.com/guide/getting_started_with_tempo_and_snowflake/index.html#0). 

## 1. Launching the App

### Find The App
In the Snowflake app Marketplace you can find the Tempo app or simply click [Here](https://app.snowflake.com/marketplace/listing/GZTYZOYXHNX/deeptempo-cybersecurity-tempo-cybersecurity-incident-identification-via-deep-learning?search=tempo).  

Improtantly - if you would like to run Tempo on your own data please select the correct storage before clicking the launch app button in the deployment phase.
To select your table please click `add` next to the `on Incident Inference Logs` section. In the popup after clicking the `add` button click the `+Select Data` button and find the table you want to use on the dropdown.  Select it and click `Save`.

Note: You can also use the demo data that we provide, which is based upon data from the Canadian Institute of Cybersecurity.  If you are using the demo data simply skip this step and continue. 

Snowflake will require you to grant permission to run this app.  For a smooth experience make sure you do this in the initial setup.

Next go to the `Projects>Worksheets` console in Snowflake. Here you should see a `+` sign in the top right corner of the screen.  We will use this to create our own worksheets. Go ahead and click it now. 

## 2. Select Database

From the top of the worksheet there should be a dropdown called `Select Databases`.  This is what you will use to attach our database to this worksheet.  If you are using demo data select the option with TEMPO at the beginning of it's name.

## 3. Resource Management

In the new worksheet we now need to setup our procedures. We will start with initializing the container resources. Throughout this guide we will provide you with statements to run.  Please add them to the sheet. You can do these one by one or add them all to a single worksheet.

### Initialize Application Resources
```sql
CALL management.create_resources();
```
#### Purpose: 
Initializes the application by loading required model weights and configurations
Required Permissions: Warehouse, compute pool, and task management access

#### Note:
It is recommended that you run this command before running the sheet as a whole.  It can take some time for the resources to spin up.  If you are the account admin you can monitor resources using `SHOW COMPUTE POOLS IN ACCOUNT;`. Once the compute pools are idle you may continue with the rest of the worksheet.

## 4. Detection

### Run Static Inference
```sql
CALL static_detection.inference('your_service_name');
```
**Parameters:**
- `your_service_name`: Name of the service to analyze (string).  This is set by you and should be unique to each run.
#### Purpose: 
Executes inference on specified service data

If you want to use the demo feel free to name it something like `demorun` for the `your_service_name`.

## 5. Deep Dive Analysis
```sql
CALL inspect.deepdive(sequence_id);
```
**Parameters:**
- `sequence_id`: Identifier of the sequence to analyze (integer). This ID can be used down the road if any anomalies are detected to run deeper investigation on suspicious interactions. 
#### Purpose: 
Investigate specific sequences flagged as anomalies

Note: If running on demo data let's use 2 as the id (valid IDs 1-1200)

## Notes
- All commands require appropriate permissions for warehouse, compute pool, and task management
- The management console is accessible via the Streamlit dashboard
- Reference data can be managed through the web-based management interface


To dive deeper click Next.