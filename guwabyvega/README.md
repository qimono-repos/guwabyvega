# GUWABY

**by Qimono**

General Ultra Wide (And_Compatible) Band Yearly lifespan project for pet tracking.

GUWABY is an end-to-end, high-precision solution for pet tracking. We handle everything from custom-tailored wearable pet clothing to cross-platform tracking software and ecosystem configuration. The project is designed to provide accurate, reliable, and localized tracking for cats and dogs.

The name **GUWABY** blends **"Guau"** (a dog's bark), **"Miau"** (a cat's meow), and **UWB** (Ultra-Wideband), reflecting our core technology and our love for pets.

---

## 💸 The GUWABY Model: No Carriers, No Subscriptions

Unlike traditional GPS pet trackers that require a SIM card and an expensive monthly cellular data plan, GUWABY operates on a **"No Carrier"** model:

* **One Lifetime Purchase:** You buy the tailored collar/harness and the tracking hardware once.
* **1-Year Lifespan / Zero Maintenance:** Utilizing standard coin-cell batteries and low-power UWB/BLE chips, the tracker lasts a full year without needing a charge. After a year, simply swap the battery or refresh the enclosure.
* **Crowdsourced Network Power:** By leveraging Apple's *Find My* network and Google's *Find My Device* hub, millions of smartphones worldwide act as the "carrier" for your pet's location, absolutely free of charge.

---

## 🛠️ Project Scope & Architecture

GUWABY bridges physical craftsmanship with modern cross-platform software.

### 1. Tailored Hardware & Textiles

* **In-Person Fitting:** Clients visit with their pet (or provide precise contexture and measurements).

* **Custom Craftsmanship:** We design and machine-sew customized, secure collars or harnesses that elegantly integrate the tracking tags (Moto Tags, AirTags, or multi-platform generic chips). Because we design the textile from scratch, the form factor can be sleekly distributed across the band rather than sticking out as a bulky button.

### 2. Software Ecosystem

* **Mobile App (Ionic + Capacitor):** A cross-platform app providing an extended dashboard for managing pet profiles, sharing locations, and logging historical telemetry.

* **Companion Wearable App (Android Wear OS / Apple Watch):** A glanceable, quick-access wrist application to check if your pet is nearby or view their last known status without pulling out your phone.

---

## ⚠️ Tech Note: Ecosystem API Integration

The initial version of the GUWABY extended mobile app relies on the commercial hardware ecosystem (AirTags, Moto Tags, and Find My compatible chips). 

> 💡 **Current Implementation Scope:** 
> Because Apple and Google tightly restrict direct, third-party programmatic access to their official *Find My* location streams due to privacy policies, the current phase provides **extended profile services, manual location logs, and seamless deep-linking** into the native Find My / Find My Device applications. 
> 
> Future iterations aim to include custom-built UWB/BLE beacon tracking hardware, bypassing ecosystem API limits to unlock raw historical coordinate streaming directly inside the GUWABY app.

---

## 📡 What is Ultra-Wideband (UWB) & Why Use It?

Ultra-Wideband (UWB) is a low-power, short-range wireless communication technology operating over a wide frequency spectrum (typically 3.1 GHz to 10.6 GHz). 

Traditional Bluetooth or GPS can tell you your pet is "somewhere in the neighborhood." UWB brings **Precision Tracking**:

* **Centimeter-Level Accuracy:** UWB calculates Time-of-Flight (ToF), letting your phone point an arrow directly to your pet with centimeter precision—even indoors or hiding under furniture.
* **Low Power Consumption:** Operates on minimal power, allowing the 1-year constant-ready lifespan.
* **High Interference Resistance:** Signals easily pass through crowded rooms or dense environment noise without losing connection.