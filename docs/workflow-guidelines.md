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
  - links to content developed in other platforms

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

## Project board

Our project board has the following **columns**:

- Product Backlog
- Sprint Backlog
  - Stories
  - Next In
  - In Progress
  - Waiting
  - Awaiting Review
  - Done

All board items are issues on github. Each item has one label in capital letters setting its **level**: *EPIC*, *STORY* or *TASK*. 

In addition, all tasks have at least one **component** label. These help structure the board and our issues thematically. Our components are *\*admin*, *\*backend*, *\*design* and *\*documentation*, *\*frontend* and *\*learning*. Stories do not have component labels, as they may contain various tasks.

**Filtering** the board can be done quickly by clicking on a label, a milestone, or an assignee. Unfiltering can be done by clicking on the same again.

### Definition of Ready

An issue is **ready** to be added to the product backlog as a story, when:
- [ ] It has a title.
- [ ] It has the label *STORY*.
- [ ] It has a user story stating the goal (*why*).
- [ ] The tasks are defined, i.e. the steps needed to reach that goal (*how*). At this point they are in Markdown only, not yet converted to issues.
- [ ] The output is described (*what*).
- [ ] The review process is described.
- [ ] Optional: Specific acceptance criteria are stated.

### Adding stories to the sprint

When a story is added to the next sprint and moved to the sprint backlog, the following steps have to be done:
- [ ] It gets the label *#x* with x the issue number, in #CCCCCC.
- [ ] The milestone is set (*when*).
- [ ] The main accountable team member is assigned (*who*).
- [ ] The tasks are converted to individual issues and added to the "Next In" column.

Each of these tasks
- [ ] has the following labels 
  - [ ] "TASK"
  - [ ] "*component" with a component from the available labels
  - [ ] "#x" inherited from the story
- [ ] has a team member assigned (may differ from the team member assigned to the story; if no team member is assigned it is labeled *not assigned* and the team is contacted on Slack about this)
- [ ] inherits the milestone
- [ ] optional: specific acceptance criteria
- [ ] optional: subtasks in Markdown

Tracking: GitHub automatically **tracks** the progress of the story as these tasks are completed. To view all tasks belonging to one story quickly by filtering the board, we add the label *#x* to the story and all associated tasks, with x being the issue number of the story.

### Reviewing and closing tasks

A task is moved to the column **done**, when:
- [ ] A closing message has been added to the issue about the output created.
- [ ] The output has been broadcast on Slack.
- [ ] The issue is closed.
- [ ] Specific acceptance criteria (if any) are met.

Some tasks require a **review** step before being done. This review process has been planned in the story, such that it incurs no delay. There are two main options:
1. A specific team member is assigned to do the review and is notified. The initial assignee adds a review message to the issue about the output already created and the expectation from the review. Then, the reviewer performs the closing steps when the review has been completed.
2. Feedback is requested from the whole team on Slack with a time limit. After this time limit has passed, the initial assignee performs the closing steps.

### Closing stories

Stories are closed after the sprint meeting, when
- [ ] All individual tasks have been closed.
- [ ] They were mentioned and discussed in the sprint retrospective.
- [ ] All output has been published (*to be defined*).

