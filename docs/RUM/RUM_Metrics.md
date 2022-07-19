# Performance Metrics

- ### Apdex Rating
	Apdex (Application Performance Index) is a measure of user satisifaction for a website that varies from 0 to 1 (0 = no users satisfied, 1 = all users satisfied). This rating is a numerical measure of user satisfaction with the performance of enterprise applications. Below is the formula for Apdex Rating  
    $$
     Apdex(t) = \frac{ SatisifiedCount + (ToleratedCount * 0.5) + (FrustratedCount * 0)}{ numTotalTransactions }
    $$
    where $$t$$ stands for the [target response time](./RUM_Glossary.md/#target-response-time)  
    If $$ResponseTime$$ is the time taken by the system to respond,  
    $$SatisifiedCount$$ stands for the number of [transactions](./RUM_Glossary.md/#transaction) where  
    $$ResponseTime$$ $\le$ t  
    $$ToleratedCount$$ stands for the number of transactions where  
    t $\lt$ $$ResponseTime$$ $\le$ 4t  
    $$FrustratedCount$$ stands for the number of transactions where  
    $$ResponseTime$$ $\gt$ 4t 

- ### Page load metrics
	During loading of a page, resource timing information of all the dependent resources that are included as a part of the page such as JavaScript, stylesheets, images, etc. are captured. This information explains in details about how the page is loaded. Below are some of the page load metrics

    - **Domain lookup**  
        This event is triggered when a DNS query is fired for the current page. The $$Duration$$ of this event is calculated as    
        $$Duration = domainLookupEnd - domainLookupStart$$ 
        where $$domainLookupStart$$ and $$domainLookupEnd$$ are the start and end times of the domain Lookup event.  
          
    - **Making a connection to the server**  
        This event is triggered when a TCP connection is established to the server. The $$Duration$$ of this event includes the TLS negotiation time for HTTPS pages and is calculated as  
        $$Duration = connectEnd - connectStart$$    
        where $$connectStart$$ and $$connectEnd$$ are the start and end times of establishing the TCP connection.  
    - **Requesting and receiving the document**  
        This event is triggered when a document is requested to the server. The $$Duration$$  of this event is calculated as   
        $$Duration = responseEnd - requestStart$$  
        where $$requestStart$$ is the time when the request for the document is initiated and 
        $$responseEnd$$ is the time when the requested document is received completely.  
    - **Parsing the document, executing sync. scripts**  
        This event is triggered when any document is parsed in order to render the DOM or when executing synchronous scripts or when the stylesheets are loaded. The $$Duration$$  of this event is calculated as  
        $$Duration = tagsdomInteractive - domLoading$$  
        where $$domLoading$$ is the time when the DOM loads and $$tagsdomInteractive$$ is the time when the DOM tag elements turn interactive.  
    - **Fire "DOMContentLoaded" event**  
        This event is triggered when the browser completes parsing the document. This event is helpful when there are multiple listeners, or logic is executed. The $$Duration$$  of this event is calculated as  
        $$Duration = domContentLoadedEventEnd - domContentLoadedEventStart$$  
        where $$domContentLoadedEventStart$$ and $$domContentLoadedEventEnd$$ are the start and end times of initating the "DOMContentLoaded" event.  
    - **Fire "load" event**  
        This event is trigged when the browser finishes loading its document and dependent resources. The $$Duration$$  of this event is calculated as  
        $$Duration = loadEventEnd - loadEventStart$$  
        where $$loadEventStart$$ and $$loadEventEnd$$ are the start and end times of loading the document and dependent resources.  
    - **Time to first byte (TTFB)**  
        TTFB is the duration between the browser making an HTTP request for the initial document to the first byte of the page being received. `TTFB` is calculated as   
        $$TTFB = firstByteReceived - initialDocRequest$$  
        where $$initialDocRequest$$ is the time at which the request for the initial document is made and $$firstByteReceived$$` is the time at which first byte is received 
    
    :::note   
    The page-load transaction duration might not always reflect the Load event of the browser and can extend beyond the event. This is because in order to capture the overall user experience of the page including all of the above information plus additional resource requests that might be triggered during the execution of dependent resources.  
    :::note

- ### User interactions
	The click event listeners that are registered by the application are automatically instrumented by the `sf-apm-rum` agent. These click events are captured as `user-interaction` transactions. However, in order to limit the number of user transactions, the agent discards transactions with no spans (e.g. no network activity). In case a click event results in a route change, such transactions are captured as `route-change` transactions instead of `user-interaction` transaction. The name of the `user-interaction` transaction is influenced by either `name` or preferably the `data-transaction-name` attribute of the HTML element.

- ### User Centric Metrics
    The `sf-apm-rum` agent supports capturing of the below responsiveness metrics in order to understand the performance characteristics of a web page beyond the page load and how the user perceives performance.  

    - **First contentful paint (FCP)**  
        This metric is a measure of the time from when the page starts loading to when any part of the page’s content is displayed on the screen. The `sf-apm-rum` agent uses the Paint timing API available in the browser to capture the timing information.  FCP is captured as transaction mark for page-load transaction for all chromium-based browsers (Chrome >60, Edge >79, Opera >47, etc.).  

    - **Largest contentful paint (LCP)**  
        This metric is a measure of the time from when the page starts loading to when the critical element (largest text, image, video elements) is displayed on the screen. The `sf-apm-rum` agent uses the LargestContentfulPaint API which relies on the draft Element Timing API. LCP is one of the core web vitals metrics and available only in Chrome >77. This metric is captured as transaction mark for page-load transaction, maintain LCP within the first 2.5 seconds of page-load to provide a good user experience.
    - **First input delay (FID)**  
        This metric quantifies the experience of the user when they interact with the page during the page load. It is measured as the time between when a user first interacts with your site (mouse clicks, taps, select dropdowns, etc.) to the time when the browser can respond to that interaction. FID is one of the core web vitals metrics and available only in Chrome >85 via Event Timing API. FID is captured as First Input Delay span for page-load transaction. FID value below 100 milliseconds has to be maintained to provide a good user experience.
    - **Total blocking time (TBT)**  
        This metric is calculated as the sum of the blocking time (duration above 50 ms) for each long task that occurs between the First contentful paint and the time when the transaction is completed. Total blocking time is a great companion metric for Time to interactive (TTI) which is lab metric and not available in the field through browser APIs. The `sf-apm-rum` agent captures TBT based on the number of long tasks that occurred during the page load lifecycle. This metric is captured as Total Blocking Time span for page-load transaction.
    - **Cumulative layout shift (CLS)**  
        This is a metric that represents the cumulative score of all unexpected layout shifts that occur during the entire lifespan of the page. CLS is one of the core web vitals metrics. A CLS score of less than 0.1 has to be maintained to provide a good user experience.  
    - **Long Tasks**  
        A long task is any user activity or browser task that monopolize the UI thread for extended periods (greater than 50 milliseconds) and block other critical tasks (frame rate or input latency) from being executed. The `sf-apm-rum` agent uses the Long Task API which is only available in chromium-based browsers (Chrome >58, Edge >79, Opera >69). It is captured as Longtask ``` <name> ``` span for all managed transactions.  

- ### JavaScript errors
	The javascript [errors](./RUM_Glossary.md/#error) that occur in the application are captured. Using the captured information, the root cause of the issue can be analysed. In order to capture errors in an angular application, [follow these steps](./RUM_agent_installation.md/#step4-for-angular-based-applications-only)