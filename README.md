# NyerahWorks Website

Source for the NyerahWorks company website.

**Live site:** https://nyerahmt.github.io/nyerahworks-site/

NyerahWorks focuses on software porting and iOS platform engineering for existing applications, particularly C and C++ projects.

## Structure

The site is intentionally static and dependency-free. GitHub Pages serves the files directly from `main`.

```text
/
├── index.html                  # Homepage
├── styles.css                  # Base responsive layout
├── polish.css                  # Homepage refinement layer
├── case-study.css              # Shared case-study styles
├── script.js                   # Navigation/header behavior
└── work/
    ├── engine-simulator/       # Engine Simulator iOS case study
    └── principia/              # Principia iOS case study
```

## Projects featured

### Engine Simulator for iOS

Native iPhone and iPad port of Ange Yaghi's Engine Simulator.

- Port repository: https://github.com/NyerahMT/engine-sim-ios
- Original project: https://github.com/ange-yaghi/engine-sim

### Principia for iOS

iOS port of the community-maintained Principia physics sandbox, with an emphasis on keeping Apple-specific changes maintainable against upstream.

- Port repository: https://github.com/NyerahMT/principia-ios
- Upstream project: https://github.com/Bithack/principia

## Deployment

GitHub Pages deploys automatically when `main` changes. There is no application build step and no runtime dependency beyond the browser.
