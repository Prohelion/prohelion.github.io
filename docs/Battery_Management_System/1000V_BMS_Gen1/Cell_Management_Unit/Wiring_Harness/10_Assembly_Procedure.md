---
title: Assembly Procedure
description: Documentation for the Prohelion Vehicle Communications protocol
---

# Assembly Procedure

## Assembly Jig

Making an assembly jig with bolts at the same spacing as the battery terminals is a good idea, saving the danger of working around high power cells.

## Cut to Length

Work out where you want the CMU to be located.  It should be fastened to the wall of the battery box to aid in heatsinking, with the supplied insulation material, as outlined in the [BMS User's Manual](../../index.md)

The appropriate length of cable has been placed on the assembly jig and cut to length in the following photo:

<figure markdown>
![Cut to length](../images/Cut_to_length.jpg)
<figcaption>Cut to length</figcaption>
</figure>

## Mark For Trimming

The reason for choosing the pinout of the voltage sense connector on the CMU is to make the wiring harness simpler and neater.  Each wire branches out from the edge of the ribbon, with the ribbon being trimmed down narrower as it approaches Cell 7.  The following picture shows the cut points for trimming marked onto the cable.  

The Brown wire is not used, and can be removed completely and used for the thermistor wiring.  The Red wire branches out to Cell 0+, and the Black to Cell 0–.  The White wire to Cell 1+, Orange to Cell 2+, and so on.  Each cut will be one wire deeper into the ribbon.

<figure markdown>
![Trimming Marks](../images/Mark_for_trimming.jpg)
<figcaption>Trimming Marks</figcaption>
</figure>

## Trim

Cut in on the marks, and then from the marks to the end of the ribbon.  The cut pieces can then be removed, as shown below:

<figure markdown>
![Trimming](../images/Trim.jpg)
<figcaption>Trimming</figcaption>
</figure>

## Split Branches

Cut back along from each mark by one cell length, and split the resulting stub off in the direction of each cell, as shown below:

<figure markdown>
![Split Branches](../images/Split_branches.jpg)
<figcaption>Split Branches</figcaption>
</figure>

## Separate CMU End

Cut the cable back between strands by 10mm or so at the CMU end, to allow fitting the microfit connector.

<figure markdown>
![Separate CMU End](../images/Separate_CMU_end.jpg)
<figcaption>Separate CMU End</figcaption>
</figure>

## Strip Branches

Strip around 10mm from the end of each branch, to allow folding back on itself and therefore obtaining a better crimp (double copper into crimp).

<figure markdown>
![Strip Branches 1](../images/Strip_branches.jpg)
<figcaption>Strip Branches</figcaption>
</figure>

Fold back the stripped length, as shown below:

<figure markdown>
![Fold Back Stripped Length](../images/Strip_branches2.jpg)
<figcaption>Fold Back Stripped Length</figcaption>
</figure>

Use the proper crimp tool to crimp on the ring terminals for the cell connections.

## Fit Microfit Crimps

Strip back the CMU end of the cable by 2 – 2.5mm and use the correct tool to crimp on the molex crimps.  Pay careful attention to which way is 'up' when orienting the crimps and the housing.  The following photo shows the correct relationship. Refer to [Appendix B](../../Appendix/80_Appendix_B.md) for component sources and [Appendix C](../../Appendix/90_Appendix_C.md) for crimping instructions.

<figure markdown>
![Fit Microfit Crimps](../images/Fit_microfit_crimps.jpg)
<figcaption>Fit Microfit Crimps</figcaption>
</figure>

## Add Thermistor Wiring

Use one of the offcuts from the previous steps to make a two-wire cable to the thermistor, and crimp it into the microfit connector in the appropriate location.

## Check Harness

Use a multimeter to check resistance between adjacent pins in the microfit connector.  There should be no connection between any terminals.  

## Fit to Battery Pack

Fit the harness to your battery pack.  The ring terminals should be above the main high-current busbars, so that they do not have traction pack currents flowing through them.  Use spring or belleville washers so that the connections to the cells remain tight, even with vibration and thermal expansion.  

Consider using a contact grease or jointing compound, as described in the [Prohelion WaveSculptor200 User Manual](../../../../Motor_Controllers/WaveSculptor200/User_Manual/index.md) high-current wiring Appendix.