import React, { useState } from "react";
import $ from 'jquery';

const AGENTS = [
	{
		'src': '/img/mysql-logo.svg',
		'label': 'Linux',
		'overText': 'MySQL Infrastructure platform is built for enterprises',
		'category': ['Cloud'],
		'link': '/docs/Integrations/os/linux/overview'
	},
	{
		'src': '/img/postgres-logo.svg',
		'label': 'Postgres',
		'overText': 'Postgres Infrastructure platform is built for enterprises',
		'category': ['Databases'],
		'link': '/docs/Integrations/postgres/overview'
	},
	{
		'src': '/img/java.svg',
		'label': 'Java',
		'overText': 'Java Infrastructure platform is built for enterprises',
		'category': ['App Tier'],
		'link': '/docs/Integrations/java/overview'
	},
	{
		'src': '/img/golang.svg',
		'label': 'Go',
		'overText': 'Oracle Cloud Infrastructure platform is built for enterprises',
		'category': ['App Tier'],
		'link': '/docs/integrations/go/profiler'
	},
	{
		'src': '/img/mongodb.svg',
		'label': 'MongoDB',
		'overText': 'MongoDB Infrastructure platform is built for enterprises',
		'category': ['Databases'],
		'link': '/docs/integrations/mongodb'

	},
	{
		'src': '/img/haproxy.svg',
		'label': 'HAProxy',
		'overText': 'Microsoft Infrastructure platform is built for enterprises',
		'category': ['Web Tier'],
		'link': '/docs/integrations/haproxy'
	},
	{
		'src': '/img/apache-activemq-icon.svg',
		'label': 'ActiveMQ',
		'overText': 'Cassandra Infrastructure platform is built for enterprises',
		'category': ['App Tier'],
		'link': '/docs/integrations/activemq'
	},
	{
		'src': '/img/kafka-icon.svg',
		'label': 'Kafka',
		'overText': 'Kafka Infrastructure platform is built for enterprises',
		'category': ['App Tier'],
		'link': '/docs/integrations/kafka/overview'
	},
	{
		'src': '/img/apache-zookeeper-icon.svg',
		'label': 'Zookeper',
		'overText': 'Ldap Infrastructure platform is built for enterprises',
		'category': ['App Tier'],
		'link': '/docs/integrations/zookeeper'
	},
	{
		'src': '/img/kubernetes-clusters.svg',
		'label': 'Kubernetes',
		'overText': 'Kubernetes clusters Infrastructure platform is built for enterprises',
		'category': ['Cloud', 'Kubernetes'],
		'link': '/docs/Integrations/kubernetes/overview'
	},
	{
		'src': '/img/mysql.svg',
		'label': 'MySQL',
		'overText': 'MYSQL Infrastructure platform is built for enterprises',
		'category': ['Databases'],
		'link': '/docs/Integrations/mysql/overview'
	},
	//{
	//	'src':'/img/okta.svg',
	//	'label':'Okta',
	//	'overText': 'Okta Infrastructure platform is built for enterprises',
	//	'category': 'Authentication'
	//},
	{
		'src': '/img/nginx.svg',
		'label': 'Nginx',
		'overText': 'Nginx Infrastructure platform is built for enterprises',
		'category': ['Web Tier'],
		'link': '/docs/Integrations/nginx/overview'
	},
	//{
	//	'src':'/img/node-js.svg',
	//	'label':'NodeJS',
	//	'overText': 'NodeJS Infrastructure platform is built for enterprises',
	//	'category': ['App Tier']
	//},
	//{
	//	'src':'/img/onelogin.svg',
	//	'label':'OneLogin',
	//	'overText': 'OneLogin Infrastructure platform is built for enterprises',
	//	'category': ['Authentication']
	//},
	//{
	//	'src':'/img/oozie.svg',
	//	'label':'Oozie',
	//	'overText': 'Oozie Infrastructure platform is built for enterprises',
	//	'category': ['App Tier']
	//},
	{
		'src':'/img/tomcat.svg',
		'label':'Tomcat',
		'overText': 'Opsgenie Infrastructure platform is built for enterprises',
		'category': ['Web Tier'],
		'link': '/docs/integrations/tomcat/tomcat_windows'
	},
	{
		'src': '/img/pagerduty.svg',
		'label': 'Pagerduty',
		'overText': 'Pagerduty Infrastructure platform is built for enterprises',
		'category': ['Alerts & Notifications'],
		'link': '/docs/alerts_notifications/pager_duty'
	},
	{
		'src': '/img/apache.svg',
		'label': 'Apache',
		'overText': 'Postgres Infrastructure platform is built for enterprises',
		'category': ['Web Tier'],
		'link': '/docs/Integrations/apache/overview'
	},
	// {
	// 	'src':'/img/prometheus.svg',
	// 	'label':'Prometheus',
	// 	'overText': 'Prometheus Infrastructure platform is built for enterprises',
	// 	'category': ['Cloud']
	// },
	{
		'src':'/img/public-cloud-elbs.svg',
		'label':'Elastic Load Balancer',
		'overText': 'Public cloud elbs Infrastructure platform is built for enterprises',
		'category': ['Cloud'],
		'link': '/docs/Integrations/elb/elb_rds'
	},
	//{
	//	'src':'/img/python.svg',
	//	'label':'Python',
	//	'overText': 'Python Infrastructure platform is built for enterprises',
	//	'category': ['App Tier']
	//},
	{
		'src': '/img/redis.svg',
		'label': 'Redis',
		'overText': 'Redis Infrastructure platform is built for enterprises',
		'category': ['App Tier'],
		'link': '/docs/integrations/redis'
	},
	//{
	//	'src':'/img/spark.svg',
	//	'label':'Spark',
	//	'overText': 'Spark Infrastructure platform is built for enterprises',
	//	'category': ['Web Tier']
	//},
	{
		'src': '/img/stack.svg',
		'label': 'Slack',
		'overText': 'Slack Infrastructure platform is built for enterprises',
		'category': ['Alerts & Notifications'],
		'link': '/docs/alerts_notifications/slack'
	},
	//{
	//	'src':'/img/teams.svg',
	//	'label':'Teams',
	//	'overText': 'Teams Infrastructure platform is built for enterprises',
	//	'category': ['Alerts & Notifications']
	//},
	//{
	//	'src':'/img/saml.svg',
	//	'label':'Saml',
	//	'overText': 'Saml Infrastructure platform is built for enterprises',
	//	'category': ['Authentication']
	//},
	//{
	//	'src':'/img/v-center.svg',
	//	'label':'vCenter',
	//	'overText': 'vCenter Infrastructure platform is built for enterprises',
	//	'category': ['Cloud']
	//},
	{
		'src': '/img/windows-vms.svg',
		'label': 'Windows',
		'overText': 'Windows VMs Infrastructure platform is built for enterprises',
		'category': ['Cloud'],
		'link': '/docs/Integrations/os/windows/sfagent_windows'
	},
	//{
	//	'src':'/img/zenduty.svg',
	//	'label':'Zenduty',
	//	'overText': 'Zenduty Infrastructure platform is built for enterprises',
	//	'category': ['Alerts & Notifications']
	//},
	{
		'src': '/img/aws_lambda.svg',
		'label': 'AWS Lambda',
		'overText': 'AWS ECS Infrastructure platform is built for enterprises',
		'category': ['Cloud']
	},
	//{
	//	'src':'/img/aws-elastic-beanstalk.svg',
	//	'label':'AWS elastic beanstalk',
	//	'overText': 'AWS elastic beanstalk Infrastructure platform is built for enterprises',
	//	'category': ['Cloud']
	//},
	//{
	//	'src':'/img/c-sharp-net.svg',
	//	'label':'C#',
	//	'overText': 'C# Infrastructure platform is built for enterprises',
	//	'category': ['App Tier']
	//},
	{
		'src': '/img/custom-metrics-using-statsd.svg',
		'label': 'StatsD',
		'overText': 'Custom Metrics Infrastructure platform is built for enterprises',
		'category': ['Services'],
		'link': '/docs/integrations/statsd/custom_monitoring'
	},
	//{
	//	'src':'/img/elastic-search.svg',
	//	'label':'Elastic Search',
	//	'overText': 'Elastic Search Infrastructure platform is built for enterprises',
	//	'category': ['Cloud']
	//},
	//{
	//	'src':'/img/generic-etl-workflows.svg',
	//	'label':'Generic ETL Workflows',
	//	'overText': 'Generic ETL Workflows Infrastructure platform is built for enterprises',
	//	'category': ['App Tier']
	//},
	//{
	//	'src':'/img/generic-webhooks.svg',
	//	'label':'Generic Webhooks',
	//	'overText': 'Generic Webhooks Infrastructure platform is built for enterprises',
	//	'category': ['Services']
	//},
	//{
	//	'src':'/img/golang.svg',
	//	'label':'Golang',
	//	'overText': 'Golang Infrastructure platform is built for enterprises',
	//	'category': ['App Tier']
	//},
	//{
	//	'src':'/img/google-authentication.svg',
	//	'label':'Google Authentication',
	//	'overText': 'Google Authentication Infrastructure platform is built for enterprises',
	//	'category': ['Authentication']
	//},
	//{
	//	'src':'/img/ha-proxy.svg',
	//	'label':'HA Proxy',
	//	'overText': 'HA Proxy Infrastructure platform is built for enterprises',
	//	'category': ['Cloud']
	//},
	{
		'src':'/img/iis-server.svg',
		'label':'IIS Server',
		'overText': 'IIS Server Infrastructure platform is built for enterprises',
		'category': ['Cloud'],
		'link': '/docs/Integrations/iis/iis_windows'
	},
	//{
	//	'src':'/img/jaeger-for-opentracing.svg',
	//	'label':'Jaeger',
	//	'overText': 'Jaeger for Opentracing Infrastructure platform is built for enterprises',
	//	'category': ['Services']
	//}
];

