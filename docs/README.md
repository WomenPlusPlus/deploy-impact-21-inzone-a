![Spoky](/docs/design/assets/Logo_blue.png)

Spoky is a remote, exam taking solution, crafted and engineered by Team InZone A during the [deploy(impact)](https://www.womenplusplus.ch/deploy-impact) challenge of [women++](https://www.womenplusplus.ch/) in October and November 2021.

## Contents

- [Project structure](#projS)
- [Product vision](#productV)
- [Development](#dev)
- [Folder structure](#folderS)
- [License](#lic)

<a name="projS"><h2>Project structure</h2></a>

In the [docs](/docs) folder you can find:
- [pitch slides](/docs/pitch_slides.pdf)
- recorded walkthroughs of the design prototypes for
  - the [app](/docs/walkthrough_app.mp4)
  - the [dashboard](/docs/walkthrough_dashboard.mp4)
- description of the parse [backend](/docs/backend/)
- other [conceptual](/docs/concept/) resources such as personas, and a [README](/concept/README.md) describing our team vision, workflow guidelines and introducing a python script to automate labeling of issues to track them on the project board
- all [design](/docs/design/) materials created

The implementation of the app prototype is in the [src](/src) folder.

<a name="productV"><h2>Product vision</h2></a>

*During the first sprint we conducted research and brainstorming to identify the most pressing issues InZone is facing. We came up with five problem statements to guide us through this project and to base our prioritization on.*

> As an educator &ndash; I want to empower my students &ndash; such that they can achieve their higher goals.

> As an educator &ndash; I need a way to verify my students offline &ndash; such that I trust it is them.

> As a student far away from the hub and with poor internet connectivity &ndash; I want to be able to take an official exam &ndash; such that I qualify for a certificate.

> As a student with many other responsibilities and no online access to help &ndash; I need a clear user journey &ndash; such that I do not drop out.

> As a student with basic English &ndash; I need to easily follow the app &ndash; such that I can focus on the exam.


<a name="dev"><h2>Development</h2></a>

Information about the technologies we used and how to get started with our project can be found [here](/src/README.md).


<a name="folderS"><h2>Folder structure</h2></a>

This is the structure of this repository. Only folders and READMEs are shown, and for the src folder also the top-level files. All other files are indicated with ```...```.

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

<a name="lic"><h2>License</h2></a>

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
