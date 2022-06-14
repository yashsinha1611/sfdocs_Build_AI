# .NET Framework application

## Supported web frameworks

| **Framework**  | **Supported versions** |
| -------------- | ---------------------- |
| .NET Framework | 4.6.1 and later        |

### Prerequisite

Install the following Nuget packages

- **Elastic.Apm.AspNetFullFramework**
- **Snappyflow.NetCoretrace.Utility**

These packages can be installed using Nuget package manager in Visual Studio or using .NET CLI commands given below. 

   ```
dotnet add package SnappyFlow.NetCoretrace.Utility --version 0.1.5
   ```

   ```
dotnet add package Elastic.Apm.AspNetFullFramework --version 1.12.1
   ```

### Steps to configure Application

Create a folder **wwwroot** inside System path of application. 

:::info

If you don't know which is system path, you can print the code below to identify it

```c#
Directory.GetCurrentDirectory();
```

For Instance based application, system path will be **IIS Express** folder. Common location for IIS Express Folder in windows is `C:\Program Files (x86)\IIS Express`.

:::

Create `sftraceConfig.yaml` file inside wwwroot directory and copy below sftraceConfig.yaml content. Configure it with correct profile key and tags. Get profile key from the Manage-->profile in snappyflow portal. Create project and application(or use existing project and applicaition) using your profile. You can provide any name to service, this will be displayed in Trace Dashboard.

#### sftraceConfig.yaml

```yaml
tags:
  projectName: CHANGEME
  appName: CHANGEME
  serviceName: CHANGEME
key: CHANGEME
```

:::info

 If system path is IIS Express as above, the whole path for `sftraceConfig.yaml` should be `C:\Program Files (x86)\IIS Express\wwwroot\sftraceConfig.yaml`

:::

Create a new class file called `Sftrace_class.cs` in location where **web.config** file is present. Copy the code below and don't forget to change `CHANGENAMESPACE`. 

:::caution

Add the content below to new class file `Sftrace_class.cs` and don't forget to rename `CHANGENAMESPACE` to your namespace.

:::


#### Sftrace_class.cs

```c#
using System.Configuration;
using SftraceDotNetcore;
namespace CHANGENAMESPACE {
  public class Sftrace_class {
    public void Sftrace_method() {
      var configFile = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~/");
      var settings = configFile.AppSettings.Settings;
      string sftraceConfigfile = $"sftraceConfig.yaml";
      var sfdetails = sftracedecrypt.Trace(sftraceConfigfile);
      foreach(var kvp in sfdetails) {
        if (settings[kvp.Key] == null) {
          settings.Add(kvp.Key, kvp.Value);
        }
      }
      configFile.Save(ConfigurationSaveMode.Modified);
    }
  }
}
```

#### Global.asax.cs file changes

The Global. asax file is a special file that contains event handlers for ASP.NET application lifecycle events.

Below is a example `Global.asax.cs` with required code changes highlighted in blue colour. 

#### Global.asax.cs
<img src="/img/dotnet/global.png" />

Create object for Sftrace_class and call the method Sftrace_method in Global.asax.cs file. Verify Example  [**Global.asax.cs**](csharp#globalasaxcs) to identify in which place below code should be placed.

```c#
Sftrace_class sftrace_obj = new Sftrace_class();
sftrace_obj.Sftrace_method();
```

:::caution

Make sure to add Sftrace function call as first line above other register calls.

:::

#### web.config file changes

web.config file is used to manage various settings that define a website.

Below is a example web.config with required code changes highlighted in blue colour. 

#### web.config

<img src="/img/dotnet/webconfig.png" />

Add ElasticApm module in **web.config** file. Refer Example [**web.config**](csharp#webconfig) .

```c#
<add name="ElasticApmModule" type="Elastic.Apm.AspNetFullFramework.ElasticApmModule, Elastic.Apm.AspNetFullFramework" />
```

:::note

If system.webserver or modules are not already in your web.config file, you can add them also.

:::

#### Instructions to change profile key 

:::warning

Proceed with caution

:::

Remove preexisting elasticapm data from `web.config` file and rebuild the project.

:::info

 Below code needs to be removed in `web.config` under `<appsettings>` if profile key is to be changed

:::

```
    <add key="ElasticApm:ServerUrl" value="" /> 
    <add key="ElasticApm:GlobalLabels" value="" /> 
    <add key="ElasticApm:CentralConfig" value="" /> 
    <add key="ElasticApm:VerifyServerCert" value="" /> 
    <add key="ElasticApm:DisableMetrics" value="" /> 
    <add key="ElasticApm:ServiceName" value="" /> 
    <add key="ElasticApm:StackTraceLimit" value="" /> 
    <add key="ElasticApm:SpanFramesMinDuration" value="" /> 
```

 