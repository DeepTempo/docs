# Tempo On-Premises

## Overview
Tempo is a modern solution that leverages deep learning for network threat detection. By moving beyond conventional rule-based approaches, Tempo offers a more sophisticated and adaptable way to identify and respond to security events. Tempo is uniquely able to see attacks that others cannot, using a Deep Learning model that analyzes network and flow logs to detect various attacks, mapping them to MITRE ATT&CK for integration with your SIEM, SOC, and Threat Response systems.

## Prerequisites for On-Premises Deployment

To deploy Tempo on-premises, you'll need:
- Docker installed and configured
- Helm v3+ installed
- Kubernetes cluster configured (kubectl access) with GPUs
- deeptempo license key with appropriate permissions
- zip file with the installer (provided by DeepTempo)

## On-Premises Deployment Instructions

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

## Using Your Own Data (On-Premises)

1. Navigate to the **Data Sources** section from the left menu
2. Select a data source or use demo data for quick analysis
   - Demo data allows you to explore the platform's capabilities with sample NetFlow data (CIC netflow dataset)
   - You can upload your network logs through the Data Sources interface or connect to an S3 bucket
3. Ensure the data is formatted correctly for proper field identification
4. Start the analysis process by clicking "Run Inference"

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

## System Configuration (UI only)

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

## Troubleshooting On-Premises Deployment

If you encounter issues:

- **Components Showing Offline**: Check network connectivity and resource allocation
- **No Data Appearing**: Verify data source configuration and format
- **Analysis Not Working**: Ensure all prerequisites are installed and properly configured
- **Performance Issues**: Check system resources, particularly GPU availability for on-premises deployments

For some useful commands:
1. Verify Docker credentials: `docker login ghcr.io -u <username>`
2. Check Kubernetes connection: `kubectl get nodes`
3. Review Helm release status: `helm status tempo -n default`
4. Check pod status: `kubectl get pods -n default`
5. View pod logs: `kubectl logs <pod-name> -n default`

## Additional Resources

For more information and assistance:
- **MITRE ATT&CK Framework**: [attack.mitre.org](https://attack.mitre.org/)
- **Support**: [support@deeptempo.ai](mailto:support@deeptempo.ai)