# Tempo Snowflake UI

## Overview
Tempo is a modern solution that leverages deep learning for network threat detection. By moving beyond conventional rule-based approaches, Tempo offers a more sophisticated and adaptable way to identify and respond to security events. Tempo uses a Deep Learning model that analyzes network and flow logs to detect various attacks, mapping them to MITRE ATT&CK for integration with your SIEM, SOC, and Threat Response systems.

## Finding and Installing Tempo in Snowflake

In the Snowflake Marketplace, you can find the Tempo app or directly access it [Here](https://app.snowflake.com/marketplace/listing/GZTYZOYXHP3/deeptempo-cybersecurity-tempo).

### Prerequisites for Snowflake Deployment
- Grant Tempo necessary permissions including creating warehouses and compute pools
- Configure proper database access

### Selecting Storage for Tempo Deployment

If you want to run Tempo on your own data, follow these steps to select the correct storage before launching the app:

1. Click the **Add** button next to the **on Incident Inference Logs** section
2. In the popup window, click **+Select Data**
3. From the dropdown menu, find and select the appropriate table
4. Click **Save** to confirm your selection

If you would like to use demo data, you can skip this step.

Once Tempo is running, a management interface launches which will help you monitor Tempo.

## Tempo User Interface Navigation

The Tempo interface includes several main sections accessible from the navigation menu on the left:

- **Home**: Dashboard with overview and welcome information
- **Data Sources**: Configure and manage data input sources
- **Threat Overview**: High-level analysis of your network security posture
- **Forensic Analysis**: Detailed investigation capabilities
- **Deep Investigation**: Advanced analysis of specific threats
- **Settings**: System configuration and preferences

## Gaining Insights with the UI

### Threat Overview

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
   `Show me the top 20 similar events to sequence id 002dfbd6-df9a-4eed-a41f-4d707a54c183`
3. Click **Analyze Query** to process your request

#### Viewing Query Results
Results are displayed in a table format showing relevant information such as:
- Sequence IDs
- Source and destination IPs
- Data transfer volumes
- MITRE ATT&CK classifications

#### Forensic Insights
Tempo provides insights based on similarity search in high-dimensional embeddings constructed from your logs. For any suspicious sequence, you can view similar events to identify patterns and potential attack campaigns.

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

## Troubleshooting

If you encounter issues:

1. Check the System Status page to ensure all components are online
2. Verify data source configurations 
3. Check warehouse and compute pool status using `SHOW COMPUTE POOLS IN ACCOUNT;`
4. Verify permissions are properly configured
5. Ensure the management console is accessible via the Streamlit dashboard

## Additional Resources

For more information and assistance:
- **Snowflake Marketplace**: Find the Tempo app in the Snowflake Marketplace or directly access it [Here](https://app.snowflake.com/marketplace/listing/GZTYZOYXHP3/deeptempo-cybersecurity-tempo)
- **MITRE ATT&CK Framework**: [attack.mitre.org](https://attack.mitre.org/)
- **Support**: [support@deeptempo.ai](mailto:support@deeptempo.ai)