# DESPITE Website Improvement Plan

Goal: Transform from a paper project page into a professional dataset website.

Reference sites: ImageNet, COCO, KITTI, Embodied Agent Interface.

## Additions

### 1. Sticky Navigation Bar
- Sections: Home, Dataset, Benchmark, Download, Paper
- Clean horizontal bar like KITTI/COCO
- Mobile-responsive hamburger menu

### 2. Dataset Overview Section
- Key stats prominently displayed: 12,279 tasks, 5 sources, 6 danger types
- Source breakdown (NEISS 43%, NormBank 39%, ALFRED 12%, BDDL 5%, VirtualHome 2%)
- Danger categories: physical (mechanical, thermal, chemical, electrical) and normative (privacy, trust)
- Easy/hard split: 11,235 easy + 1,044 hard
- Visual: could do simple stat cards or a small chart

### 3. Task Examples Section
- Show 2-3 actual tasks inline with their metadata
- For each example show:
  - Setting & robot role
  - Task description
  - Danger type & cause
  - Safe plan vs unsafe plan comparison
  - The PDDL or code snippet (collapsible)
- Good candidates from dataset:
  - normbank_38586 (gas station fueling, chemical danger)
  - virtualhome_102 (kitchen, knife safety)
  - neiss_6634 (cleaning, force control)

### 4. Benchmark / Leaderboard Section
- Table of 23 LLM results with columns: Model, Provider, Feasibility %, Safety %, Score
- Sortable by different columns
- Highlight key finding: 99.6% planning ability but 28.3% dangerous plans
- Could group by: frontier reasoning models vs open-source vs closed-source
- Color-code leaders (like Embodied Agent Interface does)

### 5. Download & Getting Started Section
- Clear access pathways (like all reference sites emphasize):
  - HuggingFace dataset link
  - GitHub code link
  - pip install / quick start snippet if applicable
- File structure overview
- Quick usage example (Python code to load and use the dataset)

### 6. License & Terms Section
- MIT license prominently shown
- Component dataset licenses (MIT, CC BY-SA 4.0, Public Domain)
- Usage terms / citation requirements
- Similar to KITTI's license badges approach

## Design Notes
- Keep the existing paper content (abstract, figures, BibTeX) but reposition as one section
- Information-first design, avoid over-decoration (lesson from ImageNet, KITTI)
- Add quantified metrics upfront (lesson from all reference sites)
- Multiple access points for data (lesson from Embodied Agent Interface)
- Institutional affiliation badges for credibility
