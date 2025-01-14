# Fine-tune Model

To access fine-tuning features, contact support@DeepTempo.ai for activation.

#### When to Consider Fine-Tuning

Our baseline model provides robust performance across many use cases. However, fine-tuning can be beneficial in specific scenarios:

#### Performance Evaluation Workflow

1. Initial Assessment
   - Start by testing the baseline model on a representative subset of your data using the [Evaluation function](#performance-evaluation)
   - Collect performance metrics:
     - Accuracy rate
     - False Negative and Positive rate (F1 Score)
     - Recall

2. Decision Criteria for Fine-Tuning
   - Consider fine-tuning if:
     - Baseline model accuracy falls below 85-90%
     - Low F1 Score
     - Critical domain-specific patterns are consistently missed

### Computational Considerations

#### Fine-Tuning Resource Requirements

- Estimated Compute Time and Expense:

  | **Dataset Size**      | **Estimated Time (hours)** | **Compute Cost (Credits)** |
  |-----------------------|---------------------------|----------------------------|
  | Small (1-100k samples)  | ~ 0.01 - 0.05          |      ~0.0095               |
  | Medium (100k-1M samples)| ~ 0.05 - 0.1           | ~0.05              |
  | Large (1M+ samples)  |  > 0.1                    | > 0.1                |
 
- Resources in use: 
  - Compute Pool: GPU_NV_S (0.57 CpH)
  - Warehouse size : Medium (4 CpH)

> **Note:** *[CpH](https://www.snowflake.com/legal-files/CreditConsumptionTable.pdf) refers to credits per hour* 

### Performance Evaluation

You can evaluate model performance using the `CALL STATIC_DETECTION.evaluation();` function after assigning a table with labeled data to the evaluation reference in the reference table.

1. Assign a labeled data table to the evaluation reference within the reference table.  

2. Run the `STATIC_DETECTION.evaluation()` procedure to generate performance metrics based on the assigned data.

```sql
CALL STATIC_DETECTION.evaluation();
```

# Fine-tuning the Model

If you want to increase the accuracy by tuning the model to your own network you can use the following commands.

```sql
CALL model_optimization.tune_model('service_name');
```
**Parameters:**
- `service_name`: Name of the service for model tuning (string)

Purpose: Updates model based on tuning log data from the reference page as shown in the screenshot
![reference page](../assets/reference_page.png)

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
