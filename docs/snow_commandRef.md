# Snowflake Tempo Command Reference

## Resource Management

### Initialize Application Resources
```sql
CALL management.create_resources();
```
Purpose: Initializes the application by loading required model weights and configurations
Required Permissions: Warehouse, compute pool, and task management access

## Static Detection

### Run Inference
```sql
CALL static_detection.inference(include_mitre_map);
```
Parameters: 
- `include_mitre_map (BOOLEAN)`: Specifies whether to include MITRE technique mappings in the classified anomalies. Set to TRUE to include the mappings, or FALSE to exclude them.

Purpose: This parameter acts as a toggle to determine whether MITRE technique mappings are added to the identified anomalies during the inference process.

### Deep Dive Analysis
```sql
CALL inspect.deepdive(sequence_id);
```
Parameters:
- `sequence_id`: Identifier of the sequence to analyze (string/integer)
Purpose: Investigates specific sequences flagged as anomalies


### Mitre ATT&CK Classification
```sql
CALL inspect.mitre_classification();
```

Parameters:
- `None`

Purpose: Classifies MITRE techniques  for a table of known anomalies sourced from the Tempo app or other systems


## Automated Detection

### Start Automated Inference
```sql
CALL automated_detection.start_automated_inference(
    'source_table_name',
    slot_number
);
```
Parameters:
- `source_table_name`: Fully qualified name of the source table (string)
- `slot_number`: Reference slot number (integer)
Notes:
- Scheduled for 8:00am UTC daily
- Stream names are automatically generated based on slot numbers:
  - Slot 1: `stream_one_interactions`
  - Slot 2: `stream_two_interactions`
  - Slot 3: `stream_three_interactions`

### Manage Automated Inference
```sql
CALL automated_detection.alter_automated_inference('stream_name', 'action');
```
Parameters:
- `stream_name`: Name of the stream to manage (string)
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

## Model Optimization

### Model Evaluation

```sql
CALL static_detection.evaluation();
```
Purpose: Evaluates the model's effectiveness using labeled user data to determine if the base model is suitable for the given use case.

### Fine-tune Model
```sql
CALL model_optimization.tune_model('service_name');
```
Parameters:
- `service_name`: Name of the service for model tuning (string)

Purpose: Updates model based on tuning log data from the reference page

### Model Rollback
```sql
CALL management.model_rollback(version);
```
Parameters: 
- `version`: The integer version number of the model to be rolled back.
  
Purpose: Removes the specified version of the model and its metadata from the app.



## Notes
- All commands require appropriate permissions for warehouse, compute pool, and task management
- The management console is accessible via the Streamlit dashboard
- Reference data can be managed through the web-based management interface
