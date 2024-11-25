# Fine-tune Model

If you want to increase the accuracy by tuning the model to your own network you can use the following commands.

```sql
CALL model_optimization.tune_model('service_name');
```
**Parameters:**
- `service_name`: Name of the service for model tuning (string)
Purpose: Updates model based on tuning log data from the reference page

### Model Rollback
```sql
CALL management.model_rollback(version);
```
Removes the specified version of the model and its metadata from the app.

**Parameters:**  
- `version`: The integer version number of the model to be rolled back.

**Usage Example:**  
```sql
CALL management.model_rollback(3);
```

Warning: THIS ACTION CAN NOT BE UNDONE!!!  Rolling back will remove all models after the version you roll back to. 
