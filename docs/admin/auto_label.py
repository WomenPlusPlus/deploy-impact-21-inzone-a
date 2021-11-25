""" 
SETUP

https://github.com/cli/cli#installation
"""

"""
POSSIBLE EXTENSIONS
- script is very slow, do not make so many calls but exclude old/closed issues maybe
- issue templates on github
- automate for body edits through github actions
"""

"""
SOURCES

add new label to repo
https://github.com/cli/cli/issues/1503#issuecomment-672123413
fetch title json field
https://gist.github.com/gh640/2d0cf267c10357a86786e7b8d01dfd67
stdout to string
https://www.kite.com/python/answers/how-to-get-stdout-and-stderr-from-a-process-as-a-string-in-python
json handling
https://stackoverflow.com/a/50268675
find all regex matches
https://stackoverflow.com/questions/4697882/how-can-i-find-all-matches-to-a-regular-expression-in-python
"""

import subprocess
import json
import pandas as pd
import re

testing = False
issue_limit = 1000 #safety measure

# get all labels
all_labels = subprocess.run(["gh api repos/:owner/:repo/labels --paginate"], capture_output=True, shell=True)
all_labels = [x["name"] for x in json.loads(all_labels.stdout.decode('utf-8'))]

# loop through all issues to get all references
# we assume here that the issues are numbered continuously
issues = pd.DataFrame(data=None, index=None, columns=['body','labels','assignees','tracks','labels_is'])
i = 1

while i < issue_limit:
    print(i)
    body = subprocess.run(["gh issue view --json body --json labels --json assignees '#" + str(i) + "'"], capture_output=True, shell=True)
    if body.returncode == 1: 
        pr = subprocess.run(["gh pr view '#" + str(i) + "'"], capture_output=True, shell=True)
        if pr.returncode ==1:
            break
        else:
            i += 1
            continue
    issue_labels = [x["name"] for x in json.loads(body.stdout.decode('utf-8'))["labels"]]
    issue_assignees = [x["login"] for x in json.loads(body.stdout.decode('utf-8'))["assignees"]]
    tracked_issues = re.findall(r"\- \[[ x]\] #(\d+)", str(json.loads(body.stdout.decode('utf-8'))["body"]))
    issues.loc[i] = [json.loads(body.stdout.decode('utf-8'))["body"], issue_labels, issue_assignees, [int(x) for x in tracked_issues], [int(x[1:]) for x in issue_labels if x[0] == '#']]
    i += 1

if i == issue_limit: 
    print("Reached "+str(issue_limit)+" issues and pull requests. Reset the limit.")
    quit()

# compute columns
issues['tracked_in'] = [[x for x in issues.index if y in issues.loc[x,"tracks"] and 'STORY' in issues.loc[x,"labels"]] for y in issues.index]
issues['labels_should'] = issues.apply(lambda x: ([x.name] if (len(x['tracks'])>0 and 'STORY' in x['labels']) else []) + x['tracked_in'], axis=1)
issues['to_add'] = issues.apply(lambda x: [i for i in x['labels_should'] if i not in x['labels_is']], axis = 1)
issues['to_rem'] = issues.apply(lambda x: [i for i in x['labels_is'] if i not in x['labels_should']], axis = 1)

# useful for testing
# issues[lambda x: x.to_add.map(len)>0]
# issues[lambda x: x.to_rem.map(len)>0]

# init new labels
for n in list(set([i for k in issues.labels_should for i in k if i not in [int(l[1:]) for l in all_labels if l[0] == '#']])):
    print("Appending issue number #"+str(n)+" to all_labels list.")
    if not(testing):
        add_new_label = subprocess.run(['gh api --silent repos/:owner/:repo/labels -f name="#' + str(n) + '" -f color="CCCCCC"'], shell=True, capture_output=True)
        all_labels.append('#'+str(n))

# update all labels
for i, r in issues['to_add'][lambda x: x.map(len)>0].items():
    for l in r:
        print("TEST gh issue edit " + str(i) + " --add-label '#" + str(l) + "'")
        if not(testing):
            add_issue_label = subprocess.run(["gh issue edit " + str(i) + " --add-label '#" + str(l) + "'"], shell=True, capture_output=True)

for i, r in issues['to_rem'][lambda x: x.map(len)>0].items():
    for l in r:
        print("TEST gh issue edit " + str(i) + " --remove-label '#" + str(l) + "'")
        if not(testing):
            add_issue_label = subprocess.run(["gh issue edit " + str(i) + " --remove-label '#" + str(l) + "'"], shell=True, capture_output=True)

for i, r in issues[lambda x: ((x.assignees.map(len)==0) & (x.labels.map(lambda y: 'TASK' in y and 'Not assigned' not in y)))].iterrows():
    print("TEST gh issue edit " + str(i) + " --add-label 'Not assigned'")
    if not(testing):
        add_issue_label = subprocess.run(["gh issue edit " + str(i) + " --add-label 'Not assigned'"], shell=True, capture_output=True)