const buttonLists = [
	{
		'label': 'All'
	},
	{
		'label': 'Cloud'
	},
	{
		'label': 'App Tier'
	},
	{
		'label': 'Web Tier'
	},
	{
		'label': 'Databases'
	},
	{
		'label': 'Kubernetes'
	},
	{
		'label': 'Services'
	},
	{
		'label': 'Alerts & Notifications'
	},
];

const IntegrationsList = () => {
	const [searchKey, setSearchKey] = useState('');
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [categoryAgents, setCategoryAgents] = useState([]);
	const [filteredAgents, setFilteredAgents] = useState([]);

	const handleSearchKeyChange = (ev) => {
		const keyword = ev.target.value;
		if (keyword.length !== 0) {
			const searchList = categoryAgents.length === 0 ? AGENTS : categoryAgents;
			const searchAgents = searchList.filter((agent) => agent.label.toLowerCase().includes(keyword.toLowerCase()))
			setFilteredAgents(searchAgents);
		} else {
			setFilteredAgents(categoryAgents);
		}
		setSearchKey(keyword);
	}

	const handleSelectCategory = (evt, categorySelected) => {
		setSelectedCategories((prevList) => {
			if (categorySelected !== 'All') {
				$('.All').removeClass('btnSelected')
				const categoryPresent = prevList.some((category) => category === categorySelected);
				let newList = [];
				if (categoryPresent) {
					evt.target.classList.remove('btnSelected')
					newList = prevList.filter((category) => category !== categorySelected)
				} else {
					evt.target.classList.add('btnSelected')
					newList = [...prevList, categorySelected];
				}
				const agentsList = newList.length === 0 ? AGENTS : AGENTS.filter((agent) => agent.category.some((categoryLabel) => newList.includes(categoryLabel)))
				setCategoryAgents(agentsList)
				if (searchKey.length !== 0) {
					const searchedAgents = agentsList.filter((agent) => agent.label.toLowerCase().includes(searchKey.toLowerCase()))
					setFilteredAgents(searchedAgents)
				} else {
					setFilteredAgents(agentsList)
				}
				return newList;
			} else {
				$('.btnSelected').removeClass('btnSelected')
				evt.target.classList.add('btnSelected')
				let newList = [];
				if (prevList.includes(categorySelected)) {
					newList = [];
				} else {
					newList = [categorySelected];
				}
				setCategoryAgents(AGENTS);
				if (searchKey.length !== 0) {
					const searchedAgents = AGENTS.filter((agent) => agent.label.toLowerCase().includes(searchKey.toLowerCase()))
					setFilteredAgents(searchedAgents)
				} else {
					setFilteredAgents(AGENTS)
				}
				return newList;
			}
		})
	}

	const displayAgentsList = () => {

		const finalList = (searchKey.length === 0 && (selectedCategories.length === 0 || selectedCategories.includes('All'))) ? AGENTS : filteredAgents;
		return finalList.length !== 0 ? finalList.map((items) => (
			<a key={Math.random()} className="lnkIntegration" href={items.link || '#'}>
				<li className="box_size">
					<label><img src={items.src} className="integrationImg" /></label>
					<div>{items.label}</div>
					{/* <div className="none">{items.overText}</div> */}
				</li>
			</a>
		)) : (
			<h4 className="noIntegrations">No integrations found for selected filters</h4>
		)
	};

	return (
		<div>
			SnappyFlow support a wide range of build in integrations to help you get started quickly.
			<p className="searchContrainer ">
				<img src="/img/search.png" alt="Search" />
				<input type="text" className="form-control" value={searchKey} onChange={handleSearchKeyChange} name="" placeholder="Search for SnappyFlow Integrations" />
			</p>
			<dl className="buttonList marTop20">
				{buttonLists.map((val) => (
					<dd key={val.label}>
						<input type="button" value={val.label} onClick={(evt) => handleSelectCategory(evt, val.label)} className={`btn-primarys ${val.label}`} name="" />
					</dd>
				))}
			</dl>
			<ul className="integration">
				{displayAgentsList()}
			</ul>
		</div>
	);
};

export default IntegrationsList;
