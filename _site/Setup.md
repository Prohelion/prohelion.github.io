

<!DOCTYPE html>

	<html lang="en-US">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, minimum-scale=1.0">
		
			<title>ArrowPoint Telemetry Setup | Prohelion</title>
		
		
		
			<meta name="keywords" content="ArrowPoint, Telemetry, Setup">
		
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans:400,400i,500,500i,700,700i">
		<link rel="stylesheet" href="/dox-theme/assets/css/style.css">
	</head>
	<body>
		
			<div class="c-offcanvas">
				<div class="c-offcanvas__inner">
					
						<ul class="c-nav c-nav--stacked u-mx-auto">
							
								<li><a href="/Doc/https://www.prohelion.com">Prohelion Website</a></li>
							
						</ul><!-- /.c-nav -->
					
					
						
							<a href="/" class="c-btn c-btn--md c-btn--gray u-text-md">
								Documentation Homepage
								<div class="c-btn__icon">
									<i class="o-icon o-icon--book"></i>
								</div>
							</a>
						
					
				</div><!-- /.c-offcanvas__inner -->
			</div><!-- /.c-offcanvas -->
		

		
			<header class="c-header u-text-white">
				<div class="o-container">
					<div class="o-row">
						<div class="o-col-12">
							<div class="u-flex u-items-center">
								
									<div class="c-logo">
										<a href="/Doc//" class="c-logo__link">
											<img src="/Doc//dox-theme/assets/images/layout/logo.png">
										</a><!-- /.c-logo__link -->
									</div><!-- /.c-logo -->
								
								
									<div class="u-flex u-items-center u-ml-auto">
										
											<ul class="c-nav u-mb-0 u-hidden u-block@lg">
												
													
													<li class=""><a href="/Doc/https://www.prohelion.com">Prohelion Website</a></li>
												
											</ul><!-- /.c-nav -->
										
										
											<div class="u-ml-5 u-hidden u-block@lg">
												
													<a href="/" class="c-btn c-btn--md c-btn--white u-text-md">
														Documentation Homepage
														<div class="c-btn__icon">
															<i class="o-icon o-icon--book"></i>
														</div>
													</a>
												
											</div>
										
									</div>
								
								<button class="c-hamburger-icon c-hamburger-icon--slider c-hamburger-icon--white js-hamburger-icon js-offcanvas-toggle u-ml-auto u-hidden@lg" type="button">
									<span class="c-hamburger-icon__box">
										<span class="c-hamburger-icon__inner"></span>
									</span><!-- /.c-hamburger-icon__box -->
								</button><!-- /.c-hamburger-icon -->
							</div>
						</div><!-- /.o-col -->
					</div><!-- /.o-row -->
				</div><!-- /.o-container -->
			</header><!-- /.c-header -->
		










	<div class="u-pt-8 u-pb-5">
		<div class="o-container">
			<div class="o-row">
				
					<div class="o-col-8@lg o-col-7@xl">
						<div class="c-post u-mb-3@lg js-post">
							<h2 id="introduction">Introduction</h2>
<p>The ArrowPoint Telemetry system is designed to very light weight in terms of physical infrastructure.</p>

<p>In a race environment TeamArrow runs the entire system on a single i7 laptop with an SSD hard drive. However, since the solution does store substantial amounts of information we would recommend at a minimum a 256GB SSD with 100GB free storage for a race environment.</p>

<p>The system has been tested on Windows 10 and Amazon EC2 Unix, but should run on any form of Unix that supports Docker (including Apple Laptops). As the system is passive apart from a couple of key features, it is possible to run two instances of the solution on two laptops and achieve high availability. Laptops make much more sense than dedicated hardware or PCs in a race environment as the battery in a laptop is fundamentally built in and the power supply problems are much simpler in a chase car when running low power electronics.</p>

<h2 id="pre-requirements">Pre-requirements</h2>
<ul>
  <li>Windows 10 or Linux OS</li>
  <li><a href="https://www.docker.com/products/docker-desktop">Docker Desktop</a>– If you are planning to use the Docker container model
    <ul>
      <li>If you are not using docker you will also need to install Postgres 10, PgAdmin and optionally Splunk</li>
    </ul>
  </li>
  <li><a href="https://www.oracle.com/technetwork/java/javase/downloads/index.html">Java 8 or higher</a> we would suggest you download the Java Development Kit or JDK</li>
  <li><a href="https://maven.apache.org/">Apache Maven</a></li>
  <li><a href="https://git-scm.com/">Git</a> – We would suggest <a href="https://www.sourcetreeapp.com/">Atlassian SourceTree</a> if you are new to Git as it is a bit easier to use than Git on the command line</li>
  <li><a href="https://spring.io/tools3/sts/all">Spring Tool Suite</a> – If you want to change the code or contribute to the project</li>
