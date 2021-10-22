# Workflow Guidelines

*In this guideline we describe the workflow and best practices for implementing an agile methodology in the team InZone A for the Women++ (deploy)impact challenge.*

## Resources and Tools

- agorize
  - official resources
  - communication with Women++, satellite and mentors
  - submitting deliverables and the final handover
- github
  - issues (including agile tasks, stories and epics)
  - project board
  - code
  - docs (all other produced materials)
- Slack
  - daily standup
  - team communication
- Google Drive
  - sharing documents

## Agile

Our work is organized around **tasks**.

A task is a single step of work towards completing one **story** which is part of the current sprint goal. During the sprint meeting, the tasks are picked by one or more team members who are then accountable for that task.

The tasks are tracked on the **project board**. This is essential so we can keep an overview of the progress in our team, which is not only distributed, but also has varying availabilities and working hours.

*Not all tasks must belong to a story. It is more important to track all of our progress, than to be strict about that.*

### Tasks

Team members assigned to a task are **accountable** to complete the task. If this is not possible, hand the task over to another team member, or announce in the daily standup that the task cannot be completed and why, as soon as a blocker appears.

Team members can only work on tasks currently **assigned** to them. Any changes in this must be announced in the daily standup.
  - If a team member starts working on a currently unassigned task, they assign themselves to the issue.
  - If a team member wants to contribute to a task assigned to somebody else, contact the current owner first, and then update the assignees.
  - If a new task comes up during the week, the team member starting the task adds it to the board as a simple card if no issue exists yet.

With your daily standup completed with the Geekbot, also move along your tasks on the board.

### Project board

Our project board has the following **columns**:

- Product Backlog
- Sprint Backlog
  - Stories
  - Next In
  - In Progress
  - Waiting
  - Awaiting Review
  - Done

When a task is moved to *Awaiting Review* or *Done*, a short closing **message** should be added to the issue. When a task is moved to *Awaiting Review*, one or more team members to do the review should be contacted directly, or a general request is made in the daily as a blocker.

### Technicalities

All board items are issues on github. Each item has one label in capital letters setting its **level**: *EPIC*, *STORY* or *TASK*. 

For each story to be ready, it needs the statement of the user story and a list of all associated tasks in the body of the issue. GitHub automatically **tracks** the progress of the story as these tasks are completed. To view this quickly also on the board, we add a label #x to the story and all associated tasks, with x being the issue number of the story.

For convenience, tasks may have simple **subtasks** in their body, but which cannot be issues themselves. If that would be the case, the task should be split up.

In addition, we use **component** labels. These help structure the board and our issues thematically. We start with the labels *\*admin*, *\*backend*, *\*design* and *\*frontend*.

Each task is assigned one or more team members, otherwise it is tagged *not assigned*.

Filtering the board can be done quickly by clicking on a label, a milestone, or an assignee. Unfiltering can be done by clicking on the same again.

An issue is only **closed** when the task is moved to *Done*.

### Features

*tbd*
