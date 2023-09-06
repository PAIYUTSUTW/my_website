---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* B.S. in Taiwan, National Taichung University of Education, 2019
* M.S. in Taiwan, National Chung Chang University, 2021
* Ph.D in Unitied State, The Penn State University

Research  experience
======
* Research Assistant
  * Academia Sinica • 09.2021 - 2023
    * Graph-based Neural Attack Behavior Detection and Alignment with Kernel Audit Logs for Advanced Persistent Threats
      * Simulated APT attack on Linux and Windows
      * Developed a theory for efficiently reducing kernel audit logs to ensure the high quality of behavior detection 
      * Developed models leveraging graph embedding to correlate and mine suspicious behavior in audit logs
    * Modeling Threat Representation through Building Cyber Threat Knowledge Base for Advanced Persistent Threats
      * Developed models to extract semantic context from cyber threat intelligence platforms for generating provenance graphs
    * Using Honeypot Logs and Packets for Identifying Network Attack Patterns and their Signature
      * Utilizing  BERT-based models to analyze packets and logs from honeypots provided by Soft Bank
* M.S.
  * National Chung Cheng University • 09.2019- 07.2021
    * Driving Behavior Recognition based on Generative Adversarial Networks
      * Developed a redesigned model for identifying whether drivers are the owners of cars
      * Developed a mechanism for ensuring the reliability of the detection system
      * Evaluating the accuracy of several types of GAN in different situations

Work experience
======
* Penetration tester 
  * The Chiayi County Government • 05. 2020 - 12. 2020
    * Identified security vulnerabilities and weaknesses in websites or IoT devices for  the Chiayi county  government  
    * Designed and conducted simulated social engineering attacks

* Network administrator
  * College of Engineering in CCU•  09. 2019 - 09. 2020
    * Maintained and administered the college's firewalls and network infrastructures
    * Managed the college's services, such as websites, VPN, and DNS
  
Skills
======
* Python
* TensorFlow
* PyTorch
* Bash scripting
* Neo4J
* Linux Shell
* Java
* C#
* C

Publications
======
  <ul>{% for post in site.publications %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
<!-- Talks
======
  <ul>{% for post in site.talks %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Currently signed in to 43 different slack teams -->