</ul>

<h2 id="docker-based-install">Docker based Install</h2>
<p>The software infrastructure required to run the ArrowPoint Telemetry system is complex and the simplest way to install the solution is using Docker. Docker is a container management solution designed to provide containers for applications or in our case application components such as a database or Splunk. The containers then run on a docker instance which is installed on your PC. Prohelion has prepared Docker containers with the right setup for your database and Splunk configuration. While you can setup these manually, it’s complex and we wouldn’t recommended it. If you are not wanting to use Docker then please see the Docker Free Installation information below.</p>

<p>To install the ArrowPoint Telemetry system download a copy of the code from the <a href="https://github.com/Prohelion/ArrowPoint-Telemetry">GitHub repository</a> by cloning the code or downloading a release zip.</p>

<p>In the root directory of your download you will find a file called</p>

<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>docker-compose.yml
</code></pre></div></div>

<p>This file contains the configuration information to run the software in Docker.</p>

<h2 id="known-issue">Known Issue</h2>
<p>Docker does not support UDP traffic on its virtual network. As such the telemetry system cannot receive traffic from the CANbus devices such as the Tritum Wavesculpter. To get around this issue the infrastructure required to run the Telemetry system runs in Docker apart from the core application which runs as a stand alone Spring Boot Application and hence can access the UDP network directly.</p>

<h2 id="installation-steps">Installation Steps</h2>

<table>
<colgroup>
<col width="10%" />
<col width="90%" />
</colgroup>
<thead>
<tr class="header">
<th>Step</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Install Docker.</td>
</tr>
<tr>
<td>2</td>
<td>	
Modify the hosts file on your machine to include the name of the three hosts used in the system. Information on how to modify your host file can be found on the following <a href="https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/">article from how to geek</a>.

If you are just running the whole configuration on one machine then the hosts file should look like this

<code class="language-plaintext highlighter-rouge">
127.0.0.1	timescaledb
127.0.0.1	splunkenterprise
127.0.0.1	telemetry
</code>

If you are running the different components on different machines then the host file change should occur on the machine that you are running the telemetry system on (the one you start in step 4 below) and should reflect the IP addresses of the machines where docker (as started in step 3 below) is running.
</td>
</tr>
<tr>
<td>3</td>
<td>Run the Docker configuration. Note the first time you run this command the system will need to download a lot of images from docker. It’s worthwhile doing this on a high speed network as you are probably going to be downloading 100’s of MBs worth of images.
<code class="codeblock">
docker-compose up
</code>
Once this command is complete the back end of the system (<a href="https://www.timescale.com/">timescaledb</a>, <a href="https://www.splunk.com/">splunk</a>, <a href="https://www.pgadmin.org/">pgadmin</a>) will be up and running locally on your machine.
</td>
</tr>
<tr>
<td>4</td>
<td>Run the main application, note again the first time you run this application a bunch of files will need to be downloaded from maven repositories, this is a one off event.
<code class="codeblock">
StartTelemetry.cmd 
</code>
Or you can run the command below in the same directory as the pom.xml file
<code class="codeblock">
mvn spring-boot:run
</code>
</td>
</tr>
<tr>
<td>5</td>
<td>To simulate some CANbus traffic to see the system operating you can run the command
<code class="codeblock">
carUtilities.cmd
</code>
Select option 3 to replay a log file and then use the canlog.csv file which is included in the home directory of the project and say Y for yes to loop the file
<code class="codeblock">
Prohelion Car Testing Utilities

What utility would you like to run?

0) Exit
1) Cruise Control Test
2) Cruise Control Step Test
3) CanBus Log Replayer

Make your selection &gt; 3

