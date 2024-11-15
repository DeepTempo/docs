# Snowflake Quickstart Guide

## Overview
This guide walks you through setting up and using the core functionalities of the Tempo application, a comprehensive system for model inference, optimization, and automated detection.

## Prerequisites
- Ensure you have the same permissions for warehouse, compute pool, and task management to use Tempo.

If you would rather use the snowflake solution guide you can find it at [this link](https://quickstarts.snowflake.com/guide/getting_started_with_tempo_and_snowflake/index.html#0). 

## 1. Launching the App

### Find The App
In the Snowflake app marketplace you can find the tempo app or you may click [Here](https://app.snowflake.com/marketplace/listing/GZTYZOYXHNX/deeptempo-cybersecurity-tempo-cybersecurity-incident-identification-via-deep-learning?search=tempo).  

If you are running on your own data you will have the select the storage before clicking the launch app button in the deployment phase.
To select your table please click `add` next to the `on Incident Inference Logs` section. In the popup after clicking the `add` button click the `+Select Data` button and find the table you want to use on the dropdown.  Select it and click `Save`.

Note: If you are running with the demo data simply skip this step and continue. 

Snowflake will require you to grant permissions to run this app.  For a smooth experiance make sure you do this in the initial setup.

Next go to the `Projects>Worksheets` consol in Snowfalke. Here you should see a `+` sign in the top right corner of the screen.  We will use this to create our own worksheets. Go ahead and click it now. 

## 2. Resource Management

In the new worksheet we now need to setup our procedures. We will start with initiallizing the container resources. Thorught this guide we will provide you with satements to run.  Please add them to the sheet. You can do these one by one or add them all to a single worksheet.

### Initialize Application Resources
```sql
CALL management.create_resources();
```
Purpose: Initializes the application by loading required model weights and configurations
Required Permissions: Warehouse, compute pool, and task management access

If it is recommended that you run this command prior to running the sheet as a whole.  It can take some time for the resources to spin up.  If you are the account admin you can monitor resources using `SHOW COMPUTE POOLS IN ACCOUNT;`. Once the compute pools are idle you may continue with the rest of the worksheet.


## 3. Select Database

From the top of the worksheet there should be a dropdown called `Select Databases`.  This is what you will use to attach our database to this worksheet.  If you are using demo data select the option with TEMPO at the beginning of it's name.

## 4. Detection

### Run Static Inference
```sql
CALL static_detection.inference('your_service_name');
```
Parameters:
- `your_service_name`: Name of the service to analyze (string).  This is set by you and should be unique to each run.
Purpose: Executes inference on specified service data

If you want to use the demo feel free to name it something like `demorun` for the `your_service_name`.

### Start Automated Inference
```sql
CALL automated_detection.start_automated_inference(
    'source_table_name',
    slot_number
);
```
Parameters:
- `source_table_name`: Fully qualified name of the source table (string).  This should be the same name as the table you will want to run against.  If you selected your own data in the setup phase you will need to pass in the full table name in the format `database.schema.tablename`.  To do this easlily highlight `source_table_name` and doubleclick the table you want to add in the nowflake pannel on the left. 
- `slot_number`: Reference slot number (integer). This is how we map the data to the job. We assign data to each slot and then reference the slot in each job. 
Notes:
- If you do static infernace the job will run when you deploy.  If you use automatic inference it will be Scheduled for 8:00am UTC daily
- When you add a table to a slot our app will create a stream to corrisponding to the slot number. Stream names are automatically generated based on slot numbers:
  - Slot 1: `stream_one_interactions`
  - Slot 2: `stream_two_interactions`
  - Slot 3: `stream_three_interactions`

## 5. Deep Dive Analysis
```sql
CALL inspect.deepdive(sequence_id);
```
Parameters:
- `sequence_id`: Identifier of the sequence to analyze (integer). This ID can be used down the road if any anomalies are detected to run deeper investigation on suspicious interactions. 
Purpose: Investigates specific sequences flagged as anomalies

Note: If running on demo data lets use 2 as the id (valid IDs 1-1200)

## 6. Manage Automated Inference (Optional)

If you want to effect a job that is running you can use the following optional command and parameters to control active jobs. 

```sql
CALL automated_detection.alter_automated_inference('stream_name', 'action');
```
Parameters:
- `stream_name`: Name of the stream to manage (string). This was defined in the previous step.
- `action`: One of the following (string):
  - `'suspend'`: Pause inference while maintaining stream updates
  - `'resume'`: Restart paused inference
  - `'stop'`: Terminate inference and clear source data

Example Usage:
```sql
-- Suspend stream
CALL automated_detection.alter_automated_inference('stream_one_interactions', 'suspend');

-- Resume stream
CALL automated_detection.alter_automated_inference('stream_one_interactions', 'resume');

-- Stop stream
CALL automated_detection.alter_automated_inference('stream_one_interactions', 'stop');
```

## 7. Model Optimization

### Fine-tune Model
```sql
CALL model_optimization.tune_model('service_name');
```
Parameters:
- `service_name`: Name of the service for model tuning (string)
Purpose: Updates model based on tuning log data from the reference page

## Notes
- All commands require appropriate permissions for warehouse, compute pool, and task management
- The management console is accessible via the Streamlit dashboard
- Reference data can be managed through the web-based management interface