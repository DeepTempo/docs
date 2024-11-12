# Snowflake Quickstart Guide

## Overview
This guide walks you through setting up and using the core functionalities of the Tempo application, a comprehensive system for model inference, optimization, and automated detection.

## Prerequisites
- Ensure you have the same permissions for warehouse, compute pool, and task management to use Tempo.

## Initial Setup
1. **Create Resources**
   ```sql
   CALL management.create_resources();
   ```
   This initializes the application by loading model weights and configurations.

## Core Functionalities

### 1. Static Detection

#### Running Inference
Run inference by specifying only your service name:
   ```sql
   CALL static_detection.inference('your_service_name');
   ```

#### Deep Dive Analysis
To investigate specific sequences flagged as anomalies, use the sequence ID from the output table. This command helps you identify the flagged communication between IPs and enables further investigation of associated data points:
   ```sql
   CALL inspect.deepdive(sequence_id);
   ```

### 2. Automated Detection

#### Setting Up Automated Inference
To start automated inference, provide the fully qualified name (FQN) of the source table and the slot number where the table is referenced. The time period for auto inference is set internally to 8:00am UTC.
   ```sql
   CALL automated_detection.start_automated_inference(
       'source_table_name',
       slot_number
   );
   ```

#### Managing Automated Detection
Control automated inference streams by adjusting their state. Streams are tagged to references by slot number (e.g., `stream_one_interactions` for slot 1,`stream_two_interactions` for slot 2) and `stream_three_interactions` for slot 3).

   - **Suspend**: Temporarily halts inference but continues updating the stream.
   - **Resume**: Restarts the inference task.
   - **Stop**: Ends the inference task and clears data from the source table.

   ```sql
   CALL automated_detection.alter_automated_inference('stream_name', 'suspend');
   CALL automated_detection.alter_automated_inference('stream_name', 'resume');
   CALL automated_detection.alter_automated_inference('stream_name', 'stop');
   ```

### 3. Model Optimization
Fine-tune the model using a chosen service name. This process updates the model based on data referenced in the tuning log on the app's reference page.
   ```sql
   CALL model_optimization.tune_model('service_name');
   ```

### 4. Reference Management
Manage system references and access the web-based management interface. Placeholder for the image:
![Reference Management Console Placeholder](#)

The management console can be accessed via the Streamlit dashboard. 

