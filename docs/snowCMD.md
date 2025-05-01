# Tempo Snowflake Worksheets

## Overview
Tempo is a modern solution that leverages deep learning for network threat detection. By moving beyond conventional rule-based approaches, Tempo offers a more sophisticated and adaptable way to identify and respond to security events. This guide focuses on using Tempo via Snowflake's command-line interface (CLI) and SQL worksheets.

## Snowflake worksheet Configuration and Setup

### 1. Select Database

From the top of the worksheet, use the "Select Databases" dropdown to attach your database. If you are using demo data, select the option with TEMPO at the beginning of its name.

### 2. Resource Management

In a new Snowflake worksheet, you need to set up the necessary procedures. You can add these commands one by one or include them all in a single worksheet.

#### Initialize Application Resources
```sql
CALL INFRA_CONTROLS.CREATE_RESOURCES();
```

**Purpose**: Initializes the application by loading required model weights and configuration using the granted permissions for warehouse and compute pool creation and task management.

**Note**: It is recommended that you run this command separately before running the complete worksheet, as it can take some time for resources to spin up. If you are the account admin, you can monitor resources using `SHOW COMPUTE POOLS IN ACCOUNT;`. Once the compute pools are idle, you may continue with the rest of the worksheet.

### 3. Detection

#### Run Static Inference
```sql
CALL STATIC_DETECTION.ANOMALY_DETECTION(TRUE);
```

**Parameters**:
- `True/False`: Specifies whether to include optional MITRE tactic mappings in the classified anomalies. Set to TRUE to include the mappings, or FALSE to exclude them.

**Purpose**: This parameter toggles whether MITRE strategy mappings are added to the identified anomalies during the inference phase or if only the anomaly detection task runs.

## Using Your Own Data with Snowflake Worksheets

To run Tempo on your own data:

```sql
-- Initialize Application Resources
CALL INFRA_CONTROLS.CREATE_RESOURCES();

-- Run Static Inference (set to True to include MITRE tactic mappings)
CALL STATIC_DETECTION.ANOMALY_DETECTION(TRUE);
```

## Advanced Analysis Commands

One unique capability of Tempo is that potential incidents are tied back to underlying data sequences. Every sequence used by Tempo is assigned a unique ID and is available for additional analysis. You can see this Sequence ID with every anomaly identified.

```sql
CALL INSPECT.INVESTIGATE_SEQUENCE('sequence_id');
```

**Parameters**:
- `sequence_id`: Identifier of the sequence to analyze (varchar). This ID can be used for deeper investigation on suspicious interactions.

**Purpose**: This procedure returns the raw data points used in the composition of a given sequence.

If you ran the inference with MITRE tactic mappings turned on, you can dive even deeper using the MITRE ATT&CK Classification documentation.

## Required Data Features

Your dataset must include the following features for proper analysis:

| Feature | Description |
|---------|-------------|
| timestamp | String datetime when flow started (e.g., "2017-03-07 08:55:58") |
| flow_dur | The duration of the flow in seconds |
| src_ip | A unique identifier of the source device initiating the flow |
| dest_ip | A unique identifier of the destination device receiving the flow |
| src_port | Source port |
| dest_port | Destination port |
| fwd_bytes | Total number of payload bytes, sent from source to destination |
| bwd_bytes | Total number of payload bytes, sent from destination to source |
| total_fwd_pkts | Total number of packets sent from source to destination |
| total_bwd_pkts | Total number of packets sent from destination to source |
| label | Required if fine-tuning. Indicates if flow is suspicious (1) or normal (0) |

These features can be exported from network monitoring tools such as NetFlow, Wireshark, Zeek, SolarWinds, or AWS/GCP Flow logs.

## Troubleshooting Snowflake Deployment

If you encounter issues:

1. Check warehouse and compute pool status using `SHOW COMPUTE POOLS IN ACCOUNT;`
2. Verify permissions are properly configured
3. Review SQL command syntax for any errors
4. Ensure the management console is accessible via the Streamlit dashboard

## Additional Resources

For more information and assistance:
- **Snowflake Marketplace**: Find the Tempo app in the Snowflake Marketplace or directly access it [Here](https://app.snowflake.com/marketplace/listing/GZTYZOYXHP3/deeptempo-cybersecurity-tempo)
- **MITRE ATT&CK Framework**: [attack.mitre.org](https://attack.mitre.org/)
- **Support**: [support@deeptempo.ai](mailto:support@deeptempo.ai)