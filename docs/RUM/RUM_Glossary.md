# RUM Glossary

## E

### **Error**
An [event](#event) that deviates from the normal flow of the application which results in an issue.

### **Error Rate**
Number of [errors](#error) that occur per minute. 

### **Event**
A single unit of information, containing a timestamp plus additional data.  


## F

### Flame Graph
A diagram that depicts the stepwise breakup of the [event](#event) and time spent in each of those events

## R

### **Response Time**
The duration of time spent by the system between the start and end of an event.  

## S

### **Slow Page**
Any Page which has relatively higher [Response time](#response-time).  

### **Span**
Information about the execution of a specific code path. Spans measure from the start to the end of an activity and can have a parent/child relationship with other spans.  

## T

### **Target Response Time**
The ideal [Response time](#response-time) within which the response is expected from a system

### **Trace**
Defines the amount of time an application spends on a request. Traces are made up of a collection of transactions and spans that have a common root.  

### **Transaction**
A special kind of [span](#span) that has additional attributes associated with it. Transactions describe an event captured by the `sf-apm-rum` instrumenting a service.  

### **Transaction Rate**
Number of [transactions](#transaction) that occur per minute.  

