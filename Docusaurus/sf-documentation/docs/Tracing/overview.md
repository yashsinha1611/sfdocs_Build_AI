---
sidebar_position: 1
---
import IndexJquery from '../../src/pages/index.jquery';

# Tracing in SnappyFlow
<h2>On this page</h2>

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} /> 
<IndexJquery />

SnappyFlow supports distributed tracing compliant with Opentracing  standard. Tracing allows users to visualize the sequence of steps a  transaction (whether API or non-API such as a Celery job) takes during  its execution. This analysis is extremely powerful and allows  pinpointing the source of problems such as abnormal time being spent on  an execution step or identifying point of failure in a transaction.  SnappyFlow refers to distributed tracing as sfTrace.

## Select your language

<ul className="icon_list javalang">
<li><a  href="/docs/Tracing/java"><img src="/img/java-logo.png"/></a></li>
<li><a  href="/docs/Tracing/python"><img src="/img/python-logo.png"/></a></li>
<li><a  href="/docs/Tracing/ruby"><img src="/img/ruby-logo.png" /></a></li>
<li><a  href="/docs/Tracing/nodejs"><img src="/img/nodejs-logo.png"/></a></li>
<li><a  href="/docs/Tracing/go"><img src="/img/go-logo.png"/></a></li>
<li><a  href="/docs/Tracing/csharp"><img src="/img/c-sharp-logo.png"/></a></li>
</ul>
