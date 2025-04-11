# Snowflake Tempo Command Reference

## Resource Management

### Initialize Application Resources
```sql
CALL INFRA_CONTROLS.CREATE_RESOURCES();
```
Purpose: Initializes the application by loading required model weights and configurations
Required Permissions: Warehouse, compute pool, and task management access

## Static Detection

### Run Inference
```sql
CALL STATIC_DETECTION.ANOMALY_DETECTION(with_mitre:boolean);
```
Parameters:
- `True/False`: Specifies whether to include optional MITRE tactic mappings in the classified anomalies. Set to TRUE to include the mappings, or False to exclude them.
Purpose: Executes inference on specified service data

### Deep Dive Analysis
```sql
CALL INSPECT.INVESTIGATE_SEQUENCE(sequence_id:varchar);
```
Parameters:
- `sequence_id`: Identifier of the sequence to analyze (varchar)
  
Purpose: Investigates specific sequences flagged as anomalies

### MITRE ATT&CK Technique Classification
```sql
CALL THREAT_INTELLIGENCE.MITRE_TACTIC_CLASSIFICATION();
```
Purpose: Classifies known anomlies to the corresponding MITRE ATT&CK technique

## Model Optimization

### Model Evaluation

```sql
CALL MODEL_OPTIMIZATION.EVALUATE_PERFORMANCE();
```
Purpose: Evaluates the model's effectiveness using labeled user data to determine if the base model is suitable for the given use case.

### Fine-tune Model
```sql
CALL MODEL_OPTIMIZATION.TUNE_MODEL();
```

Purpose: Updates model based on tuning log data from the reference page

### Model Rollback
```sql
CALL INFRA_CONTROLS.MODEL_ROLLBACK(version:int);
```
Parameters: 
- `version`: The integer version number of the model to be rolled back.
  
Purpose: Removes the specified version of the model and its metadata from the app.



## Notes
- All commands require appropriate permissions for warehouse, compute pool, and task management
- The management console is accessible via the Streamlit dashboard
- Reference data can be managed through the web-based management interface
