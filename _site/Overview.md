

<!DOCTYPE html>

	<html lang="en-US">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, minimum-scale=1.0">
		
			<title>ArrowPoint Telemetry Overview | Prohelion</title>
		
		
		
			<meta name="keywords" content="ArrowPoint, Telemetry, Overview">
		
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans:400,400i,500,500i,700,700i">
		<link rel="stylesheet" href="/dox-theme/assets/css/style.css">
	</head>
	<body>
		
			<div class="c-offcanvas">
				<div class="c-offcanvas__inner">
					
						<ul class="c-nav c-nav--stacked u-mx-auto">
							
								<li><a href="https://www.prohelion.com">Prohelion Website</a></li>
							
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
										<a href="/" class="c-logo__link">
											<img src="/dox-theme/assets/images/layout/logo.png">
										</a><!-- /.c-logo__link -->
									</div><!-- /.c-logo -->
								
								
									<div class="u-flex u-items-center u-ml-auto">
										
											<ul class="c-nav u-mb-0 u-hidden u-block@lg">
												
													
													<li class=""><a href="https://www.prohelion.com">Prohelion Website</a></li>
												
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
<p>The ArrowPoint Telemetry Solution is designed to provide telemetry capture and management information for managing a race car.</p>

<p>The out of the box implementation is designed for use in Solar or Electric racing cars that use technology from <a href="http://www.prohelion.com/">Prohelion</a> or <a href="https://www.tritium.com.au/">Tritium</a>. This solution was originally developed by <a href="http://www.teamarrow.com.au/">TeamArrow</a> and has been used in racing environments since 2013. TeamArrow continue to use this application as the heart of its telemetry and strategy management solutions.</p>

<p>The solution captures and stores all telemetry data in a race environment and has been used to capture over 60,000,000 data points in previous events and testing and can manage, track and store around 400 data points a second when running on a i7 laptop. It provides reporting (via <a href="https://www.splunk.com/">Splunk</a>) across full data sets via a web interface and allows teams to build and track massive data sets via dashboards and dynamically modifiable searches.</p>

<p><img src="/images/telemetry_analysis.png" alt="Example of the Arrowpoint Dashboard" /></p>

<p>The ArrowPoint-Telemetry system is very light weight (considering what it is doing!) and <a href="http://www.teamarrow.com.au/">TeamArrow</a> have historically run it on a single CPU laptop, which we tuck on the seat in the chase car or can be run in the cloud (we use Amazon EC2) when coupled with the ArrowPoint-Tablet for data relay.</p>

<p>Examples of the software in use can be seen here - <a href="https://www.youtube.com/watch?reload=9&amp;v=lWkXEb8v1tk">https://www.youtube.com/watch?reload=9&amp;v=lWkXEb8v1tk</a></p>

<h2 id="features">Features</h2>
<p>For the full feature list see the Telemetry System Features section, but at a high level the application provides</p>

<ul>
  <li>CANbus data capture and reporting either directly off the car, via the ArrowPoint-Tablet or a JSON stream</li>
  <li>Alerting via a visual signals (USB light), when key data points go out of range</li>
  <li>Storage of CANbus data in a relational data set for later reporting against very large datasets</li>
  <li>Relaying of data to other ArrowPoint-Telemetry instances</li>
  <li>Integration with SPLUNK for larger scale data capture and real time reporting</li>
  <li>Mechanisms to visualise your position and strategy in Google Earth</li>
</ul>

<p>The application is compatible with</p>

<ul>
  <li>Prohelion Battery Packs</li>
  <li>Tritium WaveSculpters</li>
  <li>Prohelion and Tritium BMUs and CMUs</li>
</ul>

<p>Any issues please or question, please raise them on our GitHub account at <a href="https://github.com/Prohelion/ArrowPoint-Telemetry">https://github.com/Prohelion/ArrowPoint-Telemetry</a> or see the <a href="../Troubleshooting.md">Software Troubleshooting page</a>.</p>


							
							
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
		

		<script type="text/javascript" src="/dox-theme/assets/js/vendor/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="/dox-theme/assets/js/scripts.min.js"></script>

		

	</body>
</html>


