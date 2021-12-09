# Tracing C# Applications
## Available Platforms

[**ASP.NET Core Application**](csharp#aspnet-core-application)

[**.NET Framework Application**](csharp#net-framework-application)

## ASP.NET Core Application

### Supported Web frameworks

| **Framework** | **Supported versions**       |
| ------------- | ---------------------------- |
| ASP.NET Core  | .NET core 2.1, 3.1, .NET 5.0 |

### Prerequisite

Install the following Nuget packages

- Elastic.Apm.NetCoreAll
- Snappyflow.NetCoretrace.Utility

These packages can be installed using Nuget package manager in Visual Studio or using .NET CLI commands given below. 

   ```
   dotnet add package SnappyFlow.NetCoretrace.Utility --version 0.1.5
   ```

   ```
   dotnet add package Elastic.Apm.NetCoreAll --version 1.12.1
   ```

### Steps to configure application

Create `sftraceConfig.<env_name>.yaml` file inside **wwwroot** directory. Copy below sftraceConfig.<env_name>.yaml content and configure it with correct profile key and tags.  Get profile key from the Manage-->profile in snappyflow portal. Create project and application(or use existing project and applicaition) using your profile. You can provide any name to service, this will be displayed in Trace Dashboard. 

Change `<env_name>` to your current working environment. For example if your environment is Development, your file name should be `sftraceConfig.Development.yaml`

#### sftraceConfig.<env_name>.yaml

```yaml
tags:
  projectName: CHANGEME
  appName: CHANGEME
  serviceName: CHANGEME
key: CHANGEME
```

:::note

Development is a common environment used while developing a web application, when you are using it in Production or any custom environmnent, you can change the yaml file name.

:::

#### Startup.cs file changes

ASP.NET Core application contains Startup class. It is like Global.asax in the traditional .NET application. As the name suggests, it is executed first when the application starts.

Below is a example Startup.cs with required code changes highlighted in blue colour.
#### Startup.cs
   <img src="/img/dotnet/startup.png" />

Copy the below codes in your Startup.cs file similar to the example above.

```c#
using Elastic.Apm.NetCoreAll;
```

Replace `CHANGEME` in code below with your application's environment (Development/Production) and add it inside configure method.

```c#
if (env.EnvironmentName == "CHANGEME")
  {
    app.UseAllElasticApm(Configuration);
  }
```

:::info

If you don't want to instrument for specific environment, add below line alone inside configure method.

```c#
app.UseAllElasticApm(Configuration);
```

:::

:::caution

Make sure to add `app.UseAllElasticApm(Configuration)` as first line in configuration method, otherwise the agent won’t be able to properly measure the timing of requests.

:::

#### Program.cs file changes

ASP.NET Core web application is actually a console project which starts executing from the entry point `public static void Main()` in `Program` class where we can create a host for the web application.

Below is a example Program.cs with required code changes highlighted in blue colour.
#### Program.cs
   <img src="/img/dotnet/program.png" />

Copy the below codes in your Program.cs file similar to the example above.

```c#
using SftraceDotNetcore;
```

The below code should be added inside public static IHostBuilder **CreateHostBuilder** method in the same way how it's done in example file. Verify Example [**Program.cs**](csharp#programcs) to identify in which place below code should be placed.

```c#
.ConfigureAppConfiguration((hostingContext, config) => {
  try {
    var env = hostingContext.HostingEnvironment;
    string sftraceConfigfile = $"sftraceConfig.{env.EnvironmentName}.yaml";
    config.AddInMemoryCollection(sftracedecrypt.Trace(sftraceConfigfile));
  } catch (Exception err) {
    Console.WriteLine("Error occurred in Snappyflow application trace" + err.Message);
  }
})
```


## .NET Framework Application

### Supported Web frameworks

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

For Instance based application, system path will be **IIS Express** folder. Common location for IIS Express Folder in windows is C:\Program Files (x86)\IIS Express.

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

 If system path is IIS Express as above, the whole path for sftraceConfig.yaml should be C:\Program Files (x86)\IIS Express\wwwroot\ sftraceConfig.yaml.

:::

Create a new class file called `Sftrace_class.cs` in location where **web.config** file is present. Copy the code below and don't forget to change `CHANGENAMESPACE`. 

:::caution

Add the content below to new class file Sftrace_class.cs and don't forget to rename `CHANGENAMESPACE` to your namespace.

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

Below is a example Global.asax.cs with required code changes highlighted in blue colour. 

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