Prohelion Log Replayer V1.0
Note: Filenames should entered using Java form
D:/temp/car-park-test.csv
Enter the log you wish to replay &gt; canlog.csv
Do you wish to loop the file (Y/N) &gt; Y
</code>
You should then see the CANbus log being replayed with many items like this
<code class="codeblock">
Delay = 0 : CanPackey time = 09:23:58.792   , id =  0x501 , data= 0x3F0B17E5457A0000
</code>
</td>
</tr>
<tr>
<td>6</td>
<td>Open the appropriate console by going to the following URL:
<br />
ArrowPoint Console : <a href="http://localhost:9000">http://localhost:9000</a> - Login: admin / passw0rd!
<br />
Splunk Console: <a href="http://localhost:8000">http://localhost:8000</a> - Login: admin / passw0rd!
<br />
PgAdmin Console: <a href="http://localhost:5080">http://localhost:5080</a> - Login: admin@prohelion.com / passw0rd!
</td>
</tr>
</tbody>
</table>

							
							
						</div><!-- /.c-post -->
					</div><!-- /.o-col -->
								
				
					<div class="o-col-3@lg o-offset-1@lg o-offset-2@xl">
						<ul class="c-page-nav u-sticky u-pin-t-6 u-mt-4 u-mt-1@lg u-mb-1 u-mb-4@lg">
														
							
								
									
										
											<li>
												<a href="/Microservice.html">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Microservice</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/GPSIntegration.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry GPS</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/GoogleEarth.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Google Earth</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/HybridCloud.html">
													<p class="c-page-nav__heading">ArrowPoint Telemetry HybridCloud</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Overview.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Overview</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Reporting.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Reporting</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Security.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Security</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Setup.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Setup</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Splunk.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Splunk</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Usage.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Usage</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/WeatherIntegration.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Weather Integration</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Arrow_Contributing.html">
													<p class="c-page-nav__heading">ArrowPoint Contributing</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Arrow_SoftwareTroubleshooting.html">
													<p class="c-page-nav__heading">ArrowPoint Troubleshooting</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_Dashboard.html">
													<p class="c-page-nav__heading">ArrowPoint Android Dashboard</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_Development.html">
													<p class="c-page-nav__heading">ArrowPoint Android Development</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_GPS.html">
													<p class="c-page-nav__heading">ArrowPoint Android GPS</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_Graphing.html">
													<p class="c-page-nav__heading">ArrowPoint Android Graphing</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_Messaging.html">
													<p class="c-page-nav__heading">ArrowPoint Android Private Messaging</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_Overview.html">
													<p class="c-page-nav__heading">ArrowPoint Android Overview</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_Setup.html">
													<p class="c-page-nav__heading">ArrowPoint Android Setup</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_Solar.html">
													<p class="c-page-nav__heading">ArrowPoint Android Solar</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowAndroid_SystemDetails.html">
													<p class="c-page-nav__heading">ArrowPoint Android System Details</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Alerting.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Alerting</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/BulkImporting.html">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Bulk Importing</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Capture.html">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Capture</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/Config.html">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Config</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/ArrowTelemetry_Development.html">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Development</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/FleetBroadcasting.html">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Broadcasting</p>
												</a>
											</li>
										
									
								
							
								
									
										
											<li>
												<a href="/FleetMessaging.md">
													<p class="c-page-nav__heading">ArrowPoint Telemetry Fleet Messaging</p>
												</a>
											</li>
										
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
								
									
								
							
						</ul><!-- /.c-page-nav -->
					</div><!-- /.o-col -->
				
			</div><!-- /.o-row -->
		</div><!-- /.o-container -->
	</div>




	<div class="u-bg-primary u-text-white u-pt-3 u-pt-4@sm u-pb-3 u-pb-4@sm">
		<div class="o-container">
			<div class="o-row">
				<div class="o-col-12 u-text-center">
					<div class="u-inline-block u-flex@sm">
						
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
								
									
									
									
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
							
																	
															
						
					</div>
				</div><!-- /.o-col -->
			</div><!-- /.o-row -->
		</div><!-- /.o-container -->
	</div>




	

		
			<footer class="c-footer">
				<div class="o-container">
					<div class="o-row">
						<div class="o-col-12 u-mt-6 u-mt-8@md u-mb-4 u-mb-6@md">
							
								<p class="c-logo u-mb-1">
									Prohelion Documentation
								</p><!-- /.c-logo -->
							
							
								<p>Copyright &copy; 2020. - Prohelion Pty Ltd <br>All rights reserved.</p>
							
						</div><!-- /.o-col -->
					</div><!-- /.o-row -->
				</div><!-- /.o-container -->
			</footer><!-- /.c-footer -->
		

		<script type="text/javascript" src="/Doc//dox-theme/assets/js/vendor/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="/Doc//dox-theme/assets/js/scripts.min.js"></script>

		

	</body>
</html>


