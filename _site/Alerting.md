

<!DOCTYPE html>

	<html lang="en-US">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, minimum-scale=1.0">
		
			<title>ArrowPoint Telemetry Alerting | Prohelion</title>
		
		
		
			<meta name="keywords" content="ArrowPoint, Telemetry, Alerting">
		
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
							<p>The Telemetry system has the ability to be connected to an external light that can alert you when CANbas based items go out of range.</p>

<p>Alerting is done via a visual cue using USB HID Visual Signal Indicators from Delcom Products</p>

<p><a href="https://www.delcomproducts.com/productdetails.asp?PartNumber=904007">https://www.delcomproducts.com/productdetails.asp?PartNumber=904007</a></p>

<p><img src="/images/telemetry_BeaconBlackSide.jpg" alt="Beacon Black Side" /></p>

<table data-layout="wide" class="confluenceTable"><tbody><tr><td class="confluenceTd"><p>Device</p></td><td class="confluenceTd"><p>Measurement</p></td><td class="confluenceTd"><p>CanId</p></td><td class="confluenceTd"><p>dataPointCanId</p></td><td class="confluenceTd"><p>Warning Threshold</p></td><td class="confluenceTd"><p>Alert Threshold</p></td><td class="confluenceTd"><p>Shutdown Threshold</p></td><td class="confluenceTd"><p>Alert Type</p></td></tr><tr><td class="confluenceTd"><p>BMS</p></td><td class="confluenceTd"><p>Min Cell Voltage</p></td><td class="confluenceTd"><p>6F80</p></td><td class="confluenceTd"><p>28544</p></td><td class="confluenceTd"><p>2900</p></td><td class="confluenceTd"><p>2750</p></td><td class="confluenceTd"><p>2600</p></td><td class="confluenceTd"><p>Low</p></td></tr><tr><td class="confluenceTd"><p>BMS</p></td><td class="confluenceTd"><p>Max Cell Temp</p></td><td class="confluenceTd"><p>6F92</p></td><td class="confluenceTd"><p>28562</p></td><td class="confluenceTd"><p>500</p></td><td class="confluenceTd"><p>550</p></td><td class="confluenceTd"><p>600</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS</p></td><td class="confluenceTd"><p>CMU 1 PCB Temp</p></td><td class="confluenceTd"><p>6014</p></td><td class="confluenceTd"><p>24596</p></td><td class="confluenceTd"><p>750</p></td><td class="confluenceTd"><p>800</p></td><td class="confluenceTd"><p>850</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS</p></td><td class="confluenceTd"><p>CMU 2 PCB Temp</p></td><td class="confluenceTd"><p>6044</p></td><td class="confluenceTd"><p>24644</p></td><td class="confluenceTd"><p>750</p></td><td class="confluenceTd"><p>800</p></td><td class="confluenceTd"><p>850</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS</p></td><td class="confluenceTd"><p>CMU 3 PCB Temp</p></td><td class="confluenceTd"><p>6074</p></td><td class="confluenceTd"><p>24692</p></td><td class="confluenceTd"><p>750</p></td><td class="confluenceTd"><p>800</p></td><td class="confluenceTd"><p>850</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS</p></td><td class="confluenceTd"><p>CMU 4 PCB Temp</p></td><td class="confluenceTd"><p>60A4</p></td><td class="confluenceTd"><p>24740</p></td><td class="confluenceTd"><p>750</p></td><td class="confluenceTd"><p>800</p></td><td class="confluenceTd"><p>850</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS</p></td><td class="confluenceTd"><p>CMU 5 PCB Temp</p></td><td class="confluenceTd"><p>60D4</p></td><td class="confluenceTd"><p>24788</p></td><td class="confluenceTd"><p>750</p></td><td class="confluenceTd"><p>800</p></td><td class="confluenceTd"><p>850</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS</p></td><td class="confluenceTd"><p>Overvoltage</p></td><td class="confluenceTd"><p>6F82</p></td><td class="confluenceTd"><p>28546</p></td><td class="confluenceTd"><p>4100</p></td><td class="confluenceTd"><p>4150</p></td><td class="confluenceTd"><p>4200</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>WaveSculpter</p></td><td class="confluenceTd"><p>Motor Temp</p></td><td class="confluenceTd"><p>40B0</p></td><td class="confluenceTd"><p>16560</p></td><td class="confluenceTd"><p>90</p></td><td class="confluenceTd"><p>100</p></td><td class="confluenceTd"><p>120</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>WaveSculpter</p></td><td class="confluenceTd"><p>Heatsink Temp</p></td><td class="confluenceTd"><p>40B4</p></td><td class="confluenceTd"><p>16564</p></td><td class="confluenceTd"><p>60</p></td><td class="confluenceTd"><p>65</p></td><td class="confluenceTd"><p>80</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>WaveSculpter</p></td><td class="confluenceTd"><p>DSP Operating Temp</p></td><td class="confluenceTd"><p>40C0</p></td><td class="confluenceTd"><p>16576</p></td><td class="confluenceTd"><p>80</p></td><td class="confluenceTd"><p>90</p></td><td class="confluenceTd"><p>100</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>Arrays</p></td><td class="confluenceTd"><p>Array 1 Power</p></td><td class="confluenceTd"><p>3410</p></td><td class="confluenceTd"><p>13328</p></td><td class="confluenceTd"><p>0.1</p></td><td class="confluenceTd"><p>1.2</p></td><td class="confluenceTd"><p>1.2</p></td><td class="confluenceTd"><p>Percentage</p></td></tr><tr><td class="confluenceTd"><p>Arrays</p></td><td class="confluenceTd"><p>Array 2 Power</p></td><td class="confluenceTd"><p>3420</p></td><td class="confluenceTd"><p>13344</p></td><td class="confluenceTd"><p>0.1</p></td><td class="confluenceTd"><p>1.2</p></td><td class="confluenceTd"><p>1.2</p></td><td class="confluenceTd"><p>Percentage</p></td></tr><tr><td class="confluenceTd"><p>Arrays</p></td><td class="confluenceTd"><p>Array 3 Power</p></td><td class="confluenceTd"><p>3430</p></td><td class="confluenceTd"><p>13360</p></td><td class="confluenceTd"><p>0.1</p></td><td class="confluenceTd"><p>1.2</p></td><td class="confluenceTd"><p>1.2</p></td><td class="confluenceTd"><p>Percentage</p></td></tr><tr><td class="confluenceTd"><p>Arrays</p></td><td class="confluenceTd"><p>Total Array Power</p></td><td class="confluenceTd"><p>3440</p></td><td class="confluenceTd"><p>13376</p></td><td class="confluenceTd"><p>100</p></td><td class="confluenceTd"><p>10</p></td><td class="confluenceTd"><p>0</p></td><td class="confluenceTd"><p>Low</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>BMS-DC_DC Max Cell Temp</p></td><td class="confluenceTd"><p>1030</p></td><td class="confluenceTd"><p>4144</p></td><td class="confluenceTd"><p>50</p></td><td class="confluenceTd"><p>55</p></td><td class="confluenceTd"><p>60</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>Min Cell 1 Voltage</p></td><td class="confluenceTd"><p>1040</p></td><td class="confluenceTd"><p>4160</p></td><td class="confluenceTd"><p>2900</p></td><td class="confluenceTd"><p>2750</p></td><td class="confluenceTd"><p>2600</p></td><td class="confluenceTd"><p>Low</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>Min Cell 2 Voltage</p></td><td class="confluenceTd"><p>1042</p></td><td class="confluenceTd"><p>4162</p></td><td class="confluenceTd"><p>2900</p></td><td class="confluenceTd"><p>2750</p></td><td class="confluenceTd"><p>2600</p></td><td class="confluenceTd"><p>Low</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>Min Cell 3 Voltage</p></td><td class="confluenceTd"><p>1044</p></td><td class="confluenceTd"><p>4164</p></td><td class="confluenceTd"><p>2900</p></td><td class="confluenceTd"><p>2750</p></td><td class="confluenceTd"><p>2600</p></td><td class="confluenceTd"><p>Low</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>Min Cell 4 Voltage</p></td><td class="confluenceTd"><p>1046</p></td><td class="confluenceTd"><p>4166</p></td><td class="confluenceTd"><p>2900</p></td><td class="confluenceTd"><p>2750</p></td><td class="confluenceTd"><p>2600</p></td><td class="confluenceTd"><p>Low</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>Max Cell 1 Voltage</p></td><td class="confluenceTd"><p>1040</p></td><td class="confluenceTd"><p>4160</p></td><td class="confluenceTd"><p>4100</p></td><td class="confluenceTd"><p>4150</p></td><td class="confluenceTd"><p>4200</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>Max Cell 2 Voltage</p></td><td class="confluenceTd"><p>1042</p></td><td class="confluenceTd"><p>4162</p></td><td class="confluenceTd"><p>4100</p></td><td class="confluenceTd"><p>4150</p></td><td class="confluenceTd"><p>4200</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>Max Cell 3 Voltage</p></td><td class="confluenceTd"><p>1044</p></td><td class="confluenceTd"><p>4164</p></td><td class="confluenceTd"><p>4100</p></td><td class="confluenceTd"><p>4150</p></td><td class="confluenceTd"><p>4200</p></td><td class="confluenceTd"><p>High</p></td></tr><tr><td class="confluenceTd"><p>BMS-DC_DC</p></td><td class="confluenceTd"><p>Max Cell 4 Voltage</p></td><td class="confluenceTd"><p>1046</p></td><td class="confluenceTd"><p>4166</p></td><td class="confluenceTd"><p>4100</p></td><td class="confluenceTd"><p>4150</p></td><td class="confluenceTd"><p>4200</p></td><td class="confluenceTd"><p>High</p></td></tr></tbody></table>

<p>Each CanId is set a range of values which if exceeded trigger a visual alert to notify the chase car that there are systems moving out of range. The system can look for values that are high or low.</p>

<p>For example if</p>

<ul>
  <li>
    <p>BMS-DC_DC Max Cell 4 Voltage goes beyond 4100 mv or 4.1 volts then the light will change colour from green to orange</p>
  </li>
  <li>
    <p>If the total array power drops below 100w the system will start to throw warnings</p>
  </li>
</ul>


							
							
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


