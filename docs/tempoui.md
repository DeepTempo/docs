# Tempo Comprehensive User Guide

## Overview
In the field of threat detection, traditional rule-based systems have dominated for years. While these systems have served their purpose, they come with significant limitations. Their rigid structure makes them inflexible, and their bulky nature often makes them difficult to manage. More importantly, these systems frequently fail to identify critical threats, requiring constant manual intervention and maintenance to stay effective.

This guide introduces Tempo, a modern solution that leverages deep learning for network threat detection. By moving beyond conventional rule-based approaches, Tempo offers a more sophisticated and adaptable way to identify and respond to security events. Tempo is uniquely able to see attacks that others cannot, using a Deep Learning model that analyzes network and flow logs to detect various attacks, mapping them to MITRE ATT&CK for integration with your SIEM, SOC, and Threat Response systems.

## Getting Started

### Deployment Options
Tempo can be deployed in two ways:
1. **Snowflake Deployment**: Run directly within your Snowflake environment
2. **On-Premises Deployment**: Run as containerized application in your environment using Docker and GPU enabled Kubernetes

### Prerequisites

#### For Snowflake Deployment:
- Grant Tempo necessary permissions including creating warehouses and compute pools as shown in the following images
- Configure proper database access as shown in the following images

![Permissions Page](https://img.src="/api/placeholder/800/450" alt="Tempo permissions setup page")

#### For On-Premises Deployment:
- Docker installed and configured
- Helm v3+ installed
- Kubernetes cluster configured (kubectl access) with GPUs
- deeptempo license key with appropriate permissions
- zip file with the installer (provided by DeepTempo)

### Finding and Installing Tempo in Snowflake

In the Snowflake Marketplace, you can find the Tempo app or directly access it [Here](https://app.snowflake.com/marketplace/listing/GZTYZOYXHP3/deeptempo-cybersecurity-tempo).

#### Selecting Storage for Tempo Deployment

If you want to run Tempo on your own data, follow these steps to select the correct storage before launching the app:

![Reference Navigation](https://img.src="/api/placeholder/800/450" alt="Storage selection navigation animation")

If you would like to use demo data, you can skip this step.

1. Click the **Add** button next to the **on Incident Inference Logs** section
2. In the popup window, click **+Select Data**
3. From the dropdown menu, find and select the appropriate table
4. Click **Save** to confirm your selection

Once Tempo is running, a management interface launches which will help you monitor Tempo. Before using the management interface, you need to configure Tempo using commands in a worksheet.

### On-Premises Deployment Instructions

To deploy Tempo in your own environment:

1. **Prepare Environment**:
   - For testing, you can use Minikube with GPU support:
     ```bash
     # Install Minikube
     curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
     sudo install minikube-linux-amd64 /usr/local/bin/minikube
     
     # Start minikube with GPU support
     minikube start --driver docker --container-runtime docker --gpus all
     minikube addons enable nvidia-device-plugin
     ```

2. **Deploy Using Script**:
   ```bash
   ./deploy.sh <deeptempo_license>
   ```

3. **Exposing the Service**:
   - If running in a test environment with Minikube:
     ```bash
     kubectl port-forward service/tempo-nginx 32598:80 --address 0.0.0.0 &
     ```

## Snowflake worksheet Configuration and Setup (non UI approach)

### 1. Select Database

From the top of the worksheet, use the "Select Databases" dropdown to attach your database. If you are using demo data, select the option with TEMPO at the beginning of its name.

![Database Selection](https://img.src="/api/placeholder/800/450" alt="Database selection dropdown animation")

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



## Tempo User Interface Navigation (Showflake and On-prem)

The Tempo interface includes several main sections accessible from the navigation menu on the left:

- **Home**: Dashboard with overview and welcome information
- **Data Sources**: Configure and manage data input sources
- **Threat Overview**: High-level analysis of your network security posture
- **Forensic Analysis**: Detailed investigation capabilities
- **Deep Investigation**: Advanced analysis of specific threats
- **Settings**: System configuration and preferences (many settings are on prem only)

### Using Demo Data On prem UI
Demo data provides pre-loaded network flow data for quick analysis without requiring external data sources:

1. From the Data Sources screen, select "Demo Data" from the dropdown
2. This option allows you to explore Tempo's capabilities with sample NetFlow data
3. Click "Run Inference on Demo Data" to begin analysis

### Using Your Own Data Snowflake worksheets
To run Tempo on your own data:

#### For Snowflake Deployment:
```sql
-- Initialize Application Resources
CALL INFRA_CONTROLS.CREATE_RESOURCES();

-- Run Static Inference (set to True to include MITRE tactic mappings)
CALL STATIC_DETECTION.ANOMALY_DETECTION(TRUE);
```

#### For On-Premises Deployment:

1. Navigate to the **Data Sources** section from the left menu
2. Select a data source or use demo data for quick analysis. 
    - Demo data allows you to explore the platform's capabilities with sample NetFlow data. The demo is a CIC netflow dataset
    - If you want you can upload your network logs through the Data Sources interface or connect to an S3 bucket
2. make sure the data is formatted correctly to ensure proper field identification
3. Start the analysis process by clicking "Run Inference"

#### Required Data Features

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

## Gaining insites with the UI

The Threat Overview section provides a comprehensive view of your network security status:

#### MITRE ATT&CK Framework Distribution

Tempo maps detected threats to the MITRE ATT&CK framework, providing a distribution chart that shows:

- **Initial Access**: Events indicating initial compromise attempts
- **Collection**: Data gathering activities
- **Impact**: Actions aimed at manipulation, interruption, or destruction
- **Credential Access**: Attempts to steal credentials
- **Privilege Escalation**: Efforts to gain higher-level permissions
- **Discovery**: Network and system discovery activities
- **Exfiltration**: Data theft attempts
- **Lateral Movement**: Movement between systems in the network
- **Reconnaissance**: Information gathering activities

### Detailed Network Forensics

The Forensic Analysis section allows for in-depth investigation of network activities:

1. Select source and destination IPs to filter events
2. View total connections, forward bytes, and backward bytes
3. Analyze the distribution of MITRE ATT&CK phases
4. Examine detailed occurrences of each attack phase

For specific network connections, you can:
- Filter by IP addresses to focus on particular communication paths
- View detailed statistics about data transferred
- Identify the predominant attack techniques used

### Using the Forensichat Interface

Forensichat is Tempo's AI-powered analysis assistant that enables natural language interaction with your security data:

#### Creating New Queries
1. Click the **New Query** button
2. Enter your question in natural language, such as:
   - Show me the top 20 similar events to sequence id 002dfbd6-df9a-4eed-a41f-4d707a54c183
3. Click **Analyze Query** to process your request

#### Viewing Query Results
Results are displayed in a table format showing relevant information such as:
- Sequence IDs
- Source and destination IPs
- Data transfer volumes
- MITRE ATT&CK classifications

#### Forensic Insights
Tempo provides insights based on similarity search in high-dimensional embeddings constructed from your logs. For any suspicious sequence, you can view similar events to identify patterns and potential attack campaigns.

### Deep Dive Analysis

For more detailed analysis of specific sequences

## Using Snowflake Commands

One unique capability of Tempo is that potential incidents are tied back to underlying data sequences. Every sequence used by Tempo is assigned a unique ID and is available for additional analysis. You can see this Sequence ID with every anomaly identified.

```sql
CALL INSPECT.INVESTIGATE_SEQUENCE('sequence_id');
```

**Parameters**:
- `sequence_id`: Identifier of the sequence to analyze (varchar). This ID can be used for deeper investigation on suspicious interactions.

**Purpose**: This procedure returns the raw data points used in the composition of a given sequence.

**Note**: If running on demo data, use 2 as the ID (valid IDs 1-1200)

If you ran the inference with MITRE tactic mappings turned on, you can dive even deeper using the MITRE ATT&CK Classification documentation.

## System Configuration UI only

Access the Settings section to configure Tempo according to your needs:

### System Status (On Premise only)
Monitor the operational status of various components:
- Processing Module
- Vector Database
- Inference Server

All components should show as "Online" for proper system functionality.

### Application Settings

#### Analysis Filters
Configure how Tempo processes and displays data:
- **Ignore Unclassified MITRE Tactics**: Filter out events that couldn't be mapped to MITRE tactics
- **Ignore Benign Network Flows**: Hide normal network activities
- **Ignore Anomalous Flows**: Filter out anomalies (useful when focusing on specific patterns)

#### Display Settings
- **Show Timestamps**: Toggle timestamp display in results

### Reset Application
If needed, you can reset the application to its default state, clearing all loaded data and settings.

**Note**: This action cannot be undone.

## Troubleshooting

If you encounter issues:

### For All Deployments:
1. Check the System Status page to ensure all components are online
2. Verify data source configurations
3. Reset the application if necessary using the "Reset Application" button in Settings

### For Snowflake Deployment:
1. Check warehouse and compute pool status using `SHOW COMPUTE POOLS IN ACCOUNT;`
2. Verify permissions are properly configured
3. Review SQL command syntax for any errors
4. Ensure the management console is accessible via the Streamlit dashboard

### For On-Premises Deployment:
- **Components Showing Offline**: Check network connectivity and resource allocation
- **No Data Appearing**: Verify data source configuration and format
- **Analysis Not Working**: Ensure all prerequisites are installed and properly configured
- **Performance Issues**: Check system resources, particularly GPU availability for on-premises deployments

For some useful commands 
1. Verify Docker credentials: `docker login ghcr.io -u <username>`
2. Check Kubernetes connection: `kubectl get nodes`
3. Review Helm release status: `helm status tempo -n default`
4. Check pod status: `kubectl get pods -n default`
5. View pod logs: `kubectl logs <pod-name> -n default`

## Additional Resources

For more information and assistance:
- **Snowflake Marketplace**: Find the Tempo app in the Snowflake Marketplace or directly access it [Here](https://app.snowflake.com/marketplace/listing/GZTYZOYXHP3/deeptempo-cybersecurity-tempo)
- **MITRE ATT&CK Framework**: [attack.mitre.org](https://attack.mitre.org/)
- **Support**: [support@deeptempo.ai](mailto:support@deeptempo.ai)
