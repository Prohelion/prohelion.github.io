

<!DOCTYPE html>

	<html lang="en-US">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, minimum-scale=1.0">
		
			<title>ArrowPoint Telemetry GPS | Prohelion</title>
		
		
		
			<meta name="keywords" content="ArrowPoint, Telemetry, GPS">
		
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
							<p>The Telemetry system can track your current location which can then be displayed on Google Maps.</p>

<p>We us the iPhone app GPS2IP to capture the GPS data and push it to the telemetry system</p>

<p><a href="https://itunes.apple.com/us/app/gps-2-ip/id408625926?mt=8">https://itunes.apple.com/us/app/gps-2-ip/id408625926?mt=8</a></p>

<p><img src="/images/telemetry_GPS.png" alt="Iphone GPS Coordinate example" /></p>

<p>The reason we use an iPhone app is simply redundancy and ease of development. The iPhone is typically mounted on the dash of the chase car and connected to the in car Wifi network. It captures GPS data and then transmits it to the Telemetry application which is listening on a socket for the GPS data. The Telemetry application then broadcasts the GPS data as CANbus packets for other devices to receive.</p>


							
							
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

