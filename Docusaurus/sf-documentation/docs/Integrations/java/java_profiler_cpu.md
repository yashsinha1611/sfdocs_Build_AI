# CPU Profiling

## Pre-requisites

- VirtualBox or an EC2 instance
- Access to APM Manager … (SnappyFlow Account)

## Common Steps

Install Java - JDK 11 : 

```
sudo apt update
sudo apt install openjdk-11-jdk
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
java -version
```

Install sfAgent on Linux

```
# For VirtualBox : 
systemctl list-unit-files | grep -i network
systemctl restart NetworkManager

# Install sfAgent on VMs : 
wget https://raw.githubusercontent.com/snappyflow/apm-agent/master/install.sh -O install.sh
chmod +x install.sh
sudo ./install.sh

# For Linux OS Monitoring : 
sudo apt-get install sysstat

# To discover services and generate config : 
sudo su
cd /opt/sfagent
./sfagent -generate-config
cp config-generated.yaml config.yaml

# Add the profile key and SnappyFlow tags in the config.yaml : 
# update key, profile, appName, projectName
vi config.yaml

# To view which java processes are running ... required to send data to SF : 
jcmd

# Verify configuration and restart agent : 
service sfagent restart
service sfagent status

# View Logs : use grep commander to get heap dump status (start & end time)
tail -f /var/log/sfagent/sfagent.log | grep commander
exit

# Start Java application : 
java -jar filename.jar

# For updating the config : 

sudo su
jcmd
nano /opt/sfagent/config.yaml
service sfagent restart
tail -f /var/log/sfagent/sfagent.log | grep commander
exit
```

:::note
- Add **profile key** and SnappyFlow tags in the config.yaml.
- For **existing customers**, update SFAgent config.yaml with latest - profile key, if SFAgent is already deployed.
- Reference for installing **sfAgent** : [Click here](https://docs.snappyflow.io/docs/Integrations/os/linux/sfagent_linux)
- Name and AppName should always be **unique** (pair).
- **jcmd equivalent :** Application Dashboard >> Process Name
:::

## CPU Profiling

- CPU profiling provides the thread wise CPU usage.
- Profiling helps us to identify various issues : 
  - **Synchronization Issues :** 
    - **Deadlock Situation :** when several threads running hold a synchronized block on a shared object
    - **Thread Contention :** when a thread is blocked waiting for others to finish
  - **Execution Issues :**
    - **Abnormally high CPU usage :** when a thread is in running state for a very long period of time
    - **Processing Performance is low :** when many threads are blocked
- It also provides an ability to correlate the thread stack at that time.
- Java CPU profiling can be collected by using Java profiling plugin.

```yaml title="config.yaml"
metrics:
  plugins:
    - name: javaprofiling
      enabled: true
      interval: 10
      target: profile
    config: 
      process: process_name      # otherwise mention '*'
      monitorCpuProfiling: true
      cpuProfilingInterval: 10
      stackTraceLimit: 25
```

**CPU profiling interval :**
- It is by default set to 10 seconds.
- It is recommended to keep it 10s to get better overview to the thread.
- Increasing this we might miss out frequent thread state changes.

**Stack trace limit :**
- It is set to 25 by default.
- If need this can be increased or decreased.

**CPU Profiling tool :** 
- It itself will consume some amount of CPU.
- The feature can be turned off after fixing your issue using the flag monitorCpuProfiling.

**Process :**
- It provides the process name for which CPU profiling needs to be enabled. Regex can also be used.

**CPU Profiling Dashboards :**

To view the CPU profiling dashboards : 
- Dashboards >> Profiling pane >> Select Java in the language dropdown next
- CPU Profiling from the dropdown >> Select the instance, process name from the next dropdowns.
- It displays the thread activity in the form of visuals.
- We can easily find blocked threads and reasons why they are blocked.

### Screenshots

<img src="/img/screenshots/cpu_profiling/1.png" />
<img src="/img/screenshots/cpu_profiling/2.png" />
<img src="/img/screenshots/cpu_profiling/4.png" />
<img src="/img/screenshots/cpu_profiling/5.png" />
<img src="/img/screenshots/cpu_profiling/6.png" />
<img src="/img/screenshots/cpu_profiling/7.png" />
<img src="/img/screenshots/cpu_profiling/8.png" />
<img src="/img/screenshots/cpu_profiling/9.png" />
<img src="/img/screenshots/cpu_profiling/10.png" />
<img src="/img/screenshots/cpu_profiling/11.png" />