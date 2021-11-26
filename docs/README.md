![Spoky](/docs/design/assets/Logo_blue.png)

Spoky is a remote, exam taking solution, crafted and engineered by Team InZone A during the [deploy(impact)](https://www.womenplusplus.ch/deploy-impact) challenge of [women++](https://www.womenplusplus.ch/) in October and November 2021.


## Contents

- [What is this all about?](#product)
  - [Problem statement](#problem)
  - [Product vision](#vision)
- [What is in this repo?](#repo)
  - [Repository structure](#repoS)
  - [Folder structure](#folderS)
- [Meet our team](#team)
- [License](#lic)


<a name="product"><h2>What is this all about?</h2></a>

<a name="problem"><h3>Problem statement</h3></a>

*[InZone](https://www.unige.ch/inzone/), a project of the University of Geneva, offers comprehensive blended learning opportunities to students in transitory refugee camps in Kenya and Jordan. Their initiatives empower students affected by humanitarian crises to continue their education and own their future.*

*COVID has not stopped the teaching activities, however, it is a wake-up call to find a solution for the students to take exams remotely whilst ensuring that the exam protocols are followed. You can help InZone develop a solution to help refugees around the world have more sustainable access to higher education.*

(from the women++ starter pack)

<a name="vision"><h3>Product vision</h3></a>

*During the first sprint we conducted research and brainstorming to identify the most pressing issues InZone is facing. We came up with five problem statements to guide us through this project and to base our prioritization on.*

- As an educator I want to empower my students such that they can achieve their higher goals.
- As an educator I need a way to verify my students offline such that I trust it is them.
- As a student far away from the hub and with poor internet connectivity I want to be able to take an official exam such that I qualify for a certificate.
- As a student with many other responsibilities and no online access to help I need a clear user journey such that I do not drop out.
- As a student with basic English I need to easily follow the app such that I can focus on the exam.



<a name="repo"><h2>What is in this repo?</h2></a>

<a name="repoS"><h3>Repository structure</h3></a>

The implementation of the app prototype is in the [src](/src) folder, with a [README](/src/README.md) describing the technologies we used and how to get started.

In the [docs](/docs) folder you can find:
- [pitch slides](/docs/pitch_slides.pdf) from the closing ceremony
- [recorded walkthroughs](/docs/walkthroughs.md) of the design prototypes for
  - the [app](/docs/walkthrough_app.mp4)
  - the [dashboard](/docs/walkthrough_dashboard.mp4)

  these can be watched directly [here](/docs/walkthroughs.md) or they can be downladed by cloning the repo and then watched locally
- [conceptual](/docs/concept/) resources such as the high-level concept sketch, personas, user flows, and a [README](/concept/README.md) describing our team vision and workflow guidelines, and introducing a python script to automate labeling of issues to track them on the project board
- [design](/docs/design/) materials created, starting from a moodboard, showing the final style tile, and including several design assets
- description of the databse schema for the parse [backend](/docs/backend/)

<a name="folderS"><h3>Folder structure</h3></a>

This is the folder structure of this repository. Only folders and READMEs are shown, and for the src folder also the top-level files. All other files are indicated with ```...```.

```
.
├── docs
│   ├── backend
│   │   ├── ...
│   │   └── README.md
│   ├── concept
│   │   ├── personas
│   │   │   └── ...
│   │   ├── scripts
│   │   │   └── ...
│   │   ├── user-flows
│   │   │   └── ...
│   │   ├── ...
│   │   └── README.md
│   ├── design
│   │   ├── assets
│   │   │   └── ...
│   │   ├── ...
│   │   └── README.md
│   ├── pitch_slides.pdf
│   ├── walkthrough_app.mp4
│   ├── walkthrough_dashboard.mp4
│   ├── walkthroughs.md
│   └── README.md
├── src
│   ├── .expo-shared
│   │   └── ...
│   ├── assets
│   │   └── ...
│   ├── hotfixes
│   │   └── ...
│   ├── screens
│   │   └── ...
│   ├── .gitignore
│   ├── App.js
│   ├── app.json
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── webpack.config.js
├── .gitignore
└── LICENSE
```


<a name="team"><h2>Contributors</h2></a>


<a name="lic"><h2>License</h2></a>

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Find the license file [here](/LICENSE).
