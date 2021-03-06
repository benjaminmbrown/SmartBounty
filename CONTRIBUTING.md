# Contributing

To contribute, head to the [gitlab](https://gitlab.com/Horyus/vortex/vortex-demo) version of this repository.
When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

**1** - Ensure any install or build dependencies are removed before the end of the layer when doing a
   build.


**2** - Each Pull Request should have its own issue created and referenced in every commit. All branches
   should start from `develop` branch. Naming convention for the issue is `[(THEME)] (TITLE)` and Branch Naming
   should be `(TYPE)/(PROJECT_ID)-(ISSUE_NUMBER)-(THEME_FIRST_LETTER)-(TITLE)`. As an example, if you want to add
   something related with Redux, Issue name can be `[Redux] Add Reducer`, and Branch should be
   (saying the issue number is 42) `feature/VTXD-42-r-add-reducer`.

   **THEME**: 1-2 Words defining the theme of the contribution. You can look at other contributions to use
   similar ones.

   **TITLE**: Short statement defining the contribution.

   **TYPE**: `feature`, `bugfix`, `documentation` are the main three themes. You can use your own if you find these
   not suitable.

   **PROJECT_ID**: `VTXD`.

   **ISSUE_NUMBER**: Issue number delivered by gitlab.

   **THEME_FIRST_LETTER**: First letter of defined `THEME`.

   **TITLE**: Title in lowercase, space replaced with `-`.


**3** - Commit message convention is:

```
COMMIT_TITLE

COMMIT_BODY

ISSUE_REFERENCE
```

   **COMMIT_TITLE**: 50 characters max, no end punctuation.

   **COMMIT_BODY**: optional, 72 characters per line. If no body, should be replaces by `ISSUE_REFERENCE`.

   **ISSUE_REFERENCE**: `VTXD #42` would be the issue reference of the example above.

**4** - Pull Requests will be merged on develop by repository managers depending on incoming releases and versions.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at [INSERT EMAIL ADDRESS]. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
