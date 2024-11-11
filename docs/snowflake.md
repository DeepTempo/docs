# Snowflake Quickstart Guide

## Overview
This guide walks you through setting up and using the core functionalities of the Tempo application, a comprehensive system for model inference, optimization, and automated detection.

## Prerequisites
- The same permission for warehouse and compute pool and now tasks
## Initial Setup

1. Create Resources
```sql
CALL management.create_resources();
```
This initializes the application by loading model weights and configurations.

## Core Functionalities

### 1. Static Detection

#### Running Inference
Choose between two detection types:
```sql
-- For incident detection
CALL static_detection.inference('your_service_name', 'incident');

-- For entity detection
CALL static_detection.inference('your_service_name', 'entity');
```

#### Deep Dive Analysis
Investigate specific sequences:
```sql
CALL inspect.deepdive(sequence_id);
```

### 2. Automated Detection

#### Setting Up Automated Inference
```sql
CALL automated_detection.start_automated_inference(
    'mystream',
    'source_table_name',
    1,
    '1 minute'
);
```

#### Managing Automated Detection
Control automated inference streams:
```sql
-- To pause monitoring
CALL automated_detection.alter_automated_inference('mystream', 'suspend');

-- To resume monitoring
CALL automated_detection.alter_automated_inference('mystream', 'resume');

-- To stop and clean up
CALL automated_detection.alter_automated_inference('mystream', 'stop');
```

### 3. Model Optimization

Fine-tune models for better performance:
```sql
-- For incident model
CALL model_optimization.tune_model('your_service_name', 'incident');

-- For entity model
CALL model_optimization.tune_model('your_service_name', 'entity');
```

### 4. Reference Management

Manage system references:
Through the reference management 
![alt text](/img/referenceManagement.png)

Access the web-based management interface:
```sql
-- The management console is available at:
the streamlit dashboard
```