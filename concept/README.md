# Concept and project resources of spoky

## Project board

The [task lists](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-task-lists) available for github issues are very convenient to track a set of tasks grouped together as one story. All the single tasks, and the story they belong to, can be separate issues. On the project board, the completed tasks from the list are shown as "4 of 7 tasks" for the story. However, for a given tasked it is not visible on the board in which story it is tracked: one has to open the issue for this. Upon mentor input we therefore created labels: for each story tracking tasks as issues, we made a label "#x" with x the story's issue number, and assigned this label to both the story and all tracked tasks. This allows for easy filtering of the board, which can be done by simply clicking on this label. To simplify adding these labels, a python script was created (to be run locally on your computer, see below).

The result looks like this:

<img src="board_with_labels.png" width="500" alt="board with labels"/>

### Auto labeling script

The script can be found [here](/scripts/auto_label.py). For this to run you need to install the [GitHub CLI](https://cli.github.com/) and ``python3``.

Future extensions would be to use issue templates, and to program some github actions to take care of this labeling whenever issues are edited.
