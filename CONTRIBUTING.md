# Contributing to Bionode

Thank you for your interest in contributing to Bionode :tada:!

Bionode is an Open Source community that aims at building highly reusable code and tools for bioinformatics by leveraging the Node.JS ecosystem. We use Node.JS Streams to process big genomic data.

We welcome all kinds of contributions at all levels of experience, either code, knowledge, questions or suggestions. Many of our goals and GitHub issues do not require biology knowledge (e.g. very technical, coding) and some don't even require JavaScript knowledge (e.g. events, community, documentation).

This document has a set of guidelines for contributing to Bionode on GitHub. These are guidelines, not rules. This guide is meant to make it easier for you to get involved.

* [Participation guidelines](#participation-guidelines)
* [What we're working on](#what-were-working-on)
* [How to submit changes](#how-to-submit-changes)
* [How to report bugs](#how-to-report-bugs)
* [Communication channels](#communication-channels)

## Participation guidelines

This project adheres to a [code of conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [mail@bionode.io](mailto:mail@bionode.io).

## What we're working on

Take a look at the GitHub issues in our organisation wide project board at [project.bionode.io](http://project.bionode.io). Here's what each column means:
* **Backlog** All the issues we have open (sorted by most recent). You'll find a lot in here and maybe something you could help us with.
* **Next** What we want to work on next! Picking something to solve here would be greatly appreciated!!
* **In Progress** Things we are currently working on, come help us! The person assigned to each issue is the one in charge and who you can ask any question.
* **Done** Solved issues (sorted by closed date). Here you can check what we've been up to in the past.

If you want to have a view of where all of this is going in the long run, check out our [Roadmap issue](https://github.com/bionode/bionode/issues/35), where we discuss our vision.

## How to submit changes

Each bionode tool and library has its own repository (like a folder).
Once you've identified one of the issues above that you feel you can contribute to, you're ready to make a change to the repository of that issue! However, it's always a good idea to [talk to us first](#communication-channels). Specially if you intend to take on something big, just to make sure we're on the same track. :wink:

1. **[Fork](https://help.github.com/articles/fork-a-repo/) the repository** that the issue belongs to. This makes your own version of the tool/library that you can edit and use. If you were invited to the [Bionode organisation](https://github.com/orgs/bionode/people) on GitHub, you can just `git clone` the repo and use a `git branch` instead of `forking`.
2. **[Make your changes](https://guides.github.com/activities/forking/#making-changes)**! You can do this in the GitHub interface on your own local machine. Once you're happy with your changes...
3. **Submit a [pull request](https://help.github.com/articles/proposing-changes-to-a-project-with-pull-requests/)**. This opens a discussion around your project and lets the project lead know you are proposing changes.

First time contributing to open source? Check out this *free* series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

## How to report bugs

Any general Bionode bug or question should be reported on the issue tracker of [bionode/bionode](https://github.com/bionode/bionode/issues). Anything that is specific to one of the tools, e.g. `bionode-ncbi`, should be reported under [that tool issue tracker](https://github.com/bionode/bionode-ncbi).

## Communication channels

Don't be shy! Come talk to us :smiley:

* **Email** [mail@bionode.io](mailto:mail@bionode.io)
* **Chat room** [http://gitter.im/bionode/bionode](http://gitter.im/bionode/bionode)
* **IRC** #bionode on Freenode
* **Twitter** [@bionode](http://twitter.com/@bionode)

## Node.JS specific commands
If you're new to Node.JS we highly recommend checking the [NodeSchool workshop](https://nodeschool.io/#workshopper-list) that you can install and run in your command line. Example:

```bash
npm install -g learnyounode
learnyounode
```

To install a local version of a bionode tool that you are modifying (e.g. bionode-ncbi):

```bash
git clone git@github.com:bionode/bionode-ncbi.git
cd bionode-ncbi
npm install # Install all dependencies defined in the package.json file
npm link # Setup bionode-ncbi in your PATH to point to this local version
```

You can now modify the code in the `bionode-ncbi` folder and test the effect of those changes when you run the `bionode-ncbi` command in your terminal.

To run a bionode tool suite of tests and check their code coverage, you can do:

```bash
npm test
npm run coverage
```

To rebuild and minify a bionode module for the browser (if supported) do:

```bash
npm run build-browser
```

To rebuild the documentation using the comments in the code do:

```sh
npm run build-docs
```

# Style guide
We currently recommend using the [JavaScript Standard Style](https://github.com/feross/standard) to check your code. You can run it in the folder you're working (see below) and install it as an extension for your text editor (e.g. [Atom](https://atom.io/packages/linter-js-standard) or [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)).

```bash
npm install -g standard
standard
```

# Testing
We use [tape](https://github.com/substack/tape) with [tape-nock](https://github.com/Flet/tape-nock) for testing. Code coverage is checked with [istanbul](https://github.com/gotwarlost/istanbul).
