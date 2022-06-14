# ASP .NET Core
## Available Platforms

[**Instances**](csharp#aspnet-core-application)

[**Container**](csharp#net-framework-application)

## Instances

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
   dotnet add package SnappyFlow.NetCoretrace.Utility --version 0.1.6
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


## Containers

### Supported Web frameworks

| **Framework** | **Supported versions**       |
| ------------- | ---------------------------- |
| ASP.NET Core  | .NET core 2.1, 3.1, .NET 5.0 |

### Prerequisite

1. Install the following Nuget packages

- **Elastic.Apm.AspNetFullFramework**
- **Snappyflow.NetCoretrace.Utility**
			 
These packages can be installed using Nuget package manager in Visual Studio or using .NET CLI commands given below. 

   ```
dotnet add package SnappyFlow.NetCoretrace.Utility --version 0.1.6
   ```

   ```
dotnet add package Elastic.Apm.AspNetFullFramework --version 1.12.1
   ```

2. Enable the Docker in project. For referrence follow the official documentation (Click Here)


### Steps to configure Application
Copy below `docker-compose.override.yml` content and place it in under the environment variables in `docker-compose.yml` or `docker-compose.override.yml`. configure it with the correct profile key and tags. Get profile key from the Manage-->profile in snappyflow portal. Create a project and application using your profile (or use an existing project and application). You can provide any name to service, this will be displayed in Trace Dashboard.
Below is an example `docker-compose.override.yml` with required code changes highlighted in blue color.
#### docker-compose.override.yml
   <img src="/img/dotnet/docker_compose_yml.PNG" />

Copy the below lines in your docker-compose.override.yml file similar to the example above.
```yaml
- PROJECTNAME=CHANGEME
- APPNAME=CHANGEME
- SERVICENAME=CHANGEME
- PROFILEKEY=CHANGEME
```
:::note
		Similar to configuring the environment variable into the docker, the same way you can configure the Kubernetes environment also. Wherever you are using the environment variable there you can add the above variables
:::

Create a new class file called `Sftrace_class.cs` in location where **web.config** file is present. Copy the code below and don't forget to change `CHANGENAMESPACE`. 

#### Startup.cs file changes

ASP.NET Core application contains Startup class. It is like Global.asax in the traditional .NET application. As the name suggests, it is executed first when the application starts.

Below is a example Startup.cs with required code changes highlighted in blue colour.
#### Startup.cs
   <img src="/img/dotnet/dockerstartup.PNG" />

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
ASP.NET Core web application is actually a console project which starts executing from the entry point `public static void Main()` in the `Program` class where we can create a host for the web application.

Below is an example Program.cs with required code changes highlighted in blue color.
   <img src="/img/dotnet/dockerprogram.PNG" />

Copy the below codes in your Program.cs file similar to the example above.

```c#
using SftraceDotNetcore;
```

The below code should be added inside public static IHostBuilder **CreateHostBuilder** method in the same way how it's done in example file. Verify Example [**Program.cs**](csharp#programcs) to identify in which place below code should be placed.

```c#
.ConfigureAppConfiguration((hostingContext, config) => {
  try
  {
    var profilekey = Environment.GetEnvironmentVariable("PROFILEKEY");
    var projectname = Environment.GetEnvironmentVariable("PROJECTNAME");
    var appname = Environment.GetEnvironmentVariable("APPNAME");
    var servicename = Environment.GetEnvironmentVariable("SERVICENAME");
    config.AddInMemoryCollection(sftracedecrypt.TraceEnv(profilekey, projectname, appname, servicename));
  }
  catch (Exception err)
  {
    Console.WriteLine("Error occurred in Snappyflow application trace" +err.Message);
  }
 }
)
```

Now run your application with the **F5** key, or the **Ctrl+F5** key, selecting the docker-compose project, as shown below image
 <img src="/img/dotnet/docker-compose.PNG" />


#### Change Profile key instructions (Only when changing profile key) 
If you want to change your profile key in future, you need to remove the preexisting elasticapm data from web.config file and rebuild the project.

#### Web.config 

<div class="blue_textbox">
<configuration> 
<appSettings> 
   <strike><add key="ElasticApm:ServerUrl" value="" /> </strike>
   <strike><add key="ElasticApm:GlobalLabels" value="" /> </strike>
   <strike><add key="ElasticApm:CentralConfig" value="" /> </strike>
   <strike><add key="ElasticApm:VerifyServerCert" value="" /> </strike>
   <strike><add key="ElasticApm:DisableMetrics" value="" /> </strike>
   <strike><add key="ElasticApm:ServiceName" value="" /> </strike>
   <strike><add key="ElasticApm:StackTraceLimit" value="" /></strike>
   <strike><add key="ElasticApm:SpanFramesMinDuration" value="" /></strike>
</appSettings> 
</configuration> 
</div>
