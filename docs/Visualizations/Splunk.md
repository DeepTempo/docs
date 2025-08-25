---
id: splunk-integration
title: "Splunk Integration - Viewing Tempo Results in Splunk Enterprise"
description: "Complete guide to integrating Tempo results with Splunk Enterprise. Set up visualizations, dashboards, and analysis tools for threat detection data."
slug: /splunk-integration
tags: [splunk, integration, visualization, dashboards, enterprise]
---

# Viewing Results in Splunk

This section guides you through setting up Splunk Enterprise to analyze the output from the Snowflake TEMPO project.  This step is optional and intended for Splunk users who want a visualization of the output.  For this doc we used a trial account on Splunk and we import the results of Tempo as CSV.  In a production use case, you will likely use the Snowflake Splunk connector, DBConnect, as explained in the Snowflake documentation [here]: (https://community.snowflake.com/s/article/Integrating-Snowflake-and-Splunk-with-DBConnect)

### Prerequisites
- An Amazon EC2 instance running Amazon Linux or another compatible Linux distribution
- Root or sudo access
- Splunk Enterprise installer tarball (`.tgz` file)
- `anomaly_hub.xml` dashboard file

### Install Splunk Enterprise

1. Clone the installation repository:
   ```bash
   git clone git clone https://github.com/DeepTempo/SplunkDashboards.git
   cd SplunkDashboards
   ```

2. Place the Splunk Enterprise tarball in the same directory as the script.

3. Edit the script to set your desired credentials:
   ```bash
   vi splunk_tempo_install.sh
   ```

4. Make the script executable and run it:
   ```bash
   chmod +x splunk_tempo_install.sh
   sudo ./splunk_tempo_install.sh
   ```

### Configure Splunk and Load Data

1. Access Splunk at `http://your_ip:8000` and log in with the credentials you set.

2. Download the CSV file from the TEMPO Snowflake app output.

3. In Splunk, go to Settings > Add Data > Upload > select your CSV file.

4. Follow the prompts to load the CSV, using default options.

### Create the Dashboard

1. After loading the CSV, click "Build Dashboards" > "Create New Dashboard".

2. Select "Classic Dashboard Builder" and create the dashboard.

3. In the dashboard editor, switch to "Source" view.

4. Copy the XML from `anomaly_hub.xml` and paste it into the Source view.

5. Save the Dashboard
   - After the dashboard is saved, you will now have to create a Tempo Splunk macro

7. Create a Tempo macro in Splunk
   - In splunk create a new Splunk macro by going to ```Settings``` > ```Advanced Search``` > ```+ Add New```
   - Keep Destination app as ```search```
   - Name the macro ```TempoDataLocation```
   - Define the macro as your Splunk path to Tempo's csv output. Will look something like this
   ```xml
   source="your-filename.csv" host="Your Name" sourcetype="csv"
   ```
   - You can leave the rest of the macro creation blank.
   - Save the macro

You should now be able to see the incidents - or anomalies - in your new dashboard.  This enables Security Operations teams to click through on the context provided by Tempo.  For example, you can see all transactions to and from a specific IP address, or across given ports, as a part of investigating the incidents that have been identified.

Note that as a default, only the incidents are uploaded.  Not also transferring and loading the entire dataset of logs simplifies the work of the Security Operator and also can translate into significant cost savings, as Splunk and most security operations solutions tend to charge by data ingested.  

### Important Notes
- Set strong passwords for all user accounts.
- Ensure sufficient disk space (minimum 10GB recommended).
- Keep your EC2 instance and Splunk Enterprise updated with the latest security patches.

### Troubleshooting
- If the script fails to find the Splunk tarball, confirm that it's in the correct directory.
- For user creation issues, check Splunk server logs and verify authentication credentials.
