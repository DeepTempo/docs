# Automated Detection

## Important Notice ⚠️
This section has been withdrawn from version 1.2.0 for further tuning. Please refer to the updated documentation for the latest information and guidelines regarding automated detection.


Instead of running manually you can configure Tempo to run on a schedule using the following commands. 

## Start Automated Inference
```sql
CALL automated_detection.start_automated_inference(
    'source_table_name',
    slot_number,
    refresh_time
);
```
**Parameters:**
- `source_table_name`: Fully qualified name of the source table (string).  This should be the same name as the table you will want to run against.  If you selected your own data in the setup phase you will need to pass in the full table name in the format `database.schema.tablename`.  To do this easlily highlight `source_table_name` and doubleclick the table you want to add in the Snowflake pannel on the left. 
- `slot_number`: Reference slot number (integer). This is how we map the data to the job. We assign data to each slot and then reference the slot in each job. This number needs to be unique to the stream.  Once it is set we don't need to reference it again. 
- `refresh_time`: Task Execution Schedule (Cron Format). This defines the schedule for task execution using cron format. It consists of five fields specifying: 

    ```
    # __________ minute (0-59)
    # | ________ hour (0-23)
    # | | ______ day of month (1-31, or L)
    # | | | ____ month (1-12, JAN-DEC)
    # | | | | _ day of week (0-6, SUN-SAT, or L)
    # | | | | |
    # | | | | |
      * * * * *
    ```
    
    #### Examples:
    - `0 0 * * *`: Runs daily at midnight.  
    - `*/15 9-17 * * MON-FRI`: Every 15 minutes, 9 AM–5 PM, Monday to Friday.  
    - `30 23 L * *`: Runs at 11:30 PM on the last day of the month.  

Notes:
- If you do static inference the job will run when you deploy.  If you use automatic inference it will be Scheduled based on the `refresh_time`
- When you add a table to a slot our app will create a stream to corresponding to the slot number. Stream names are automatically generated based on slot numbers:
  - Slot 1: `stream_one_interactions`
  - Slot 2: `stream_two_interactions`
  - Slot 3: `stream_three_interactions`

##  Manage Automated Inference (Optional)
If you want to affect a job that is running you can use the following optional command and parameters to control active jobs. 

```sql
CALL automated_detection.alter_automated_inference('stream_name', 'action');
```
**Parameters:**
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
