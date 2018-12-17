---
layout: post
title: How we sniffed passwords of our teachers for increasing attendance
featured-img: how-we-sniffed-passwords-teachers-increasing-attendance
author: Anonymous
categories: [Password Sniffing, Hacking, Moodle]
---
Believe it or not, but most of the engineering students of our institute hate the 75% attendance rule, especially if they are from CSE branch :laughing:. And we were always among the top in the list of students who don't like attending boring lectures just for the sake of attendance. On one such boring day of my 6th semester, while browsing the [WonderHowTo Null-Byte][null-byte-blog] Blog (one of my favorites :grin:), we came across **ARP poisoning attack** and a tool called **Ettercap**. And soon we understood that this was going to be the golden key for bunking the lectures in college :star2:.

Our college uses [Moodle][moodle-website] for keeping track of the attendance of students, where each teacher can login and update attendance of their subjects. What helped us in performing the sniffing was the fact that Moodle server in our institute is hosted with `"HTTP"` (yeah, no `HTTPS`). And this was enough to fire up Ettercap and start looking into network traffic.

## So what is "Ettercap"?
[Ettercap][ettercap-website] is a free and open-source tool for performing different MITM attacks in LAN like ARP Poisoning, DNS Spoofing, Cookie hijacking, etc. We will be using the ARP poisoning attack on Local network to sniff the network traffic. *(Note that Ettercap will not work if the site uses HTTPS. In the past, Ettercap had a SSLStrip plugin for this, but modern browsers use [HSTS][hsts-wikipedia] technique which stops SSLStrip from working.)*

We will not be discussing the concept behind ARP Poisoning in this post.

---

## Step 1: Installing Ettercap
If you are on Kali Linux, Ettercap is already installed on your system.

Ubuntu users can install Ettercap with:
```
sudo apt-get install ettercap-graphical
```
Ubuntu is recommended over Windows as it will be easier to Spoof MAC address of our system with Ubuntu.

## Step 2: Hiding yourself
It will be great if we take precaution and spoof the MAC address of our system, so in case someone finds malicious activity on the network, our original MAC address will not be disclosed.

Connect to the desired network (WiFi or Ethernet) where you want to perform the sniffing. The victim (i.e. The teacher in our case) should also be on the same local network.

In Ubuntu,
- Go to **"WiFi Settings"** and open the properties of the network to which you are connected.
- Switch to **"Identity"** tab.
- You can see your original MAC address in "MAC Address field".
- Enter new fake address in **"Cloned Address"** field (something like `AA:BB:CC:DD:EE:FF`)

![MAC Spoofing][mac-spoof]

- Also, note the **"Default Route"** IP in "Details" tab. This is the IP of Router in your LAN, we will need this later.

![Router IP Address][router-ip]

- Click **"Apply"**.
- Verify that network card is using new fake address instead of original one by executing `ifconfig` command in terminal and check for the value of the Ethernet address.

If this doesn't work, one can use ["macchanger"][macchanger-tutorial] app for doing this.

## Step 3: Sniffing
- Start Ettercap, and go to **"Sniff"** => **"Unified sniffing"** and select correct network interface.
- Go to **"Hosts"** => **"Scan for hosts"**, this will scan the current hosts in the LAN.
- Go to **"Hosts"** => **"Host list"**, this will show the list of detected hosts.
- Select the IP address of the **Router** (noted in the first step) and add it to **"Target 2"**.
- Select all **other hosts** except Router and add these to **"Target 1"**.
- Go to **"Mitm"** => **"ARP Poisoning"** => **"Sniff remote connections"** => **"Ok"**.
- Go to **"Start"** => **"Start sniffing"**.

![Adding hosts to targets][ettercap-targets]

If you have done everything correctly, you will start receiving the network activity in the log. As soon as someone logs in on an HTTP website, you can see her/his *Username* & *Password* in the log.

![Ettercap log][ettercap-log]

We successfully sniffed passwords of many faculty members from our institute with this technique. Interestingly, we found that most of these faculties didn't even change their default passwords :confused:.

Once we had our hands on Usernames and Passwords, it was merely a task of logging into the teachers' Moodle accounts and updating our attendance from "Absent" to "Present". Hurray! :tada:

At the time of writing this, our college was still using HTTP for Moodle. It will be a wise move for our college to shift to HTTPS and force the faculty members to change their default passwords :sweat_smile:.

---
> *Every single non-technical detail mentioned above is completely fictional. This post has been written for learning purpose only. Do not try this stuff on your college network.*

[null-byte-blog]: https://null-byte.wonderhowto.com/
[moodle-website]: https://moodle.org/
[ettercap-website]: https://www.ettercap-project.org/
[hsts-wikipedia]: https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
[macchanger-tutorial]: https://linuxconfig.org/change-mac-address-with-macchanger-linux-command

[router-ip]: {{site.url}}{{ site.baseurl }}/assets/img/posts/general/router-ip.png
[mac-spoof]: {{site.url}}{{ site.baseurl }}/assets/img/posts/general/mac-spoof.png
[ettercap-targets]: {{site.url}}{{ site.baseurl }}/assets/img/posts/general/ettercap-targets.png
[ettercap-log]: {{site.url}}{{ site.baseurl }}/assets/img/posts/general/ettercap-log.png
