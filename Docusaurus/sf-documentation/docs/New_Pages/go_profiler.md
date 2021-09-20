# SnappyFlow GO Profiler

sf-go-profiler enables collecting supported profiles types by golang along with runtime metrics
and sends them to snappyflow-apm for further visualization and analysis.

supported profiles: cpu, heap, block, mutex, goroutine, threadcreate

**cpu** and **heap** profiles are enabled always other types can be enabled as required.

- **godoc**: <https://pkg.go.dev/github.com/snappyflow/sf-go-profiler/profiler>

- **sample code**: <https://github.com/snappyflow/sf-go-profiler/tree/main/example/main.go>

## getting started

- **pre-requisite**

  - install and configure snappyflow agent on vm or as a sidecar in the container, as it is required to send data to snappyflow-apm
  - run below command to download or update sf-go-profiler package in your current project.

    ```bash
    go get -u -v github.com/snappyflow/sf-go-profiler/profiler
    ```

- **simple example**

```go
import "github.com/snappyflow/sf-go-profiler/profiler"

main(){
    profile := profiler.NewProfilerConfig("server")
    profile.Start()
    defer profile.Stop()
    // rest of the application code
}
```

- profiling can conditionally enabled when required using golang flags

```go
import (
    "github.com/snappyflow/sf-go-profiler/profiler"
    "flag"
)

main(){
    enableprofile := flag.Bool("profile",false,"enable profiler")
    if *enableprofile {
        profile := profiler.NewProfilerConfig("server")
        // below line disables collection of go runtime metrics
        // profile.DisableRuntimeMetrics()
        // below line disables profiling
        // profile.DisableProfiles()
        profile.Start()
        defer profile.Stop()
    }
    // rest of the application code
}
```

- runtime metrics can be disable by calling **DisableRuntimeMetrics()** similarly profiling can be disabled by calling **DisableProfiles()** on profile config object.

```go
    profile := profiler.NewProfilerConfig("server")
    // below line disables collection of go runtime metrics
    profile.DisableRuntimeMetrics()
    // below line disables profiling
    profile.DisableProfiles()
    profile.Start()
    defer profile.Stop()
```

- enable other supported profiles as required

```go
    // enable block profile and set given block profile rate
    profile.EnableBlockProfile(100)
    // enable mutex profile and set given mutex profile fraction
    profile.EnableMutexProfile(1000)
    // enable goroutine profile
    profile.EnableGoRoutineProfile()
    // enable threadcreate profile
    profile.EnableThreadCreateProfile()
```

- since only heap and cpu profiles are enabled by default, all supported profiles can be enabled by call to function **EnableAllProfiles()**,
this sets block profile rate to **DefaultBlockProfileRate** and mutex profile fraction to **DefaultMutexProfileFraction**

```go
    // enable all supported profiles
    profile.EnableAllProfiles()
```
